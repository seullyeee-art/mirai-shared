/* ═══════════════════════════════════════════════════════════
   MIRAI — 공통 web components
   <mirai-header></mirai-header>
   <mirai-sidebar active="home|history|create|image-studio|store"></mirai-sidebar>
   <mirai-bottom-nav active="home|history|create|mypage"></mirai-bottom-nav>

   페이지별 이미지 경로는 data-image-base 속성으로 override 가능
   ═══════════════════════════════════════════════════════════ */

/* 페이지 위치에 따라 mirai-home의 이미지/링크 베이스 경로 결정
   file://, http:// 모두 대응 — mirai-home 안이면 '.', 그 외 형제 폴더면 '../mirai-home' */
function miraiBase(el){
  const ds = el?.dataset?.imageBase;
  if (ds) return ds.replace(/\/$/, '');
  return /\/mirai-home\//.test(location.pathname) ? '.' : '../mirai-home';
}

/* 비로그인 상태 감지: ?guest=1 또는 localStorage('mirai.guest')='1' */
function isGuest(){
  try {
    const p = new URLSearchParams(location.search);
    if (p.has('guest')) {
      const v = p.get('guest') === '1';
      localStorage.setItem('mirai.guest', v ? '1' : '0');
      return v;
    }
    return localStorage.getItem('mirai.guest') === '1';
  } catch(e){ return false; }
}
/* guest 상태일 때 body에 .guest 클래스 부여 (CSS 분기용) */
(function applyGuestClass(){
  const apply = () => {
    if (isGuest()) document.body.classList.add('guest');
    else document.body.classList.remove('guest');
  };
  if (document.body) apply();
  else document.addEventListener('DOMContentLoaded', apply);
})();
function miraiHomeLink(el, file){
  return /\/mirai-home\//.test(location.pathname) ? file : `../mirai-home/${file}`;
}
function miraiStoreLink(el){
  return /\/mirai-store-v2\//.test(location.pathname) ? 'index.html' : '../mirai-store-v2/index.html';
}

