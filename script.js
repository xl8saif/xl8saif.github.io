/* ============================================
   SAIF ULLAH PORTFOLIO — PRODUCTION JS
   Formspree-integrated, validated, verified
   ============================================ */

(function () {
  'use strict';

  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqpkaola';
  var MAX_FILE_SIZE = 10 * 1024 * 1024;
  var ALLOWED_EXTENSIONS = ['.pdf','.doc','.docx','.txt','.xliff','.tmx','.ttx','.xlsx','.csv','.zip','.rar'];

  function boot() {
    initNavigation();
    initModal();
    initSlideVerify();
    initFormValidation();
    initFileValidation();
    initBackToTop();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  function initNavigation() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    var links = document.querySelectorAll('.nav-link');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  function initModal() {
    var modal = document.getElementById('hire-modal');
    if (!modal) return;
    var closeButtons = modal.querySelectorAll('[data-close-modal]');
    var hireButtons = document.querySelectorAll('.hire-btn');
    var collabButtons = document.querySelectorAll('.collab-btn');
    var langInput = document.getElementById('hire-selected-language');
    var langDisplay = document.getElementById('hire-language-display');
    var serviceInput = document.getElementById('hire-service');
    var serviceDisplay = document.getElementById('hire-service-display');
    var form = document.getElementById('hire-form');
    var successMessage = document.getElementById('form-success');
    var statusDiv = document.getElementById('form-status');

    function openModal(language, service) {
      if (form) {
        form.reset();
        form.style.display = '';
      }
      if (successMessage) successMessage.classList.remove('visible');
      if (statusDiv) {
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';
      }
      if (typeof window.resetSlideVerify === 'function') window.resetSlideVerify();
      clearAllErrors();
      if (langInput) langInput.value = language || '';
      if (langDisplay) langDisplay.value = language || 'General / Not Specified';
      var svc = service || 'Translation / Localization';
      if (serviceInput) serviceInput.value = svc;
      if (serviceDisplay) serviceDisplay.value = svc;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'flex';
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
      modal.style.pointerEvents = 'auto';
      document.body.style.overflow = 'hidden';

      var firstInput = modal.querySelector('input:not([type="hidden"]):not([readonly]):not([tabindex="-1"])');
      if (firstInput) setTimeout(function () { firstInput.focus(); }, 100);
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = '';
      modal.style.visibility = '';
      modal.style.opacity = '';
      modal.style.pointerEvents = '';
      document.body.style.overflow = '';
    }

    hireButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(btn.getAttribute('data-lang') || '', btn.getAttribute('data-service') || 'Translation / Localization');
      });
    });
    collabButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(btn.getAttribute('data-lang') || 'General / Not Specified', btn.getAttribute('data-service') || 'Language Preservation / Documentation');
      });
    });
    closeButtons.forEach(function (btn) { btn.addEventListener('click', closeModal); });
    var overlay = modal.querySelector('.modal__overlay');
    if (overlay) overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validateForm(form)) return;
        var submitBtn = document.getElementById('submit-btn');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }
        if (statusDiv) { statusDiv.textContent = 'Submitting your request...'; statusDiv.className = 'form-status form-status--info'; }
        fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
          .then(function (response) {
            if (!response.ok) throw new Error('Submission failed. Please try again.');
            if (form) form.style.display = 'none';
            if (successMessage) successMessage.classList.add('visible');
            if (statusDiv) { statusDiv.textContent = ''; statusDiv.className = 'form-status'; }
          })
          .catch(function (err) {
            if (statusDiv) { statusDiv.textContent = err.message || 'Something went wrong. Please email directly: xl8.saif@gmail.com'; statusDiv.className = 'form-status form-status--error'; }
          })
          .finally(function () {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Your Request'; }
          });
      });
    }
  }

  function initSlideVerify() {
    var container = document.getElementById('slide-verify');
    if (!container) return;
    var thumb = document.getElementById('slide-thumb');
    var fill = document.getElementById('slide-fill');
    var text = document.getElementById('slide-text');
    var verifiedField = document.getElementById('verified-field');
    var submitBtn = document.getElementById('submit-btn');
    if (!thumb || !fill || !text) return;
    var dragging = false;
    var verified = false;
    function width() { return Math.max(0, container.offsetWidth - thumb.offsetWidth); }
    function setVerified() {
      verified = true; container.classList.add('verified'); text.textContent = 'Verified ✓';
      if (verifiedField) verifiedField.value = 'true';
      if (submitBtn) submitBtn.disabled = false;
      thumb.setAttribute('tabindex', '-1');
    }
    function update(clientX) {
      var rect = container.getBoundingClientRect(); var max = width();
      var x = Math.max(0, Math.min(clientX - rect.left - thumb.offsetWidth / 2, max));
      var percent = max ? (x / max) * 100 : 100;
      thumb.style.left = x + 'px'; fill.style.width = percent + '%';
      thumb.setAttribute('aria-valuenow', String(Math.round(percent)));
      if (percent >= 95) setVerified();
    }
    window.resetSlideVerify = function () {
      verified = false; dragging = false; thumb.style.left = '0px'; fill.style.width = '0%';
      thumb.setAttribute('aria-valuenow', '0'); thumb.setAttribute('tabindex', '0');
      container.classList.remove('verified'); text.textContent = 'Slide to verify →';
      if (verifiedField) verifiedField.value = 'false'; if (submitBtn) submitBtn.disabled = true;
    };
    thumb.addEventListener('mousedown', function (e) { if (verified) return; dragging = true; e.preventDefault(); });
    document.addEventListener('mousemove', function (e) { if (dragging) update(e.clientX); });
    document.addEventListener('mouseup', function () { if (!dragging) return; dragging = false; if (!verified) { thumb.style.left = '0px'; fill.style.width = '0%'; } });
    thumb.addEventListener('touchstart', function () { if (!verified) dragging = true; }, { passive: true });
    document.addEventListener('touchmove', function (e) { if (dragging && e.touches[0]) update(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchend', function () { if (!dragging) return; dragging = false; if (!verified) { thumb.style.left = '0px'; fill.style.width = '0%'; } });
    thumb.addEventListener('keydown', function (e) {
      if (verified) return;
      if (e.key === 'ArrowRight' || e.key === 'End') { e.preventDefault(); thumb.style.left = width() + 'px'; fill.style.width = '100%'; thumb.setAttribute('aria-valuenow', '100'); setVerified(); }
    });
    window.resetSlideVerify();
  }

  function initFormValidation() {
    var form = document.getElementById('hire-form'); if (!form) return;
    form.querySelectorAll('input[required], textarea[required]').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () { if (input.classList.contains('invalid')) validateField(input); });
    });
  }
  function validateField(field) {
    var errorId = 'error-' + field.id.replace('hire-', ''); var errorEl = document.getElementById(errorId);
    var valid = field.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()) : field.value.trim().length > 0;
    field.classList.toggle('invalid', !valid); field.style.borderColor = valid ? '' : '#e74c3c'; if (errorEl) errorEl.classList.toggle('visible', !valid); return valid;
  }
  function clearAllErrors() {
    var form = document.getElementById('hire-form'); if (!form) return;
    form.querySelectorAll('.form-input').forEach(function (field) { field.classList.remove('invalid'); field.style.borderColor = ''; });
    form.querySelectorAll('.form-error').forEach(function (error) { error.classList.remove('visible'); });
  }
  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(function (field) { if (!validateField(field)) valid = false; });
    var verifiedField = document.getElementById('verified-field'); var verifyError = document.getElementById('error-verify');
    if (verifiedField && verifiedField.value !== 'true') { valid = false; if (verifyError) verifyError.classList.add('visible'); } else if (verifyError) verifyError.classList.remove('visible');
    return valid;
  }
  function initFileValidation() {
    var input = document.getElementById('hire-attachment'); var hint = document.getElementById('file-size-hint'); if (!input) return;
    input.addEventListener('change', function () {
      var file = input.files && input.files[0]; if (!file) { if (hint) hint.style.display = 'none'; return; }
      var ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      if (file.size > MAX_FILE_SIZE || ALLOWED_EXTENSIONS.indexOf(ext) === -1) {
        input.value = '';
        if (hint) { hint.textContent = file.size > MAX_FILE_SIZE ? 'File too large. Maximum size is 10 MB.' : 'File type not allowed. Accepted: PDF, DOC, DOCX, TXT, XLIFF, TMX, TTX, XLSX, CSV, ZIP, RAR.'; hint.style.display = 'block'; }
        return;
      }
      if (hint) { hint.textContent = 'Selected: ' + file.name; hint.style.display = 'block'; }
    });
  }
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top'); if (!btn) return;
    window.addEventListener('scroll', function () { btn.classList.toggle('visible', window.scrollY > 600); }, { passive: true });
    btn.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
  function initScrollAnimations() {
    if (!window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
    document.querySelectorAll('.section-header, .profile-card, .timeline-item, .work-card, .lang-card, .tech-item, .org-item, .social-link, .cta-card, .cred-item, .feature-block__content, .case-study__visual, .case-study__details, .preservation-content, .preservation-portrait').forEach(function (el, i) {
      el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.6s ease ' + ((i % 3) * 0.1) + 's, transform 0.6s ease ' + ((i % 3) * 0.1) + 's'; observer.observe(el);
    });
    var style = document.createElement('style'); style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }'; document.head.appendChild(style);
  }
})();
