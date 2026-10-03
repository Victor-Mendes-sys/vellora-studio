const menuToggle = document.querySelector('#menu-toggle');
const siteNav = document.querySelector('#site-nav');
const contactForm = document.querySelector('#contact-form');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  siteNav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    siteNav.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = encodeURIComponent(`Orçamento Vellora Studio — ${service}`);
    const body = encodeURIComponent(
      `Olá! Meu nome é ${name}.\n` +
      `Meu e-mail: ${email}\n` +
      `Serviço de interesse: ${service}\n\n` +
      `Sobre o projeto:\n${message}`
    );

    const note = document.querySelector('#form-note');
    if (note) note.textContent = 'Abrindo seu aplicativo de e-mail. Revise a mensagem e toque em enviar para concluir o contato.';
    window.location.href = `mailto:victormendes.work@gmail.com?subject=${subject}&body=${body}`;
  });
}
