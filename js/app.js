// js/app.js – Page d'accueil : affichage de 3 événements à la une

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  const featured = EVENTS.slice(0, 3);

  grid.innerHTML = featured.map(event => buildEventCard(event)).join('');
});

function buildEventCard(event) {
  const stockClass = event.stock <= 10 ? 'low' : '';
  const stockText = event.stock <= 10
    ? `⚠️ Plus que ${event.stock} places !`
    : `${event.stock} places disponibles`;

  return `
    <div class="event-card" onclick="openDetail(${event.id})" role="button" tabindex="0" aria-label="Voir ${event.title}">
      <div class="event-card__banner" style="background:${event.color};">
        <span class="event-card__cat-badge">${event.category}</span>
        <span>${event.emoji}</span>
      </div>
      <div class="event-card__body">
        <h3 class="event-card__title">${event.title}</h3>
        <div class="event-card__meta">
          <span>📅 ${event.date} à ${event.time}</span>
          <span>📍 ${event.location}</span>
        </div>
        <div class="event-card__footer">
          <span class="event-card__price">${event.price.toLocaleString('fr-FR')} FCFA</span>
          <span class="event-card__stock ${stockClass}">${stockText}</span>
        </div>
      </div>
    </div>
  `;
}

// Keyboard accessibility
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement.classList.contains('event-card')) {
    document.activeElement.click();
  }
});
