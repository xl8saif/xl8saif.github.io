(() => {
  'use strict';
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  const languageNames = [
    ['العربية', 'rtl', true],
    ['اردو', 'rtl', true],
    ['انڈس کوہستانی', 'rtl', false],
    ['English', 'ltr', false],
    ['فارسی', 'rtl', true],
    ['شینا', 'rtl', false],
    ['پښتو', 'rtl', true],
    ['ਪੰਜਾਬੀ', 'ltr', false],
    ['گوجری', 'rtl', false],
    ['Türkçe', 'ltr', false]
  ];

  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@700&display=swap');
    .lang-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: 42px;
      align-items: stretch;
    }
    .lang-grid div {
      min-width: 0;
      min-height: 68px;
      padding: 15px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .lang-grid div b {
      min-width: 0;
      font-weight: 800;
      line-height: 1.25;
    }
    .lang-grid div span {
      flex: 0 0 auto;
      white-space: nowrap;
      text-align: right;
      line-height: 1.3;
    }
    .lang-grid .native-script {
      font-family: 'Scheherazade New', 'Scheherazade', serif;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 1.45;
      direction: rtl;
      unicode-bidi: isolate;
    }
    @media (max-width: 680px) {
      .lang-grid {
        grid-template-columns: 1fr;
        column-gap: 0;
      }
      .lang-grid div {
        min-height: 62px;
      }
    }
  `;
  document.head.appendChild(style);

  const languageRows = document.querySelectorAll('.lang-grid > div');
  languageRows.forEach((row, index) => {
    const label = row.querySelector('b');
    const item = languageNames[index];
    if (!label || !item) return;
    label.textContent = item[0];
    label.classList.toggle('native-script', item[2]);
    label.setAttribute('dir', item[1]);
    label.setAttribute('lang', item[1] === 'rtl' ? 'ar' : 'en');
  });
})();