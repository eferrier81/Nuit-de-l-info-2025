// Script principal de la landing page du Village Numérique Résistant
// Gère : navigation mobile, animations simples, stats fictives et formulaire "Rejoindre NIRD".

(function () {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.getElementById('nav-menu');
  const progressBar = document.getElementById('village-progress-bar');
  const progressValue = document.getElementById('village-progress-value');
  const statEls = document.querySelectorAll('[data-stat]');
  const joinModal = document.getElementById('join-modal');
  const joinForm = document.getElementById('join-form');
  const joinMessage = document.getElementById('join-form-message');
  const openJoinButtons = document.querySelectorAll('[data-open-join-modal]');
  const closeJoinTargets = document.querySelectorAll('[data-close-join-modal]');
  const faqHeaders = document.querySelectorAll('.faq-item__header');

  // Navigation mobile accessible
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      const next = !isOpen;
      navToggle.setAttribute('aria-expanded', String(next));
      navMenu.classList.toggle('nav__links--open', next);
    });
  }

  // Données fictives de stats NIRD
  const fakeStats = {
    schools: 128,
    servers: 42,
    licenses: 340,
    devices: 215,
  };

  // Animation simple de comptage
  function animateCounter(el, target, duration) {
    const start = 0;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic léger
      const value = Math.round(start + (target - start) * eased);
      el.textContent = value.toLocaleString('fr-FR');
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Initialisation des stats au premier affichage
  function initStats() {
    statEls.forEach((el) => {
      const key = el.getAttribute('data-stat');
      const value = fakeStats[key];
      if (typeof value === 'number') {
        animateCounter(el, value, 1200);
      }
    });
  }

  // Animation de la barre "Village Libre"
  function initProgressBar() {
    if (!progressBar || !progressValue) return;
    const target = 73; // progression fictive
    const duration = 1300;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      progressBar.style.width = value + '%';
      progressValue.textContent = value.toString();
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Gestion modale "Rejoindre NIRD"
  function openJoinModal() {
    if (!joinModal) return;
    joinModal.classList.add('modal--open');
    joinModal.setAttribute('aria-hidden', 'false');
    const firstField = joinModal.querySelector('input, select, button');
    if (firstField) {
      firstField.focus();
    }
  }

  function closeJoinModal() {
    if (!joinModal) return;
    joinModal.classList.remove('modal--open');
    joinModal.setAttribute('aria-hidden', 'true');
  }

  openJoinButtons.forEach((btn) => btn.addEventListener('click', openJoinModal));
  closeJoinTargets.forEach((el) => el.addEventListener('click', closeJoinModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeJoinModal();
    }
  });

  // Soumission du formulaire fictif
  if (joinForm && joinMessage) {
    joinForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const school = joinForm.querySelector('#school-name');
      const role = joinForm.querySelector('#role');
      const commits = joinForm.querySelectorAll('input[name="commit"]:checked');
      joinMessage.textContent = '';
      joinMessage.classList.remove('form-message--success', 'form-message--error');

      const errors = [];
      if (!school || !school.value.trim()) {
        errors.push("Merci d'indiquer le nom de l'établissement.");
      }
      if (!role || !role.value) {
        errors.push('Merci de préciser votre rôle.');
      }
      if (commits.length === 0) {
        errors.push('Choisis au moins un premier engagement NIRD.');
      }

      if (errors.length) {
        joinMessage.textContent = errors.join(' ');
        joinMessage.classList.add('form-message--error');
        return;
      }

      joinMessage.textContent =
        'Ton établissement rejoint la résistance NIRD ! Tu peux maintenant partager ce projet et passer à l’action avec ton équipe.';
      joinMessage.classList.add('form-message--success');
      joinForm.reset();
    });
  }

  // Déclenche les animations au chargement
  window.addEventListener('load', () => {
    initStats();
    initProgressBar();
  });

  // FAQ interactive (accordéons accessibles)
  faqHeaders.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-item__icon');

      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) {
        panel.hidden = expanded;
      }
      if (icon) {
        icon.textContent = expanded ? '+' : '–';
      }
    });
  });
})();
