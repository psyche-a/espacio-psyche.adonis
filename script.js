// ==========================================================================
// 1. INICIALIZACIÓN DIRECTA E INCONDICIONAL DE ICONOS LUCIDE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MENÚ DESPLEGABLE MÓVIL (MENÚ HAMBURGUESA)
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
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

            if (parent.classList.contains('active')) {
                parent.classList.remove('active');
                panel.style.maxHeight = null;
            } else {
                document.querySelectorAll('.faq-item-block').forEach(item => {
                    item.classList.remove('active');
                    const itemPanel = item.querySelector('.faq-panel');
                    if (itemPanel) itemPanel.style.maxHeight = null;
                });

                parent.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // ==========================================================================
    // 4. DETECTOR DE SECCIÓN ACTIVA (SCROLLSPY)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function scrollSpy() {
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

    window.addEventListener('scroll', scrollSpy);
});
