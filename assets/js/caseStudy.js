(function () {
    'use strict';

    var overlay = document.getElementById('case-study-overlay');
    if (!overlay) return;

    var savedScrollPosition = 0;
    var isOpen = false;
    var validSlugs = ['kaisa', 'cytiva', 'beepoff'];

    function openCaseStudy(slug) {
        if (isOpen) return;
        if (validSlugs.indexOf(slug) === -1) return;

        savedScrollPosition = window.scrollY;

        fetch('/case-studies/' + slug + '.html')
            .then(function (response) {
                if (!response.ok) throw new Error('Fetch failed');
                return response.text();
            })
            .then(function (html) {
                overlay.innerHTML = html;
                overlay.classList.add('is-active');
                overlay.removeAttribute('hidden');
                overlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                isOpen = true;

                if (window.location.pathname !== '/' + slug) {
                    history.pushState({ caseStudy: slug }, '', '/' + slug);
                }

                var backBtn = overlay.querySelector('.case-study-back-btn');
                if (backBtn) {
                    backBtn.addEventListener('click', closeCaseStudy);
                }

                overlay.scrollTop = 0;
            })
            .catch(function () {
                window.location.href = '/';
            });
    }

    function closeCaseStudy() {
        if (!isOpen) return;

        overlay.classList.remove('is-active');
        overlay.setAttribute('hidden', '');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isOpen = false;

        if (window.location.pathname !== '/') {
            history.pushState({}, '', '/');
        }

        window.scrollTo(0, savedScrollPosition);

        setTimeout(function () {
            overlay.innerHTML = '';
        }, 350);
    }

    // Event delegation for all triggers
    document.addEventListener('click', function (e) {
        var trigger = e.target.closest('[data-case-study]');
        if (!trigger) return;
        e.preventDefault();

        var slug = trigger.getAttribute('data-case-study');
        openCaseStudy(slug);

        // Close mobile menu if open
        var mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.hidden) {
            var closeBtn = document.querySelector('.mobile-menu-close');
            if (closeBtn) closeBtn.click();
        }
    });

    // Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) {
            closeCaseStudy();
        }
    });

    // Browser back/forward
    window.addEventListener('popstate', function () {
        var path = window.location.pathname.replace(/^\//, '');
        if (path && validSlugs.indexOf(path) !== -1) {
            if (!isOpen) openCaseStudy(path);
        } else if (isOpen) {
            closeCaseStudy();
        }
    });

    // Direct URL detection on page load
    var initialPath = window.location.pathname.replace(/^\//, '');
    if (initialPath && validSlugs.indexOf(initialPath) !== -1) {
        history.replaceState({ caseStudy: initialPath }, '', '/' + initialPath);
        openCaseStudy(initialPath);
    }
})();