function buildHeader(el){
  const base = miraiBase(el);
  const home = miraiHomeLink(el, 'index.html');
  const mypage = miraiHomeLink(el, 'mypage.html');
  const store = miraiStoreLink(el);
  return `
<header class="header">
  <div class="header-inner">
    <button class="header-sidebar-toggle" aria-label="사이드바 열기">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
    <a href="${home}" class="header-mobile-logo" aria-label="MIRAI">
      <img src="${base}/images/main/mirai-logo-horizontal.svg" alt="MIRAI">
    </a>
    <div class="header-mobile-actions" aria-label="모바일 헤더 액션">
      <a class="header-mobile-icon mir-link" href="${store}" aria-label="스토어">
        <img class="mir-icon" src="${base}/images/main/mir.png" alt="미르">
        <span class="mir-discount-badge">25%</span>
      </a>
      <button class="header-mobile-icon" aria-label="검색" onclick="document.body.classList.add('search-open'); setTimeout(() => document.querySelector('.search input')?.focus(), 50)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
    </div>
    <div class="header-trailing" aria-label="데스크탑 헤더">
      <button class="search-mobile-close" type="button" aria-label="검색 닫기" onclick="document.body.classList.remove('search-open')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="search">
        <svg class="search-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="8" cy="8" r="5.5"/>
          <line x1="16" y1="16" x2="12.5" y2="12.5"/>
        </svg>
        <input type="search" placeholder="검색어를 입력해주세요." aria-label="검색">
        <div class="search-dropdown" role="listbox">
          <!-- 최근 검색어 -->
          <div class="search-section">
            <div class="search-section-head">
              <span class="search-section-title">최근 검색어</span>
              <button class="search-section-clear" type="button">전체 삭제</button>
            </div>
            <div class="search-recent">
              <div class="search-recent-item" role="button" tabindex="0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
                <span>회귀 로맨스</span>
                <button class="search-recent-remove" type="button" aria-label="삭제">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
                </button>
              </div>
              <div class="search-recent-item" role="button" tabindex="0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
                <span>학원물</span>
                <button class="search-recent-remove" type="button" aria-label="삭제">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
                </button>
              </div>
              <div class="search-recent-item" role="button" tabindex="0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
                <span>일진</span>
                <button class="search-recent-remove" type="button" aria-label="삭제">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 추천 검색어 (태그) -->
          <div class="search-section">
            <div class="search-section-head">
              <span class="search-section-title">추천 검색어</span>
            </div>
            <div class="search-tags">
              <button class="search-tag" type="button">#회귀</button>
              <button class="search-tag" type="button">#피폐</button>
              <button class="search-tag" type="button">#먼치킨</button>
              <button class="search-tag" type="button">#로맨스 판타지</button>
              <button class="search-tag" type="button">#무협</button>
              <button class="search-tag" type="button">#아이돌</button>
              <button class="search-tag" type="button">#오피스</button>
            </div>
          </div>

          <!-- 인기 급상승 콘텐츠 -->
          <div class="search-section">
            <div class="search-section-head">
              <span class="search-section-title">🔥 인기 급상승</span>
            </div>
            <div class="search-trending">
              <a href="#" class="search-trending-item">
                <span class="search-trending-rank">1</span>
                <img src="${base}/images/main/Image.png" alt="">
                <div class="search-trending-info">
                  <div class="search-trending-name">전학 첫날, 일진과 마주쳤다</div>
                  <div class="search-trending-meta">로맨스 · 학원</div>
                </div>
              </a>
              <a href="#" class="search-trending-item">
                <span class="search-trending-rank">2</span>
                <img src="${base}/images/main/Image-1.png" alt="">
                <div class="search-trending-info">
                  <div class="search-trending-name">계약 약혼녀가 되어버린 나</div>
                  <div class="search-trending-meta">로판 · 계약</div>
                </div>
              </a>
              <a href="#" class="search-trending-item">
                <span class="search-trending-rank">3</span>
                <img src="${base}/images/main/Image-2.png" alt="">
                <div class="search-trending-info">
                  <div class="search-trending-name">강호 풍랑, 어느 편에 설 것인가</div>
                  <div class="search-trending-meta">무협</div>
                </div>
              </a>
              <a href="#" class="search-trending-item">
                <span class="search-trending-rank">4</span>
                <img src="${base}/images/main/Image-3.png" alt="">
                <div class="search-trending-info">
                  <div class="search-trending-name">아이돌 아카데미 데뷔조의 비밀</div>
                  <div class="search-trending-meta">아이돌</div>
                </div>
              </a>
              <a href="#" class="search-trending-item">
                <span class="search-trending-rank">5</span>
                <img src="${base}/images/main/Image.png" alt="">
                <div class="search-trending-info">
                  <div class="search-trending-name">보름달 밤, 늑대가 깨어났다</div>
                  <div class="search-trending-meta">판타지</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <a class="icon-btn mir-link" href="${store}" aria-label="스토어">
        <img class="mir-icon" src="${base}/images/main/mir.png" alt="미르">
        <span class="mir-discount-badge">25%</span>
      </a>
      ${isGuest() ? `
      <a href="#" class="header-login-btn" data-action="login">로그인</a>
      ` : `
      <a href="${mypage}" class="avatar" role="button" aria-label="프로필">
        <svg viewBox="0 0 36 36">
          <rect width="36" height="36" fill="#fce7f3"/>
          <circle cx="18" cy="14" r="6" fill="#f9a8d4"/>
          <ellipse cx="18" cy="32" rx="14" ry="10" fill="#f9a8d4"/>
        </svg>
      </a>
      `}
    </div>
  </div>
</header>
`;
}

