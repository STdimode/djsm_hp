document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. FadeUp Intersection Observer
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            const delay = el.getAttribute('data-delay') || 0;

            if (entry.isIntersecting) {
                // Apply transition inline so we can use dynamic delays
                el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
                el.classList.add('visible');
            } else {
                // Remove transition briefly to snap back, then remove class
                el.style.transition = 'none';
                el.classList.remove('visible');
            }
        });
    }, { threshold: 0.12 });

    fadeElements.forEach(el => fadeObserver.observe(el));


    // ==========================================
    // 2. Hero Slider (Crossfade)
    // ==========================================
    // Original React code uses a single image, so crossfade is simplified or skipped
    // If multiple hero images were added to HTML, we would cycle them here.
    // Given the HTML only has one `.hero-image-active`, we omit the 5s interval for now.
    // To support multiple in the future:
    /*
    const heroImages = document.querySelectorAll('.hero-image');
    let heroIdx = 0;
    if (heroImages.length > 1) {
        setInterval(() => {
            heroImages[heroIdx].classList.remove('hero-image-active');
            heroIdx = (heroIdx + 1) % heroImages.length;
            heroImages[heroIdx].classList.add('hero-image-active');
        }, 5000);
    }
    */


    // ==========================================
    // 3. Gallery Custom Carousel
    // ==========================================
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryPrevBtn = document.getElementById('galleryPrev');
    const galleryNextBtn = document.getElementById('galleryNext');
    const galleryDotsContainer = document.getElementById('galleryDots');

    if (galleryContainer && galleryTrack) {
        const GALLERY_BASE = [
            "https://images.unsplash.com/photo-1642761589121-ec47d4c425ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGxpbmVuJTIwdGV4dHVyZSUyMHdhcm0lMjBuZXV0cmFsfGVufDF8fHx8MTc3MjYyNzQxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1579721333096-145ed9596b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwYmVpZ2UlMjBjb2ZmZWUlMjBjZXJhbWljJTIwbW9ybmluZ3xlbnwxfHx8fDE3NzI2Mjc0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1763888476830-75c71621c0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGNyZWFtJTIwY2FuZGxlJTIwY296eSUyMHdhcm0lMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcyNjI3NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1755375119513-de3f0c769db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwbmV1dHJhbCUyMHdvb2QlMjB0YWJsZSUyMG1vcm5pbmclMjBsaWdodxlbnwxfHx8fDE3NzI2Mjc0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1677568554453-ae5baf28da6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmVpZ2UlMjBpbnRlcmlvciUyMGNvenklMjBtaW5pbWFsJTIwcm9vbXxlbnwxfHx8fDE3NzI2Mjc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1634393653736-98a63fb73742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmVpZ2UlMjBjb3R0b24lMjBmYWJyaWMlMjBjbG90aCUyMG1pbmltYWx8ZW58MXx8fHwxNzcyNjI3NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        ];

        const N = GALLERY_BASE.length;
        const GALLERY_SLIDES = [...GALLERY_BASE, ...GALLERY_BASE, ...GALLERY_BASE];

        let slideW = 0;
        let visibleCount = 5;
        let idx = N; // Start at copy1
        let anim = true;
        let isDragging = false;
        let dragOffset = 0;
        let dragStartX = 0;
        let autoplayEnabled = true;
        let gap = 20;

        // Render HTML
        GALLERY_SLIDES.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            const img = document.createElement('img');
            img.src = src;
            img.draggable = false;
            slide.appendChild(img);
            galleryTrack.appendChild(slide);
        });

        // Render Dots
        for(let i=0; i<N; i++) {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot';
            dot.addEventListener('click', () => onDotClick(i));
            galleryDotsContainer.appendChild(dot);
        }

        function getVisibleCount(width) {
            if (width < 640) return 2;
            if (width < 900) return 3;
            return 5;
        }

        function updateDots() {
            const activeDot = ((idx % N) + N) % N;
            const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');
            dots.forEach((dot, i) => {
                dot.style.width = i === activeDot ? '20px' : '8px';
                dot.style.height = '8px';
                dot.style.background = i === activeDot ? '#666' : '#ccc';
            });
        }

        function updateTrackPosition() {
            const translateX = idx * (slideW + gap) - dragOffset;
            galleryTrack.style.transition = anim ? "transform 0.5s ease" : "none";
            galleryTrack.style.transform = `translateX(-${translateX}px)`;
            updateDots();
        }

        function measure() {
            const cw = galleryContainer.clientWidth;
            visibleCount = getVisibleCount(cw);
            gap = cw < 480 ? 10 : 20;
            slideW = (cw - gap * (visibleCount - 1)) / visibleCount;

            const imgHeight = visibleCount <= 2 ? 200 : 260;
            galleryTrack.style.gap = `${gap}px`;

            const slides = galleryTrack.querySelectorAll('.gallery-slide');
            slides.forEach(slide => {
                slide.style.width = `${slideW}px`;
                slide.style.height = `${imgHeight}px`;
            });

            updateTrackPosition();
        }

        window.addEventListener('resize', measure);
        measure();

        // Autoplay
        let autoplayInterval = setInterval(() => {
            if (autoplayEnabled) {
                anim = true;
                idx++;
                updateTrackPosition();
            }
        }, 3500);

        // Infinite loop jump
        galleryTrack.addEventListener('transitionend', () => {
            if (idx >= N * 2) {
                anim = false;
                idx -= N;
                updateTrackPosition();
            } else if (idx < N) {
                anim = false;
                idx += N;
                updateTrackPosition();
            }

            // Re-enable animation for next frame
            if (!anim) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        anim = true;
                    });
                });
            }
        });

        // Controls
        galleryNextBtn.addEventListener('click', () => { anim = true; idx++; updateTrackPosition(); });
        galleryPrevBtn.addEventListener('click', () => { anim = true; idx--; updateTrackPosition(); });

        function onDotClick(i) {
            anim = true;
            idx = N + i;
            updateTrackPosition();
        }

        // Drag functionality
        function startDrag(clientX) {
            isDragging = true;
            autoplayEnabled = false;
            anim = false;
            dragStartX = clientX;
            dragOffset = 0;
            galleryContainer.style.cursor = 'grabbing';
        }

        function moveDrag(clientX) {
            if (!isDragging) return;
            dragOffset = clientX - dragStartX;
            updateTrackPosition();
        }

        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            autoplayEnabled = true;
            galleryContainer.style.cursor = 'grab';

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
            updateTrackPosition();
        }

        // Mouse Events
        galleryContainer.addEventListener('mousedown', (e) => startDrag(e.clientX));
        galleryContainer.addEventListener('mousemove', (e) => moveDrag(e.clientX));
        window.addEventListener('mouseup', endDrag); // Attach to window to catch releases outside
        galleryContainer.addEventListener('mouseleave', endDrag);

        // Touch Events
        galleryContainer.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), {passive: true});
        galleryContainer.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX), {passive: true});
        window.addEventListener('touchend', endDrag);
    }
});
