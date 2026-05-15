# MIRAI Design System — 단일 소스

> 모든 mirai-ui 페이지가 따르는 디자인 규칙. 새 페이지/컴포넌트 작업 시 이 문서를 우선 참조.

## 언어 규칙
모든 답변과 설명은 한국어로.

## 파일 구성

| 파일 | 역할 |
|---|---|
| `shared/styles.css` | 토큰 + 글로벌 (`html`, `body`, `*`) + 헤더/사이드바/바텀네비/검색 dropdown |
| `shared/components.js` | `<mirai-header>` · `<mirai-sidebar>` · `<mirai-bottom-nav>` |
| `shared/CLAUDE.md` | (본 문서) |

페이지에서 수정 시: 토큰·공통 컴포넌트는 여기, 페이지 고유 스타일은 각 페이지 인라인.

## 디자인 토큰

### Primary (Mojito)
| 변수 | 값 | 용도 |
|---|---|---|
| `--primary-normal` | `#14C391` | CTA, 강조 |
| `--primary-strong` | `#14C092` | hover |
| `--primary-heavy` | `#13BB8F` | active |

### Label (텍스트)
| 변수 | 용도 |
|---|---|
| `--label-strong` | 강조 (#fff) |
| `--label-normal` | 기본 |
| `--label-neutral` | 보조 |
| `--label-alternative` | 캡션·힌트 |
| `--label-assistive` | 플레이스홀더 |
| `--label-disable` | 비활성 |

### Background
| 변수 | 값 |
|---|---|
| `--bg-normal` | `#1B1C1E` |
| `--bg-alternative` | `#0F0F10` |
| `--bg-elevated` | `#1B1C1E` (모달·dropdown) |

### Line / Fill
`--line-normal`, `--line-neutral`, `--line-alternative`, `--fill-normal`, `--fill-strong`, `--fill-alternative` — 투명도 단계별.

### Accent
`--accent-pink` `#FA73E3` · `--accent-violet` `#7C5EF7` · `--accent-cyan` `#28D0ED` · `--accent-lime` `#6BE016` · `--accent-purple` `#D478FF` · `--accent-light-blue` `#3DC2FF` · `--accent-red-orange` `#FF7B2E`

### Status
`--status-positive` · `--status-cautionary` · `--status-negative`

### Layout (페이지별 override 가능)
`--content-max-wide` 1100px · `--content-max-narrow` 960px · `--sidebar-width` 240px · `--header-height` 60px · `--header-height-mobile` 48px · `--bottom-nav-height` 56px

## 공통 컴포넌트

### `<mirai-header>`
상단 글로벌 헤더. 데스크탑은 검색바 + 미르 + 아바타, 모바일은 햄버거 + 로고 + 미르/검색 아이콘.
검색바 focus 시 dropdown(최근 검색어 / 추천 태그 / 인기 급상승) 표시.

### `<mirai-sidebar active="...">`
데스크탑 좌측 사이드바. 모바일에서 자동 숨김.

| active 값 | 메뉴 |
|---|---|
| `home` | 홈 |
| `history` | 기록 |
| `create` | 콘텐츠 제작 |
| `image-studio` | 이미지 스튜디오 |

스토어는 헤더 미르 아이콘으로 접근.

### `<mirai-bottom-nav active="...">`
모바일 하단 네비 (탐색 / 기록 / 콘텐츠 생성 / 마이페이지). 데스크탑 숨김.

## 컴포넌트 패턴

### Card / List item
`background: var(--fill-alternative)` · `radius: 16px` · `padding: 16px` · `border-color: var(--line-alternative)`

### Button (Primary CTA)
height 48px · radius 12px · `background: linear-gradient(116deg, var(--primary-normal), var(--primary-heavy))` · `color: #fff` · `font-weight: 600` · `font-size: 16px`
무지개 그라데이션 금지 — 단방향 primary 만.

### Toast
`background: rgba(0,0,0,0.75)` · `backdrop-filter: blur(12px)` · radius 999px · 보더·섀도우 없음 · top `-60` → `64` spring easing · auto-dismiss 2.5s

### Bottom Sheet (모바일)
top radius 20px · `background: var(--bg-elevated)` · handle 40×4 `var(--fill-normal)` · **데스크탑 너비 696px 고정** (모바일 풀폭)

### Modal
중앙 다이얼로그 · radius 16px · padding 24px · dimmer `var(--material-dimmer)`

### Tab
active: `var(--primary-normal)` + underline 2px · inactive: `var(--label-alternative)`

## 반응형 브레이크포인트

| 폭 | 적용 |
|---|---|
| `≤480px` | 칩 padding 좁힘 |
| `≤768px` | 사이드바 숨김 → 1컬럼, 바텀네비 노출, mirai-header 48px |
| `≤880px` | 검색바 폭 240px, 카드 그리드 3컬럼 |
| `≤1100px` | 카드 그리드 4컬럼 |
| `>1100px` | 카드 그리드 5컬럼 |

## 금지사항

| # | 금지 | 대신 |
|---|---|---|
| 1 | 헥스 코드 직접 사용 | `var(--*)` 토큰 |
| 2 | 토큰에 없는 색상 추가 | 사용자 확인 후 토큰 추가 |
| 3 | slate-blue 계열 base 컬러 | 중성 그레이 (`--bg-normal` 등) |
| 4 | 폰트 변경 | Pretendard Variable JP 고정 |
| 5 | 사이드바 옆에 풀와이드 헤더 트릭 (`width: 100vw` + 음수 margin) | 헤더를 `.content-wrap` 안에 두기 |
| 6 | 무지개 / 다색 CTA 그라데이션 | primary 단방향만 |

## Figma 참조

- Design System: `figma.com/design/tdemkIRFUwsxyCBaHSK0sX` (3 Component 페이지)
- Play Screen: `figma.com/design/2KQOnDQY2caWGgXodTlYAt`
- Figma MCP `get_design_context` / `get_screenshot` 으로 읽기 가능

토큰·컴포넌트 스펙은 본 문서에 캐시 — 매번 Figma 호출 불필요. 새 컴포넌트 도입 시에만 node-id로 개별 호출.
