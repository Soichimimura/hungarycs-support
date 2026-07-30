// ハンガリーCS留学支援 — interactions

(function () {
  'use strict';

  // -- Dynamic year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -- Toggleable check chips (both radio and checkbox styles)
  document.querySelectorAll('.check-chip').forEach((chip) => {
    const input = chip.querySelector('input');
    if (!input) return;

    // Initial state
    if (input.checked) chip.classList.add('selected');

    chip.addEventListener('click', (e) => {
      // let native click on input still work; sync visually
      setTimeout(() => syncChips(input.name, input.type), 0);
    });

    input.addEventListener('change', () => syncChips(input.name, input.type));
  });

  function syncChips(name, type) {
    document.querySelectorAll(`input[name="${name}"]`).forEach((inp) => {
      const chip = inp.closest('.check-chip');
      if (!chip) return;
      if (inp.checked) {
        chip.classList.add('selected');
      } else {
        chip.classList.remove('selected');
      }
    });
  }

  // -- Form submission validation (real submit goes to Formsubmit.co)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const data = new FormData(form);
      const status = data.get('status');
      const contact = data.get('contact');
      const topic = data.get('topic');
      const types = data.getAll('type');

      if (!contact || !topic || !status) {
        e.preventDefault();
        alert('連絡先・現在の状況・相談内容は必須項目です。');
        return;
      }
      if (types.length === 0) {
        e.preventDefault();
        alert('相談種別を1つ以上選択してください。');
        return;
      }
      // Valid — let the browser submit to Formsubmit.co
    });
  }

  // -- Smooth in-page scroll to hash after nav sticky offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
