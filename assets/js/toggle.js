(function () {
    'use strict';

    document.querySelectorAll('[data-toggle-target]').forEach(function (trigger) {
        var targetId = trigger.getAttribute('data-toggle-target');
        var target = document.getElementById(targetId);
        var textOpen = trigger.getAttribute('data-toggle-text-open');
        var textClosed = trigger.getAttribute('data-toggle-text-closed');

        if (!target) return;

        trigger.addEventListener('click', function () {
            var isOpen = target.classList.toggle('is-open');
            target.setAttribute('aria-hidden', !isOpen);
            trigger.setAttribute('aria-expanded', isOpen);

            if (textOpen && textClosed) {
                var span = trigger.querySelector('span') || trigger;
                span.textContent = isOpen ? textOpen : textClosed;
            }
        });
    });
})();
