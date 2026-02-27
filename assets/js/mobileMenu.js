(function () {
    const hamburger = document.querySelector('.mobile-menu-button');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const overlay = document.getElementById('mobile-menu');
    const menuContent = overlay?.querySelector('.mobile-menu-content');

    if (!hamburger || !overlay || !closeBtn) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function openMenu() {
        overlay.classList.add('is-open');
        overlay.removeAttribute('hidden');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();

        // Focus trap: keep tab within overlay
        const focusables = overlay.querySelectorAll(
            'a[href], button:not([disabled])'
        );
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        function handleKeydown(e) {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        overlay._trapHandler = handleKeydown;
        overlay.addEventListener('keydown', handleKeydown);
    }

    function closeMenu() {
        overlay.classList.remove('is-open');
        overlay.setAttribute('hidden', '');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();

        // Collapse dropdowns when closing menu
        overlay.querySelectorAll('.mobile-menu-dropdown-trigger').forEach(function (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
            const content = document.getElementById(trigger.getAttribute('aria-controls'));
            if (content) content.setAttribute('aria-hidden', 'true');
        });

        if (overlay._trapHandler) {
            overlay.removeEventListener('keydown', overlay._trapHandler);
            overlay._trapHandler = null;
        }
    }

    function isOpen() {
        return overlay.classList.contains('is-open');
    }

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    overlay.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) closeMenu();
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeMenu();
    });

    overlay.querySelectorAll('.mobile-menu-nav a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });
    overlay.querySelectorAll('.mobile-project-link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Dropdown toggles for Side projects and Theme
    overlay.querySelectorAll('.mobile-menu-dropdown-trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            const contentId = trigger.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            if (!content) return;

            if (expanded) {
                trigger.setAttribute('aria-expanded', 'false');
                content.setAttribute('aria-hidden', 'true');
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                content.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // Prevent close when clicking inside menu content (e.g. theme buttons)
    if (menuContent) {
        menuContent.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
})();
