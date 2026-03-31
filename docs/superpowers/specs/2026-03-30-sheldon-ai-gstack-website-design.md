# Sheldon AI gstack 网站设计规格文档

**日期：** 2026-03-30
**项目名：** Sheldon AI 应用军团（Sheldon AI gstack）
**设计作者：** Claude Code + Sheldon

---

## 1. 项目概述

### 目标
构建一个苹果官网风格的中英文双语静态网站，汇总展示 gstack 项目（来自 https://github.com/garrytan/gstack）的 20 个 AI 虚拟团队角色，向技术开发者和创业者两类受众展示 AI 协作的实际应用案例。

### 核心价值主张
- "1人 = 20人团队" — 通过 AI 角色分工实现指数级效率
- 60天600,000+行生产代码，每天10,000-20,000行
- Hero 统计数字为硬编码全局营销数字（非从角色数据聚合）：
  - `100x` 样板代码压缩比
  - `50x` 测试写作压缩比
  - `30x` 功能开发压缩比
  - `600K+` 60天代码行数

### 已知限制
- 社交分享 Open Graph 预览不在范围内，所有页面共享同一套 meta 标签（静态 SPA 限制）

### 部署目标
- GitHub 仓库 → Vercel 自动 CI/CD
- 完全静态，无服务端依赖

---

## 2. 技术方案

**选型：单文件 SPA + pushState 路由（方案 A）**

### 文件结构

```
D:\sheldonproject\SheldonAIgstack\website\
├── index.html          # 单入口，包含所有视图模板
├── style.css           # 全站样式（苹果风格设计系统）
├── main.js             # SPA 路由 + 交互逻辑
├── data/
│   └── roles.js        # 20个角色完整中英文数据（export const roles = [...]）
├── vercel.json         # SPA 路由重定向配置
└── assets/
    └── icons/          # SVG 角色图标（可选）
```

### 路由结构

| URL | 视图 |
|-----|------|
| `/` | 首页（Hero + 角色卡片网格） |
| `/roles/:id` | 角色详情页 |
| 未匹配的 id | 显示 404 提示 + 返回首页按钮 |

### vercel.json 配置

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 404 处理
路由器读取 `location.pathname` 后，若 `/roles/:id` 中的 `id` 不存在于 roles 数据中，渲染内联 404 视图（显示"角色未找到"提示 + 返回首页按钮），不重定向。

---

## 3. 视觉设计系统

### 设计基调
参考苹果产品页（apple.com/mac-pro 风格）黑色背景、白色文字、精准排版、克制动效。

### 颜色规范

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 页面背景 | `#000000` | 纯黑 |
| 卡片背景 | `#1c1c1e` | iOS 深色卡片 |
| 卡片悬停 | `#2c2c2e` | 微亮 |
| 强调色 | `#0071e3` | 苹果蓝 |
| 成功/活跃 | `#30d158` | 苹果绿 |
| 主要文字 | `#f5f5f7` | 苹果白 |
| 次要文字 | `#86868b` | 苹果灰 |
| 分割线 | `#38383a` | 深灰边框 |

### 字体规范

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
             "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
