const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const revealElements = document.querySelectorAll('[data-reveal]');
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('form-message');
const newsletterForm = document.getElementById('newsletter-form');

let currentSlide = 0;
let sliderInterval;
let touchStartX = 0;
let touchDeltaX = 0;

function setHeaderState() {
    if (!header) {
        return;
    }

    header.classList.toggle('is-scrolled', window.scrollY > 24);
}

function closeMenu() {
    if (!menu || !menuToggle) {
        return;
    }

    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    const icon = menuToggle.querySelector('i');
    if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
}

function initMobileMenu() {
    if (!menuToggle || !menu) {
        return;
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-xmark', isOpen);
        }
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
}

function switchTab(targetId) {
    tabButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.target === targetId);
    });

    tabContents.forEach((content) => {
        content.classList.toggle('active', content.id === targetId);
    });
}

function initTabs() {
    tabButtons.forEach((button) => {
        button.addEventListener('click', () => switchTab(button.dataset.target));
    });
}

function showSlide(index) {
    if (!slider || slides.length === 0) {
        return;
    }

    currentSlide = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startSlider() {
    if (slides.length < 2) {
        return;
    }

    clearInterval(sliderInterval);
    sliderInterval = window.setInterval(() => showSlide(currentSlide + 1), 5500);
}

function initSlider() {
    if (!slider || slides.length === 0) {
        return;
    }

    showSlide(0);
    startSlider();

    prevArrow?.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        startSlider();
    });

    nextArrow?.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        startSlider();
    });

    slider.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    slider.addEventListener('mouseleave', startSlider);
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: true });
    slider.addEventListener('touchend', handleTouchEnd);
}

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0]?.clientX || 0;
    touchDeltaX = 0;
    clearInterval(sliderInterval);
}

function handleTouchMove(event) {
    const currentX = event.changedTouches[0]?.clientX || 0;
    touchDeltaX = currentX - touchStartX;
}

function handleTouchEnd() {
    if (Math.abs(touchDeltaX) > 45) {
        showSlide(touchDeltaX < 0 ? currentSlide + 1 : currentSlide - 1);
    }

    startSlider();
}

function initReveal() {
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
        }
    );

    revealElements.forEach((element) => observer.observe(element));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;

            if (!target) {
                return;
            }

            event.preventDefault();
            const offset = header ? header.offsetHeight + 12 : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top,
                behavior: 'smooth',
            });
        });
    });
}

function initContactForm() {
    if (!contactForm || !contactMessage) {
        return;
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const nombre = formData.get('nombre')?.toString().trim() || 'Gracias';
        const programa = contactForm.querySelector('#programa')?.selectedOptions?.[0]?.textContent || 'el programa elegido';

        contactMessage.textContent = `Solicitud enviada. ${nombre}, te responderemos pronto con informacion sobre ${programa.toLowerCase()}.`;
        contactMessage.className = 'form-message success';
        contactForm.reset();
    });
}

function initNewsletterForm() {
    if (!newsletterForm) {
        return;
    }

    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = newsletterForm.querySelector('button');
        if (button) {
            button.textContent = 'Suscrito';
            button.disabled = true;
        }
        newsletterForm.reset();
    });
}

window.addEventListener('scroll', setHeaderState);
window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
        closeMenu();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setHeaderState();
    initMobileMenu();
    initTabs();
    initSlider();
    initReveal();
    initSmoothScroll();
    initContactForm();
    initNewsletterForm();
});
