import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import card1Img from "figma:asset/b296f3afe89d1d05fc74a1591eaa36470b560ba9.png";

/* ─── images ─── */
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1770843307959-d6004ae9f57c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwb2NlYW4lMjBza3klMjBsYW5kc2NhcGUlMjBzZXJlbmV8ZW58MXx8fHwxNzcyNTE1NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1683041133891-613b76cbebc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwc2t5JTIwbW91bnRhaW4lMjBzZXJlbmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcyNTIzOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1751563696363-abb675273f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwb2NlYW4lMjBob3Jpem9uJTIwc3Vuc2V0JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzcyNTIzOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];
const CARD1_IMG = card1Img;
const CARD2_IMG = "https://images.unsplash.com/photo-1545508494-791bd389831e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMGJvb2slMjBzaGFkb3clMjBsaWdodCUyMG1vb2R5JTIwbm8lMjBwZW9wbGV8ZW58MXx8fHwxNzcyNjI1MDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CARD3_IMG = "https://images.unsplash.com/photo-1558418294-9da149757efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhciUyMGJsdWUlMjBza3klMjBtaW5pbWFsfGVufDF8fHx8MTc3MjYyNDk3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CHURCH_BG = "https://images.unsplash.com/photo-1764714648804-bc8efdaafb1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwY2h1cmNoJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MjUxNTUzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1642761589121-ec47d4c425ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGxpbmVuJTIwdGV4dHVyZSUyMHdhcm0lMjBuZXV0cmFsfGVufDF8fHx8MTc3MjYyNzQxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1579721333096-145ed9596b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwYmVpZ2UlMjBjb2ZmZWUlMjBjZXJhbWljJTIwbW9ybmluZ3xlbnwxfHx8fDE3NzI2Mjc0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1763888476830-75c71621c0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGNyZWFtJTIwY2FuZGxlJTIwY296eSUyMHdhcm0lMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcyNjI3NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1755375119513-de3f0c769db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwbmV1dHJhbCUyMHdvb2QlMjB0YWJsZSUyMG1vcm5pbmclMjBsaWdodxlbnwxfHx8fDE3NzI2Mjc0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1677568554453-ae5baf28da6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmVpZ2UlMjBpbnRlcmlvciUyMGNvenklMjBtaW5pbWFsJTIwcm9vbXxlbnwxfHx8fDE3NzI2Mjc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1634393653736-98a63fb73742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmVpZ2UlMjBjb3R0b24lMjBmYWJyaWMlMjBjbG90aCUyMG1pbmltYWx8ZW58MXx8fHwxNzcyNjI3NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

/* ─── SVG Icons ─── */
const LeafLogo = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2C7 2 3 6 3 11c0 4 2 7 4 8.5C8 20 10 20 11 20c1 0 3 0 4-0.5 2-1.5 4-4.5 4-8.5C19 6 15 2 11 2z" fill="#2eb872"/>
    <path d="M11 5v13M7 9c2 1 4 2 7 5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <line x1="1" y1="1" x2="21" y2="1"/>
    <line x1="1" y1="8" x2="21" y2="8"/>
    <line x1="1" y1="15" x2="21" y2="15"/>
  </svg>
);

/* Welcome icons */
const IconVisionShare = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 8v27M15 20h13" />
    <path d="M15.5 14l-3-3M27.5 14l3-3" />
    <path d="M15.5 28.5l-3 3M27.5 28.5l3 3" />
    <path d="M10.5 21.5l-3 0M35.5 21.5l-3 0" />
  </svg>
);
const IconGreeting = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="12" width="29" height="20" rx="1.5" />
    <path d="M7 14l14.5 11L36 14" />
  </svg>
);
const IconBible = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="6" width="23" height="31" rx="2" />
    <path d="M10 31h23" />
    <path d="M21.5 12v12M17.5 18h8" />
  </svg>
);
const IconServe = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="17" cy="14" r="5" />
    <path d="M7 36c0-6 4-10 10-10s10 4 10 10" />
    <path d="M32 16c-1.5-1.5-3.5-1.5-5 0-1.5 1.5-1.5 3.5 0 5l5 5 5-5c1.5-1.5 1.5-3.5 0-5-1.5-1.5-3.5-1.5-5 0z" />
  </svg>
);
const IconPin = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 6C16 6 12 10.5 12 16c0 8 9.5 19 9.5 19S31 24 31 16c0-5.5-4-10-9.5-10z" />
    <circle cx="21.5" cy="16" r="3.5" />
  </svg>
);

