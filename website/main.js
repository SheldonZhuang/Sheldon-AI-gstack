/* ============================================================
   Sheldon AI gstack — SPA 主逻辑
   依赖：data/roles.js（roles[], categoryMap）
   ============================================================ */

'use strict';

// ── 全局状态 ──────────────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'zh';
let activeCategory = 'all';
let statsAnimated = false;

// ── 启动 ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initNavEvents();
  render(location.pathname);
  window.addEventListener('popstate', () => render(location.pathname));
  document.addEventListener('click', handleLinkClick);
});

// ── 路由 ──────────────────────────────────────────────────────
function navigate(path) {
  history.pushState(null, '', path);
  window.scrollTo(0, 0);
  render(path);
}

function render(path) {
  const app = document.getElementById('app');
  if (path === '/' || path === '/index.html' || path === '') {
    app.innerHTML = buildHomeHTML();
    initHomeEvents();
    initCountUp();
  } else if (path.startsWith('/roles/')) {
    const id = path.replace('/roles/', '').replace(/\/$/, '');
    const role = roles.find(r => r.id === id);
    if (role) {
      app.innerHTML = buildDetailHTML(role);
      initDetailEvents(role);
    } else {
      app.innerHTML = build404HTML();
      init404Events();
    }
  } else {
    app.innerHTML = build404HTML();
    init404Events();
  }
}

// 拦截带 data-link 的 <a> 标签
function handleLinkClick(e) {
  const a = e.target.closest('[data-link]');
  if (!a) return;
  e.preventDefault();
  navigate(a.getAttribute('href'));
}

// ── 首页 HTML ─────────────────────────────────────────────────
function buildHomeHTML() {
  const catButtons = [
    { val: 'all', zh: '全部', en: 'All' },
    { val: 'planning', zh: '规划决策', en: 'Planning' },
    { val: 'design', zh: '设计创意', en: 'Design' },
    { val: 'build', zh: '构建开发', en: 'Build' },
    { val: 'review', zh: '审查安全', en: 'Review' },
    { val: 'release', zh: '发布运维', en: 'Release' }
  ];

  return `
    <!-- Hero -->
    <section class="hero">
      <p class="hero-eyebrow">
        <span class="zh">AI 虚拟工程团队</span>
        <span class="en">AI Virtual Engineering Team</span>
      </p>
      <h1 class="hero-title">
        <span class="zh">Sheldon AI 应用军团</span>
        <span class="en">Sheldon AI gstack</span>
      </h1>
      <p class="hero-subtitle">
        <span class="zh">Sheldon AI gstack</span>
        <span class="en">Your Virtual Engineering Team</span>
      </p>
      <p class="hero-desc zh">1人 = 20人团队。60天600,000+行生产代码，部分时间工作，从 AI 角色分工到并行协作，重新定义软件开发效率。</p>
      <p class="hero-desc en">1 person = 20-person team. 600,000+ lines of production code in 60 days, part-time. AI role specialization meets parallel collaboration.</p>

      <div class="hero-stats">
        <div class="hero-stat">
          <span class="hero-stat-value" data-target="100" data-suffix="x">0x</span>
          <span class="hero-stat-label zh">样板代码压缩比</span>
          <span class="hero-stat-label en">Boilerplate Compression</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-value" data-target="50" data-suffix="x">0x</span>
          <span class="hero-stat-label zh">测试写作压缩比</span>
          <span class="hero-stat-label en">Test Writing Compression</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-value" data-target="30" data-suffix="x">0x</span>
          <span class="hero-stat-label zh">功能开发压缩比</span>
          <span class="hero-stat-label en">Feature Dev Compression</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-value" data-target="600" data-suffix="K+" data-prefix="">0K+</span>
          <span class="hero-stat-label zh">60天代码行数</span>
          <span class="hero-stat-label en">Lines in 60 Days</span>
        </div>
      </div>

      <button class="btn-primary" id="exploreBtn">
        <span class="zh">探索全部角色 ↓</span>
        <span class="en">Explore All Roles ↓</span>
      </button>
    </section>

    <!-- 分类筛选栏 -->
    <div class="filter-bar" id="filterBar">
      ${catButtons.map(c => `
        <button class="filter-btn ${c.val === activeCategory ? 'active' : ''}" data-cat="${c.val}">
          <span class="zh">${c.zh}</span>
          <span class="en">${c.en}</span>
        </button>
      `).join('')}
    </div>

    <!-- 卡片网格 -->
    <section class="cards-section" id="cardsSection">
      <div class="cards-grid" id="cardsGrid">
        ${roles.map(buildCardHTML).join('')}
      </div>
    </section>

    <!-- 页脚 -->
    ${buildFooterHTML()}
  `;
}

