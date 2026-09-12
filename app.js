// Shared navigation and animations for portfolio and case studies
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
if (toggle && nav) {
    function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
    }
    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        nav.classList.toggle('open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('open')) {
            closeMenu();
            toggle.focus();
        }
    });
}

/* ==========================================================================
   Section Transitions, Reveal Animations & Navigation System
   ========================================================================== */
(() => {
    // Enable reveal styles
    document.documentElement.classList.add('reveal-init');

    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('#navigation a[href^="#"]');
    const headerContainer = document.querySelector('#header-container') || document.querySelector('.header');
    const progressBar = document.querySelector('#scroll-progress');
    const floatingTop = document.querySelector('#floating-top');
    const scrollExplore = document.querySelector('.scroll-explore');

    // Assign reveal classes to sections and key child elements
    sections.forEach(sec => {
        sec.classList.add('reveal-section');

        const heading = sec.querySelector('.section-heading');
        if (heading) heading.classList.add('reveal-item', 'delay-1');

        if (sec.id === 'projects') {
            const featured = sec.querySelector('.featured');
            if (featured) featured.classList.add('reveal-item', 'delay-2');
            const gridCards = sec.querySelectorAll('.project-grid .project');
            gridCards.forEach((card, idx) => {
                card.classList.add('reveal-item', idx === 0 ? 'delay-3' : 'delay-4');
            });
        } else if (sec.id === 'research') {
            const paper = sec.querySelector('.paper');
            if (paper) paper.classList.add('reveal-item', 'delay-2');
        } else if (sec.id === 'experience') {
            const rows = sec.querySelectorAll('.experience-row');
            rows.forEach((row, idx) => {
                row.classList.add('reveal-item', `delay-${Math.min(idx + 2, 5)}`);
            });
        } else if (sec.id === 'about') {
            const aboutGrid = sec.querySelector('.about-grid');
            if (aboutGrid) aboutGrid.classList.add('reveal-item', 'delay-1');
            const skillsHeading = sec.querySelector('.skills-heading');
            if (skillsHeading) skillsHeading.classList.add('reveal-item', 'delay-2');
            const skillCards = sec.querySelectorAll('.skills-grid > div');
            skillCards.forEach((card, idx) => {
                card.classList.add('reveal-item', `delay-${Math.min(idx + 3, 5)}`);
            });
        } else if (sec.id === 'contact') {
            const contactGrid = sec.querySelector('.contact-grid');
            if (contactGrid) contactGrid.classList.add('reveal-item', 'delay-2');
        }
    });

    // Hero section is visible on initial load
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('is-visible');
    }

    // Animated GPA counter
    function animateGpaCounter() {
        const counter = document.querySelector('.gpa-counter:not([data-animated])');
        if (!counter) return;
        counter.setAttribute('data-animated', 'true');
        const targetVal = parseFloat(counter.getAttribute('data-target') || '3.89');
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            counter.textContent = targetVal.toFixed(2);
            return;
        }
        const duration = 1200;
        const startTime = performance.now();
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = (targetVal * ease).toFixed(2);
            counter.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counter.textContent = targetVal.toFixed(2);
            }
        }
        requestAnimationFrame(step);
    }

    // Scroll reveal observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.id === 'about' || entry.target.querySelector('.gpa-counter')) {
                    animateGpaCounter();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.08
    });

    sections.forEach(sec => {
        if (sec !== hero) {
            revealObserver.observe(sec);
        }
    });

    // Interactive 3D Card Tilt on Hover
    const projectCards = document.querySelectorAll('.project');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Active Section Tracking (Scrollspy)
    const trackedSections = Array.from(document.querySelectorAll('section[id]'));

    function updateActiveNav() {
        if (!trackedSections.length || !navLinks.length) return;
        const headerHeight = headerContainer ? headerContainer.offsetHeight : 80;
        const scrollPosition = window.scrollY + headerHeight + 120;

        let currentSectionId = '';

        for (let i = trackedSections.length - 1; i >= 0; i--) {
            const sec = trackedSections[i];
            if (sec.offsetTop <= scrollPosition) {
                currentSectionId = sec.id;
                break;
            }
        }

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').replace('#', '');
            if (targetId && targetId === currentSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Smooth Scroll & Section Arrival Animation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (window.location.hash) {
                    history.pushState(null, '', window.location.pathname);
                }
                return;
            }

            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = headerContainer ? headerContainer.offsetHeight : 80;
                    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 16);

                    window.scrollTo({
                        top: Math.max(0, targetTop),
                        behavior: 'smooth'
                    });

                    history.pushState(null, '', href);

                    // Ensure target is visible immediately
                    target.classList.add('is-visible');
                    if (target.id === 'about' || target.querySelector('.gpa-counter')) {
                        animateGpaCounter();
                    }

                    // Trigger arrival pulse feedback animation
                    target.classList.remove('section-arrived');
                    void target.offsetWidth;
                    target.classList.add('section-arrived');
                    setTimeout(() => target.classList.remove('section-arrived'), 1400);

                    // Immediate nav highlight
                    navLinks.forEach(nl => {
                        if (nl.getAttribute('href') === href) {
                            nl.classList.add('active');
                        } else {
                            nl.classList.remove('active');
                        }
                    });
                }
            } catch (err) {
                // Ignore invalid query selector
            }
        });
    });

    // Trigger arrival animation if landing on a hash directly
    if (window.location.hash) {
        try {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.classList.add('is-visible');
                target.classList.add('section-arrived');
                if (target.id === 'about' || target.querySelector('.gpa-counter')) {
                    animateGpaCounter();
                }
                setTimeout(() => target.classList.remove('section-arrived'), 1400);
            }
        } catch (e) {}
    }

    // Scroll progress bar and sticky header shadow
    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (headerContainer) {
            if (scrollTop > 15) {
                headerContainer.classList.add('is-scrolled');
            } else {
                headerContainer.classList.remove('is-scrolled');
            }
        }

        if (progressBar && docHeight > 0) {
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }

        if (scrollExplore) {
            if (scrollTop > 80) {
                scrollExplore.classList.add('is-hidden');
            } else {
                scrollExplore.classList.remove('is-hidden');
            }
        }

        if (floatingTop) {
            if (scrollTop > 450) {
                floatingTop.classList.add('is-visible');
            } else {
                floatingTop.classList.remove('is-visible');
            }
        }

        updateActiveNav();
    }

    if (floatingTop) {
        floatingTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveNav, { passive: true });

    // Check initial position on load
    handleScroll();
})();
