
// Script para el Club Deportivo Cima de Almería

// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Función que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    initMobileMenu();
    
    // Slider de instalaciones
    initSlider();
    
    // Pestañas de horarios
    initTabs();
    
    // Formulario de contacto
    initContactForm();
    
    // Formulario de newsletter
    initNewsletterForm();
    
    // Animaciones al hacer scroll
    initScrollAnimations();
});

// Inicializar menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        
        // Cambiar el icono del menú
        const icon = menuToggle.querySelector('i');
        if (menu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Inicializar slider de instalaciones
function initSlider() {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const slider = document.querySelector('.slider');
    
    // Mostrar primera diapositiva
    showSlide(currentSlide);
    
    // Eventos para flechas de navegación
    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', prevSlide);
        nextArrow.addEventListener('click', nextSlide);
    }
    
    // Iniciar autoplay
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pausar autoplay al pasar el mouse sobre el slider
    if (slider) {
        slider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

// Mostrar diapositiva específica
function showSlide(n) {
    if (!slides.length) return;
    
    const slider = document.querySelector('.slider');
    if (!slider) return;
    
    currentSlide = (n + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Avanzar a la siguiente diapositiva
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Retroceder a la diapositiva anterior
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Inicializar pestañas de horarios
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Eliminar clase active de todos los botones y contenidos
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar contenido correspondiente
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Inicializar formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Aquí normalmente enviarías los datos a un servidor
            // Para esta demo, simulamos una respuesta exitosa
            
            // Simular envío
            formMessage.innerHTML = 'Enviando mensaje...';
            formMessage.className = 'form-message';
            
            // Simular respuesta del servidor después de 2 segundos
            setTimeout(function() {
                formMessage.innerHTML = `¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.`;
                formMessage.className = 'form-message success';
                contactForm.reset();
            }, 2000);
        });
    }
}

// Inicializar formulario de newsletter
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simular suscripción
            alert(`¡Gracias por suscribirte a nuestra newsletter con el email: ${email}!`);
            newsletterForm.reset();
        });
    }
}

// Inicializar animaciones al hacer scroll
function initScrollAnimations() {
    // Detectar elementos que deben animarse al hacer scroll
    const elementsToAnimate = document.querySelectorAll('.actividad-card, .section-title, .contacto-info, .contacto-form');
    
    // Función para comprobar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Función para animar elementos visibles
    function animateVisibleElements() {
        elementsToAnimate.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar estilo inicial para elementos a animar
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar la animación al cargar la página y al hacer scroll
    animateVisibleElements();
    window.addEventListener('scroll', animateVisibleElements);
}

// Función para validar formulario de contacto
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Función para validar email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Función para suavizar el scroll hacia las secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajustar por la altura del header
                behavior: 'smooth'
            });
        }
    });
});