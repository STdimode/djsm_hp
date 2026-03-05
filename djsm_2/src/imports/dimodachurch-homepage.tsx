디모데교회 홈페이지를 아래 상세 사양대로 정확히 구현해줘. 단일 페이지(SPA)이며, React + Tailwind CSS 기반이야. 폰트는 Noto Sans KR (wght 300,400,500,700)을 사용하고, fonts.css에 Google Fonts import를 추가해줘. 라우터는 사용하지 않고 App.tsx 하나에 모든 섹션을 넣어줘.

전체 구조 (위→아래 순서)

Header (고정, z-50)
Hero 슬라이더 (728px 높이)
Welcome 섹션
3 카드 섹션 (주일예배 / 교회소식 / 주보보기)
교 회학교 섹션 (배경 이미지 + 오버레이)
Gallery 캐러셀 (무한루프, 커스텀 구현)

7. ** Footer**

공
통 사항

전 체 fontFamily: "'Noto Sans KR', sans-serif"
최 대 너비 max-w-[1440px] mx-auto px-8
주 요 섹션 제목: fontSize: 32px, fontWeight: 700
** FadeUp 컴포넌트**: IntersectionObserver 기반, threshold 0.12, 스크롤 올렸다 내리면 반복 재생 (isIntersecting이 false가 되면 visible을 false로 리셋). opacity 0→1, translateY 36px→0, transition 0.7s ease. delay prop 지원.
히어로 아래 모든 섹션(Welcome, 카드, 교회학교, 갤러리)에 FadeUp 적용

이 미지는 모두 블루톤 Unsplash 이미지 사용 (unsplash_tool로 검색)
Header
position: fixed, 상단 고정, z-50
배경: rgba(30,40,60,0.85), 높이 76px

- 좌측: 녹색 나뭇잎 SVG 로고 (path로 직접 그림, fill #2eb872) + "디모데교회" 텍스트 (white, 23px, weight 500)

중 앙 네비: ["교회소개", "예배와 찬양", "다음세대", "교육과 훈련", "선교", "교제와 나눔", "온라인헌금"] — white, 20px, weight 400, gap-7, hidden md:flex
우 측: 햄버거 아이콘 (3줄 SVG, white, strokeWidth 2)
Hero Section
높이 728px, 배경 이미지 (블루톤 바다/하늘), bg-cover bg-center

오 버레이: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,20,60,0.35))
3 개 슬라이드 데이터: ["디모데 교회에 방문하신\n여러분을 환영 합니다.", "주님의 사랑 안에서\n함께 성장합니다.", "말씀과 기도로\n세워지는 공동체"]
텍스트: white, 40px, weight 700, lineHeight 1.35, whiteSpace pre-line, textShadow 0 2px 8px rgba(0,0,0,0.3)

- 텍스트와 VISION 버튼은 Welcome 섹션과 동일한 좌측 정렬 (max-w-[1440px] mx-auto px-8 안에서 좌측 배치)
VISION 버튼: border: 2px solid white, 배경 투명, white 텍스트, 13px, letterSpacing 2px, padding 8px 28px, width 120px, marginTop 28px

