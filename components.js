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
  const home = miraiHomeLink(el, 'home-revamp.html');
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
  { key: 'home', href: 'home-revamp.html', label: '탐색',
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
  { key: 'home', label: '탐색', href: ['mirai-home', 'home-revamp.html'],
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <g> <path d="M13.4999 12.0002C13.4999 12.8286 12.8283 13.5002 11.9999 13.5002C11.1715 13.5002 10.4999 12.8286 10.4999 12.0002C10.4999 11.1718 11.1715 10.5002 11.9999 10.5002C12.8283 10.5002 13.4999 11.1718 13.4999 12.0002Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.1001 11.9996C2.1001 6.53199 6.53247 2.09961 12.0001 2.09961C17.4677 2.09961 21.9001 6.53199 21.9001 11.9996C21.9001 17.4672 17.4677 21.8996 12.0001 21.8996C6.53247 21.8996 2.1001 17.4672 2.1001 11.9996ZM9.90921 9.67656C9.82093 9.74255 9.7426 9.82088 9.67662 9.90915C9.59558 10.0176 9.54316 10.1373 9.53001 10.1674L9.52753 10.173L7.36833 14.9232C7.30989 15.0516 7.24411 15.1962 7.20011 15.3205L7.19889 15.3239C7.16411 15.422 7.05438 15.7316 7.16226 16.0796C7.27452 16.4417 7.55806 16.7253 7.92021 16.8375C8.26823 16.9454 8.57775 16.8357 8.67588 16.8009L8.67932 16.7997C8.80355 16.7557 8.94812 16.6899 9.07658 16.6315L13.8268 14.4723L13.8324 14.4698C13.8624 14.4566 13.9822 14.4042 14.0906 14.3232C14.1789 14.2572 14.2572 14.1788 14.3232 14.0906C14.4043 13.9822 14.4567 13.8624 14.4698 13.8323L14.4723 13.8267L16.6315 9.07659C16.6899 8.94813 16.7557 8.80353 16.7997 8.6793L16.8009 8.67586C16.8357 8.57773 16.9454 8.26821 16.8375 7.92019C16.7253 7.55805 16.4417 7.2745 16.0796 7.16225C15.7316 7.05437 15.4221 7.16409 15.3239 7.19888L15.3205 7.2001C15.1962 7.24409 15.0517 7.30987 14.9232 7.36831L10.1731 9.52747L10.1674 9.52996C10.1374 9.5431 10.0176 9.59552 9.90921 9.67656Z" fill="currentColor"/> </g> </g> </svg>` },
  { key: 'create', label: '만들기', href: ['mirai-home', '#'],
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <g> <path d="M12.8999 7.9999C12.8999 7.50285 12.497 7.0999 11.9999 7.0999C11.5029 7.0999 11.0999 7.50285 11.0999 7.9999V11.0999H7.99996C7.5029 11.0999 7.09996 11.5028 7.09996 11.9999C7.09996 12.497 7.5029 12.8999 7.99996 12.8999H11.0999V15.9999C11.0999 16.497 11.5029 16.8999 11.9999 16.8999C12.497 16.8999 12.8999 16.497 12.8999 15.9999V12.8999H15.9999C16.497 12.8999 16.8999 12.497 16.8999 11.9999C16.8999 11.5028 16.497 11.0999 15.9999 11.0999H12.8999V7.9999Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 2.1C6.53231 2.1 2.09995 6.53238 2.09995 12C2.09995 17.4676 6.53231 21.9 11.9999 21.9C17.4675 21.9 21.8999 17.4676 21.8999 12C21.8999 6.53238 17.4675 2.1 11.9999 2.1ZM3.89994 12C3.89994 7.52649 7.52642 3.9 11.9999 3.9C16.4734 3.9 20.0999 7.52649 20.0999 12C20.0999 16.4735 16.4734 20.1 11.9999 20.1C7.52642 20.1 3.89994 16.4735 3.89994 12Z" fill="currentColor"/> </g> </g> </svg>` },
  { key: 'history', label: '대화 목록', href: ['mirai-home', 'history.html'],
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <path d="M12.0001 2.35003C6.67059 2.35003 2.35015 6.67048 2.35015 12C2.35015 17.3296 6.67059 21.65 12.0001 21.65C13.5385 21.65 14.9948 21.2894 16.2873 20.6476L18.0997 21.1419C18.5099 21.2538 18.8757 21.3536 19.1763 21.4067C19.4809 21.4604 19.8669 21.4971 20.2526 21.3498C20.7579 21.1569 21.157 20.7578 21.3499 20.2525C21.4971 19.8669 21.4605 19.4808 21.4067 19.1762C21.3536 18.8757 21.2538 18.5098 21.142 18.0997L20.6476 16.2872C21.2895 14.9948 21.6501 13.5384 21.6501 12C21.6501 6.67048 17.3296 2.35003 12.0001 2.35003Z" fill="currentColor"/> </g> </svg>` },
  /* 충전소(store) 메뉴 — 일단 숨김(주석처리)
  { key: 'store', label: '충전소', href: ['mirai-store-v2', '#'],
    icon: `<svg viewBox="0 0 20.7063 19.723" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <path d="M17.524 10.766C17.689 10.766 17.851 10.755 18.01 10.733C18.275 10.697 18.521 10.622 18.753 10.527C18.901 10.466 19.031 10.379 19.164 10.298C19.243 10.25 19.328 10.209 19.401 10.155C19.516 10.069 19.616 9.966 19.718 9.866C19.792 9.793 19.868 9.722 19.934 9.642C20.019 9.539 20.092 9.428 20.164 9.315C20.226 9.217 20.286 9.119 20.338 9.015C20.394 8.904 20.442 8.789 20.486 8.672C20.531 8.551 20.568 8.428 20.599 8.302C20.627 8.19 20.653 8.077 20.67 7.962C20.691 7.819 20.697 7.675 20.701 7.529C20.704 7.423 20.71 7.318 20.703 7.211C20.691 7.044 20.658 6.877 20.621 6.711C20.602 6.624 20.594 6.537 20.568 6.451C20.492 6.201 20.392 5.955 20.255 5.719C20.255 5.719 20.255 5.716 20.253 5.715L17.22 0.518C17.126 0.358 16.994 0.228 16.838 0.139C16.76 0.0939999 16.677 0.06 16.589 0.036C16.502 0.013 16.411 0 16.318 0H4.38804C4.29504 0 4.20404 0.012 4.11704 0.036C4.03004 0.059 3.94604 0.0939999 3.86804 0.139C3.71204 0.228 3.58004 0.358 3.48604 0.518L0.453042 5.715C0.453042 5.715 0.453042 5.718 0.451042 5.719C0.314042 5.955 0.213042 6.201 0.138042 6.451C0.112042 6.537 0.104042 6.624 0.0850417 6.711C0.0490417 6.877 0.0150418 7.044 0.00304182 7.211C-0.00395818 7.317 0.00304179 7.423 0.00504179 7.529C0.00804179 7.674 0.0150418 7.819 0.0360418 7.962C0.0530418 8.077 0.0790418 8.19 0.107042 8.302C0.138042 8.428 0.175042 8.551 0.220042 8.672C0.264042 8.789 0.312042 8.904 0.368042 9.015C0.420042 9.119 0.480042 9.217 0.542042 9.315C0.614042 9.428 0.687042 9.539 0.772042 9.642C0.838042 9.722 0.914042 9.792 0.988042 9.866C1.09004 9.967 1.19004 10.069 1.30504 10.155C1.37904 10.21 1.46304 10.25 1.54204 10.298C1.67504 10.38 1.80504 10.466 1.95304 10.527C2.18504 10.622 2.43004 10.697 2.69604 10.733C2.85504 10.755 3.01704 10.766 3.18204 10.766C4.73404 10.766 6.04504 9.776 6.54404 8.396C6.59004 8.269 6.63904 8.143 6.67104 8.009C6.68404 7.954 6.72604 7.926 6.76704 7.926C6.80804 7.926 6.85004 7.954 6.86304 8.009C7.23704 9.589 8.65704 10.765 10.352 10.765C12.047 10.765 13.467 9.589 13.841 8.009C13.854 7.954 13.896 7.926 13.937 7.926C13.978 7.926 14.02 7.954 14.033 8.009C14.407 9.589 15.827 10.765 17.522 10.765L17.524 10.766Z" fill="currentColor"/> <path d="M18.22 12.273C17.991 12.304 17.757 12.32 17.525 12.32C16.142 12.32 14.872 11.778 13.94 10.871C13.008 11.777 11.737 12.32 10.355 12.32C8.97304 12.32 7.70204 11.778 6.77004 10.871C5.83804 11.777 4.56704 12.32 3.18504 12.32C2.95304 12.32 2.71904 12.304 2.49004 12.273C2.30804 12.248 2.13104 12.212 1.95604 12.167V17.741C1.95604 18.784 2.89504 19.723 3.93804 19.723H7.82004V16.271C7.82004 15.645 8.34204 15.228 8.86304 15.228H11.845C12.471 15.228 12.888 15.75 12.888 16.271V19.723H16.77C17.813 19.723 18.752 18.784 18.752 17.741V12.167C18.578 12.212 18.4 12.248 18.218 12.273H18.22Z" fill="currentColor"/> </g> </svg>` },
  */
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
  const home = miraiHomeLink(el, 'home-revamp.html');
  const settings = miraiHomeLink(el, 'settings.html');
  const history = miraiHomeLink(el, 'history.html');
  const imageStudio = miraiHomeLink(el, '#');
  const subscribe = miraiHomeLink(el, '#');
  const nav = SIDEBAR_NAV.map(it => {
    const isActive = it.key === active;
    const href = resolveSidebarHref(el, it.href);
    return `<a href="${href}" class="sidebar-nav-item${isActive ? ' active' : ''}" data-tooltip="${it.label}">
      ${it.icon}
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
<div class="sidebar-section">${nav}
<a href="${imageStudio}" class="sidebar-nav-item sidebar-mimg" data-tooltip="이미지 스튜디오">
  <span class="sidebar-mimg-mark"><svg viewBox="0 0 19.7744 18.5557" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="Subtract" d="M4.9043 0C5.25755 6.82331e-05 5.52256 0.09767 5.69922 0.291992C5.87584 0.486289 5.99095 0.627489 6.04395 0.71582L8.85547 5.37012L7.57617 9.20508C7.56506 9.23819 7.54614 9.26823 7.52148 9.29297C7.49664 9.31781 7.46594 9.33652 7.43262 9.34766L2.00977 11.1562C1.93964 11.1796 1.87818 11.2252 1.83496 11.2852C1.79206 11.3449 1.76865 11.4167 1.76855 11.4902C1.76855 11.564 1.79194 11.6364 1.83496 11.6963C1.87818 11.7563 1.93964 11.8018 2.00977 11.8252L6.22949 13.2314V17.8398C6.22949 18.0342 6.15893 18.2024 6.01758 18.3438C5.87622 18.4851 5.70803 18.5556 5.51367 18.5557H0.71582C0.521463 18.5557 0.353274 18.4851 0.211914 18.3438C0.0705467 18.2024 6.96424e-06 18.0342 0 17.8398V0.71582C5.17859e-06 0.52144 0.0705449 0.353284 0.211914 0.211914C0.353275 0.0705841 0.521461 0 0.71582 0H4.9043ZM19.0586 0C19.2529 0 19.4212 0.0706944 19.5625 0.211914C19.7039 0.353284 19.7744 0.52144 19.7744 0.71582V17.8398C19.7744 18.0342 19.7039 18.2024 19.5625 18.3438C19.4212 18.485 19.2529 18.5557 19.0586 18.5557H14.2607C14.0667 18.5556 13.899 18.4848 13.7578 18.3438C13.6164 18.2024 13.5459 18.0342 13.5459 17.8398V13.1201L17.4326 11.8252C17.5027 11.8018 17.5642 11.7563 17.6074 11.6963C17.6505 11.6364 17.6738 11.564 17.6738 11.4902C17.6737 11.4166 17.6503 11.3449 17.6074 11.2852C17.5642 11.2252 17.5027 11.1796 17.4326 11.1562L12.0068 9.34766C11.9738 9.3363 11.9437 9.31767 11.9189 9.29297C11.8942 9.26821 11.8747 9.23818 11.8633 9.20508L10.7031 5.72656L13.7314 0.71582C13.7845 0.627499 13.8988 0.486045 14.0752 0.291992C14.2519 0.0976018 14.5177 0 14.8711 0H19.0586Z" fill="url(#paint0_linear_0_3357)"/> <defs> <linearGradient id="paint0_linear_0_3357" x1="1.37322" y1="0.244153" x2="21.4617" y2="6.11942" gradientUnits="userSpaceOnUse"> <stop offset="0.15625" stop-color="#14C391"/> <stop offset="1" stop-color="#0FB9B1"/> </linearGradient> </defs> </svg></span>
  <span class="sidebar-mimg-text">이미지 스튜디오</span>
</a>
<a href="${subscribe}" class="sidebar-pass-banner" aria-label="패스권 구독">
  <span class="sidebar-pass-text">
    <span class="sidebar-pass-l1">패스권 구독하고</span>
    <span class="sidebar-pass-l2">미라이를 더 완벽하게</span>
  </span>
  <img class="sidebar-pass-img" src="${base}/images/sidebar/pass-banner.png" alt="">
</a>
</div>
<div class="sidebar-chats" aria-label="최근 대화">
  ${guest ? '' : `<a href="${history}" class="sidebar-chats-header" aria-label="전체 대화 보기">
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
