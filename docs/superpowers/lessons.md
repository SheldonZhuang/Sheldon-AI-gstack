# 经验教训 (Lessons Learned)

---

## 2026-03-31 — Vercel 静态网站部署

### 踩坑 1：Git 仓库根目录 ≠ 网站文件位置

**现象：** Vercel 部署后一直显示 `404: NOT_FOUND`，反复重新部署无效。

**根本原因：**
- Git 仓库初始化于父目录 `D:/sheldonproject/SheldonAIgstack`
- 网站文件实际在子目录 `website/`
- Vercel 默认从仓库根部署，根目录只有 `docs/`、`website/`、`LICENSE`，找不到 `index.html`

**修复：** Vercel Settings → General → Root Directory → 填写 `website`

**预防规则：**
```bash
# 部署前确认 git 根目录
git rev-parse --show-toplevel

# 确认网站文件在正确位置
git ls-files | head -20
```

---

### 踩坑 2：GitHub 默认分支 main vs 本地推送到 master

**现象：** 代码推送成功，但 Vercel 仍用旧的空白内容部署。

**根本原因：**
- GitHub 新建仓库默认分支是 `main`，有初始 LICENSE 提交
- 本地推送到 `master` 分支
- Vercel 绑定 `main` 分支，`master` 的推送不触发部署

**修复：**
```bash
# 拉取远程 main，合并，再推送
git checkout -b main
git pull origin main --allow-unrelated-histories -X ours
git push origin main
git push origin --delete master  # 删掉 master
```

**预防规则：** 新项目推送前先确认远程默认分支：
```bash
git remote show origin | grep "HEAD branch"
```

---

### 踩坑 3：`file://` 协议下 SPA 路由失效

**现象：** 本地双击 `index.html` 打开，首页直接显示 404 页面。

**根本原因：**
- SPA 路由用 `location.pathname` 判断，`file://` 协议下路径是 `/D:/project/website/index.html`
- 不匹配路由条件 `path === '/'`，直接落入 404

**修复（本地预览用）：**
```bash
npx serve D:/sheldonproject/SheldonAIgstack/website
# 或
python -m http.server 8080
```

**代码层修复（可选）：** 在 `render()` 函数增加 `file://` 兼容：
```javascript
if (path === '/' || path === '/index.html' || path === ''
    || path.endsWith('/website/index.html')) {  // file:// 兼容
```

---

## 部署检查清单

部署静态网站到 Vercel 前，确认以下几点：

- [ ] `git rev-parse --show-toplevel` 确认 git 根目录
- [ ] 网站 `index.html` 相对于 git 根目录的路径
- [ ] 若在子目录，Vercel → Settings → Root Directory 已设置
- [ ] 推送到与 Vercel 绑定一致的分支（通常 `main`）
- [ ] `vercel.json` 已配置 SPA rewrite 规则
- [ ] 首次部署后访问网站验证路由正常