// ── 单个角色卡片 HTML ─────────────────────────────────────────
function buildCardHTML(role) {
  const catZh = categoryMap[role.category]?.zh || role.category;
  const catEn = categoryMap[role.category]?.en || role.category;
  const descZh = role.description.zh.slice(0, 100) + (role.description.zh.length > 100 ? '…' : '');
  const descEn = role.description.en.slice(0, 120) + (role.description.en.length > 120 ? '…' : '');

  return `
    <div class="role-card" data-id="${role.id}" data-category="${role.category}">
      <div class="card-header">
        <span class="card-emoji">${role.emoji}</span>
        <span class="card-category-tag">
          <span class="zh">${catZh}</span>
          <span class="en">${catEn}</span>
        </span>
      </div>
      <div class="card-body">
        <div class="card-name">
          <span class="zh">${role.name.zh}</span>
          <span class="en">${role.name.en}</span>
        </div>
        <div class="card-command">${role.command}</div>
        <div class="card-tagline">
          <span class="zh">${role.tagline.zh}</span>
          <span class="en">${role.tagline.en}</span>
        </div>
      </div>
      <div class="card-footer">
        <button class="card-expand-btn" data-expand="${role.id}" aria-expanded="false">
          <span class="zh">展开摘要 ▾</span>
          <span class="en">Summary ▾</span>
        </button>
      </div>

      <!-- 展开区 -->
      <div class="card-expand" id="expand-${role.id}">
        <div class="card-expand-inner">
          <div class="card-expand-content">
            <div class="card-expand-desc">
              <span class="zh">${descZh}</span>
              <span class="en">${descEn}</span>
            </div>

            <div class="card-expand-triggers">
              <div class="card-expand-triggers-title">
                <span class="zh">适用场景</span>
                <span class="en">When to use</span>
              </div>
              ${role.triggers.zh.slice(0, 2).map((t, i) => `
                <div class="card-expand-trigger">
                  <span class="zh">${t}</span>
                  <span class="en">${role.triggers.en[i] || t}</span>
                </div>
              `).join('')}
            </div>

            <div class="card-compress">
              <span class="card-compress-ratio">${role.compression.ratio}</span>
              <div class="card-compress-label">
                <span class="zh">${role.compression.human} → ${role.compression.ai}</span>
                <span class="en">${role.compression.human} → ${role.compression.ai}</span>
              </div>
            </div>

            <div class="card-expand-actions">
              <button class="btn-collapse" data-collapse="${role.id}">
                <span class="zh">收起 ▴</span>
                <span class="en">Collapse ▴</span>
              </button>
              <button class="btn-detail" data-goto="/roles/${role.id}">
                <span class="zh">查看详情 →</span>
                <span class="en">Details →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── 首页事件绑定 ──────────────────────────────────────────────
function initHomeEvents() {
  // 探索按钮平滑滚动
  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      document.getElementById('filterBar')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 分类筛选
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCards();
    });
  });

  // 卡片展开/收起
  document.querySelectorAll('[data-expand]').forEach(btn => {
    btn.addEventListener('click', () => toggleExpand(btn.dataset.expand));
  });
  document.querySelectorAll('[data-collapse]').forEach(btn => {
    btn.addEventListener('click', () => toggleExpand(btn.dataset.collapse));
  });

  // 查看详情
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.goto));
  });

  // 初始化筛选状态
  if (activeCategory !== 'all') filterCards();
}

// 卡片展开/收起
function toggleExpand(id) {
  const expand = document.getElementById(`expand-${id}`);
  const btn = document.querySelector(`[data-expand="${id}"]`);
  if (!expand) return;
  const isOpen = expand.classList.contains('expanded');
  expand.classList.toggle('expanded', !isOpen);
  if (btn) btn.setAttribute('aria-expanded', String(!isOpen));
}

// 分类筛选
function filterCards() {
  const cards = document.querySelectorAll('.role-card');
  cards.forEach((card, i) => {
    const match = activeCategory === 'all' || card.dataset.category === activeCategory;
    card.classList.toggle('hidden', !match);
    if (match) {
      card.style.transitionDelay = `${i * 30}ms`;
    } else {
      card.style.transitionDelay = '0ms';
    }
  });
  // 重排：隐藏的卡片移出文档流
  setTimeout(() => {
    document.querySelectorAll('.role-card.hidden').forEach(c => {
      c.style.position = 'absolute';
      c.style.visibility = 'hidden';
    });
    document.querySelectorAll('.role-card:not(.hidden)').forEach(c => {
      c.style.position = '';
      c.style.visibility = '';
    });
  }, 350);
}

// ── 数字滚动动画 ─────────────────────────────────────────────
function initCountUp() {
  const stats = document.querySelector('.hero-stats');
  if (!stats) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('[data-target]').forEach(el => countUp(el));
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(stats);
}

function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const val = Math.round(easeOutQuart(progress) * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ── 详情页 HTML ───────────────────────────────────────────────
function buildDetailHTML(role) {
  const catZh = categoryMap[role.category]?.zh || '';
  const catEn = categoryMap[role.category]?.en || '';
  const related = role.relatedRoles
    .map(id => roles.find(r => r.id === id))
    .filter(Boolean);

  return `
    <div class="detail-view">
      <!-- 面包屑 -->
      <nav class="breadcrumb">
        <a href="/" data-link>
          <span class="zh">首页</span>
          <span class="en">Home</span>
        </a>
        <span>›</span>
        <span>
          <span class="zh">${catZh}</span>
          <span class="en">${catEn}</span>
        </span>
        <span>›</span>
        <span>
          <span class="zh">${role.name.zh}</span>
          <span class="en">${role.name.en}</span>
        </span>
      </nav>

      <!-- 标题区 -->
      <div class="detail-header">
        <span class="detail-emoji">${role.emoji}</span>
        <h1 class="detail-title">
          <span class="zh">${role.name.zh}</span>
          <span class="en">${role.name.en}</span>
        </h1>
        <div class="detail-title-en">
          <span class="zh">${role.name.en}</span>
          <span class="en">${role.name.zh}</span>
        </div>
        <div class="detail-meta">
          <button class="detail-command" id="cmdCopy" data-cmd="${role.command}">
            ${role.command}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.5 1h-6A1.5 1.5 0 003 2.5v9A1.5 1.5 0 004.5 13H5v.5A1.5 1.5 0 006.5 15h6A1.5 1.5 0 0014 13.5v-9A1.5 1.5 0 0012.5 3H12V2.5A1.5 1.5 0 0010.5 1zM4.5 2h6a.5.5 0 01.5.5V3H6.5A1.5 1.5 0 005 4.5V12h-.5a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5zm8 12h-6a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h6a.5.5 0 01.5.5v9a.5.5 0 01-.5.5z"/>
            </svg>
            <span class="copy-tooltip">
              <span class="zh">已复制！</span>
              <span class="en">Copied!</span>
            </span>
          </button>
          <span class="detail-cat-tag">
            <span class="zh">${catZh}</span>
            <span class="en">${catEn}</span>
          </span>
        </div>
      </div>

      <!-- 主体双栏 -->
      <div class="detail-body">
        <!-- 左栏 -->
        <div class="detail-main">
          <section>
            <div class="detail-section-title">
              <span class="zh">功能说明</span>
              <span class="en">What it does</span>
            </div>
            <p class="detail-desc">
              <span class="zh">${role.description.zh}</span>
              <span class="en">${role.description.en}</span>
            </p>
          </section>

          <section>
            <div class="detail-section-title">
              <span class="zh">何时使用</span>
              <span class="en">When to use</span>
            </div>
            <div class="detail-triggers">
              ${role.triggers.zh.map((t, i) => `
                <div class="detail-trigger-item">
                  <span class="zh">${t}</span>
                  <span class="en">${role.triggers.en[i] || t}</span>
                </div>
              `).join('')}
            </div>
          </section>

          <section>
            <div class="detail-section-title">
              <span class="zh">核心能力</span>
              <span class="en">Skills & Capabilities</span>
            </div>
            <div class="skills-tags">
              ${role.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
          </section>

          <section>
            <div class="detail-section-title">
              <span class="zh">使用方法</span>
              <span class="en">How to use</span>
            </div>
            <p class="detail-usage">
              <span class="zh">${role.usage.zh}</span>
              <span class="en">${role.usage.en}</span>
            </p>
          </section>
        </div>

        <!-- 右栏 -->
        <div class="detail-sidebar">
          <div class="sidebar-card">
            <div class="sidebar-card-title">
              <span class="zh">效率压缩比</span>
              <span class="en">Efficiency Ratio</span>
            </div>
            <div class="compress-stat">
              <div class="compress-ratio-big">${role.compression.ratio}</div>
              <div class="compress-ratio-label">
                <span class="zh">压缩比</span>
                <span class="en">Compression</span>
              </div>
            </div>
            <div class="compress-row">
              <span class="compress-row-label">
                <span class="zh">人类团队</span>
                <span class="en">Human Team</span>
              </span>
              <span class="compress-row-val">${role.compression.human}</span>
            </div>
            <div class="compress-row">
              <span class="compress-row-label">
                <span class="zh">AI 辅助</span>
                <span class="en">AI-Assisted</span>
              </span>
              <span class="compress-row-val">${role.compression.ai}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- GitHub 链接 -->
      <div class="detail-footer">
        <a class="detail-github-link" href="${role.githubUrl}" target="_blank" rel="noopener">
          <svg viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
              .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
              -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
              .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
              .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
              0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span class="zh">在 GitHub 查看完整 SKILL.md 文档</span>
          <span class="en">View Full SKILL.md on GitHub</span>
        </a>
      </div>

      <!-- 相关角色推荐 -->
      ${related.length > 0 ? `
        <div class="related-section">
          <h2 class="related-title">
            <span class="zh">相关角色</span>
            <span class="en">Related Roles</span>
          </h2>
          <div class="related-grid">
            ${related.map(r => `
              <div class="related-card" data-goto="/roles/${r.id}" style="cursor:pointer">
                <span class="related-card-emoji">${r.emoji}</span>
                <div class="related-card-info">
                  <div class="related-card-name">
                    <span class="zh">${r.name.zh}</span>
                    <span class="en">${r.name.en}</span>
                  </div>
                  <div class="related-card-cmd">${r.command}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

    </div>

    ${buildFooterHTML()}
  `;
}

// ── 详情页事件绑定 ────────────────────────────────────────────
function initDetailEvents(role) {
  // 命令复制
  const cmdEl = document.getElementById('cmdCopy');
  if (cmdEl) {
    cmdEl.addEventListener('click', () => {
      navigator.clipboard.writeText(cmdEl.dataset.cmd).then(() => {
        cmdEl.classList.add('copied');
        setTimeout(() => cmdEl.classList.remove('copied'), 2000);
      });
    });
  }

  // 相关角色点击
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.goto));
  });

  // 更新页面标题
  const nameZh = role.name.zh;
  document.title = `${nameZh} | Sheldon AI gstack`;
}

// ── 404 页面 ──────────────────────────────────────────────────
function build404HTML() {
  return `
    <div class="not-found-view">
      <div class="not-found-code">404</div>
      <div class="not-found-msg">
        <span class="zh">角色未找到</span>
        <span class="en">Role Not Found</span>
      </div>
      <div class="not-found-sub">
        <span class="zh">该角色不存在，请返回首页查看全部角色。</span>
        <span class="en">This role doesn't exist. Go back to explore all 20 roles.</span>
      </div>
      <button class="btn-back" id="backHome">
        <span class="zh">← 返回首页</span>
        <span class="en">← Back to Home</span>
      </button>
    </div>
    ${buildFooterHTML()}
  `;
}

function init404Events() {
  document.getElementById('backHome')?.addEventListener('click', () => navigate('/'));
}

// ── 页脚 HTML ─────────────────────────────────────────────────
function buildFooterHTML() {
  return `
    <footer class="footer">
      <p class="footer-text">
        <span class="zh">
          基于 <a href="https://github.com/garrytan/gstack" target="_blank">gstack</a> 开源项目构建，
          由 <a href="https://x.com/garrytan" target="_blank">Garry Tan</a>（Y Combinator CEO）创建。
          MIT 许可证。
        </span>
        <span class="en">
          Built on <a href="https://github.com/garrytan/gstack" target="_blank">gstack</a> open source project,
          created by <a href="https://x.com/garrytan" target="_blank">Garry Tan</a> (CEO of Y Combinator).
          MIT License.
        </span>
      </p>
    </footer>
  `;
}

// ── 双语切换 ──────────────────────────────────────────────────
function initLang() {
  document.documentElement.setAttribute('data-lang', currentLang);
  updateLangBtns();
}

function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('lang', lang);
  updateLangBtns();
}

function updateLangBtns() {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.langBtn === currentLang);
  });
}

// ── 导航事件 ──────────────────────────────────────────────────
function initNavEvents() {
  // 语言切换（支持多处按钮）
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-lang-btn]');
    if (btn) setLang(btn.dataset.langBtn);
  });

  // 汉堡菜单
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
    mobileMenu.addEventListener('click', e => {
      if (e.target === mobileMenu) {
        document.body.classList.remove('menu-open');
      }
    });
  }
}