/* Church school icons */
const IconSchoolHouse = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
    <path d="M24 6L8 18v20h32V18L24 6z"/>
    <rect x="19" y="26" width="10" height="12"/>
    <path d="M24 12v6M21 15h6"/>
  </svg>
);
const IconSchoolEvent = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
    <circle cx="24" cy="24" r="14"/>
    <circle cx="24" cy="16" r="2.5"/>
    <circle cx="17" cy="28" r="2.5"/>
    <circle cx="31" cy="28" r="2.5"/>
    <circle cx="24" cy="24" r="1.5"/>
  </svg>
);
const IconTeacherEdu = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
    <circle cx="18" cy="14" r="5"/>
    <circle cx="32" cy="14" r="5"/>
    <path d="M8 36c0-6 4-10 10-10s10 4 10 10"/>
    <path d="M22 36c0-6 4-10 10-10s10 4 10 10"/>
    <path d="M25 6v8M23 8h4"/>
  </svg>
);
const IconBaby = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
    <circle cx="24" cy="13" r="6"/>
    <path d="M14 38c0-7 4-12 10-12s10 5 10 12"/>
    <path d="M18 22c-2 1-4 3-4 6M30 22c2 1 4 3 4 6"/>
    <path d="M20 13h-2M28 13h2"/>
  </svg>
);
const IconAward = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
    <circle cx="24" cy="18" r="10"/>
    <path d="M24 8l2.5 5 5.5.8-4 3.9.9 5.5L24 21l-4.9 2.6.9-5.5-4-3.9 5.5-.8z"/>
    <path d="M17 26l-3 12 10-4 10 4-3-12"/>
  </svg>
);
const IconYouth = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
    <circle cx="24" cy="12" r="5"/>
    <path d="M24 17v14M18 24h12M18 38l6-7 6 7"/>
  </svg>
);
const IconFlame = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
    <path d="M24 6c0 8-8 12-8 20a8 8 0 0016 0c0-4-3-7-3-12-2 3-3 5-3 8a4 4 0 01-8 0c0-5 6-9 6-16z"/>
  </svg>
);

/* Arrow icon for cards */
const ArrowIcon = ({ color = "white" }: { color?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 11L11 1M11 1H3M11 1v8"/>
  </svg>
);

/* ─── FadeUp Component ─── */
function FadeUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Gallery Carousel ─── */
const GALLERY_GAP = 20;
const N = GALLERY_IMAGES.length; // 6
const GALLERY_SLIDES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES]; // 18

function getVisibleCount(width: number) {
  if (width < 640) return 2;
  if (width < 900) return 3;
  return 5;
}

function GalleryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [idx, setIdx] = useState(N); // start at copy1 index=6
  const [anim, setAnim] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef(0);
  const autoplayEnabled = useRef(true);

  /* measure slide width + responsive visible count */
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth;
    const vc = getVisibleCount(cw);
    setVisibleCount(vc);
    const gap = cw < 480 ? 10 : GALLERY_GAP;
    setSlideW((cw - gap * (vc - 1)) / vc);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* responsive gap */
  const gap = (containerRef.current?.clientWidth ?? 1000) < 480 ? 10 : GALLERY_GAP;

  /* translateX calculation */
  const translateX = idx * (slideW + gap) - dragOffset;

  /* responsive image height */
  const imgHeight = visibleCount <= 2 ? 200 : 260;

  /* autoplay */
  useEffect(() => {
    const timer = setInterval(() => {
      if (autoplayEnabled.current) {
        setAnim(true);
        setIdx((p) => p + 1);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* infinite loop jump */
  const handleTransitionEnd = useCallback(() => {
    if (idx >= N * 2) {
      setAnim(false);
      setIdx((prev) => prev - N);
    } else if (idx < N) {
      setAnim(false);
      setIdx((prev) => prev + N);
    }
  }, [idx]);

  /* after jump (anim=false), wait 2 RAF then re-enable animation */
  useEffect(() => {
    if (!anim) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnim(true);
        });
      });
    }
  }, [anim]);

  /* slide helpers */
  const slideNext = useCallback(() => { setAnim(true); setIdx((p) => p + 1); }, []);
  const slidePrev = useCallback(() => { setAnim(true); setIdx((p) => p - 1); }, []);

  /* mouse drag */
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    autoplayEnabled.current = false;
    setAnim(false);
    dragStartX.current = e.clientX;
    setDragOffset(0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  };
  const finishDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    autoplayEnabled.current = true;
    const threshold = slideW * 0.3;
    if (dragOffset < -threshold) {
      setAnim(true);
      setIdx((p) => p + 1);
    } else if (dragOffset > threshold) {
      setAnim(true);
      setIdx((p) => p - 1);
    } else {
      setAnim(true); // snap back
    }
    setDragOffset(0);
  }, [isDragging, dragOffset, slideW]);

  /* touch drag (mobile) */
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    autoplayEnabled.current = false;
    setAnim(false);
    dragStartX.current = e.touches[0].clientX;
    setDragOffset(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - dragStartX.current);
  };
  const onTouchEnd = finishDrag;

  const activeDot = ((idx % N) + N) % N;

  const onDotClick = (i: number) => {
    setAnim(true);
    setIdx(N + i); // copy1 position
  };

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <FadeUp>
        <h2 style={{ fontSize: "1.77rem", fontWeight: 700, fontStyle: "italic", color: "#222", textAlign: "center", marginBottom: 32 }}>
          gallery
        </h2>
      </FadeUp>

      {/* Full-width carousel container */}
      <div
        ref={containerRef}
        style={{ overflow: "hidden", width: "100%", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", touchAction: "pan-y", padding: visibleCount <= 2 ? "0 16px" : 0 }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={finishDrag}
        onMouseLeave={finishDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: "flex",
            gap: gap,
            transform: `translateX(-${translateX}px)`,
            transition: anim ? "transform 0.5s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {GALLERY_SLIDES.map((src, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: slideW,
                height: imgHeight,
              }}
            >
              <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>

      {/* controls — arrows at far left/right, dots centered */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, padding: "0 16px" }}>
        {/* left arrow */}
        <button onClick={slidePrev} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
          <svg style={{ width: visibleCount <= 2 ? 60 : 160, height: 20 }} viewBox="0 0 160 20" fill="none" preserveAspectRatio="xMinYMid meet">
            <line x1="160" y1="10" x2="4" y2="10" stroke="#bbb" strokeWidth="1.2"/>
            <polyline points="12,3 4,10 12,17" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {Array.from({ length: N }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              style={{
                width: i === activeDot ? 20 : 8,
                height: 8,
                borderRadius: 0,
                background: i === activeDot ? "#666" : "#ccc",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* right arrow */}
        <button onClick={slideNext} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
          <svg style={{ width: visibleCount <= 2 ? 60 : 160, height: 20 }} viewBox="0 0 160 20" fill="none" preserveAspectRatio="xMaxYMid meet">
            <line x1="0" y1="10" x2="156" y2="10" stroke="#bbb" strokeWidth="1.2"/>
            <polyline points="148,3 156,10 148,17" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════ MAIN APP ═══════════ */
export default function App() {
  /* Hero slider */
  const [heroIdx, setHeroIdx] = useState(0);
  const [hoveredSchoolCard, setHoveredSchoolCard] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((p) => (p + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const FONT = "'Noto Sans KR', sans-serif";
  const NAV = ["교회소개", "말씀과 찬양", "다음 세대와 청년", "양육과 훈련", "목양과 복음", "소통과 행정"];

  const welcomeCards = [
    { icon: <IconVisionShare />, label: "비전 나눔" },
    { icon: <IconGreeting />, label: "인사말씀" },
    { icon: <IconBible />, label: "예배안내" },
    { icon: <IconServe />, label: "교회섬김" },
    { icon: <IconPin />, label: "오시는 길" },
  ];

  const churchSchoolCards = [
    { icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
      {/* sprout */}
      <path d="M24 40V24" />
      <path d="M24 24c0 0-1-10 -10-12 0 8 4 12 10 12z" />
      <path d="M24 28c0 0 1-8 9-10 0 7-3 11-9 10z" />
      <path d="M24 40c0 0-4 0-6 0" />
    </svg>, title: "유아부", desc: "말씀 안에 쑥쑥\n자라나는 유아부" },
    { icon: <IconAward />, title: "어와나소년부", desc: "하나님의 일꾼으로\n성장하는 어와나소년부" },
    { icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scale(1.3)" }}>
      {/* tree - single unified path */}
      <path d="M24,7 L35,24 L30,24 L39,36 L27,36 L27,43 L21,43 L21,36 L9,36 L18,24 L13,24 Z" />
    </svg>, title: "청소년부", desc: "신앙을 바탕으로 성장하며\n하나님과 관계를 깊이 맺는 청소년부" },
    { icon: <IconFlame />, title: "청년부", desc: "빛과 소금으로\n살아가려 힘쓰는 청년부" },
  ];

  return (
    <div style={{ fontFamily: FONT, overflowX: "hidden" }}>
      {/* ━━━ HEADER ━━━ */}
      <header
        className="fixed top-0 left-0 w-full z-50"
        style={{ background: "rgba(30,40,60,0.5)", height: 76 }}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center gap-2">
            <LeafLogo />
            <span style={{ color: "white", fontSize: "1.33rem", fontWeight: 500 }}>디모데교회</span>
          </div>
          {/* nav */}
          <nav className="hidden md:flex items-center" style={{ gap: 28 }}>
            {NAV.map((n) => (
              <a key={n} href="#" style={{ color: "white", fontSize: "1.11rem", fontWeight: 400, textDecoration: "none" }}>
                {n}
              </a>
            ))}
          </nav>
          {/* hamburger */}
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* ━━━ HERO ━━━ */}
      <section
        className="relative w-full overflow-hidden h-[460px] md:h-[728px]"
      >
        {/* Crossfade background images */}
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: i === heroIdx ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
            }}
          />
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,20,60,0.35))" }} />
        {/* dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              style={{
                width: i === heroIdx ? 28 : 10,
                height: 4,
                borderRadius: 0,
                background: i === heroIdx ? "white" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </section>

      {/* ━━━ WELCOME ━━━ */}
      <section className="bg-[#F7F8F9] py-10 md:py-[56px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-8 md:gap-10">
          <FadeUp>
            <div className="text-center md:text-left">
              <div style={{ width: 32, height: 2, background: "#aaa", marginBottom: 16 }} className="mx-auto md:mx-0" />
              <h2 style={{ fontSize: "1.77rem", fontWeight: 700, fontStyle: "italic", color: "#222", marginBottom: 14 }}>
                welcome
              </h2>
              <p style={{ fontSize: "1rem", color: "#666", lineHeight: 1.7, maxWidth: 400 }}>하나님의 뜻을 이루는 교회,​대전서문교회에 오신것을 환영합니다.<br /><br /></p>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <div className="flex justify-center md:justify-end">
              <div className="grid grid-cols-2 md:inline-flex md:flex-wrap gap-3 justify-start w-fit">
                {welcomeCards.map((c) => (
                  <div
                    key={c.label}
                    className="w-[104px] h-[96px] md:w-[130px] md:h-[120px]"
                    style={{
                      border: "1px solid #ddd",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      background: "white",
                      borderRadius: 0,
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-15px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {c.icon}
                    <span style={{ fontSize: "1rem", color: "#444" }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ THREE CARDS ━━━ */}
      <section className="bg-white pt-8 pb-10 md:pt-[60px] md:pb-[70px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[30px]">
          {/* Card 1 */}
          <FadeUp delay={0}>
            <div
              className="relative overflow-hidden group/arrow h-[220px] md:h-[380px]"
              style={{
                borderRadius: 0,
                backgroundImage: `url(${CARD1_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(40,30,20,0.5), rgba(40,30,20,0.7))" }} />
              <div className="relative h-full flex flex-col justify-between p-4 md:pt-8 md:pr-7 md:pb-7 md:pl-8">
                <div>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.94rem", letterSpacing: 1 }}>주일오전예배 Sunday worship</span>
                  <h3 className="hidden md:block" style={{ color: "white", fontSize: "1.77rem", fontWeight: 700, marginTop: 12 }}>설교제목입니다.</h3>
                  <h3 className="block md:hidden" style={{ color: "white", fontSize: "1.22rem", fontWeight: 700, marginTop: 8 }}>설교제목입니다.</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.94rem", marginTop: 8 }}>시편 131:1-3 | 김용환 목사</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.94rem", marginTop: 4 }}>2026.03.08</p>
                </div>
              </div>
              <div className="absolute group-hover/arrow:-translate-y-1 group-hover/arrow:bg-[rgba(255,255,255,0.3)] transition-all duration-300 bottom-3 right-3 md:bottom-7 md:right-7 w-9 h-9 md:w-11 md:h-11" style={{ borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowIcon color="white" />
              </div>
            </div>
          </FadeUp>

          {/* Card 2 */}
          <FadeUp delay={120}>
            <div
              className="relative overflow-hidden group/arrow h-[220px] md:h-[380px]"
              style={{
                borderRadius: 0,
                backgroundImage: `url(${CARD2_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(160,100,30,0.55), rgba(160,100,30,0.75))" }} />
              <div className="relative h-full flex flex-col justify-between p-4 md:pt-8 md:pr-7 md:pb-7 md:pl-8">
                <div>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.94rem", letterSpacing: 1 }}>주일오후예배 Sunday worship</span>
                  <h3 className="hidden md:block" style={{ color: "white", fontSize: "1.77rem", fontWeight: 700, marginTop: 12 }}>설교제목입니다.</h3>
                  <h3 className="block md:hidden" style={{ color: "white", fontSize: "1.22rem", fontWeight: 700, marginTop: 8 }}>설교제목입니다.</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.94rem", marginTop: 8 }}>시편 131:1-3 | 김용환 목사</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.94rem", marginTop: 4 }}>2026.03.08</p>
                </div>
              </div>
              <div className="absolute group-hover/arrow:-translate-y-1 group-hover/arrow:bg-[rgba(255,255,255,0.3)] transition-all duration-300 bottom-3 right-3 md:bottom-7 md:right-7 w-9 h-9 md:w-11 md:h-11" style={{ borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowIcon color="white" />
              </div>
            </div>
          </FadeUp>

          {/* Card 3 */}
          <FadeUp delay={240}>
            <div
              className="relative overflow-hidden group/arrow h-[220px] md:h-[380px]"
              style={{
                borderRadius: 0,
                backgroundImage: `url(${CARD3_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(40,30,50,0.35), rgba(40,30,50,0.6))" }} />
              <div className="relative h-full flex flex-col justify-between p-4 md:pt-8 md:pr-7 md:pb-7 md:pl-8">
                <div>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.94rem", letterSpacing: 1 }}>수요예배 Wednesday worship</span>
                  <h3 className="hidden md:block" style={{ color: "white", fontSize: "1.77rem", fontWeight: 700, marginTop: 12 }}>설교 제목입니다.</h3>
                  <h3 className="block md:hidden" style={{ color: "white", fontSize: "1.22rem", fontWeight: 700, marginTop: 8 }}>설교 제목입니다.</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.94rem", marginTop: 8 }}>시편 131:1-3 | 김용환 목사</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.94rem", marginTop: 4 }}>2026.03.08</p>
                </div>
              </div>
              <div className="absolute group-hover/arrow:-translate-y-1 group-hover/arrow:bg-[rgba(255,255,255,0.3)] transition-all duration-300 bottom-3 right-3 md:bottom-7 md:right-7 w-9 h-9 md:w-11 md:h-11" style={{ borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowIcon color="white" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ CHURCH SCHOOL ━━━ */}
      <section
        className="relative py-10 md:py-[70px]"
        style={{
          backgroundImage: `url(${CHURCH_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.82)" }} />
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <FadeUp>
            <h2 style={{ color: "white", fontSize: "1.77rem", fontWeight: 700, marginBottom: 12 }}>
              빛나는 세대, 교회학교 이야기
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: 32 }}>
              다음 세대를 세우는 디모데교회의 교회학교를 소개합니다.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mx-auto" style={{ maxWidth: 1200 }}>
            {churchSchoolCards.map((c, i) => (
              <FadeUp key={c.title} delay={i * 120} style={{ height: "100%" }}>
                <div
                  onMouseEnter={() => setHoveredSchoolCard(i)}
                  onMouseLeave={() => setHoveredSchoolCard(null)}
                  className="p-5 md:p-10"
                  style={{
                    background: hoveredSchoolCard === i ? "#1e3a8a" : "white",
                    borderRadius: 0,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    boxSizing: "border-box",
                    transition: "background 0.35s ease",
                    cursor: "pointer",
                  }}
                >
                  <div style={{
                    marginBottom: 12,
                    display: "flex",
                    justifyContent: "center",
                    filter: hoveredSchoolCard === i ? "brightness(0) invert(1)" : "none",
                    transition: "filter 0.35s ease",
                    transform: "scale(0.75)",
                    transformOrigin: "center",
                  }} className="md:[transform:scale(1)]">{c.icon}</div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: hoveredSchoolCard === i ? "white" : "#222", marginBottom: 6, transition: "color 0.35s ease" }} className="md:text-[1.11rem]">{c.title}</h4>
                  <p style={{ fontSize: "0.88rem", color: hoveredSchoolCard === i ? "rgba(255,255,255,0.75)" : "#777", whiteSpace: "pre-line", lineHeight: 1.6, transition: "color 0.35s ease" }} className="hidden md:block">{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ GALLERY ━━━ */}
      <section className="py-10 md:py-[60px] bg-white">
        <GalleryCarousel />
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="py-8 md:py-[40px]" style={{ background: "#333" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p style={{ color: "#aaa", fontSize: "1rem", marginBottom: 4 }}>대한예수교장로회 대전서문교회</p>
            <p style={{ color: "#aaa", fontSize: "0.94rem", marginBottom: 12 }}>김용환 담임목사</p>
            <div style={{ width: 28, height: 1, background: "#666", marginBottom: 12 }} />
            <p style={{ color: "#888", fontSize: "0.94rem", lineHeight: 1.7 }}>35002 대전 중구 산성로138번길 8<br />Tel : 042-583-9191&nbsp;&nbsp;&nbsp;Fax : 042-586-2222</p>
          </div>
          <div className="flex items-start md:items-end md:text-right">
            <div>
              <p style={{ color: "#999", fontSize: "0.94rem" }}>Copyright © 2026 대전서문교회</p>
              <p style={{ color: "#777", fontSize: "0.94rem" }}>
                All rights reserved. Designed by ㈜ 스데반정보.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}