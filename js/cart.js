// js/cart.js – Gestion du panier d'achats

const Cart = (() => {
  let items = [];

  // --- MÉTHODES PUBLIQUES ---

  function add(event, qty = 1) {
    const existing = items.find(i => i.id === event.id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ ...event, qty });
    }
    updateUI();
    showToast(`✅ ${event.title} ajouté au panier`);
  }

  function remove(id) {
    items = items.filter(i => i.id !== id);
    updateUI();
  }

  function changeQty(id, delta) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) remove(id);
    else updateUI();
  }

  function clear() {
    items = [];
    updateUI();
  }

  function getTotal() {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCount() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  // --- RENDU ---

  function updateUI() {
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = getCount();

    renderCartModal();
  }

  function renderCartModal() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    if (!cartItemsEl) return;

    if (items.length === 0) {
      cartItemsEl.innerHTML = '<p class="cart-empty">🛒 Votre panier est vide.</p>';
    } else {
      cartItemsEl.innerHTML = items.map(item => `
        <div class="cart-item">
          <span class="cart-item__name">${item.emoji} ${item.title}</span>
          <div class="cart-item__qty">
            <button onclick="Cart.changeQty(${item.id}, -1)" aria-label="Diminuer">−</button>
            <span>${item.qty}</span>
            <button onclick="Cart.changeQty(${item.id}, 1)" aria-label="Augmenter">+</button>
          </div>
          <span class="cart-item__price">${formatPrice(item.price * item.qty)}</span>
          <button class="cart-item__remove" onclick="Cart.remove(${item.id})" aria-label="Supprimer">🗑</button>
        </div>
      `).join('');
    }

    if (cartTotalEl) cartTotalEl.textContent = formatPrice(getTotal());
  }

  // --- HELPERS ---

  function formatPrice(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
  }

  // --- INITIALISATION ---

  function init() {
    // Bouton panier
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const confirmModal = document.getElementById('confirmModal');
    const closeConfirm = document.getElementById('closeConfirm');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.navbar__links');

    if (cartBtn && cartModal) {
      cartBtn.addEventListener('click', () => {
        renderCartModal();
        cartModal.classList.add('active');
      });
    }
    if (closeCart && cartModal) {
      closeCart.addEventListener('click', () => cartModal.classList.remove('active'));
      cartModal.addEventListener('click', e => { if (e.target === cartModal) cartModal.classList.remove('active'); });
    }
    if (checkoutBtn && confirmModal && cartModal) {
      checkoutBtn.addEventListener('click', () => {
        if (items.length === 0) { showToast('⚠️ Votre panier est vide'); return; }
        cartModal.classList.remove('active');
        confirmModal.classList.add('active');
        clear();
      });
    }
    if (closeConfirm && confirmModal) {
      closeConfirm.addEventListener('click', () => {
        confirmModal.classList.remove('active');
        window.location.href = 'index.html';
      });
    }
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    updateUI();
  }

  return { add, remove, changeQty, clear, getTotal, getCount, init };
})();

// Utilitaire toast
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', Cart.init);
