document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    } else {
        console.error('No se pudo cargar la biblioteca de iconos Lucide.');
    }

    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        const closeMenu = () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.classList.toggle('is-open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeMenu();
        });

        document.addEventListener('click', event => {
            if (event.target instanceof Node &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        }, { passive: true });
    }

    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.faq-item-block');
            const panel = trigger.nextElementSibling;

            if (!item || !panel) return;

            const shouldOpen = !item.classList.contains('active');

            document.querySelectorAll('.faq-item-block').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherTrigger = otherItem.querySelector('.faq-trigger');
                const otherPanel = otherItem.querySelector('.faq-panel');

                if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                if (otherPanel) otherPanel.style.maxHeight = null;
            });

            if (shouldOpen) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = `${panel.scrollHeight}px`;
            }
        });
    });

    const sections = [...document.querySelectorAll('section[id], main[id]')];
    const navLinks = [...document.querySelectorAll('.nav-link')];
    let scrollSpyScheduled = false;

    function updateActiveLink() {
        const visibleSections = sections.filter(section => section.getBoundingClientRect().top <= 200);
        const activeSection = visibleSections[visibleSections.length - 1];
        scrollSpyScheduled = false;

        if (!activeSection) return;

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${activeSection.id}`;
            link.classList.toggle('active', isActive);
        });
    }

    window.addEventListener('scroll', () => {
        if (!scrollSpyScheduled) {
            scrollSpyScheduled = true;
            window.requestAnimationFrame(updateActiveLink);
        }
    }, { passive: true });

    updateActiveLink();
});
