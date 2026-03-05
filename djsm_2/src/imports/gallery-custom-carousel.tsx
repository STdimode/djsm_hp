Gallery 캐러셀 (라이브러리 없이 커스텀 구현 — 가장 중요)
** ⚠ Swiper, react-slick, embla 등 캐러셀 라이브러리 절대 사용 금지. 순수 React + translateX로 직접 구현해.**

핵심 원리: "배열 3배 복제 + 무한루프"
원본 이미지 6장을 GALLERY_BASE 배열에 저장
GALLERY_SLIDES = [...GALLERY_BASE, ...GALLERY_BASE, ...GALLERY_BASE] → 총 18장
시작 인덱스 idx = 6 (두 번째 복사본의 첫 번째)

translateX = idx * (slideW + gap) 으로 track 전체를 이동
onTransitionEnd에서 idx가 12 이상이면 idx - 6으로, 0 미만이면 idx + 6으로 애니메이션 없이 순간이동 → 무한루프 완성

슬라이드 너비 계산 (매우 중요)

const GALLERY_GAP = 20; const GALLERY_VISIBLE = 5; // 한 번에 5장 보임 slide W = (containerWidth - GAP * (VISIBLE - 1)) / VISIBLE

-
containerRef로 갤러리 컨테이너의 clientWidth를 측정

use LayoutEffect로 mount + resize 시 재측정
** border-radius 없음, 이미지에 rounded 클래스 적용하지 말 것**
트
랙 구조

jsx

={containerRef} style={{ overflow: "hidden", width: "100%" }}>

style={{

display
: "flex",

gap
: "20px",

transform
: translateX(-${translateX}px),

transition: anim ? "transform 0.5s ease" : "none"

}}>

{GALLERY_
SLIDES.map((src, i) => (

  <div
key={i} style={{ flexShrink: 0, width: slideW, height: 260 }}>

<img src={src} style={{ width:"100%", height:"100%", objectFit:"cover" }} />

무
한루프 점프 로직

on TransitionEnd에서:

if (idx >= N*2) → setAnim(false), setIdx(idx - N)

if (idx < N) → setAnim(false), setIdx(idx + N) a nim이 false가 되면 → requestAnimationFrame 2프레임 후 setAnim(true)로 복원

마우스 드래그
mouse Down: 드래그 시작, autoplay 정지, anim false
mouse Move: dragOffset 계산
mouseUp: offset 이 slideW*0.3 이상이면 slidePrev/slideNext, 아니면 원위치
mouse Leave: mouseUp과 동일 처리
Autoplay

3.5초 간격 setInterval(slideNext)
드래그 중이면 일시정지 (autoplayEnabled state)
하
단 컨트롤

좌 우 긴 화살표: SVG 160x20, stroke #bbb, 클릭 시 slidePrev/slideNext
중앙 dots 6개: 활성 = 20x8px pill #666, 비활성 = 8x8px 원형 #ccc

- activeDot = ((idx % 6) + 6) % 6

dot 클릭 시 setIdx(6 + i) (copy1의 해당 위치로 이동)