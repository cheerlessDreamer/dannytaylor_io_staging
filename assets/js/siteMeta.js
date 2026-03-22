(function () {
    'use strict';

    var outro = document.querySelector('.outro');
    var trigger = document.querySelector('.site-meta-trigger');
    var backBtn = document.querySelector('.site-meta-back');
    var metaPanel = document.querySelector('.outro-meta');

    if (!outro || !trigger || !backBtn) return;

    trigger.addEventListener('click', function () {
        outro.classList.add('is-meta');
        metaPanel.removeAttribute('aria-hidden');
    });

    backBtn.addEventListener('click', function () {
        outro.classList.remove('is-meta');
        metaPanel.setAttribute('aria-hidden', 'true');
    });
})();