하 단 중앙 페이지네이션 dots: 활성=흰색 28x10px rounded-5px, 비활성=반투명 흰색 10x10 원형
3. Welcome Section
배 경 #F7F8F9, padding 60px 0 56px
좌측: 회색 bar (32x2px, #aaa) + "welcome" 제목 (32px, 700, italic, #222) + 설명 텍스트 (17px, #666)

- 우측: 5개 아이콘 카드 가로 배치 — 교회비전/교회역사/위임목사소개/예배안내/오시는길

각 카드: border: 1px solid #ddd, 130x120px, flex column center, gap 10px
아이콘 은 SVG로 직접 그림 (교회+십자가, 문서, 사람, 예배, 지도핀 형태), 43x43, stroke #555
라 벨: 19px, #444
4. Three
Cards Section

배경 white, paddingTop 60px, paddingBottom 70px
grid grid-cols-3, gap 30px
각 카드 높이 380px, relative overflow-hidden, 배경 이미지 + gradient overlay
** 카드 패딩**: top/left 32px, bottom/right 28px
카드1 (주일예배/Sermon): 어두운 블루톤 교회 이미지, overlay rgba(40,30,20,0.5)→0.7

제목 "설교제목입니다." (white, 32px, 700), 부제 "시편 131:1-3 | 김성명 목사\n2021.12.10"
카드2 (교회소식/Church News): 블루톤 자연 이미지, overlay rgba(160,100,30,0.55)→0.75
제목 "교회소식을 전합니다." (white, 32px, 700)
카드3 (주보보기/Bulletin): 블루톤 노트 이미지, 밝은 overlay rgba(220,210,190,0.2)→rgba(180,165,140,0.4)
텍스트 색상: 제목 #111, 부제 #444 (어두운 톤)

** 우측 하단 화살표 아이콘** (각 카드 bottom:28px, right:28px):
44x44px 원형 div, 테두리 없음(border 삭제 상태)
** 호버 효과**: group/arrow 패턴 사용, 호버 시 bg-white/50 반투명 흰색 원형 배경 + -translate-y-1 살짝 위로 떠오름, transition 0.3s
화 살표 SVG: 12x12 viewBox, 카드1·2는 stroke white, 카드3은 stroke #444
각 카드에 FadeUp 적용 (delay 0, 120, 240ms)
5. Church School
Section

배경: 히어로와 동일한 블루톤 이미지, backgroundSize: cover, padding 70px 0
오 버레이: rgba(50,55,70,0.82)
제목 "빛나는 세대, 교회학교 이야기" (white, 32px, 700, 중앙 정렬)
설명: rgba(255,255,255,0.7), 17px
3 개 카드 (grid-cols-3, gap-6, maxWidth 910px 중앙): 교회학교/교회학교 행사/교사 교육
흰색 배경, padding 40px 26px 34px, 중앙 정렬
아 이콘 48x48 SVG (stroke #334), scale(1.3)
제목 20px 700, 설명 16px #777
각 카드 FadeUp (delay 0, 120, 240)
6. Gallery Section
** Swiper나 라이브러리 없이 커스텀 무한 캐러셀** 구현
6 장의 블루톤 이미지, 3배로 복제해서 18장 배열 (무한루프용)
한 번에 5장 보임 (GALLERY_VISIBLE = 5), gap 20px
시 작 인덱스 = 6 (중간 복사본)
translateX로 이동, transition 0.5s ease
onTransitionEnd에서 copy2나 copy0으로 벗어나면 애니메이션 없이 copy1으로 점프 (무한루프)
** 마우스 드래그** 지원: mouseDown/Move/Up/Leave로 드래그 감지, threshold 30%
** autoplay** 3.5초 간격, 드래그 중에는 일시정지
컨트롤: 하단에 좌우 긴 화살표 SVG(160x20, stroke #bbb) + 중앙 페이지네이션 dots (활성: 20x8 pill #666, 비활성: 8x8 원형 #ccc)

이미 지 높이 260px
" gallery" 제목: 32px, 700, italic, #222, 중앙 정렬
7. Footer
배경 #111, padding 40px 0 36px
좌 측: "대한예수교장로회 디모데교회" (#aaa, 17px), "김성명 담임목사" (#aaa), 구분선(28x1px #666), 주소/연락처 (#888, 16px)
우측 : 저작권 텍스트 (#666, 16px)
SVG 아이콘 (모두 인라인 SVG로 직접 구현)

Le afLogo: 22x22, 녹색 나뭇잎 (#2eb872)
H amburgerIcon: 22x16, 3줄 (white)
Welcome 아이콘 5종: 43x43, stroke #555 (교회비전=집+십자가, 교회역사=문서, 위임목사=사람, 예배안내=성경+십자가, 오시는길=지도핀)
교 회학교 아이콘 3종: 48x48, stroke #334 (교회학교=집, 행사=원형배치, 교사교육=사람들+십자가)
기술 사양
React 단일 파일 (App.tsx)에 FadeUp, GalleryCarousel, SVG 아이콘 컴포넌트 모두 포함
useState , useEffect, useLayoutEffect, useCallback, useRef 사용
Tailwind 클래스 + inline style 혼합 사용

반 응형: 네비게이션 hidden md:flex, 햄버거는 항상 표시
