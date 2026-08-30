(() => {
  'use strict';

  const ready = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  };

  ready(() => {
    const modal = document.getElementById('hire-modal');
    const serviceField = document.getElementById('hire-service');
    const languageField = document.getElementById('hire-language');
    const form = document.getElementById('hire-form');
    const status = document.getElementById('form-status');
    const continueButton = document.getElementById('continue-hire');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('nav-links');

    const openModal = (button) => {
      const service = button?.dataset.service || '';
      const language = button?.dataset.lang || '';
      if (serviceField) serviceField.value = service;
      if (languageField) languageField.value = language;
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        modal.querySelector('.modal-close')?.focus();
      }
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };

    document.querySelectorAll('.hire-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(button);
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach((element) => {
      element.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
    });

    continueButton?.addEventListener('click', () => {
      closeModal();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => form?.querySelector('input[name="name"]')?.focus(), 450);
    });

    navToggle?.addEventListener('click', () => {
      const open = navLinks?.classList.toggle('open') ?? false;
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      });
    });

    const projectType = document.getElementById('project-type');
    projectType?.addEventListener('change', () => {
      if (projectType.value && serviceField) serviceField.value = projectType.value;
    });

    form?.addEventListener('submit', () => {
      if (status) status.textContent = 'Sending your inquiry…';
    });

    console.info('Saif Ullah portfolio initialized:', document.querySelectorAll('.hire-btn').length, 'Hire buttons');
  });
})();