```

| 元素 | 大小 | 字重 |
|------|------|------|
| 主标题 H1 | 56px (桌面) / 36px (手机) | 700 |
| 副标题 H2 | 36px / 24px | 600 |
| 卡片标题 | 20px | 600 |
| 正文 | 16px | 400 |
| 小字注释 | 13px | 400 |

### 间距与圆角

```css
--radius-card: 18px;
--radius-btn: 980px;     /* 苹果圆形按钮 */
--radius-tag: 8px;
--spacing-card: 24px;
--transition: cubic-bezier(0.4, 0, 0.2, 1) 0.25s;
```

---

## 4. 页面结构

### 4.1 首页（Home）

#### 顶部导航栏（Sticky，始终吸顶）
- 左侧：Logo（文字 "Sheldon AI gstack"）
- 右侧（桌面）：语言切换（中 / EN）+ GitHub 链接图标
- 右侧（手机/平板 <1200px）：汉堡菜单按钮（☰）
  - 点击展开全屏遮罩菜单，包含语言切换 + GitHub 链接
  - 点击遮罩或再次点击按钮收起
  - 展开动画：从顶部 slide-down，200ms
- 背景：`rgba(0,0,0,0.8)` + `backdrop-filter: blur(20px)`（毛玻璃）
- 导航栏高度：60px（桌面）/ 52px（手机）

#### 英雄区（Hero Section）
- 全屏高度 `min-height: 100vh`，垂直居中
- 主标题（中文）：**Sheldon AI 应用军团**
- 副标题（英文）：*Sheldon AI gstack — Your Virtual Engineering Team*
- 描述文字：一句话说明（中英双语切换）
- 数字统计行（4组，IntersectionObserver 进入视口触发数字滚动动画）：
  - `100x` 样板代码压缩比（硬编码）
  - `50x` 测试写作压缩比（硬编码）
  - `30x` 功能开发压缩比（硬编码）
  - `600K+` 60天代码行数（硬编码）
- CTA 按钮：**探索全部角色** → 平滑滚动到卡片区

#### 分类筛选栏（`position: sticky; top: 60px`）
使用 CSS sticky 定位，吸顶时 top 值等于导航栏高度（60px），无需 JS 控制。包含：
- `全部` / `规划决策` / `设计创意` / `构建开发` / `审查安全` / `发布运维`
- 选中状态：苹果蓝背景，白色文字
- 手机端：横向可滚动（`overflow-x: auto; white-space: nowrap`）

#### 角色卡片网格
- 响应式布局：桌面 4列 / 平板(≤1024px) 2列 / 手机(≤768px) 1列
- 卡片内容（默认态）：
  - 顶部：Emoji 图标 + 分类标签（中文）
  - 主体：中/英文角色名（双语，受 `data-lang` 控制）+ 命令（如 `/qa`）
  - 底部：一句话描述（tagline）+ **展开摘要 ▼** 按钮
- 卡片悬停效果：`translateY(-4px)` + box-shadow 增强，`transition: 0.25s`
- 展开摘要（第一层）：
  - 展开区显示：功能说明（description，前100字）+ 触发时机（前2条）+ 压缩比数据
  - **不显示** `usage` 字段（使用方法仅在详情页呈现）
  - 按钮变为：**收起 ▲** + **查看详情 →**

#### 页脚
- 项目说明 + 来源引用（Garry Tan / Y Combinator）
- GitHub 链接
- 版权文字

### 4.2 角色详情页（Role Detail）

#### 顶部
- 面包屑：首页 > 分类中文名 > 角色名
- 大标题：Emoji + 角色名（中/英双语）
- 命令标签：`/qa`（点击复制到剪贴板，显示"已复制"提示）
- 分类标签

#### 主体（双栏布局，桌面 ≥768px；手机单栏）

**左栏（60%）：**
- 功能说明（中文详细段落）
- 触发时机（完整列表）
- 所需能力（技能标签列表）
- 使用方法（步骤说明）

**右栏（40%）：**
- 压缩比卡片（人类团队耗时 vs AI 辅助耗时 + 压缩比）
- 与其他角色的配合（relatedRoles 对应角色的简要说明）

#### 底部
- GitHub 源文件链接（查看完整 SKILL.md）→ `_blank` 新标签页
- 相关角色推荐（横向卡片列表，最多3个，来自 `relatedRoles` 字段）

---

## 5. 角色数据完整列表

### Category 映射表

| 英文 category 值 | UI 筛选标签（中文） | UI 筛选标签（英文） |
|-----------------|----------------|----------------|
| `planning` | 规划决策 | Planning |
| `design` | 设计创意 | Design |
| `build` | 构建开发 | Build |
| `review` | 审查安全 | Review |
| `release` | 发布运维 | Release |

### 数据结构 Schema

```js
{
  id: String,           // URL 标识，如 "qa"
  command: String,      // slash command，如 "/qa"
  category: String,     // "planning" | "design" | "build" | "review" | "release"
  emoji: String,        // 表情符号
  name: { zh: String, en: String },
  tagline: { zh: String, en: String },  // 一句话卡片描述
  description: { zh: String, en: String }, // 详情页功能说明段落
  triggers: { zh: String[], en: String[] }, // 触发时机列表
  skills: String[],     // 所需技能标签（仅中文，不参与语言切换，英文界面下同样显示中文标签）
  usage: { zh: String, en: String }, // 使用方法说明
  compression: {
    human: String,  // 人类团队耗时，如 "1天"
    ai: String,     // AI 辅助耗时，如 "15分钟"
    ratio: String   // 压缩比，如 "50x"
  },
  githubUrl: String,    // 如 "https://github.com/garrytan/gstack/tree/main/qa"
  relatedRoles: String[] // 推荐关联角色 id 数组，最多3个
}
```

### relatedRoles 关联规则
1. 优先选���一分类的角色（同类协作）
2. 次选工作流上下游角色（如 plan→build→review→release 流程链）
3. 每个角色最多3个关联

### 20 个角色完整数据

以下为完整数据，内容来源于 gstack 仓库各角色的 SKILL.md 文档，已预翻译为中文：

**角色示例数据（以 /qa 为代表，其余角色格式相同）：**

```js
{
  id: "qa",
  command: "/qa",
  category: "build",
  emoji: "🔬",
  name: { zh: "QA 工程师", en: "QA Engineer" },
  tagline: {
    zh: "系统测试、发现Bug、原子修复——每次提交独立可回滚",
    en: "Systematically test, find bugs, and fix with atomic commits"
  },
  description: {
    zh: "对Web应用进行系统性QA测试并自动修复发现的Bug。测试分三个档次：快速（仅严重/高危）、标准（+中危）、全面（+外观缺陷）。每修复一个Bug，自动生成对应回归测试并原子提交，保证每个提交独立可回滚。输出修复前后健康评分对比。",
    en: "Systematically QA test a web application and fix bugs found. Three tiers: Quick (critical/high only), Standard (+medium), Exhaustive (+cosmetic). Each bug fix gets an atomic commit with a regression test. Produces before/after health scores."
  },
  triggers: {
    zh: ["功能开发完成准备测试", "用户反馈出现问题", "上线前最终验证", "询问'这个能用吗？'"],
    en: ["Feature ready for testing", "User reports issues", "Pre-launch verification", "Asking 'does this work?'"]
  },
  skills: ["Playwright 浏览器自动化", "回归测试", "原子提交", "Bug 根因分析"],
  usage: {
    zh: "运行 /qa，提供你的网站 URL 或描述要测试的功能区域。可指定档次：Quick/Standard/Exhaustive。",
    en: "Run /qa, provide your site URL or describe the feature area to test. Optionally specify tier: Quick/Standard/Exhaustive."
  },
  compression: { human: "1天", ai: "15分钟", ratio: "50x" },
  githubUrl: "https://github.com/garrytan/gstack/tree/main/qa",
  relatedRoles: ["investigate", "review", "ship"]
}
```

### 20 个角色列表（含 relatedRoles 关联）

| 序号 | id | command | category | 中文名 | relatedRoles |
|------|-----|---------|----------|--------|-------------|
| 1 | `plan-ceo-review` | `/plan-ceo-review` | planning | CEO 产品审查 | `office-hours`, `plan-eng-review`, `autoplan` |
| 2 | `plan-eng-review` | `/plan-eng-review` | planning | 工程经理架构评审 | `plan-ceo-review`, `plan-design-review`, `review` |
| 3 | `plan-design-review` | `/plan-design-review` | planning | 设计师方案评审 | `plan-eng-review`, `design-consultation`, `design-review` |
| 4 | `autoplan` | `/autoplan` | planning | 全自动规划流水线 | `plan-ceo-review`, `plan-eng-review`, `plan-design-review` |
| 5 | `office-hours` | `/office-hours` | planning | YC 创业诊室 | `plan-ceo-review`, `design-consultation`, `autoplan` |
| 6 | `design-consultation` | `/design-consultation` | design | 设计系统咨询师 | `plan-design-review`, `design-review`, `design-shotgun` |
| 7 | `design-review` | `/design-review` | design | 设计审查+修复师 | `design-consultation`, `qa`, `plan-design-review` |
| 8 | `design-shotgun` | `/design-shotgun` | design | 多方案视觉探索者 | `design-consultation`, `design-review`, `plan-design-review` |
| 9 | `qa` | `/qa` | build | QA 工程师 | `investigate`, `review`, `ship` |
| 10 | `qa-only` | `/qa-only` | build | QA 报告员 | `qa`, `investigate`, `review` |
| 11 | `investigate` | `/investigate` | build | 根因调试专家 | `qa`, `review`, `benchmark` |
| 12 | `benchmark` | `/benchmark` | build | 性能回归工程师 | `investigate`, `canary`, `review` |
| 13 | `review` | `/review` | review | 员工工程师/PR 审查 | `qa`, `cso`, `ship` |
| 14 | `cso` | `/cso` | review | 首席安全官 | `review`, `investigate`, `ship` |
| 15 | `codex` | `/codex` | review | 跨模型第二意见 | `review`, `cso`, `plan-eng-review` |
| 16 | `ship` | `/ship` | release | 发布工程师 | `review`, `qa`, `land-and-deploy` |
| 17 | `land-and-deploy` | `/land-and-deploy` | release | 部署工程师 | `ship`, `canary`, `review` |
| 18 | `canary` | `/canary` | release | SRE 金丝雀监控 | `land-and-deploy`, `benchmark`, `investigate` |
| 19 | `document-release` | `/document-release` | release | 技术文档写手 | `ship`, `retro`, `review` |
| 20 | `retro` | `/retro` | release | 周期复盘经理 | `document-release`, `benchmark`, `ship` |

---

## 6. 交互规格

### 双语切换

```js
const setLang = (lang) => {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('lang', lang);
};
// 初始化：读取 localStorage.getItem('lang') || 'zh'
```

```css
/* CSS 控制显示隐藏 */
[data-lang="zh"] .en { display: none; }
[data-lang="en"] .zh { display: none; }
```

### 卡片展开/收起（CSS grid-template-rows 方案）

```css
/* 展开容器 */
.card-expand {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-expand.expanded {
  grid-template-rows: 1fr;
}
.card-expand > div {
  overflow: hidden; /* 必须：防止内容在 0fr 时溢出 */
}
```

不使用 `max-height` 方案，避免过渡动画时间与内容高度不匹配。

### 汉堡菜单（<1200px）

```js
// 点击 ☰ 按钮 → body 添加 .menu-open
// .menu-open 时显示全屏遮罩 + 菜单项（从顶部 slide-down，200ms）
// 点击遮罩 / 再次点击 ☰ → 移除 .menu-open
// 菜单项：语言切换 + GitHub 链接
```

```css
.mobile-menu {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.95);
  transform: translateY(-100%);
  transition: transform 0.2s ease;
  z-index: 100;
}
body.menu-open .mobile-menu { transform: translateY(0); }
```

### 数字滚动动画

```js
// IntersectionObserver 监听 .hero-stats 容器
// 进入视口后，对每个数字元素执行 countUp()
// 使用 { once: true } 选项：动画仅触发一次，从详情页返回首页时不重复播放
// countUp(el, target, duration=1500): requestAnimationFrame + easeOutQuart
// 600K+ 等含特殊后缀的数字：数字部分滚动，后缀静态拼接
```

### 分类筛选

```js
// 点击标签 → 更新 activeCategory
// cards 迭代：category 不匹配的加 .hidden（opacity:0 + scale:0.95 + pointer-events:none）
// 匹配的：移除 .hidden，stagger 每卡 50ms 的 transition-delay
```

### 路由

```js
// 使用 history.pushState / popstate，无第三方库
// navigate(path): pushState + render(path)
// window.onpopstate: render(location.pathname)
// render('/') → 渲染首页视图
// render('/roles/qa') → 查找 roles.find(r => r.id === 'qa')，存在则渲染详情，不存在则渲染 404
// 页面切换后 window.scrollTo(0, 0)
```

---

## 7. 响应式断点

| 断点 | 卡片列数 | 导航 | 特殊处理 |
|------|---------|------|---------|
| ≥1200px（桌面） | 4列 | 完整导航 | 完整布局 |
| 768px-1199px（平板） | 2列 | 汉堡菜单 | 详情页双栏保留 |
| <768px（手机） | 1列 | 汉堡菜单 | Hero 字体缩小，统计数字2×2排列，详情页单栏 |

---

## 8. SEO & 可访问性

- `<html lang="zh-CN">` 默认中文
- 每个角色详情页通过 JS 动态设置 `document.title`（格式：`角色名 | Sheldon AI gstack`）
- 静态 `<meta description>` 全站共享同一描述（SPA 限制，社交 Open Graph 预览不在范围内）
- 所有交互图标提供 `aria-label`
- 颜色对比度满足 WCAG AA 标准（`#f5f5f7` on `#1c1c1e`：对比度 ≥ 7:1）
- 键盘可访问：卡片展开按钮支持 Enter/Space 触发

---

## 9. 不在范围内（YAGNI）

- ❌ 服务端渲染（SPA 限制已知并接受）
- ❌ 运行时 API 请求（数据全量预内置）
- ❌ 社交分享 Open Graph 动态 meta（SPA 限制）
- ❌ 用户登录/收藏功能
- ❌ 搜索功能（20个角色，分类筛选已足够）
- ❌ 评论/反馈系统

---

## 10. 验收标准

- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] 所有 20 个角色有完整中英文数据
- [ ] 手机/平板/桌面布局正确（4列/2列/1列）
- [ ] 双语切换无刷新生效，刷新后保持语言偏好
- [ ] 每个角色详情页 URL 可直接访问（如 `/roles/qa`）
- [ ] 不存在的 role id 显示 404 视图
- [ ] 卡片双层交互：展开摘要 + 跳转详情页
- [ ] 汉堡菜单在平板/手机正常展开收起
- [ ] Vercel 部署成功，域名可访问
