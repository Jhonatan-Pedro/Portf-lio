// ===== LENIS SMOOTH SCROLL INITIALIZATION =====
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integração com GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ===== GSAP & SCROLLTRIGGER SETUP =====
gsap.registerPlugin(ScrollTrigger);

// ===== HERO ZOOM OUT EFFECT =====
const hero = document.getElementById('hero');

gsap.to(hero, {
    scale: 0.85,
    opacity: 0.2,
    ease: "none",
    scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// ===== HERO TYPING EFFECT =====
const heroTitle = document.getElementById('heroTitle');
const titleText = heroTitle.querySelector('.title-text');
const titleCursor = heroTitle.querySelector('.title-cursor');

const titles = [
    'FRONT-END DEVELOPER',
    'UI • UX DEVELOPER',
    'WEB DEVELOPER',
];

let currentTitleIndex = 0;
let isTyping = true;
let charIndex = 0;
let typingSpeed = 80;
let deletingSpeed = 40;
let pauseBetween = 2000;

function typeEffect() {
    const currentTitle = titles[currentTitleIndex];

    if (isTyping) {
        if (charIndex < currentTitle.length) {
            titleText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            isTyping = false;
            setTimeout(typeEffect, pauseBetween);
        }
    } else {
        if (charIndex > 0) {
            titleText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, deletingSpeed);
        } else {
            isTyping = true;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            setTimeout(typeEffect, 500);
        }
    }
}

setTimeout(typeEffect, 1000);

// ===== HERO ENTRANCE ANIMATIONS =====
gsap.from('.hero-label', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out"
});

gsap.from('.hero-description', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    ease: "power3.out"
});

gsap.from('.scroll-indicator', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 1,
    ease: "power3.out"
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('mainHeader');

lenis.on('scroll', ({ scroll }) => {
    if (scroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== SMOOTH SCROLL COM LENIS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});

// ===== SCROLL INDICATOR =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            lenis.scrollTo(aboutSection, {
                offset: -80,
                duration: 1.5
            });
        }
    });
}

// ===== BLOCK REVEAL TEXT ANIMATION =====
const blockRevealElements = document.querySelectorAll('.block-reveal-text');

blockRevealElements.forEach((element) => {
    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => {
            element.classList.add('revealed');
        },
        once: true
    });
});

// ===== ABOUT SECTION - ANIMAÇÃO HORIZONTAL COM GSAP =====

// Animação da imagem (esquerda para direita)
gsap.fromTo('.about-image-wrapper', 
    {
        x: -100,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '#about',
            start: "top 70%",
            once: true
        }
    }
);

// Animação do conteúdo (direita para esquerda)
gsap.fromTo('.about-content',
    {
        x: 100,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '#about',
            start: "top 70%",
            once: true
        }
    }
);

// Stagger nos elementos internos do conteúdo (título, texto, stats, botão)
gsap.fromTo('.about-content > *',
    {
        x: 30,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '#about',
            start: "top 70%",
            once: true
        },
        delay: 0.3
    }
);

// ===== SERVICE CARDS =====
const servicesGrid = document.querySelector('.services-grid');

ScrollTrigger.create({
    trigger: '.services-grid',
    start: 'top 85%',
    once: true,
    onEnter: () => {
        if (servicesGrid) servicesGrid.classList.add('services-ready');
    }
});

// ===== TECHNOLOGIES SECTION =====
gsap.from('.tech-label', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.tech-label',
        start: 'top 85%',
        once: true
    }
});

const techCategoriesGrid = document.querySelector('.tech-categories');

ScrollTrigger.create({
    trigger: '.tech-categories',
    start: 'top 85%',
    once: true,
    onEnter: () => {
        if (techCategoriesGrid) techCategoriesGrid.classList.add('tech-ready');
    }
});

// ===== WORK/PROJECTS SECTION =====
gsap.from('.work-header', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.work-header',
        start: "top 85%",
        once: true
    }
});

// ===== PROJECTS CAROUSEL LOGIC =====
const carouselPrev   = document.getElementById('carouselPrev');
const carouselNext   = document.getElementById('carouselNext');
const carouselSlides = document.querySelectorAll('.projects-slide');
const carouselDots   = document.querySelectorAll('.carousel-dot');
let currentSlide = 1;
const totalSlides = carouselSlides.length;
let carouselTriggered = false;

function updateCarouselButtons() {
    if (carouselPrev) carouselPrev.disabled = currentSlide === 1;
    if (carouselNext) carouselNext.disabled = currentSlide === totalSlides;
}

