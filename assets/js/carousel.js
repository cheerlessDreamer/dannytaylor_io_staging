(function () {
    'use strict';

    const track = document.getElementById('carousel-track');
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.carousel-card'));
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let currentIndex = 0;
    let autoScrollInterval = null;

    function scrollToIndex(index, smooth) {
        // Wrap around
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        currentIndex = index;

        const card = cards[currentIndex];
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const trackWidth = track.offsetWidth;
        const scrollLeft = cardLeft - (trackWidth / 2) + (cardWidth / 2);

        track.scrollTo({
            left: scrollLeft,
            behavior: (smooth !== false && !prefersReducedMotion) ? 'smooth' : 'instant'
        });

        updateActive();
    }

    function updateActive() {
        cards.forEach(function (card, i) {
            card.classList.toggle('is-active', i === currentIndex);
            card.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
        });
        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === currentIndex);
            dot.setAttribute('aria-pressed', i === currentIndex ? 'true' : 'false');
        });
    }

    function startAutoScroll() {
        if (prefersReducedMotion) return;
        autoScrollInterval = setInterval(function () {
            scrollToIndex(currentIndex + 1);
        }, 5000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Prev / next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            stopAutoScroll();
            scrollToIndex(currentIndex - 1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            stopAutoScroll();
            scrollToIndex(currentIndex + 1);
        });
    }

    // Dot navigation
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            stopAutoScroll();
            scrollToIndex(i);
        });
    });

    // Pause auto-scroll while user is hovering or has focus inside the carousel
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('focusin', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
    track.addEventListener('focusout', function (e) {
        if (!track.contains(e.relatedTarget)) startAutoScroll();
    });

    // Sync active state after manual touch/scroll
    var scrollTimeout;
    track.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            var trackCenter = track.scrollLeft + track.offsetWidth / 2;
            var closest = 0;
            var closestDist = Infinity;
            cards.forEach(function (card, i) {
                var cardCenter = card.offsetLeft + card.offsetWidth / 2;
                var dist = Math.abs(cardCenter - trackCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = i;
                }
            });
            if (closest !== currentIndex) {
                currentIndex = closest;
                updateActive();
            }
        }, 50);
    });

    // Keyboard navigation (only when carousel or its children are focused)
    document.addEventListener('keydown', function (e) {
        var section = document.querySelector('.personal-projects');
        if (!section) return;
        var focused = document.activeElement;
        if (!section.contains(focused) && focused !== document.body) return;
        if (e.key === 'ArrowLeft') { stopAutoScroll(); scrollToIndex(currentIndex - 1); }
        if (e.key === 'ArrowRight') { stopAutoScroll(); scrollToIndex(currentIndex + 1); }
    });

    // Initialise — scroll to card 0 without animation, then start auto-scroll
    scrollToIndex(0, false);
    startAutoScroll();
})();
