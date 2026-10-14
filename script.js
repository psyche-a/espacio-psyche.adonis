/**
 * PSYCHE - Centro de Bienestar Psicológico
 * Script de Control Interactivo y Animaciones Modernas
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. INICIALIZACIÓN DE ICONOS LUCIDE
    // ==========================================================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // 2. MENÚ DESPLEGABLE MÓVIL (MENÚ HAMBURGUESA)
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Alternar de forma animada el icono entre barras y equis (X)
            if (menuIcon) {
                if (navMenu.classList.contains('open')) {
                    menuIcon.className = 'fa-solid fa-xmark';
                } else {
                    menuIcon.className = 'fa-solid fa-bars';
                }
            }
        });

        // Cerrar automáticamente el menú móvil al hacer clic en cualquier enlace
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                if (menuIcon) {
                    menuIcon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // ==========================================================================
    // 3. SISTEMA ACCORDION DINÁMICO (PREGUNTAS FRECUENTES)
    // ==========================================================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const parent = this.parentElement;
            const panel = this.nextElementSibling;

            // Si el bloque clickeado ya está abierto, proceder a cerrarlo
            if (parent.classList.contains('active')) {
                parent.classList.remove('active');
                panel.style.maxHeight = null;
            } else {
                // Cerrar cualquier otro bloque de FAQ que esté abierto en ese momento
                document.querySelectorAll('.faq-item-block').forEach(item => {
                    item.classList.remove('active');
                    const itemPanel = item.querySelector('.faq-panel');
                    if (itemPanel) {
                        itemPanel.style.maxHeight = null;
                    }
                });

                // Abrir el bloque actual calculando milimétricamente su altura total interna
                parent.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // ==========================================================================
    // 4. DETECTOR DE SECCIÓN ACTIVA DURANTE EL SCROLL (SCROLLSPY)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function scrollSpy() {
        // Compensación de 120px para ajustar la detección debido a la barra de navegación fija
        const currentScroll = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Escuchar el evento de desplazamiento global con un rendimiento óptimo
    window.addEventListener('scroll', scrollSpy);
});