// Força re-trigger da animação CSS ao trocar de slide
function animateVisibleCards() {
    const activeSlide = document.querySelector('.projects-slide.active');
    if (!activeSlide || !carouselTriggered) return;
    const cards = activeSlide.querySelectorAll('.project-card');
    cards.forEach((card) => {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = null;
    });
}

// Dispara a animação inicial dos cards apenas quando o carrossel entra na tela
const carouselContainer = document.querySelector('.projects-carousel');

ScrollTrigger.create({
    trigger: '.projects-carousel',
    start: "top 85%",
    once: true,
    onEnter: () => {
        carouselTriggered = true;
        if (carouselContainer) carouselContainer.classList.add('carousel-ready');
    }
});

function goToSlide(target) {
    carouselSlides.forEach(s => s.classList.remove('active'));
    carouselDots.forEach(d => d.classList.remove('active'));

    const newSlide = document.querySelector(`.projects-slide[data-slide="${target}"]`);
    const newDot   = document.querySelector(`.carousel-dot[data-dot="${target}"]`);
    if (newSlide) newSlide.classList.add('active');
    if (newDot)   newDot.classList.add('active');

    currentSlide = target;
    updateCarouselButtons();
    animateVisibleCards();
}

if (carouselNext) {
    carouselNext.addEventListener('click', () => {
        if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
    });
}

if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
        if (currentSlide > 1) goToSlide(currentSlide - 1);
    });
}

carouselDots.forEach((dot) => {
    dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-dot'));
        if (target !== currentSlide) goToSlide(target);
    });
});

updateCarouselButtons();

// ===== EXPERIENCE/TIMELINE HORIZONTAL NAVIGATION =====
const prevBtn = document.getElementById('timelinePrevBtn');
const nextBtn = document.getElementById('timelineNextBtn');
const timelineTrack = document.getElementById('timelineTrack');
const timelineGroups = document.querySelectorAll('.timeline-group');
const indicators = document.querySelectorAll('.indicator');
let currentGroup = 1;
const totalGroups = timelineGroups.length;

function updateTimeline(direction) {
    let nextGroupNum;
    if (direction === 'next') {
        nextGroupNum = currentGroup < totalGroups ? currentGroup + 1 : 1;
    } else {
        nextGroupNum = currentGroup > 1 ? currentGroup - 1 : totalGroups;
    }
    
    timelineGroups.forEach((group, index) => {
        const groupNum = index + 1;
        if (groupNum === nextGroupNum) {
            group.classList.add('active');
            group.classList.remove('inactive');
        } else {
            group.classList.remove('active');
            group.classList.add('inactive');
        }
    });
    
    const translateX = (nextGroupNum - 1) * -50;
    timelineTrack.style.transform = `translateX(${translateX}%)`;
    
    currentGroup = nextGroupNum;
    updateButtons();
    updateIndicators();
    
    resetItemAnimations();
}

function resetItemAnimations() {
    const activeGroup = document.querySelector('.timeline-group.active');
    if (!activeGroup) return;
    
    const items = activeGroup.querySelectorAll('.timeline-item');
    items.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight;
        item.style.animation = null;
    });
}

function updateButtons() {
    if (prevBtn) {
        prevBtn.disabled = currentGroup === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentGroup === totalGroups;
    }
}

function updateIndicators() {
    indicators.forEach((ind, index) => {
        if (index + 1 === currentGroup) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => updateTimeline('next'));
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => updateTimeline('prev'));
}

indicators.forEach((ind, index) => {
    ind.addEventListener('click', () => {
        const targetGroup = index + 1;
        if (targetGroup !== currentGroup) {
            timelineGroups.forEach((group, idx) => {
                const groupNum = idx + 1;
                if (groupNum === targetGroup) {
                    group.classList.add('active');
                    group.classList.remove('inactive');
                } else {
                    group.classList.remove('active');
                    group.classList.add('inactive');
                }
            });
            
            const translateX = (targetGroup - 1) * -50;
            timelineTrack.style.transform = `translateX(${translateX}%)`;
            
            currentGroup = targetGroup;
            updateButtons();
            updateIndicators();
            resetItemAnimations();
        }
    });
});

gsap.from('.timeline-horizontal-container', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.timeline-horizontal-container',
        start: "top 85%",
        once: true,
        onEnter: () => {
            updateButtons();
            updateIndicators();
        }
    }
});

