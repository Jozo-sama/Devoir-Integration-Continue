// js/events.js – Page événements : liste, filtres, modal détail

let currentQty = 1;
let currentEvent = null;

document.addEventListener('DOMContentLoaded', () => {
  renderEvents(EVENTS);

  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
});

// ---- RENDU DES CARTES ----

function renderEvents(list) {
  const grid = document.getElementById('eventsGrid');
  const noResult = document.getElementById('noResult');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '';
    if (noResult) noResult.style.display = 'block';
    return;
  }
  if (noResult) noResult.style.display = 'none';

  grid.innerHTML = list.map(event => buildEventCard(event)).join('');
}

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

// ---- FILTRES ----

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  const filtered = EVENTS.filter(event => {
    const matchSearch = event.title.toLowerCase().includes(search) ||
                        event.location.toLowerCase().includes(search);
    const matchCategory = category === '' || event.category === category;
    return matchSearch && matchCategory;
  });

  renderEvents(filtered);
}

// ---- MODAL DÉTAIL ----

function openDetail(id) {
  currentEvent = EVENTS.find(e => e.id === id);
  if (!currentEvent) return;
  currentQty = 1;

  const modal = document.getElementById('detailModal');
  const content = document.getElementById('detailContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="detail-banner" style="background:${currentEvent.color};">${currentEvent.emoji}</div>
    <div class="detail-cat-badge">${currentEvent.category}</div>
    <h2 class="detail-title">${currentEvent.title}</h2>
    <div class="detail-meta">
      <span>📅 ${currentEvent.date} à ${currentEvent.time}</span>
      <span>📍 ${currentEvent.location}</span>
      <span>🎟 ${currentEvent.stock} places disponibles</span>
    </div>
    <p class="detail-desc">${currentEvent.description}</p>
    <div class="detail-price" id="detailPrice">${currentEvent.price.toLocaleString('fr-FR')} FCFA</div>
    <div class="detail-footer">
      <div class="qty-control">
        <button onclick="changeDetailQty(-1)" aria-label="Diminuer quantité">−</button>
        <span id="detailQty">1</span>
        <button onclick="changeDetailQty(1)" aria-label="Augmenter quantité">+</button>
      </div>
      <button class="btn btn--primary" onclick="addToCartFromDetail()">Ajouter au panier</button>
    </div>
  `;

  modal.classList.add('active');
}

function changeDetailQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  const qtyEl = document.getElementById('detailQty');
  const priceEl = document.getElementById('detailPrice');
  if (qtyEl) qtyEl.textContent = currentQty;
  if (priceEl) priceEl.textContent = (currentEvent.price * currentQty).toLocaleString('fr-FR') + ' FCFA';
}

function addToCartFromDetail() {
  if (!currentEvent) return;
  Cart.add(currentEvent, currentQty);
  document.getElementById('detailModal').classList.remove('active');
}

// Fermeture modal détail
document.addEventListener('DOMContentLoaded', () => {
  const closeDetail = document.getElementById('closeDetail');
  const detailModal = document.getElementById('detailModal');
  if (closeDetail && detailModal) {
    closeDetail.addEventListener('click', () => detailModal.classList.remove('active'));
    detailModal.addEventListener('click', e => { if (e.target === detailModal) detailModal.classList.remove('active'); });
  }
});
