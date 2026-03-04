document.addEventListener("DOMContentLoaded", () => {
  // ━━━ HERO SLIDER ━━━
  const heroBgs = document.querySelectorAll(".hero-bg");
  const heroDots = document.querySelectorAll(".hero-dots .dot");
  let heroIdx = 0;

  function setHeroActive(index) {
    heroIdx = index;
    heroBgs.forEach((bg, i) => {
      if (i === heroIdx) {
        bg.classList.add("active");
      } else {
        bg.classList.remove("active");
      }
    });
    heroDots.forEach((dot, i) => {
      if (i === heroIdx) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setHeroActive(parseInt(dot.dataset.index, 10));
    });
  });

  setInterval(() => {
    let nextIdx = (heroIdx + 1) % heroBgs.length;
    setHeroActive(nextIdx);
  }, 5000);

  // ━━━ FADE UP OBSERVER ━━━
  const fadeUps = document.querySelectorAll(".fade-up");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add("visible");
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  fadeUps.forEach((el) => obs.observe(el));

  // ━━━ GALLERY CAROUSEL ━━━
  const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1642761589121-ec47d4c425ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGxpbmVuJTIwdGV4dHVyZSUyMHdhcm0lMjBuZXV0cmFsfGVufDF8fHx8MTc3MjYyNzQxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1579721333096-145ed9596b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwYmVpZ2UlMjBjb2ZmZWUlMjBjZXJhbWljJTIwbW9ybmluZ3xlbnwxfHx8fDE3NzI2Mjc0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1763888476830-75c71621c0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGNyZWFtJTIwY2FuZGxlJTIwY296eSUyMHdhcm0lMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcyNjI3NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1755375119513-de3f0c769db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwbmV1dHJhbCUyMHdvb2QlMjB0YWJsZSUyMG1vcm5pbmclMjBsaWdodxlbnwxfHx8fDE3NzI2Mjc0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1677568554453-ae5baf28da6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmVpZ2UlMjBpbnRlcmlvciUyMGNvenklMjBtaW5pbWFsJTIwcm9vbXxlbnwxfHx8fDE3NzI2Mjc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1634393653736-98a63fb73742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmVpZ2UlMjBjb3R0b24lMjBmYWJyaWMlMjBjbG90aCUyMG1pbmltYWx8ZW58MXx8fHwxNzcyNjI3NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];
  const N = GALLERY_IMAGES.length;
  const GALLERY_SLIDES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

  const track = document.getElementById("galleryTrack");
  const dotsContainer = document.getElementById("galleryDots");
  const container = document.getElementById("galleryContainer");

  let slideW = 0;
  let visibleCount = 5;
  let idx = N; // start at copy1
  let anim = true;
  let isDragging = false;
  let dragOffset = 0;
  let dragStartX = 0;
  let autoplayEnabled = true;

  // Render slides
  GALLERY_SLIDES.forEach(src => {
    const div = document.createElement("div");
    div.className = "gallery-slide";
    div.innerHTML = `<img src="${src}" alt="" draggable="false">`;
    track.appendChild(div);
  });

  // Render dots
  for (let i = 0; i < N; i++) {
    const btn = document.createElement("button");
    btn.className = "gallery-dot";
    btn.dataset.idx = i;
    btn.addEventListener("click", () => {
      anim = true;
      idx = N + i;
      updateTransform();
      updateDots();
    });
    dotsContainer.appendChild(btn);
  }

  function getVisibleCount(w) {
    if (w < 640) return 2;
    if (w < 900) return 3;
    return 5;
  }

  function measure() {
    const cw = container.clientWidth;
    visibleCount = getVisibleCount(cw);
    const gap = cw < 480 ? 10 : 20; // in px

    // update gap on track
    track.style.gap = gap + "px";

    slideW = (cw - gap * (visibleCount - 1)) / visibleCount;

    // update slide widths
    const slides = document.querySelectorAll(".gallery-slide");
    slides.forEach(slide => {
      slide.style.width = slideW + "px";
    });

    updateTransform();
  }

  function updateTransform() {
    const cw = container.clientWidth;
    const gap = cw < 480 ? 10 : 20;

    track.style.transition = anim ? "transform 0.5s ease" : "none";
    const translateX = idx * (slideW + gap) - dragOffset;
    track.style.transform = `translateX(-${translateX}px)`;
  }

  function updateDots() {
    const activeDot = ((idx % N) + N) % N;
    const dots = document.querySelectorAll(".gallery-dot");
    dots.forEach((dot, i) => {
      if (i === activeDot) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Initialize
  measure();
  updateDots();
  window.addEventListener("resize", measure);

  // Transition End
  track.addEventListener("transitionend", () => {
    if (idx >= N * 2) {
      anim = false;
      idx = idx - N;
      updateTransform();
    } else if (idx < N) {
      anim = false;
      idx = idx + N;
      updateTransform();
    }

    if (!anim) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          anim = true;
        });
      });
    }
  });

  // Autoplay
  setInterval(() => {
    if (autoplayEnabled && anim) { // Ensure animation is back on before jumping again naturally
      anim = true;
      idx++;
      updateTransform();
      updateDots();
    }
  }, 3500);

  // Buttons
  document.getElementById("galleryPrev").addEventListener("click", () => {
    anim = true;
    idx--;
    updateTransform();
    updateDots();
  });
  document.getElementById("galleryNext").addEventListener("click", () => {
    anim = true;
    idx++;
    updateTransform();
    updateDots();
  });

  // Drag logic
  function finishDrag() {
    if (!isDragging) return;
    isDragging = false;
    autoplayEnabled = true;
    const threshold = slideW * 0.3;
    if (dragOffset < -threshold) {
      anim = true;
      idx++;
    } else if (dragOffset > threshold) {
      anim = true;
      idx--;
    } else {
      anim = true; // snap back
    }
    dragOffset = 0;
    updateTransform();
    updateDots();
  }

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    autoplayEnabled = false;
    anim = false;
    dragStartX = e.clientX;
    dragOffset = 0;
    updateTransform();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    dragOffset = e.clientX - dragStartX;
    updateTransform();
  });

  window.addEventListener("mouseup", finishDrag);
  container.addEventListener("mouseleave", finishDrag);

  // Touch logic
  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    autoplayEnabled = false;
    anim = false;
    dragStartX = e.touches[0].clientX;
    dragOffset = 0;
    updateTransform();
  }, { passive: true });

  container.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    dragOffset = e.touches[0].clientX - dragStartX;
    updateTransform();
  }, { passive: true });

  container.addEventListener("touchend", finishDrag);
});