// ===== CONTACT SECTION =====
gsap.from('.contact-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.contact-title',
        start: "top 80%",
        once: true
    }
});

const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach((group, i) => {
    gsap.from(group, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.contact-form',
            start: "top 85%",
            once: true
        }
    });
});

gsap.from('.submit-btn', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 0.4,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.submit-btn',
        start: "top 90%",
        once: true
    }
});

// ===== COUNTER ANIMATION FOR STATS =====
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
    const finalValue = parseInt(stat.getAttribute('data-count'));

    ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        onEnter: () => {
            gsap.to(stat, {
                innerHTML: finalValue,
                duration: 2,
                snap: { innerHTML: 1 },
                ease: "power2.out",
                onUpdate: function() {
                    stat.innerHTML = Math.round(this.targets()[0].innerHTML) + '+';
                }
            });
        },
        once: true
    });
});

// ===== EMAILJS INTEGRATION =====
const EMAILJS_SERVICE_ID  = 'service_wep4p5h';
const EMAILJS_TEMPLATE_ID = 'template_ak24xme';

(function () {
    const form        = document.getElementById('contactForm');
    if (!form) return;

    const btn         = document.getElementById('submitBtn');
    const btnText     = document.getElementById('submitBtnText');
    const btnIcon     = document.getElementById('submitBtnIcon');
    const successMsg  = document.getElementById('formSuccess');
    const errorMsg    = document.getElementById('formError');

    // --- helpers de validação ---
    const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

    function setFieldError(inputId, errorId, show) {
        const input = document.getElementById(inputId);
        const span  = document.getElementById(errorId);
        input.classList.toggle('has-error', show);
        span.classList.toggle('visible', show);
    }

    function validate() {
        const name    = document.getElementById('name').value;
        const email   = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        let ok = true;
        setFieldError('name',    'error-name',    !name.trim());    if (!name.trim())         ok = false;
        setFieldError('email',   'error-email',   !isValidEmail(email)); if (!isValidEmail(email)) ok = false;
        setFieldError('subject', 'error-subject', !subject.trim()); if (!subject.trim())      ok = false;
        return ok;
    }

    // limpa erro ao digitar
    ['name', 'email', 'subject'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => {
            const errId = 'error-' + id;
            setFieldError(id, errId, false);
        });
    });

    // --- estados do botão ---
    function setBtnState(state) {
        const states = {
            idle:    { text: 'SEND IT',   icon: 'fa-paper-plane', disabled: false, color: '' },
            loading: { text: 'SENDING…',  icon: 'fa-spinner fa-spin', disabled: true,  color: '' },
            success: { text: 'SENT!',     icon: 'fa-check',       disabled: false, color: '#22c55e' },
        };
        const s = states[state];
        btnText.textContent  = s.text;
        btnIcon.className    = `fas ${s.icon}`;
        btn.disabled         = s.disabled;
        btn.style.color      = s.color;
        gsap.fromTo(btn, { opacity: 0.6 }, { opacity: 1, duration: 0.3 });
    }

    // --- mostrar/ocultar feedback global ---
    function showFeedback(el) {
        el.classList.add('visible');
        gsap.fromTo(el, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
        setTimeout(() => {
            gsap.to(el, { opacity: 0, duration: 0.35, onComplete: () => el.classList.remove('visible') });
        }, 5000);
    }

    // --- submit ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setBtnState('loading');

        // animação suave no botão ao enviar
        gsap.fromTo(btn, { x: 0 }, { x: 6, duration: 0.15, yoyo: true, repeat: 3, ease: 'power1.inOut' });

        try {
            await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
            setBtnState('success');
            showFeedback(successMsg);
            form.reset();
            setTimeout(() => setBtnState('idle'), 3000);
        } catch (err) {
            console.error('EmailJS error:', err);
            setBtnState('idle');
            showFeedback(errorMsg);
        }
    });
}());

// ===== MAGNETIC BUTTON EFFECT =====
const magneticElements = document.querySelectorAll('.submit-btn, .social-link');

magneticElements.forEach((elem) => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(elem, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    elem.addEventListener('mouseleave', () => {
        gsap.to(elem, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    });
});

// ===== FOOTER ANIMATIONS =====
gsap.from('.footer-content', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.footer',
        start: "top 90%",
        once: true
    }
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');

    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2024', year);
    }

    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.play().catch(e => console.log('Autoplay blocked'));
    }
    
    updateButtons();
    updateIndicators();
});

// ===== CLEANUP ON PAGE UNLOAD =====
window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    lenis.destroy();
});