const NAV_ITEMS = [
  { key: 'home', href: 'index.html', label: '탐색',
    icon: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="none"/>',
    activeIcon: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#fff" stroke="none"/>' },
  { key: 'history', href: 'history.html', label: '기록',
    icon: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    activeIcon: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="currentColor" stroke="none"/>' },
  { key: 'create', href: '#', label: '콘텐츠 생성',
    icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>' },
  { key: 'mypage', href: 'mypage.html', label: '마이페이지',
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    activeIcon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="currentColor"/><circle cx="12" cy="7" r="4" fill="currentColor"/>' },
];

function buildBottomNav(active = 'home') {
  const guest = isGuest();
  return `
<nav class="mobile-bottom-nav" aria-label="모바일 네비게이션">
${NAV_ITEMS.map(it => {
  const isActive = it.key === active;
  const iconBody = isActive && it.activeIcon ? it.activeIcon : it.icon;
  /* guest: 마이페이지 탭은 로그인 액션으로 */
  /* cross-repo 호환을 위해 mirai-home 외부에서도 절대 경로로 변환 */
  const resolvedHref = (it.href === '#') ? '#' : miraiHomeLink(null, it.href);
  const href = (guest && it.key === 'mypage') ? '#' : resolvedHref;
  const dataAttr = (guest && it.key === 'mypage') ? ' data-action="login"' : '';
  return `  <a href="${href}" class="mobile-bottom-nav-item${isActive ? ' active' : ''}" aria-label="${it.label}"${dataAttr}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconBody}</svg>
  </a>`;
}).join('\n')}
</nav>
`;
}

/* 로그인 액션 — 로그인 상태로 전환 (prototype: 즉시 토글) */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-action="login"]');
  if (btn) {
    e.preventDefault();
    try { localStorage.setItem('mirai.guest', '0'); } catch(err){}
    location.reload();
  }
});

function toggleSidebar(){
  const app = document.querySelector('.app');
  if (!app) return;
  const collapsed = app.classList.toggle('sidebar-collapsed');
  try { localStorage.setItem('mirai.sidebarCollapsed', collapsed ? '1' : '0'); } catch(e){}
}

function initSidebarToggle(){
  const app = document.querySelector('.app');
  if (!app) return;
  try {
    if (localStorage.getItem('mirai.sidebarCollapsed') === '1') {
      app.classList.add('sidebar-collapsed');
    }
  } catch(e){}
  document.addEventListener('click', e => {
    const btn = e.target.closest('.header-sidebar-toggle, .sidebar-toggle');
    if (btn) {
      e.preventDefault();
      toggleSidebar();
    }
  });
}

function initSearchDropdown(root){
  const wrap = root.querySelector('.search');
  if (!wrap) return;
  const input = wrap.querySelector('input');
  const dropdown = wrap.querySelector('.search-dropdown');
  if (!input || !dropdown) return;

  const open = () => wrap.classList.add('open');
  const close = () => wrap.classList.remove('open');

  input.addEventListener('focus', open);
  input.addEventListener('click', open);
  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { close(); input.blur(); }
  });

  // 최근 검색어 개별 삭제
  dropdown.addEventListener('click', e => {
    const remove = e.target.closest('.search-recent-remove');
    if (remove) {
      e.preventDefault();
      e.stopPropagation();
      remove.closest('.search-recent-item')?.remove();
    }
  });
}

class MiraiHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = buildHeader(this);
    initSidebarToggle();
    initSearchDropdown(this);
  }
}
customElements.define('mirai-header', MiraiHeader);

