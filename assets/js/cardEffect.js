/**
 * Card shrink effect: As the footer scrolls into view, the main content
 * shrinks slightly to reveal a border matching the footer background colour,
 * giving the impression that the content is a 'card'.
 */
(function() {
    'use strict';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const contentCard = document.querySelector('.content-card');
    const footer = document.querySelector('.outro');

    if (!contentCard || !footer) return;

    const SHRINK_AMOUNT = 0.10; // 4% scale reduction when footer fully visible

    let ticking = false;

    function updateScale() {
        const scrollY = window.scrollY ?? window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const footerTop = footer.getBoundingClientRect().top + scrollY;

        // Footer enters when viewport bottom reaches footer top
        const startScroll = footerTop - viewportHeight;
        const endScroll = footerTop;

        // Progress 0–1 over the scroll distance as footer enters viewport
        const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / (endScroll - startScroll) || 0));
        const scale = 1 - progress * SHRINK_AMOUNT;

        contentCard.style.transform = `scale(${scale})`;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateScale);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScale);
    updateScale(); // Initial call in case page loads scrolled
})();