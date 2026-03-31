# Template：静态 SPA 网站部署到 Vercel

适用场景：纯 HTML/CSS/JS 网站（无框架、无构建工具），托管在 GitHub，部署到 Vercel。

---

## 1. 项目结构

```
my-project/              ← Git 仓库根目录（推荐直接是网站根）
├── index.html
├── main.js
├── style.css
├── data/
│   └── *.js
└── vercel.json
```

**重要：** 如网站在子目录（如 `website/`），需在 Vercel 设置 Root Directory。

---

## 2. vercel.json（SPA 路由必配）

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 3. Git 初始化 & 推送

```bash
cd my-website-directory
git init
git add .
git commit -m "feat: initial website"

# 添加远程仓库
git remote add origin https://github.com/USERNAME/REPO.git

# 确认远程默认分支（main or master）
git remote show origin | grep "HEAD branch"

# 推送到正确分支
git checkout -b main          # 若本地是 master，需切换
git pull origin main --allow-unrelated-histories -X ours  # 合并远程初始提交
git push -u origin main
```

---

## 4. Vercel 配置

1. [vercel.com/new](https://vercel.com/new) → Import Git Repository
2. 选择 GitHub 仓库
3. **关键设置：**
   | 设置项 | 值 |
   |--------|-----|
   | Framework Preset | Other |
   | Root Directory | `website`（若文件在子目录）或留空 |
   | Build Command | 留空 |
   | Output Directory | 留空 |
4. Deploy

---

## 5. 本地预览（避免 file:// 路由问题）

```bash
# 方式 1：npx serve（推荐）
npx serve ./website

# 方式 2：Python
cd website && python -m http.server 8080

# 方式 3：VS Code Live Server 插件
```

---

## 6. 后续更新流程

```bash
# 修改文件后
git add .
git commit -m "feat: xxx"
git push origin main   # Vercel 自动重新部署，约 10-30 秒
```

---

## 常见错误排查

| 现象 | 原因 | 解决 |
|------|------|------|
| `404: NOT_FOUND`（Vercel 自己的） | index.html 不在 Vercel Root Directory | 设置 Root Directory |
| 推送后 Vercel 不重新部署 | 推送到了错误分支 | 确认推送到 Vercel 绑定的分支 |
| 本地打开显示 404 | file:// 协议 SPA 路由不兼容 | 用本地服务器预览 |
| 刷新页面 404 | vercel.json 缺少 rewrite 规则 | 添加 `/(.*) → /index.html` |