/* ═══ <mirai-sidebar> ═══ */
const SIDEBAR_NAV = [
  { key: 'home', label: '홈', href: ['mirai-home', 'index.html'],
    icon: '<path d="M3 12L12 4l9 8v8a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-8z"/>' },
  { key: 'history', label: '기록', href: ['mirai-home', 'history.html'],
    icon: '<path d="M13 3a9 9 0 1 0 8.94 10"/><polyline points="22 4 13 13 9 9"/>' },
  { key: 'create', label: '콘텐츠 제작', href: ['mirai-home', '#'],
    icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>' },
  { key: 'image-studio', label: '이미지 스튜디오', href: ['mirai-home', '#'],
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>' },
];

const SIDEBAR_CHATS = [
  { name: 'Amon Vallentis', preview: '"이건 명령이야, 도망가지 마."', time: '2분', img: 'Image.png' },
  { name: 'Luca',           preview: '너가 키운 거잖아. 책임져.',     time: '21분', img: 'Image-1.png' },
  { name: '강서준',          preview: '선배가 갑자기 너를 끌어당겼다.', time: '1시간', img: 'Image-2.png' },
  { name: 'Kael Ardent',    preview: '"넌 이제 내 거다."',           time: '3시간', img: 'Image-3.png' },
  { name: '이도현',          preview: '전학 첫날부터 일이 꼬였다.',     time: '어제', img: 'Image.png' },
  { name: 'Seraphine',      preview: '"당신의 선택을 후회하게 될 거예요."', time: '어제', img: 'Image-1.png' },
  { name: '박재희',          preview: '보름달이 떠올랐다. 그가 변했다.',   time: '2일', img: 'Image-2.png' },
  { name: 'Damien Voss',    preview: '"오늘 밤은 내 약혼녀로서 행동해."', time: '3일', img: 'Image-3.png' },
];

function resolveSidebarHref(el, target){
  const [project, file] = target;
  const path = location.pathname;
  if (file === '#') return '#';
  if (project === 'mirai-home') return miraiHomeLink(el, file);
  if (project === 'mirai-store-v2') return miraiStoreLink(el);
  return file;
}

function buildSidebar(el, active = 'home'){
  const base = miraiBase(el);
  const home = miraiHomeLink(el, 'index.html');
  const settings = miraiHomeLink(el, 'settings.html');
  const nav = SIDEBAR_NAV.map(it => {
    const isActive = it.key === active;
    const href = resolveSidebarHref(el, it.href);
    return `<a href="${href}" class="sidebar-nav-item${isActive ? ' active' : ''}" data-tooltip="${it.label}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg>
      <span>${it.label}</span>
    </a>`;
  }).join('');
  const guest = isGuest();
  const chats = guest ? `
    <div class="sidebar-chats-empty">
      <p class="sidebar-chats-empty-text">로그인 후<br>대화 기록을 확인하세요</p>
      <a href="#" class="sidebar-login-btn" data-action="login">로그인 / 회원가입</a>
    </div>
  ` : SIDEBAR_CHATS.map(c => `
    <a href="#" class="chat-item">
      <div class="chat-avatar"><img src="${base}/images/main/${c.img}" alt=""></div>
      <div class="chat-info">
        <div class="chat-name">${c.name}</div>
        <div class="chat-preview">${c.preview}</div>
      </div>
      <span class="chat-time">${c.time}</span>
    </a>`).join('');
  return `
<div class="sidebar-logo-row">
  <button class="sidebar-toggle" type="button" aria-label="사이드바 접기/펴기">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  </button>
  <a href="${home}" class="sidebar-logo">
    <img src="${base}/images/main/mirai-logo-horizontal.svg" alt="MIRAI">
  </a>
</div>
<div class="sidebar-section">${nav}</div>
<div class="sidebar-chats" aria-label="최근 대화">
  ${guest ? '' : `<a href="#" class="sidebar-chats-header" aria-label="전체 대화 보기">
    <span class="sidebar-chats-title">최근 대화</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </a>`}
  <div class="sidebar-chats-list">${chats}</div>
</div>
<div class="sidebar-footer">
  ${guest ? `` : `<a href="${settings}" class="sidebar-nav-item" data-tooltip="설정">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
    <span>설정</span>
  </a>`}
</div>
`;
}

class MiraiSidebar extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    this.className = 'sidebar';
    this.setAttribute('aria-label', '사이드바');
    this.innerHTML = buildSidebar(this, active);
  }
}
customElements.define('mirai-sidebar', MiraiSidebar);

class MiraiBottomNav extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || 'home';
    this.innerHTML = buildBottomNav(active);
  }
}
customElements.define('mirai-bottom-nav', MiraiBottomNav);
