// js/contact.js – Validation et soumission du formulaire de contact

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) sendBtn.addEventListener('click', handleSubmit);
});

function handleSubmit() {
  clearErrors();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  let valid = true;

  if (!name) {
    showError('nameError', 'Le nom est obligatoire.');
    valid = false;
  }

  if (!email) {
    showError('emailError', "L'email est obligatoire.");
    valid = false;
  } else if (!isValidEmail(email)) {
    showError('emailError', "Veuillez saisir un email valide.");
    valid = false;
  }

  if (!subject) {
    showError('subjectError', 'Veuillez choisir un sujet.');
    valid = false;
  }

  if (!message || message.length < 10) {
    showError('messageError', 'Le message doit contenir au moins 10 caractères.');
    valid = false;
  }

  if (!valid) return;

  // Simulation d'envoi (pas de backend)
  const sendBtn = document.getElementById('sendBtn');
  sendBtn.textContent = 'Envoi en cours...';
  sendBtn.disabled = true;

  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    sendBtn.style.display = 'none';
    // Réinitialiser les champs
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
  }, 1000);
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
