/* ============================================================
   STORE JS — STMNT Grooming Goods Shop (Popup)
   Davinchi BarberShop — Bilingual (ES / EN)
   ============================================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────── */
  const WHATSAPP_NUMBER = '573022903588';

  /* ─────────────────────────────────────────
     I18N STRINGS FOR STORE & CART
  ───────────────────────────────────────── */
  const STORE_STRINGS = {
    en: {
      suggestedPrice: 'Price',
      profPrice: 'Professional price',
      inquire: 'Inquire',
      add: 'Add',
      added: '✓ Added',
      decrease: 'Decrease',
      increase: 'Increase',
      quantity: 'Quantity',
      addToCart: 'Add to cart',
      imageComingSoon: 'Image<br>coming soon',
      emptyCart: 'Your cart is empty',
      productCountSingle: 'product',
      productCountPlural: 'products',
      each: 'each',
      remove: 'Remove',
      formAlert: 'Please fill in all fields before continuing.',
      // Categories
      catCare: 'Care',
      catJulius: 'Julius Cvesar',
      catNomad: 'Nomad Barber',
      catStaygold: 'Staygold',
      catBackwash: 'Backwashes',
      // WhatsApp message
      waGreeting: 'Hello Davinchi BarberShop! I would like to place an *order for STMNT products* 🛍️\n\n',
      waClientData: '*👤 Customer information:*\n',
      waName: '• Name: ',
      waDoc: '• ID / Document: ',
      waPhone: '• Phone: ',
      waAddress: '• Delivery address: ',
      waProductsHeader: '\n*📦 Requested products:*\n',
      waTotal: '\n*💰 Estimated total: ',
      waClosing: '\n\nI look forward to your confirmation. Thank you! 🙏'
    },
    es: {
      suggestedPrice: 'Precio',
      profPrice: 'Precio profesional',
      inquire: 'Consultar',
      add: 'Agregar',
      added: '✓ Agregado',
      decrease: 'Disminuir',
      increase: 'Aumentar',
      quantity: 'Cantidad',
      addToCart: 'Agregar al carrito',
      imageComingSoon: 'Imagen<br>próximamente',
      emptyCart: 'Tu carrito está vacío',
      productCountSingle: 'producto',
      productCountPlural: 'productos',
      each: 'c/u',
      remove: 'Eliminar',
      formAlert: 'Por favor completa todos los campos antes de continuar.',
      // Categories
      catCare: 'Care',
      catJulius: 'Julius Cvesar',
      catNomad: 'Nomad Barber',
      catStaygold: 'Staygold',
      catBackwash: 'Lavacabezas',
      // WhatsApp message
      waGreeting: '¡Hola Davinchi BarberShop! Quiero realizar un *pedido de productos STMNT* 🛍️\n\n',
      waClientData: '*👤 Datos del cliente:*\n',
      waName: '• Nombre: ',
      waDoc: '• Documento: ',
      waPhone: '• Teléfono: ',
      waAddress: '• Dirección de entrega: ',
      waProductsHeader: '\n*📦 Productos solicitados:*\n',
      waTotal: '\n*💰 Total estimado: ',
      waClosing: '\n\nQuedo atento/a a la confirmación. ¡Gracias! 🙏'
    }
  };

  function getLang() {
    return (document.documentElement.getAttribute('lang') === 'es') ? 'es' : 'en';
  }

  function t(key) {
    const lang = getLang();
    return (STORE_STRINGS[lang] && STORE_STRINGS[lang][key]) || STORE_STRINGS.en[key] || '';
  }

  /* ─────────────────────────────────────────
     PRODUCT CATALOG
  ───────────────────────────────────────── */
  const PRODUCTS = {
    care: {
      key: 'catCare',
      items: [
        { id: 'care-1', name: 'All-in-One Shampoo', size: '300ml', price: 84990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-All-in-One-Shampoo-300ml.png' },
        { id: 'care-2', name: 'Shampoo',             size: '300ml', price: 78990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Shampoo-300ml.png' },
        { id: 'care-3', name: 'Hydro Shampoo',       size: '300ml', price: 84990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Hydro-Shampoo-300ml.png' },
        { id: 'care-4', name: 'Conditioner',         size: '275ml', price: 84990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Conditioner-275ml.png' },
        { id: 'care-5', name: 'Beard Oil',           size: '50ml',  price: 102990, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Beard-Oil-50ml.png' },
        { id: 'care-6', name: 'HairBody Soapbar',    size: '125g',  price: 57990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-HairBody-Soapbar-125g.png' },
        { id: 'care-7', name: 'Serum',               size: '150ml', price: 94990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Serum-150ml.png' },
      ],
    },
    julius: {
      key: 'catJulius',
      items: [
        { id: 'jul-1', name: 'HairSpray',   size: '200ml', price: 78990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Hairspray-200ml.png' },
        { id: 'jul-2', name: 'Matte Paste', size: '100ml', price: 105990, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Matte-Paste-100ml.png' },
        { id: 'jul-3', name: 'Shine Paste', size: '100ml', price: 105990, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Shine-Paste-100ml.png' },
        { id: 'jul-4', name: 'Curl Cream',  size: '150ml', price: 94990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Curl-Cream-150ml.png' },
      ],
    },
    nomad: {
      key: 'catNomad',
      items: [
        { id: 'nom-1', name: 'Grooming Spray', size: '200ml', price: 78990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Grooming-Spray-200ml.png' },
        { id: 'nom-2', name: 'Classic Pomade', size: '100ml', price: 105990, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Classic-Pomade-100ml.png' },
        { id: 'nom-3', name: 'Dry Clay',       size: '100ml', price: 105990, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Dry-Clay-100ml.png' },
        { id: 'nom-4', name: 'Gel',            size: '150ml', price: 94990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Gel-150ml.png' },
      ],
    },
    staygold: {
      key: 'catStaygold',
      items: [
        { id: 'sg-1', name: 'Fiber Pomade',     size: '100ml', price: 105990, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Fiber-Pomade-100ml.png' },
        { id: 'sg-2', name: 'Wax Powder',       size: '15g',   price: 84990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Wax-Powder-15g.png' },
        { id: 'sg-3', name: 'Powder Spray',     size: '4g',    price: 84990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Powder-Spray-4g.png' },
        { id: 'sg-4', name: 'Definition Spray', size: '200ml', price: 78990,  img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Definition-Spray-200ml.png' },
      ],
    },
    backwash: {
      key: 'catBackwash',
      items: [
        { id: 'bw-1', name: 'All-in-One Shampoo', size: '750ml', price: null, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-All-in-One-Shampoo-750ml.png' },
        { id: 'bw-2', name: 'Shampoo',             size: '750ml', price: null, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Shampoo-750ml.png' },
        { id: 'bw-3', name: 'Hydro Shampoo',       size: '750ml', price: null, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Hydro-Shampoo-750ml.png' },
        { id: 'bw-4', name: 'Conditioner',         size: '675ml', price: null, img: 'https://stmntgrooming.com/cdn/shop/files/STMNT-Conditioner-675ml.png' },
      ],
    },
  };

  function getCategoryLabel(categoryKey) {
    const cat = PRODUCTS[categoryKey];
    if (!cat) return '';
    return t(cat.key);
  }

  function findProductById(id) {
    for (const catKey of Object.keys(PRODUCTS)) {
      const found = PRODUCTS[catKey].items.find(p => p.id === id);
      if (found) return found;
    }
    return null;
  }

  /* ─────────────────────────────────────────
     CART STATE
  ───────────────────────────────────────── */
  let cart = {};

  function cartCount() {
    return Object.values(cart).reduce((sum, e) => sum + e.qty, 0);
  }

  function cartTotal() {
    return Object.values(cart).reduce((sum, e) => {
      if (e.product.price) sum += e.product.price * e.qty;
      return sum;
    }, 0);
  }

  function formatPrice(n) {
    return '$ ' + n.toLocaleString('es-CO');
  }

  /* ─────────────────────────────────────────
     DOM HELPERS
  ───────────────────────────────────────── */
  function qs(sel, root) { return (root || document).querySelector(sel); }

  /* ─────────────────────────────────────────
     BUILD STORE HTML (inside popup)
  ───────────────────────────────────────── */
  function buildStore() {
    const popup = qs('#store-popup');
    if (!popup) return;

    const tabsContainer = qs('.store__tabs', popup);
    const gridContainer = qs('.store__grid', popup);
    if (!tabsContainer || !gridContainer) return;

    tabsContainer.innerHTML = '';
    gridContainer.innerHTML = '';

    const categoryKeys = Object.keys(PRODUCTS);

    categoryKeys.forEach((key, idx) => {
      // Tab
      const tab = document.createElement('button');
      tab.className = 'store__tab' + (idx === 0 ? ' is-active' : '');
      tab.dataset.tab = key;
      tab.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      tab.setAttribute('role', 'tab');
      tab.textContent = getCategoryLabel(key);
      tab.addEventListener('click', () => switchTab(key));
      tabsContainer.appendChild(tab);

      // Category section
      const section = document.createElement('div');
      section.className = 'store__category-section' + (idx === 0 ? ' is-active' : '');
      section.dataset.category = key;
      section.setAttribute('role', 'tabpanel');

      PRODUCTS[key].items.forEach(product => {
        section.appendChild(buildProductCard(product, key));
      });

      gridContainer.appendChild(section);
    });
  }

  function buildProductCard(product, categoryKey) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    card.dataset.categoryKey = categoryKey;

    const collectionLabel = getCategoryLabel(categoryKey);
    const priceLabel = product.price ? t('suggestedPrice') : t('profPrice');
    const priceVal = product.price ? formatPrice(product.price) : t('inquire');

    card.innerHTML = `
      <div class="product-card__image-wrap">
        <span class="product-card__collection-tag">${collectionLabel}</span>
        <img
          class="product-card__img"
          src="${product.img}"
          alt="STMNT ${product.name} ${product.size}"
          loading="lazy"
        />
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">STMNT ${product.name}</h3>
        <span class="product-card__size">${product.size}</span>
        <p class="product-card__price">
          <span class="product-card__price-label">${priceLabel}</span>
          <span class="product-card__price-val">${priceVal}</span>
        </p>
      </div>
      <div class="product-card__footer">
        <div class="product-card__qty">
          <button class="product-card__qty-btn" data-action="dec" aria-label="${t('decrease')}">−</button>
          <input class="product-card__qty-val" type="number" value="1" min="1" max="99" readonly aria-label="${t('quantity')}" />
          <button class="product-card__qty-btn" data-action="inc" aria-label="${t('increase')}">+</button>
        </div>
        <button class="product-card__add-btn" aria-label="${t('addToCart')}">${t('add')}</button>
      </div>
    `;

    // Img error → placeholder
    const img = qs('.product-card__img', card);
    img.addEventListener('error', () => {
      img.parentElement.innerHTML = `
        <span class="product-card__collection-tag">${getCategoryLabel(categoryKey)}</span>
        <div class="product-card__placeholder">
          <span class="product-card__placeholder-icon">⬡</span>
          <span class="product-card__placeholder-label">${t('imageComingSoon')}</span>
        </div>`;
    });

    // Qty controls
    const qtyVal = qs('.product-card__qty-val', card);
    qs('[data-action="dec"]', card).addEventListener('click', () => {
      qtyVal.value = Math.max(1, parseInt(qtyVal.value) - 1);
    });
    qs('[data-action="inc"]', card).addEventListener('click', () => {
      qtyVal.value = Math.min(99, parseInt(qtyVal.value) + 1);
    });

    // Add to cart
    const addBtn = qs('.product-card__add-btn', card);
    addBtn.addEventListener('click', () => {
      const qty = parseInt(qtyVal.value) || 1;
      addToCart(product, qty);
      addBtn.textContent = t('added');
      addBtn.classList.add('is-added');
      setTimeout(() => {
        addBtn.textContent = t('add');
        addBtn.classList.remove('is-added');
      }, 1500);
    });

    return card;
  }

  /* ─────────────────────────────────────────
     REFRESH TEXTS ON LANGUAGE CHANGE
  ───────────────────────────────────────── */
  function refreshStoreLanguage() {
    // 1. Update Tabs
    document.querySelectorAll('.store__tab').forEach(tab => {
      const catKey = tab.dataset.tab;
      if (catKey) {
        tab.textContent = getCategoryLabel(catKey);
      }
    });

    // 2. Update Product Cards
    document.querySelectorAll('.product-card').forEach(card => {
      const prodId = card.dataset.productId;
      const catKey = card.dataset.categoryKey;
      const prod = findProductById(prodId);

      const collTag = card.querySelector('.product-card__collection-tag');
      if (collTag && catKey) {
        collTag.textContent = getCategoryLabel(catKey);
      }

      const priceLabel = card.querySelector('.product-card__price-label');
      const priceVal = card.querySelector('.product-card__price-val');
      if (prod) {
        if (priceLabel) priceLabel.textContent = prod.price ? t('suggestedPrice') : t('profPrice');
        if (priceVal) priceVal.textContent = prod.price ? formatPrice(prod.price) : t('inquire');
      }

      const decBtn = card.querySelector('[data-action="dec"]');
      if (decBtn) decBtn.setAttribute('aria-label', t('decrease'));
      const incBtn = card.querySelector('[data-action="inc"]');
      if (incBtn) incBtn.setAttribute('aria-label', t('increase'));
      const qtyInput = card.querySelector('.product-card__qty-val');
      if (qtyInput) qtyInput.setAttribute('aria-label', t('quantity'));

      const addBtn = card.querySelector('.product-card__add-btn');
      if (addBtn && !addBtn.classList.contains('is-added')) {
        addBtn.textContent = t('add');
        addBtn.setAttribute('aria-label', t('addToCart'));
      }

      const placeholderLabel = card.querySelector('.product-card__placeholder-label');
      if (placeholderLabel) {
        placeholderLabel.innerHTML = t('imageComingSoon');
      }
    });

    // 3. Update Cart UI
    updateCartUI();
  }

  /* ─────────────────────────────────────────
     TABS
  ───────────────────────────────────────── */
  function switchTab(key) {
    document.querySelectorAll('.store__tab').forEach(t => {
      const active = t.dataset.tab === key;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.store__category-section').forEach(s => {
      s.classList.toggle('is-active', s.dataset.category === key);
    });
    const body = qs('.store-popup__body');
    if (body) body.scrollTop = 0;
  }

  /* ─────────────────────────────────────────
     STORE POPUP OPEN / CLOSE
  ───────────────────────────────────────── */
  function openStore() {
    qs('#store-popup').classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeStore() {
    closeCart();
    qs('#store-popup').classList.remove('is-open');
    if (!qs('#checkout-modal').classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
  }

  /* ─────────────────────────────────────────
     CART LOGIC
  ───────────────────────────────────────── */
  function addToCart(product, qty) {
    if (cart[product.id]) {
      cart[product.id].qty += qty;
    } else {
      cart[product.id] = { product, qty };
    }
    updateCartUI();
    openCart();
  }

  function removeFromCart(productId) {
    delete cart[productId];
    updateCartUI();
  }

  function updateCartItemQty(productId, delta) {
    if (!cart[productId]) return;
    cart[productId].qty = Math.max(1, cart[productId].qty + delta);
    updateCartUI();
  }

  function updateCartUI() {
    const count = cartCount();

    // ── Popup internal cart button badge
    const internalBadge = qs('#cart-fab-badge');
    if (internalBadge) {
      internalBadge.textContent = count;
      internalBadge.classList.toggle('is-visible', count > 0);
    }

    // ── Outside floating FAB
    const outsideFab   = qs('#cart-fab-outside');
    const outsideBadge = qs('#cart-fab-badge-outside');
    if (outsideFab && outsideBadge) {
      outsideBadge.textContent = count;
      outsideBadge.classList.toggle('is-visible', count > 0);
      outsideFab.classList.toggle('is-visible', count > 0);
    }

    // ── Navbar badge
    const navBadge = qs('#nav-shop-badge');
    if (navBadge) {
      navBadge.textContent = count;
      navBadge.classList.toggle('is-visible', count > 0);
    }

    // ── Cart body
    const cartBody = qs('#cart-body');
    if (!cartBody) return;
    cartBody.innerHTML = '';
    if (count === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty">
          <span class="cart-empty__icon">🛒</span>
          <p class="cart-empty__text" data-i18n="cart-empty-text">${t('emptyCart')}</p>
        </div>`;
    } else {
      Object.values(cart).forEach(entry => cartBody.appendChild(buildCartItem(entry)));
    }

    updateCartSummary();
  }

  function buildCartItem(entry) {
    const { product, qty } = entry;
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.dataset.itemId = product.id;

    const priceText = product.price ? formatPrice(product.price * qty) : '–';
    const unitText  = product.price ? formatPrice(product.price) : '–';

    item.innerHTML = `
      <div class="cart-item__img-wrap">
        <img class="cart-item__img" src="${product.img}" alt="STMNT ${product.name}" loading="lazy"
          onerror="this.parentElement.innerHTML='<span style=\\'font-size:1.4rem;opacity:.3;color:var(--color-gold)\\'>⬡</span>'" />
      </div>
      <div class="cart-item__details">
        <p class="cart-item__name">STMNT ${product.name}</p>
        <p class="cart-item__size">${product.size}</p>
        <p class="cart-item__price">${priceText} <span style="font-size:0.65rem;color:var(--color-text-muted);font-family:var(--font-sans)">(${unitText} ${t('each')})</span></p>
      </div>
      <div class="cart-item__actions">
        <div class="cart-item__qty">
          <button class="cart-item__qty-btn" data-action="dec" aria-label="${t('decrease')}">−</button>
          <span class="cart-item__qty-val">${qty}</span>
          <button class="cart-item__qty-btn" data-action="inc" aria-label="${t('increase')}">+</button>
        </div>
        <button class="cart-item__remove" aria-label="${t('remove')}">${t('remove')}</button>
      </div>`;

    qs('[data-action="dec"]', item).addEventListener('click', () => updateCartItemQty(product.id, -1));
    qs('[data-action="inc"]', item).addEventListener('click', () => updateCartItemQty(product.id, 1));
    qs('.cart-item__remove', item).addEventListener('click', () => removeFromCart(product.id));

    return item;
  }

  function updateCartSummary() {
    const total = cartTotal();
    const count = cartCount();
    const itemsEl    = qs('#cart-items-count');
    const totalEl    = qs('#cart-total');

    if (itemsEl) {
      const noun = count === 1 ? t('productCountSingle') : t('productCountPlural');
      itemsEl.textContent = `${count} ${noun}`;
    }
    if (totalEl) totalEl.textContent = formatPrice(total);
  }

  /* ─────────────────────────────────────────
     CART SIDEBAR OPEN / CLOSE
  ───────────────────────────────────────── */
  function openCart() {
    qs('#cart-sidebar').classList.add('is-open');
    qs('#cart-overlay').classList.add('is-visible');
  }

  function closeCart() {
    qs('#cart-sidebar').classList.remove('is-open');
    qs('#cart-overlay').classList.remove('is-visible');
  }

  /* ─────────────────────────────────────────
     CHECKOUT MODAL
  ───────────────────────────────────────── */
  function openCheckout() {
    if (cartCount() === 0) return;
    closeCart();
    qs('#checkout-modal').classList.add('is-open');
  }

  function closeCheckout() {
    qs('#checkout-modal').classList.remove('is-open');
    if (!qs('#store-popup').classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
  }

  function buildWhatsAppMessage(clientData) {
    const { name, doc, phone, address } = clientData;
    const items = Object.values(cart);

    let msg = t('waGreeting');
    msg += t('waClientData');
    msg += `${t('waName')}${name}\n`;
    msg += `${t('waDoc')}${doc}\n`;
    msg += `${t('waPhone')}${phone}\n`;
    msg += `${t('waAddress')}${address}\n`;
    msg += t('waProductsHeader');

    let grandTotal = 0;
    items.forEach(({ product, qty }) => {
      const subtotal = product.price ? product.price * qty : null;
      const sub = subtotal ? ` — ${formatPrice(subtotal)}` : '';
      msg += `• STMNT ${product.name} ${product.size} × ${qty}${sub}\n`;
      if (subtotal) grandTotal += subtotal;
    });

    if (grandTotal > 0) {
      msg += `${t('waTotal')}${formatPrice(grandTotal)}*\n`;
    }
    msg += t('waClosing');

    return encodeURIComponent(msg);
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init() {
    buildStore();

    // ── Open store — bind ALL .js-open-store triggers
    document.querySelectorAll('.js-open-store').forEach(btn => {
      btn.addEventListener('click', openStore);
    });

    // Close store popup
    const closeStoreBtn = qs('#close-store-btn');
    if (closeStoreBtn) closeStoreBtn.addEventListener('click', closeStore);

    const popupOverlay = qs('#store-popup-overlay');
    if (popupOverlay) popupOverlay.addEventListener('click', closeStore);

    // ── Cart button inside popup header
    const cartFab = qs('#cart-fab');
    if (cartFab) cartFab.addEventListener('click', openCart);

    // Outside FAB
    const outsideFab = qs('#cart-fab-outside');
    if (outsideFab) outsideFab.addEventListener('click', () => {
      openStore();
      setTimeout(openCart, 200);
    });

    // ── Cart close
    const cartClose = qs('#cart-close');
    if (cartClose) cartClose.addEventListener('click', closeCart);

    const cartOverlay = qs('#cart-overlay');
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // ── Checkout
    const checkoutBtn = qs('#cart-checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);

    const checkoutClose = qs('#checkout-close');
    if (checkoutClose) checkoutClose.addEventListener('click', closeCheckout);

    const checkoutOverlay = qs('#checkout-overlay');
    if (checkoutOverlay) checkoutOverlay.addEventListener('click', closeCheckout);

    // ── Form submit
    const form = qs('#checkout-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name    = qs('#field-name').value.trim();
        const doc     = qs('#field-doc').value.trim();
        const phone   = qs('#field-phone').value.trim();
        const address = qs('#field-address').value.trim();

        if (!name || !doc || !phone || !address) {
          alert(t('formAlert'));
          return;
        }

        const encodedMsg = buildWhatsAppMessage({ name, doc, phone, address });
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`, '_blank', 'noopener,noreferrer');
        closeCheckout();
      });
    }

    // ── ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (qs('#checkout-modal').classList.contains('is-open')) {
          closeCheckout();
        } else if (qs('#cart-sidebar').classList.contains('is-open')) {
          closeCart();
        } else if (qs('#store-popup').classList.contains('is-open')) {
          closeStore();
        }
      }
    });

    // ── Listen for language changes from i18n.js
    window.addEventListener('languagechange', () => {
      refreshStoreLanguage();
    });

    // Initial UI
    updateCartUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
