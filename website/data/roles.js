// Sheldon AI gstack — 20个AI角色完整数据
// 数据来源：https://github.com/garrytan/gstack

const roles = [
  // ============================================================
  // 规划决策 (planning)
  // ============================================================
  {
    id: 'plan-ceo-review',
    command: '/plan-ceo-review',
    category: 'planning',
    emoji: '🎯',
    name: { zh: 'CEO 产品审查', en: 'CEO Plan Review' },
    tagline: {
      zh: '以创始人视角重新定义产品范围，挖掘隐藏的10星级产品',
      en: 'Rethink scope like a founder — find the 10-star product hiding in your plan'
    },
    description: {
      zh: 'CEO/创始人模式计划评审。重新思考问题的本质、挑战已有假设，在扩大范围能创造更好产品时果断扩展。提供四种模式：范围扩张（大胆畅想）、选择性扩张（把守范围+精选扩展）、保持范围（最高严格度）、范围削减（削减到核心本质）。',
      en: 'CEO/founder-mode plan review. Rethink the problem, find the 10-star product, challenge premises, expand scope when it creates a better product. Four modes: SCOPE EXPANSION, SELECTIVE EXPANSION, HOLD SCOPE, SCOPE REDUCTION.'
    },
    triggers: {
      zh: ['计划是否足够有雄心？', '需要战略层面的审视', '重新思考产品方向', '准备开始执行前的最后确认'],
      en: ['Is this plan ambitious enough?', 'Strategic perspective needed', 'Rethink product direction', 'Final check before execution']
    },
    skills: ['战略思维', '产品雄心', '范围管理', '假设质疑'],
    usage: {
      zh: '运行 /plan-ceo-review，描述你的计划，AI 将以 CEO 视角挑战你的假设并找出更大的机会。',
      en: 'Run /plan-ceo-review with your plan. The AI challenges your assumptions and finds bigger opportunities as a CEO/founder.'
    },
    compression: { human: '2天', ai: '4小时', ratio: '5x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/plan-ceo-review',
    relatedRoles: ['office-hours', 'plan-eng-review', 'autoplan']
  },
  {
    id: 'plan-eng-review',
    command: '/plan-eng-review',
    category: 'planning',
    emoji: '🏗️',
    name: { zh: '工程经理架构评审', en: 'Engineering Manager Review' },
    tagline: {
      zh: '锁定架构、数据流与边界条件，在写代码前消灭设计缺陷',
      en: 'Lock architecture, data flow and edge cases — kill design flaws before you write a line of code'
    },
    description: {
      zh: '工程经理模式计划评审。全面审查架构设计、数据流图、边界情况处理、测试覆盖策略和性能考量，以交互式方式给出有明确立场的建议。在你开始写代码前，捕捉所有架构级别的问题。',
      en: 'Eng manager-mode plan review. Lock in the execution plan — architecture, data flow, diagrams, edge cases, test coverage, performance. Walks through issues interactively with opinionated recommendations.'
    },
    triggers: {
      zh: ['准备开始编码前', '架构设计需要验证', '不确定技术选型', '需要锁定执行计划'],
      en: ['Before starting to code', 'Architecture needs validation', 'Uncertain about tech choices', 'Need to lock execution plan']
    },
    skills: ['架构设计', '数据流分析', '边界条件处理', '测试策略', '性能优化'],
    usage: {
      zh: '运行 /plan-eng-review，提供你的技术计划，AI 将全面审查架构并给出有据可依的建议。',
      en: 'Run /plan-eng-review with your tech plan. The AI does a comprehensive architecture review with opinionated recommendations.'
    },
    compression: { human: '2天', ai: '4小时', ratio: '5x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/plan-eng-review',
    relatedRoles: ['plan-ceo-review', 'plan-design-review', 'review']
  },
  {
    id: 'plan-design-review',
    command: '/plan-design-review',
    category: 'planning',
    emoji: '🎨',
    name: { zh: '设计师方案评审', en: 'Design Plan Review' },
    tagline: {
      zh: '80项设计维度打分，把设计缺陷消灭在动代码之前',
      en: 'Rate 80 design dimensions 0-10, eliminate design flaws before any code is touched'
    },
    description: {
      zh: '设计师视角的计划评审，与CEO审查和工程审查交互方式相同。对每个设计维度评分0-10，解释达到10分所需的条件，然后修复计划。专用于包含UI/UX组件的方案，在实现前提升设计质量。',
      en: "Designer's eye plan review — interactive, like CEO and Eng review. Rates each design dimension 0-10, explains what makes it a 10, then fixes the plan to get there. Works in plan mode."
    },
    triggers: {
      zh: ['方案包含UI/UX组件', '设计评审前', '实现前的设计质量把关', '视觉层面有疑虑'],
      en: ['Plan has UI/UX components', 'Before design implementation', 'Design quality check', 'Visual concerns']
    },
    skills: ['设计评审', '视觉层级', '用户体验', '设计一致性', '可访问性'],
    usage: {
      zh: '运行 /plan-design-review，提供你的设计方案，AI 将用80个维度打分并给出提升建议。',
      en: 'Run /plan-design-review with your design plan. The AI rates it on 80 dimensions and suggests improvements.'
    },
    compression: { human: '1天', ai: '2小时', ratio: '5x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/plan-design-review',
    relatedRoles: ['plan-eng-review', 'design-consultation', 'design-review']
  },
  {
    id: 'autoplan',
    command: '/autoplan',
    category: 'planning',
    emoji: '⚡',
    name: { zh: '全自动规划流水线', en: 'Auto Planning Pipeline' },
    tagline: {
      zh: '一键自动串联CEO→设计→工程三轮评审，零手动决策',
      en: 'Chain CEO → Design → Eng reviews automatically — zero manual decisions required'
    },
    description: {
      zh: '自动评审流水线，按顺序执行CEO审查、设计审查、工程审查三个环节，运用6条决策原则自动处理中间决策，无需用户回答15-30个中间问题。适合希望快速获得全方位审查而不想反复互动的场景。',
      en: 'Auto-review pipeline that runs CEO, design, and eng reviews sequentially with auto-decisions using 6 decision principles — no need to answer 15-30 intermediate questions.'
    },
    triggers: {
      zh: ['希望快速完成全套评审', '没时间逐步交互', '启动新功能前的快速验证', '需要完整评审但想省时间'],
      en: ['Want fast full-suite review', 'No time for step-by-step interaction', 'Quick validation before feature start', 'Full review but time-constrained']
    },
    skills: ['自动化评审', '流水线编排', '决策引擎', '综合评估'],
    usage: {
      zh: '运行 /autoplan，描述你的计划，AI 将自动完成三轮评审并汇总结论。',
      en: 'Run /autoplan with your plan. The AI auto-completes all three review stages and delivers a consolidated verdict.'
    },
    compression: { human: '3天', ai: '30分钟', ratio: '15x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/autoplan',
    relatedRoles: ['plan-ceo-review', 'plan-eng-review', 'plan-design-review']
  },
  {
    id: 'office-hours',
    command: '/office-hours',
    category: 'planning',
    emoji: '💡',
    name: { zh: 'YC 创业诊室', en: 'YC Office Hours' },
    tagline: {
      zh: '用 YC 的六个灵魂质问，把模糊想法变成清晰产品',
      en: "Six YC forcing questions that turn a fuzzy idea into a clear product direction"
    },
    description: {
      zh: 'YC 办公时间模式，两种用法：创业模式（六个强制性问题，探测需求真实性、现状、迫切性、最小切入点、核心观察、未来适配性）；产品设计模式（设计思维头脑风暴，适用于副项目、黑客马拉松、开源项目）。',
      en: 'YC Office Hours — Startup mode: six forcing questions about demand reality, status quo, desperation, narrowest wedge, observation, and future-fit. Builder mode: design thinking brainstorming. Saves a design doc.'
    },
    triggers: {
      zh: ['有一个新想法想验证', '不确定是否值得构建', '需要头脑风暴', '开始构建前的产品对齐'],
      en: ['Have a new idea to validate', 'Unsure if worth building', 'Need to brainstorm', 'Product alignment before building']
    },
    skills: ['需求验证', '设计思维', '市场分析', '产品定义', '假设检验'],
    usage: {
      zh: '运行 /office-hours，描述你的想法，AI 将像 YC 合伙人一样追问六个关键问题，帮你看清本质。',
      en: 'Run /office-hours with your idea. The AI acts like a YC partner, drilling into six key questions to reveal the real product.'
    },
    compression: { human: '1天', ai: '3小时', ratio: '3x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/office-hours',
    relatedRoles: ['plan-ceo-review', 'design-consultation', 'autoplan']
  },

  // ============================================================
  // 设计创意 (design)
  // ============================================================
  {
    id: 'design-consultation',
    command: '/design-consultation',
    category: 'design',
    emoji: '🖌️',
    name: { zh: '设计系统咨询师', en: 'Design Consultation' },
    tagline: {
      zh: '从零构建完整设计系统：美学、排版、色彩、布局、动效，一次性搞定',
      en: 'Build a complete design system from scratch — aesthetic, typography, color, layout, motion — in one session'
    },
    description: {
      zh: '设计咨询服务。深度理解你的产品，研究市场上的设计先例，提出完整设计系统方案（包括美学基调、排版规范、颜色体系、布局原则、间距系统、动效语言），并生成实际的预览页面，最终写入 DESIGN.md。',
      en: "Design consultation that understands your product, researches the landscape, proposes a complete design system (aesthetic, typography, color, layout, spacing, motion), and generates preview pages. Writes to DESIGN.md."
    },
    triggers: {
      zh: ['新项目没有设计规范', '需要建立品牌视觉语言', '设计不一致需要统一', '从零开始的 UI 设计'],
      en: ['New project with no design system', 'Need to establish brand language', 'Inconsistent design needs unification', 'Starting UI from scratch']
    },
    skills: ['设计系统构建', '品牌设计', '排版规范', '色彩体系', '动效语言'],
    usage: {
      zh: '运行 /design-consultation，描述你的产品，AI 将调研市场并提出完整的设计系统方案。',
      en: 'Run /design-consultation, describe your product. The AI researches the landscape and proposes a complete design system.'
    },
    compression: { human: '2周', ai: '4小时', ratio: '10x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/design-consultation',
    relatedRoles: ['plan-design-review', 'design-review', 'design-shotgun']
  },
  {
    id: 'design-review',
    command: '/design-review',
    category: 'design',
    emoji: '🔍',
    name: { zh: '设计审查+修复师', en: 'Design Review & Fix' },
    tagline: {
      zh: '发现视觉错误、间距问题、AI 糊弄痕迹，然后逐一原子提交修复',
      en: 'Find visual bugs, spacing issues, AI slop patterns — then fix each one with atomic commits'
    },
    description: {
      zh: '设计师视角的 QA：发现视觉不一致、间距问题、层级混乱、AI低质量模式和卡顿交互，然后通过原子提交修复每个问题，提供修复前后的截图对比。适合上线前的设计打磨和视觉质量把关。',
      en: "Designer's eye QA: finds visual inconsistency, spacing issues, hierarchy problems, AI slop patterns, and slow interactions — then fixes them with atomic commits and before/after verification screenshots."
    },
    triggers: {
      zh: ['上线前视觉最终审查', '设计感觉不够精致', '发现了一些视觉问题', '想打磨 UI 细节'],
      en: ['Pre-launch visual review', 'Design feels unpolished', 'Noticed some visual issues', 'Want to polish UI details']
    },
    skills: ['视觉审计', '设计一致性', '界面调整', '截图对比', '原子修复'],
    usage: {
      zh: '运行 /design-review，提供网站 URL，AI 将截图审查、发现问题、原子提交修复，全程自动。',
      en: 'Run /design-review with your site URL. The AI screenshots, audits, finds issues, and atomically fixes them automatically.'
    },
    compression: { human: '2天', ai: '30分钟', ratio: '20x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/design-review',
    relatedRoles: ['design-consultation', 'qa', 'plan-design-review']
  },
  {
    id: 'design-shotgun',
    command: '/design-shotgun',
    category: 'design',
    emoji: '🎭',
    name: { zh: '多方案视觉探索者', en: 'Design Shotgun' },
    tagline: {
      zh: '同时生成多个设计变体，打开比较看板，快速找到正确方向',
      en: 'Generate multiple design variants at once, open a comparison board, find the right direction fast'
    },
    description: {
      zh: '设计散枪模式：生成多个 AI 设计变体，在浏览器中打开对比看板，收集结构化反馈，迭代独立的设计探索方向。适合在视觉方向上有分歧时，快速找到用户真正喜欢的设计风格。',
      en: 'Design shotgun: generate multiple AI design variants, open a comparison board, collect structured feedback, and iterate on standalone design exploration.'
    },
    triggers: {
      zh: ['对设计方向有不确定', '想看多个视觉方案', '现有设计需要大改', '快速视觉原型验证'],
      en: ['Uncertain about design direction', 'Want to see multiple visual options', 'Existing design needs big change', 'Quick visual prototype validation']
    },
    skills: ['设计变体生成', '视觉对比', '反馈收集', '迭代设计', '风格探索'],
    usage: {
      zh: '运行 /design-shotgun，描述你的设计需求，AI 将生成多个变体并打开对比看板。',
      en: 'Run /design-shotgun with your design brief. The AI generates multiple variants and opens a comparison board.'
    },
    compression: { human: '1周', ai: '30分钟', ratio: '30x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/design-shotgun',
    relatedRoles: ['design-consultation', 'design-review', 'plan-design-review']
  },

  // ============================================================
  // 构建开发 (build)
  // ============================================================
  {
    id: 'qa',
    command: '/qa',
    category: 'build',
    emoji: '🔬',
    name: { zh: 'QA 工程师', en: 'QA Engineer' },
    tagline: {
      zh: '系统测试、发现 Bug、原子修复——每次提交独立可回滚',
      en: 'Systematically test, find bugs, and fix with atomic commits — every fix independently revertable'
    },
    description: {
      zh: '对 Web 应用进行系统性 QA 测试并自动修复发现的 Bug。测试分三个档次：快速（仅严重/高危）、标准（+中危）、全面（+外观缺陷）。每修复一个 Bug，自动生成对应回归测试并原子提交，保证每个提交独立可回滚。输出修复前后健康评分对比。',
      en: 'Systematically QA test a web application and fix bugs found. Three tiers: Quick (critical/high only), Standard (+medium), Exhaustive (+cosmetic). Each bug fix gets an atomic commit with a regression test. Produces before/after health scores.'
    },
    triggers: {
      zh: ['功能开发完成，准备测试', '用户反馈出现问题', '上线前最终验证', '询问"这个能用吗？"'],
      en: ['Feature ready for testing', 'User reports issues', 'Pre-launch verification', 'Asking "does this work?"']
    },
    skills: ['Playwright 浏览器自动化', '回归测试', '原子提交', 'Bug 根因分析'],
    usage: {
      zh: '运行 /qa，提供你的网站 URL 或描述要测试的功能区域。可指定档次：Quick/Standard/Exhaustive。',
      en: 'Run /qa, provide your site URL or describe the feature area to test. Optionally specify tier: Quick/Standard/Exhaustive.'
    },
    compression: { human: '1天', ai: '15分钟', ratio: '50x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/qa',
    relatedRoles: ['investigate', 'review', 'ship']
  },
  {
    id: 'qa-only',
    command: '/qa-only',
    category: 'build',
    emoji: '📋',
    name: { zh: 'QA 报告员', en: 'QA Reporter' },
    tagline: {
      zh: '只报告不修复——生成带截图和复现步骤的完整 Bug 报告',
      en: 'Report-only mode — complete bug report with screenshots and repro steps, no code changes'
    },
    description: {
      zh: '仅报告模式的 QA 测试。系统测试 Web 应用，生成包含健康分数、截图和详细复现步骤的结构化报告，但不修改任何代码。适合需要完整 Bug 文档但不希望 AI 直接改代码的场景。',
      en: 'Report-only QA testing. Systematically tests a web application and produces a structured report with health score, screenshots, and repro steps — but never fixes anything.'
    },
    triggers: {
      zh: ['只需要 Bug 文档，不需要修复', '团队需要 Bug 报告进行评审', '想在修复前了解全貌', '外包给人类工程师修复'],
      en: ['Need bug docs only, no fixes', 'Team needs bug report for review', 'Want full picture before fixing', 'Outsourcing fixes to human engineers']
    },
    skills: ['Web 测试', '报告生成', '截图捕获', '问题文档化', '复现步骤记录'],
    usage: {
      zh: '运行 /qa-only，提供你的网站 URL，AI 将生成完整 Bug 报告但不修改任何代码。',
      en: 'Run /qa-only with your site URL. The AI generates a comprehensive bug report without modifying any code.'
    },
    compression: { human: '4小时', ai: '10分钟', ratio: '25x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/qa-only',
    relatedRoles: ['qa', 'investigate', 'review']
  },
  {
    id: 'investigate',
    command: '/investigate',
    category: 'build',
    emoji: '🔎',
    name: { zh: '根因调试专家', en: 'Root Cause Investigator' },
    tagline: {
      zh: '铁律：没有根因就不修复。四阶段系统调试，彻底解决问题',
      en: 'Iron Law: no fixes without root cause. Four-phase systematic debugging that actually solves problems'
    },
    description: {
      zh: '系统性调试与根因分析。四个阶段：调查（收集证据）、分析（理解系统行为）、假设（提出并验证假设）、实现（修复并验证）。不允许在没有根因的情况下直接修复。避免治标不治本。',
      en: 'Systematic debugging with root cause investigation. Four phases: investigate, analyze, hypothesize, implement. Iron Law: no fixes without root cause. Prevents band-aid fixes that mask real issues.'
    },
    triggers: {
      zh: ['出现神秘 Bug，原因不明', '修复了但问题还在', '错误日志或堆栈跟踪', '昨天还好用，今天不行了'],
      en: ['Mysterious bug with unknown cause', 'Fixed it but problem persists', 'Error logs or stack traces', 'Worked yesterday, broken today']
    },
    skills: ['系统调试', '根因分析', '假设验证', '证据收集', '修复验证'],
    usage: {
      zh: '运行 /investigate，描述问题现象，AI 将通过四阶段系统调查找到根本原因后再修复。',
      en: 'Run /investigate, describe the symptom. The AI uses four-phase investigation to find the root cause before fixing.'
    },
    compression: { human: '4小时', ai: '15分钟', ratio: '20x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/investigate',
    relatedRoles: ['qa', 'review', 'benchmark']
  },
  {
    id: 'benchmark',
    command: '/benchmark',
    category: 'build',
    emoji: '📊',
    name: { zh: '性能回归工程师', en: 'Performance Benchmark' },
    tagline: {
      zh: '建立性能基线，每个 PR 都能看到 Core Web Vitals 的前后变化',
      en: 'Establish performance baselines — see Core Web Vitals before/after on every PR'
    },
    description: {
      zh: '使用浏览器守护进程进行性能回归检测。为页面加载时间、Core Web Vitals（LCP/FID/CLS）和资源包大小建立基线，在每个 PR 合并前提供前后对比数据。防止性能悄悄劣化。',
      en: 'Performance regression detection using the browse daemon. Establishes baselines for page load times, Core Web Vitals, and resource sizes. Compares before/after on every PR to prevent silent performance degradation.'
    },
    triggers: {
      zh: ['性能测试需求', 'PR 合并前性能验证', 'Lighthouse 分数下降', '页面加载变慢'],
      en: ['Performance testing needed', 'Pre-merge performance check', 'Lighthouse score dropped', 'Page load getting slower']
    },
    skills: ['Core Web Vitals 分析', 'Bundle 大小追踪', '性能基线建立', '回归检测', 'Lighthouse 集成'],
    usage: {
      zh: '运行 /benchmark，提供你的网站 URL，AI 将测量核心性能指标并建立基线供后续对比。',
      en: 'Run /benchmark with your site URL. The AI measures core performance metrics and establishes baselines for future comparison.'
    },
    compression: { human: '半天', ai: '10分钟', ratio: '30x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/benchmark',
    relatedRoles: ['investigate', 'canary', 'review']
  },

  // ============================================================
  // 审查安全 (review)
  // ============================================================
  {
    id: 'review',
    command: '/review',
    category: 'review',
    emoji: '👁️',
    name: { zh: '员工工程师/PR 审查', en: 'Staff Engineer PR Review' },
    tagline: {
      zh: '合并前的最后防线：SQL 安全、LLM 信任边界、条件副作用，一个不漏',
      en: 'Last line before merge: SQL safety, LLM trust boundaries, conditional side effects — nothing slips through'
    },
    description: {
      zh: '登陆前 PR 代码审查。分析与基分支的差异，专项检查 SQL 注入安全、LLM 信任边界违规、条件性副作用和其他结构性问题。明显问题自动修复，复杂问题提出建议。每次 PR 都能得到真正的代码审查。',
      en: 'Pre-landing PR review. Analyzes diff against the base branch for SQL safety, LLM trust boundary violations, conditional side effects, and other structural issues. Auto-fixes obvious problems, flags complex ones.'
    },
    triggers: {
      zh: ['准备合并 PR', '代码审查请求', '登陆前的最终检查', '检查代码差异'],
      en: ['Ready to merge PR', 'Code review requested', 'Final check before landing', 'Checking code diff']
    },
    skills: ['代码审查', 'SQL 安全检查', 'LLM 信任边界', '差异分析', '结构质量评估'],
    usage: {
      zh: '运行 /review，AI 将自动分析当前分支的差异，给出全面的代码审查意见。',
      en: 'Run /review. The AI automatically analyzes the current branch diff and delivers a comprehensive code review.'
    },
    compression: { human: '4小时', ai: '10分钟', ratio: '25x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/review',
    relatedRoles: ['qa', 'cso', 'ship']
  },
  {
    id: 'cso',
    command: '/cso',
    category: 'review',
    emoji: '🛡️',
    name: { zh: '首席安全官', en: 'Chief Security Officer' },
    tagline: {
      zh: 'OWASP Top 10 + STRIDE 威胁建模 + 密钥考古，全方位安全审计',
      en: 'OWASP Top 10 + STRIDE threat modeling + secrets archaeology — comprehensive security in one pass'
    },
    description: {
      zh: '首席安全官模式。基础设施优先的安全审计：密钥泄露排查、依赖供应链安全、CI/CD 流水线安全、LLM/AI 安全、Skill 供应链扫描，加上 OWASP Top 10 和 STRIDE 威胁建模，主动验证发现的问题。',
      en: 'Chief Security Officer mode. Infrastructure-first security audit: secrets archaeology, dependency supply chain, CI/CD pipeline security, LLM/AI security, plus OWASP Top 10, STRIDE threat modeling, and active verification.'
    },
    triggers: {
      zh: ['安全审计需求', '上线前安全检查', '威胁建模', 'OWASP 合规检查'],
      en: ['Security audit needed', 'Pre-launch security check', 'Threat modeling', 'OWASP compliance check']
    },
    skills: ['安全审计', 'OWASP Top 10', 'STRIDE 威胁建模', '密钥管理', '供应链安全'],
    usage: {
      zh: '运行 /cso，AI 将执行全面的安全审计，覆盖密钥、依赖、OWASP Top 10 和威胁建模。',
      en: 'Run /cso. The AI performs a comprehensive security audit covering secrets, dependencies, OWASP Top 10, and threat modeling.'
    },
    compression: { human: '3天', ai: '1小时', ratio: '20x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/cso',
    relatedRoles: ['review', 'investigate', 'ship']
  },
  {
    id: 'codex',
    command: '/codex',
    category: 'review',
    emoji: '🤖',
    name: { zh: '跨模型第二意见', en: 'Cross-Model Second Opinion' },
    tagline: {
      zh: '用 OpenAI Codex 独立复审你的代码，两个模型都同意才算真正没问题',
      en: 'Independent review from OpenAI Codex — if both models agree, you can actually trust it'
    },
    description: {
      zh: 'OpenAI Codex CLI 包装器，三种模式：代码审查（独立差异审查，带通过/失败门控）、挑战模式（对抗性破解你的代码）、咨询模式（带会话连续性的技术顾问）。独立的第二视角发现单一模型的盲点。',
      en: 'OpenAI Codex CLI wrapper — three modes: Code review (independent diff review with pass/fail gate), Challenge (adversarial mode that tries to break your code), Consult (ask codex anything with session continuity).'
    },
    triggers: {
      zh: ['想要独立的第二意见', '高风险代码需要双重验证', '单一模型审查不够充分', '跨模型验证'],
      en: ['Want independent second opinion', 'High-risk code needs double validation', 'Single-model review insufficient', 'Cross-model verification needed']
    },
    skills: ['代码审查', '对抗测试', '安全分析', '技术咨询', '跨模型验证'],
    usage: {
      zh: '运行 /codex review 进行代码审查，/codex challenge 进行对抗测试，/codex consult 进行咨询。',
      en: 'Run /codex review for code review, /codex challenge for adversarial testing, /codex consult for consultation.'
    },
    compression: { human: '2小时', ai: '5分钟', ratio: '25x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/codex',
    relatedRoles: ['review', 'cso', 'plan-eng-review']
  },

  // ============================================================
  // 发布运维 (release)
  // ============================================================
  {
    id: 'ship',
    command: '/ship',
    category: 'release',
    emoji: '🚀',
    name: { zh: '发布工程师', en: 'Release Engineer' },
    tagline: {
      zh: '同步主分支→跑测试→审查差异→升版本→更新日志→提交→推送→创建 PR，一键完成',
      en: 'Sync → test → review → bump version → update changelog → commit → push → create PR, all in one command'
    },
    description: {
      zh: '完整的发布工作流：检测并合并基分支，运行测试套件，审查代码差异，提升 VERSION，更新 CHANGELOG，原子提交，推送，创建 PR。如果仓库没有测试框架，自动搭建 Jest/Vitest/Playwright 并生成初始测试套件。',
      en: 'Ship workflow: detect + merge base branch, run tests, review diff, bump VERSION, update CHANGELOG, commit, push, create PR. If no test framework exists, auto-scaffolds one with initial test suite.'
    },
    triggers: {
      zh: ['代码准备好了', '要创建 PR', '想部署到主分支', '开发完毕，该发布了'],
      en: ['Code is ready', 'Want to create PR', 'Time to deploy to main', 'Development done, time to ship']
    },
    skills: ['PR 创建', '版本管理', 'CHANGELOG 更新', '测试运行', '分支合并'],
    usage: {
      zh: '运行 /ship，AI 将自动完成从版本提升到 PR 创建的全套发布流程。',
      en: 'Run /ship. The AI automatically handles everything from version bump to PR creation.'
    },
    compression: { human: '2小时', ai: '5分钟', ratio: '25x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/ship',
    relatedRoles: ['review', 'qa', 'land-and-deploy']
  },
  {
    id: 'land-and-deploy',
    command: '/land-and-deploy',
    category: 'release',
    emoji: '🛬',
    name: { zh: '部署工程师', en: 'Land & Deploy' },
    tagline: {
      zh: '合并 PR→等待 CI→等待部署→金丝雀验证，全程自动监控不离开',
      en: 'Merge PR → wait for CI → wait for deploy → canary verify — watches the whole pipeline so you don\'t have to'
    },
    description: {
      zh: '登陆和部署工作流。合并 PR，等待 CI 流水线通过，等待部署完成，通过金丝雀检查验证生产环境健康状况。是 /ship 命令之后的自然延续，将代码真正送上生产环境。',
      en: 'Land and deploy workflow. Merges the PR, waits for CI and deploy, verifies production health via canary checks. The natural continuation after /ship — gets code all the way to production.'
    },
    triggers: {
      zh: ['PR 已创建，准备合并', '需要合并并部署到生产', '/ship 之后的下一步', '部署并验证生产健康'],
      en: ['PR created, ready to merge', 'Need to merge and deploy to production', 'Next step after /ship', 'Deploy and verify production health']
    },
    skills: ['PR 合并', 'CI 监控', '部署验证', '金丝雀检查', '生产监控'],
    usage: {
      zh: '在 /ship 创建 PR 后运行 /land-and-deploy，AI 将监控合并→CI→部署的全过程并验证生产环境。',
      en: 'Run /land-and-deploy after /ship creates a PR. The AI monitors the merge → CI → deploy pipeline and verifies production.'
    },
    compression: { human: '1小时', ai: '5分钟', ratio: '12x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/land-and-deploy',
    relatedRoles: ['ship', 'canary', 'review']
  },
  {
    id: 'canary',
    command: '/canary',
    category: 'release',
    emoji: '🐦',
    name: { zh: 'SRE 金丝雀监控', en: 'Canary Monitor' },
    tagline: {
      zh: '部署后持续监控控制台错误、性能回归和页面故障，出问题立刻报警',
      en: 'Post-deploy monitoring: console errors, performance regressions, page failures — alerts the moment something breaks'
    },
    description: {
      zh: '部署后金丝雀监控。使用浏览器守护进程监视生产环境应用，实时追踪控制台错误、性能回归和页面故障。与基线进行截图对比，在问题扩大前发现异常。',
      en: 'Post-deploy canary monitoring. Watches the live app for console errors, performance regressions, and page failures using the browse daemon. Screenshots comparison against baseline — catches issues before they escalate.'
    },
    triggers: {
      zh: ['刚刚部署完毕', '需要生产环境健康检查', '监控部署后的稳定性', '验证部署是否成功'],
      en: ['Just deployed', 'Need production health check', 'Monitor post-deploy stability', 'Verify deployment success']
    },
    skills: ['实时监控', '错误追踪', '截图对比', '性能基线对比', '异常告警'],
    usage: {
      zh: '运行 /canary，提供你的生产环境 URL，AI 将持续监控并在发现异常时立即报告。',
      en: 'Run /canary with your production URL. The AI continuously monitors and immediately reports any anomalies.'
    },
    compression: { human: '半天', ai: '持续', ratio: '∞' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/canary',
    relatedRoles: ['land-and-deploy', 'benchmark', 'investigate']
  },
  {
    id: 'document-release',
    command: '/document-release',
    category: 'release',
    emoji: '📝',
    name: { zh: '技术文档写手', en: 'Release Documentation' },
    tagline: {
      zh: '发布后自动同步所有文档，README、架构文档、CHANGELOG 一次性对齐',
      en: 'Post-ship doc sync: README, architecture docs, CHANGELOG — all aligned to what actually shipped'
    },
    description: {
      zh: '发布后文档更新。读取所有项目文档，交叉引用代码差异，自动更新 README、ARCHITECTURE.md、CONTRIBUTING.md、CLAUDE.md 以匹配已发布内容，并打磨 CHANGELOG 的语言风格。确保文档和代码永远同步。',
      en: 'Post-ship documentation update. Reads all project docs, cross-references the diff, updates README/ARCHITECTURE/CONTRIBUTING/CLAUDE.md to match what shipped, polishes CHANGELOG voice.'
    },
    triggers: {
      zh: ['PR 合并后更新文档', '代码与文档已经不同步', '发布后的文档维护', '更新架构文档'],
      en: ['Update docs after PR merge', 'Code and docs are out of sync', 'Post-ship doc maintenance', 'Update architecture docs']
    },
    skills: ['文档更新', 'README 维护', '架构文档', 'CHANGELOG 写作', '文档同步'],
    usage: {
      zh: '在 PR 合并后运行 /document-release，AI 将自动更新所有相关文档以反映已发布的变更。',
      en: 'Run /document-release after PR merge. The AI automatically updates all relevant docs to reflect shipped changes.'
    },
    compression: { human: '2小时', ai: '10分钟', ratio: '12x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/document-release',
    relatedRoles: ['ship', 'retro', 'review']
  },
  {
    id: 'retro',
    command: '/retro',
    category: 'release',
    emoji: '📈',
    name: { zh: '周期复盘经理', en: 'Engineering Retrospective' },
    tagline: {
      zh: '每周工程回顾：提交分析、工作模式、代码质量指标，持久记录趋势',
      en: 'Weekly engineering retrospective: commit analysis, work patterns, code quality metrics with persistent trend tracking'
    },
    description: {
      zh: '每周工程回顾。分析提交历史、工作模式和代码质量指标，具有持久历史记录和趋势追踪。团队感知：按人员分解贡献。支持全局跨项目回顾模式，帮助团队持续改进。',
      en: 'Weekly engineering retrospective. Analyzes commit history, work patterns, and code quality metrics with persistent history and trend tracking. Team-aware: breaks down per-person contributions. Supports global cross-project retro mode.'
    },
    triggers: {
      zh: ['每周末复盘', '本周我们发布了什么', '工程效率分析', '冲刺结束回顾'],
      en: ['End of week review', 'What did we ship this week', 'Engineering efficiency analysis', 'End of sprint retrospective']
    },
    skills: ['提交分析', '趋势追踪', '贡献评估', '代码质量度量', '团队反思'],
    usage: {
      zh: '运行 /retro，AI 将分析近期的提交历史，生成详细的工程回顾报告并追踪趋势。',
      en: 'Run /retro. The AI analyzes recent commit history and generates a detailed engineering retrospective with trend tracking.'
    },
    compression: { human: '2小时', ai: '5分钟', ratio: '25x' },
    githubUrl: 'https://github.com/garrytan/gstack/tree/main/retro',
    relatedRoles: ['document-release', 'benchmark', 'ship']
  }
];

// Category 映射表
const categoryMap = {
  planning: { zh: '规划决策', en: 'Planning' },
  design:   { zh: '设计创意', en: 'Design' },
  build:    { zh: '构建开发', en: 'Build' },
  review:   { zh: '审查安全', en: 'Review' },
  release:  { zh: '发布运维', en: 'Release' }
};
