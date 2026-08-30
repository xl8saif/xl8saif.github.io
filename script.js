/* ============================================
   SAIF ULLAH PORTFOLIO — PRODUCTION JS
   Formspree-integrated, validated, verified
   ============================================ */

(function() {
  'use strict';

  /* ----- Constants ----- */
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqpkaola';
  var MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  var ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/x-xliff+xml',
    'application/x-tmx+xml',
    'application/x-ttx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'application/zip',
    'application/x-rar-compressed',
    'application/vnd.rar'
  ];
  var ALLOWED_EXTENSIONS = ['.pdf','.doc','.docx','.txt','.xliff','.tmx','.ttx','.xlsx','.csv','.zip','.rar'];

  /* ----- DOM Ready ----- */
  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initModal();
    initSlideVerify();
    initFormValidation();
    initFileValidation();
    initBackToTop();
    initScrollAnimations();
  });

  /* ----- Navigation ----- */
  function initNavigation() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    var links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(function(link) {
      link.addEventListener('click', function() {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----- Modal ----- */
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
      // Reset form state
      if (form) {
        form.reset();
        form.style.display = '';
      }
      if (successMessage) successMessage.classList.remove('visible');
      if (statusDiv) {
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';
      }
      resetSlideVerify();
      clearAllErrors();

      // Populate language
      if (langInput) langInput.value = language || '';
      if (langDisplay) langDisplay.value = language || 'General / Not Specified';

      // Populate service
      var svc = service || 'Translation / Localization';
      if (serviceInput) serviceInput.value = svc;
      if (serviceDisplay) serviceDisplay.value = svc;

      // Show modal
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus first input
      var firstInput = modal.querySelector('input:not([type="hidden"]):not([readonly]):not([tabindex="-1"])');
      if (firstInput) {
        setTimeout(function() { firstInput.focus(); }, 100);
      }
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Reset after delay
      setTimeout(function() {
        if (form) {
          form.reset();
          form.style.display = '';
        }
        if (successMessage) successMessage.classList.remove('visible');
        if (statusDiv) {
          statusDiv.textContent = '';
          statusDiv.className = 'form-status';
        }
        resetSlideVerify();
        clearAllErrors();
      }, 300);
    }

    // Hire buttons (language cards + CTA)
    hireButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var lang = btn.getAttribute('data-lang') || '';
        var svc = btn.getAttribute('data-service') || 'Translation / Localization';
        openModal(lang, svc);
      });
    });

    // Collaborate buttons
    collabButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var lang = btn.getAttribute('data-lang') || 'General / Not Specified';
        var svc = btn.getAttribute('data-service') || 'Language Preservation / Documentation';
        openModal(lang, svc);
      });
    });

    // Close buttons
    closeButtons.forEach(function(btn) {
      btn.addEventListener('click', closeModal);
    });

    // ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Click overlay to close
    var overlay = modal.querySelector('.modal__overlay');
    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    // Form submission
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm(form)) return;

        var submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        if (statusDiv) {
          statusDiv.textContent = 'Submitting your request...';
          statusDiv.className = 'form-status form-status--info';
        }

        var formData = new FormData(form);

        fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
        .then(function(response) {
          if (response.ok) {
            // Success
            if (form) form.style.display = 'none';
            if (successMessage) successMessage.classList.add('visible');
            if (statusDiv) {
              statusDiv.textContent = '';
              statusDiv.className = 'form-status';
            }
          } else {
            return response.json().then(function(data) {
              throw new Error(data.error || 'Submission failed. Please try again.');
            }).catch(function() {
              throw new Error('Submission failed. Please try again.');
            });
          }
        })
        .catch(function(err) {
          if (statusDiv) {
            statusDiv.textContent = err.message || 'Something went wrong. Please email directly: xl8.saif@gmail.com';
            statusDiv.className = 'form-status form-status--error';
          }
        })
        .finally(function() {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Your Request';
          }
        });
      });
    }
  }

  /* ----- Slide Verification ----- */
  function initSlideVerify() {
    var container = document.getElementById('slide-verify');
    if (!container) return;

    var thumb = document.getElementById('slide-thumb');
    var fill = document.getElementById('slide-fill');
    var text = document.getElementById('slide-text');
    var verifiedField = document.getElementById('verified-field');
    var submitBtn = document.getElementById('submit-btn');

    var isDragging = false;
    var isVerified = false;

    function trackWidth() {
      return container.offsetWidth - thumb.offsetWidth;
    }

    function updatePosition(clientX) {
      var rect = container.getBoundingClientRect();
      var x = clientX - rect.left - thumb.offsetWidth / 2;
      x = Math.max(0, Math.min(x, trackWidth()));
      var percent = (x / trackWidth()) * 100;

      thumb.style.left = x + 'px';
      fill.style.width = percent + '%';
      thumb.setAttribute('aria-valuenow', Math.round(percent));

      if (percent >= 95 && !isVerified) {
        isVerified = true;
        container.classList.add('verified');
        text.textContent = 'Verified ✓';
        if (verifiedField) verifiedField.value = 'true';
        if (submitBtn) submitBtn.disabled = false;
        thumb.setAttribute('tabindex', '-1');
      }
    }

    window.resetSlideVerify = function() {
      isVerified = false;
      isDragging = false;
      thumb.style.left = '0px';
      fill.style.width = '0%';
      thumb.setAttribute('aria-valuenow', '0');
      container.classList.remove('verified');
      text.textContent = 'Slide to verify →';
      if (verifiedField) verifiedField.value = 'false';
      if (submitBtn) submitBtn.disabled = true;
      thumb.setAttribute('tabindex', '0');
    };

    // Mouse
    thumb.addEventListener('mousedown', function(e) {
      if (isVerified) return;
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      updatePosition(e.clientX);
    });

    document.addEventListener('mouseup', function() {
      if (!isDragging) return;
      isDragging = false;
      if (!isVerified) {
        thumb.style.transition = 'left 0.3s ease';
        fill.style.transition = 'width 0.3s ease';
        thumb.style.left = '0px';
        fill.style.width = '0%';
        setTimeout(function() {
          thumb.style.transition = '';
          fill.style.transition = '';
        }, 300);
      }
    });

    // Touch
    thumb.addEventListener('touchstart', function(e) {
      if (isVerified) return;
      isDragging = true;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', function() {
      if (!isDragging) return;
      isDragging = false;
      if (!isVerified) {
        thumb.style.transition = 'left 0.3s ease';
        fill.style.transition = 'width 0.3s ease';
        thumb.style.left = '0px';
        fill.style.width = '0%';
        setTimeout(function() {
          thumb.style.transition = '';
          fill.style.transition = '';
        }, 300);
      }
    });

    // Keyboard
    thumb.addEventListener('keydown', function(e) {
      if (isVerified) return;
      if (e.key === 'ArrowRight' || e.key === 'End') {
        e.preventDefault();
        thumb.style.left = trackWidth() + 'px';
        fill.style.width = '100%';
        thumb.setAttribute('aria-valuenow', '100');
        isVerified = true;
        container.classList.add('verified');
        text.textContent = 'Verified ✓';
        if (verifiedField) verifiedField.value = 'true';
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* ----- Form Validation ----- */
  function initFormValidation() {
    var form = document.getElementById('hire-form');
    if (!form) return;

    var inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(input);
      });
      input.addEventListener('input', function() {
        if (input.classList.contains('invalid')) {
          validateField(input);
        }
      });
    });
  }

  function validateField(field) {
    var errorId = 'error-' + field.id.replace('hire-', '');
    var errorEl = document.getElementById(errorId);
    var isValid = true;

    if (field.type === 'email') {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(field.value.trim());
    } else {
      isValid = field.value.trim().length > 0;
    }

    if (!isValid) {
      field.classList.add('invalid');
      field.style.borderColor = '#e74c3c';
      if (errorEl) errorEl.classList.add('visible');
    } else {
      field.classList.remove('invalid');
      field.style.borderColor = '';
      if (errorEl) errorEl.classList.remove('visible');
    }

    return isValid;
  }

  function clearAllErrors() {
    var form = document.getElementById('hire-form');
    if (!form) return;
    var fields = form.querySelectorAll('.form-input');
    fields.forEach(function(field) {
      field.classList.remove('invalid');
      field.style.borderColor = '';
    });
    var errors = form.querySelectorAll('.form-error');
    errors.forEach(function(err) {
      err.classList.remove('visible');
    });
  }

  function validateForm(form) {
    var requiredFields = form.querySelectorAll('input[required], textarea[required]');
    var isValid = true;

    requiredFields.forEach(function(field) {
      if (!validateField(field)) isValid = false;
    });

    // Slide verification
    var verifiedField = document.getElementById('verified-field');
    var verifyError = document.getElementById('error-verify');
    if (verifiedField && verifiedField.value !== 'true') {
      isValid = false;
      if (verifyError) verifyError.classList.add('visible');
    } else {
      if (verifyError) verifyError.classList.remove('visible');
    }

    return isValid;
  }

  /* ----- File Validation ----- */
  function initFileValidation() {
    var fileInput = document.getElementById('hire-attachment');
    var sizeHint = document.getElementById('file-size-hint');
    if (!fileInput) return;

    fileInput.addEventListener('change', function() {
      var file = fileInput.files[0];
      if (!file) {
        if (sizeHint) sizeHint.style.display = 'none';
        return;
      }

      // Check size
      if (file.size > MAX_FILE_SIZE) {
        fileInput.value = '';
        if (sizeHint) {
          sizeHint.textContent = 'File too large. Maximum size is 10 MB. Your file: ' + formatSize(file.size);
          sizeHint.style.color = '#e74c3c';
          sizeHint.style.display = 'block';
        }
        return;
      }

      // Check extension
      var ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      var typeOk = ALLOWED_EXTENSIONS.indexOf(ext) !== -1;
      var mimeOk = ALLOWED_TYPES.indexOf(file.type) !== -1;

      if (!typeOk && !mimeOk) {
        fileInput.value = '';
        if (sizeHint) {
          sizeHint.textContent = 'File type not allowed. Accepted: PDF, DOC, DOCX, TXT, XLIFF, TMX, TTX, XLSX, CSV, ZIP, RAR.';
          sizeHint.style.color = '#e74c3c';
          sizeHint.style.display = 'block';
        }
        return;
      }

      // Show file info
      if (sizeHint) {
        sizeHint.textContent = 'Selected: ' + file.name + ' (' + formatSize(file.size) + ')';
        sizeHint.style.color = 'var(--accent-gold)';
        sizeHint.style.display = 'block';
      }
    });
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  /* ----- Back to Top ----- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----- Scroll Animations ----- */
  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    var animateElements = document.querySelectorAll(
      '.section-header, .profile-card, .timeline-item, .work-card, ' +
      '.lang-card, .tech-item, .org-item, .social-link, .cta-card, ' +
      '.cred-item, .feature-block__content, .case-study__visual, ' +
      '.case-study__details, .preservation-content, .preservation-portrait'
    );

    animateElements.forEach(function(el, index) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease ' + (index % 3 * 0.1) + 's, transform 0.6s ease ' + (index % 3 * 0.1) + 's';
      observer.observe(el);
    });

    var style = document.createElement('style');
    style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }

})();
