/* =====================================================================
   WARCRAFTS — storefront logic (no build step, no dependencies)
   ===================================================================== */
(function () {
  "use strict";

  const S = window.STORE;
  const PRODUCTS = window.PRODUCTS;
  const CATS = window.CATEGORIES;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------- Icons ---------------- */
  const I = {
    logo: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="24" cy="24" r="22"/><circle cx="24" cy="24" r="17" stroke-dasharray="2 3" opacity=".5"/><path fill="currentColor" stroke="none" d="M24 7l2.6 11.2L39 29.5v3l-12.3-3.6-.8 7.6 4.6 3.6v2.1L24 40.4l-6.5 1.8v-2.1l4.6-3.6-.8-7.6L9 32.5v-3l12.4-11.3z"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c.7.3 1.3.5 1.7.6a4.2 4.2 0 0 0 1.9.1 3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4M12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8m8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.6A11.8 11.8 0 0 0 12 23.8 11.8 11.8 0 0 0 20.4 3.6"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1 1-1h2.3V2.1L14.1 2C10.9 2 10 4.4 10 6.3v2.2H7.7v3.8H10V22h4v-9.7h3l.4-3.8z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6l8.5 7 8.5-7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
    ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/></svg>',
    stand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20h16l-3-4H7z"/><path d="M12 16V9M7 6l5 3 5-3"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.4 2.4-2.6-.6-.6-2.6z"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 6h12v10H2zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9v.01M18 15v.01"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    tank: '<svg viewBox="0 0 200 110" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 70h160l-12 26H32z"/><rect x="34" y="78" width="132" height="14" rx="7"/><path d="M50 70l10-20h70l14 20"/><path d="M80 50V38h40l10 12"/><path d="M120 44h70"/><circle cx="50" cy="85" r="5"/><circle cx="75" cy="85" r="5"/><circle cx="100" cy="85" r="5"/><circle cx="125" cy="85" r="5"/><circle cx="150" cy="85" r="5"/></svg>',
    sat: '<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="3"><rect x="82" y="40" width="36" height="40" rx="3"/><path d="M82 60H60M118 60h22"/><rect x="8" y="44" width="52" height="32"/><rect x="140" y="44" width="52" height="32"/><path d="M21 44v32M34 44v32M47 44v32M153 44v32M166 44v32M179 44v32"/><path d="M100 40V24"/><path d="M86 18a20 10 0 0 0 28 0"/><path d="M100 80v14"/><circle cx="100" cy="98" r="4"/></svg>'
  };
  window.WARCRAFTS_ICONS = I;

  /* ---------------- Helpers ---------------- */
  const money = (n) => S.currency + " " + Math.round(n).toLocaleString(S.locale);
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const imgSrc = (p, n = 1) => `assets/products/${p.id}/${n}.jpg`;      // original photo
  const sqSrc = (p, n = 1) => `assets/products/${p.id}/sq/${n}.jpg`;    // seamless square version
  const catName = (id) => (CATS.find((c) => c.id === id) || {}).name || id;
  const waLink = (text) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text)}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const params = new URLSearchParams(location.search);

  /* ---------------- Cart ---------------- */
  const CART_KEY = "warcrafts_cart_v1";
  const Cart = {
    items() {
      try {
        const raw = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        return raw.filter((i) => byId(i.id));
      } catch { return []; }
    },
    save(items) { localStorage.setItem(CART_KEY, JSON.stringify(items)); Cart.emit(); },
    add(id, qty = 1) {
      const p = byId(id); if (!p || p.stock <= 0) return;
      const items = Cart.items();
      const found = items.find((i) => i.id === id);
      if (found) found.qty = Math.min(found.qty + qty, p.stock);
      else items.push({ id, qty: Math.min(qty, p.stock) });
      Cart.save(items);
    },
    set(id, qty) {
      let items = Cart.items();
      const p = byId(id);
      if (qty <= 0) items = items.filter((i) => i.id !== id);
      else items.forEach((i) => { if (i.id === id) i.qty = Math.min(qty, p.stock); });
      Cart.save(items);
    },
    clear() { Cart.save([]); },
    count() { return Cart.items().reduce((a, i) => a + i.qty, 0); },
    subtotal() { return Cart.items().reduce((a, i) => a + byId(i.id).price * i.qty, 0); },
    shipping() {
      const sub = Cart.subtotal();
      if (!sub) return 0;
      return S.freeShippingOver && sub >= S.freeShippingOver ? 0 : S.shippingFee;
    },
    total() { return Cart.subtotal() + Cart.shipping(); },
    emit() { document.dispatchEvent(new CustomEvent("cart:change")); }
  };
  window.addEventListener("storage", (e) => { if (e.key === CART_KEY) Cart.emit(); });

  /* ---------------- Layout: header / footer / drawer ---------------- */
  function renderChrome() {
    const page = document.body.dataset.page;
    const navLinks = [
      ["shop.html", "Shop All", "shop"],
      ["shop.html?cat=fighters", "Fighters", "fighters"],
      ["shop.html?cat=helicopters", "Helicopters", "helicopters"],
      ["shop.html?cat=naval", "Naval", "naval"],
      ["contact.html", "Contact", "contact"]
    ];
    const activeCat = params.get("cat");
    const isActive = (key) => (page === "shop" && ((key === "shop" && !activeCat) || key === activeCat)) || page === key;

    const header = $("#site-header");
    if (header) {
      header.outerHTML = `
      <div class="announce">Free delivery on orders over ${money(S.freeShippingOver)} · Cash on delivery available</div>
      <header class="header">
        <div class="wrap header-inner">
          <a href="index.html" class="logo" aria-label="${esc(S.fullName)} home">
            ${I.logo}
            <span class="logo-text"><b>${esc(S.name)}</b><span>${esc(S.tagline)}</span></span>
          </a>
          <nav class="nav" aria-label="Main">
            ${navLinks.map(([href, label, key]) => `<a href="${href}" class="${isActive(key) ? "active" : ""}">${label}</a>`).join("")}
          </nav>
          <div class="header-actions">
            <a class="icon-btn" href="shop.html" aria-label="Search products">${I.search}</a>
            <button class="icon-btn" id="cartBtn" aria-label="Open cart">${I.cart}<span class="cart-count" id="cartCount">0</span></button>
            <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu">${I.menu}</button>
          </div>
        </div>
      </header>
      <div class="mobile-nav" id="mobileNav" aria-hidden="true">
        <button class="icon-btn" id="menuClose" aria-label="Close menu">${I.close}</button>
        <a href="index.html">Home</a>
        ${navLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}
      </div>`;
    }

    const footer = $("#site-footer");
    if (footer) {
      footer.outerHTML = `
      <footer class="footer">
        <div class="wrap">
          <div class="footer-grid">
            <div>
              <a href="index.html" class="logo">${I.logo}<span class="logo-text"><b>${esc(S.name)}</b><span>${esc(S.tagline)}</span></span></a>
              <p style="margin-top:18px">${esc(S.description)}</p>
              <div class="socials">
                <a href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a>
                <a href="${S.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a>
                <a href="${waLink("Hi! I have a question about your scale models.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a>
              </div>
            </div>
            <div>
              <h4>Shop</h4>
              <ul>${CATS.filter((c) => !c.comingSoon).map((c) => `<li><a href="shop.html?cat=${c.id}">${c.name}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h4>Help</h4>
              <ul>
                <li><a href="index.html#faq">FAQ</a></li>
                <li><a href="index.html#faq">Shipping & Delivery</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="checkout.html">Checkout</a></li>
              </ul>
            </div>
            <div>
              <h4>Get in touch</h4>
              <ul>
                <li><a href="${waLink("Hi! I have a question about your scale models.")}" target="_blank" rel="noopener">WhatsApp · ${esc(S.phoneDisplay)}</a></li>
                <li><a href="mailto:${S.email}">${esc(S.email)}</a></li>
                <li class="muted">Delivering across ${esc(S.city)}</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} ${esc(S.fullName)}</span>
            <span>Collector-grade scale replicas · Not toys for children under 14</span>
          </div>
        </div>
      </footer>`;
    }

    // Drawer, overlay, toast, floating WhatsApp
    document.body.insertAdjacentHTML("beforeend", `
      <div class="overlay" id="overlay"></div>
      <aside class="drawer" id="drawer" aria-label="Shopping cart" aria-hidden="true">
        <div class="drawer-head">
          <h3>Your Hangar <small id="drawerCount"></small></h3>
          <button class="icon-btn" id="drawerClose" aria-label="Close cart">${I.close}</button>
        </div>
        <div class="ship-meter" id="shipMeter"></div>
        <div class="drawer-body" id="drawerBody"></div>
        <div class="drawer-foot" id="drawerFoot"></div>
      </aside>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
      ${page !== "checkout" ? `<a class="wa-float" href="${waLink("Hi! I'm interested in your scale models.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${I.wa}</a>` : ""}
    `);

    // Events
    $("#cartBtn")?.addEventListener("click", openDrawer);
    $("#drawerClose").addEventListener("click", closeDrawer);
    $("#overlay").addEventListener("click", closeDrawer);
    $("#menuBtn")?.addEventListener("click", () => { $("#mobileNav").classList.add("open"); document.body.classList.add("no-scroll"); });
    $("#menuClose")?.addEventListener("click", () => { $("#mobileNav").classList.remove("open"); document.body.classList.remove("no-scroll"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeDrawer(); $("#mobileNav")?.classList.remove("open"); document.body.classList.remove("no-scroll"); } });
  }

  function openDrawer() {
    $("#drawer").classList.add("open"); $("#overlay").classList.add("open");
    $("#drawer").setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll");
  }
  function closeDrawer() {
    $("#drawer")?.classList.remove("open"); $("#overlay")?.classList.remove("open");
    $("#drawer")?.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll");
  }

  function qtyControl(id, qty) {
    return `<div class="qty" data-id="${id}">
      <button type="button" data-act="dec" aria-label="Decrease quantity">−</button>
      <span>${qty}</span>
      <button type="button" data-act="inc" aria-label="Increase quantity">+</button>
    </div>`;
  }

  function renderDrawer() {
    const items = Cart.items();
    const count = Cart.count();
    const cc = $("#cartCount");
    if (cc) {
      const prev = +cc.textContent;
      cc.textContent = count;
      cc.classList.toggle("show", count > 0);
      if (count > prev) { cc.classList.remove("bump"); void cc.offsetWidth; cc.classList.add("bump"); }
    }
    $("#drawerCount").textContent = count ? `(${count})` : "";

    const sub = Cart.subtotal();
    const meter = $("#shipMeter");
    if (S.freeShippingOver && items.length) {
      const left = S.freeShippingOver - sub;
      const pct = Math.min(100, (sub / S.freeShippingOver) * 100);
      meter.innerHTML = (left > 0 ? `You're <b>${money(left)}</b> away from <b>free delivery</b>` : `<b>Free delivery unlocked.</b> Nice haul, commander.`) +
        `<div class="bar"><i style="width:${pct}%"></i></div>`;
      meter.classList.remove("hidden");
    } else meter.classList.add("hidden");

    if (!items.length) {
      $("#drawerBody").innerHTML = `<div class="drawer-empty">${I.cart}<h4>Hangar's empty</h4><p>Your next centerpiece is waiting.</p><a href="shop.html" class="btn btn-ghost" style="margin-top:14px">Browse models</a></div>`;
      $("#drawerFoot").innerHTML = "";
      return;
    }
    $("#drawerBody").innerHTML = items.map((i) => {
      const p = byId(i.id);
      return `<div class="line-item">
        <a class="thumb" href="product.html?id=${p.id}"><img src="${sqSrc(p)}" alt="${esc(p.name)}" loading="lazy"></a>
        <div><h4><a href="product.html?id=${p.id}">${esc(p.name)}</a></h4><div class="sub">${money(p.price)}${p.scale ? " · " + p.scale : ""}</div>${qtyControl(p.id, i.qty)}</div>
        <div class="right"><b>${money(p.price * i.qty)}</b><button class="remove" data-remove="${p.id}">Remove</button></div>
      </div>`;
    }).join("");
    const ship = Cart.shipping();
    $("#drawerFoot").innerHTML = `
      <div class="totals-row"><span>Subtotal</span><span>${money(sub)}</span></div>
      <div class="totals-row"><span>Delivery</span><span>${ship ? money(ship) : "Free"}</span></div>
      <div class="totals-row grand"><span>Total</span><span>${money(Cart.total())}</span></div>
      <a href="checkout.html" class="btn btn-primary btn-block">Checkout ${I.arrow}</a>
      <a href="${waLink(orderText())}" target="_blank" rel="noopener" class="btn btn-wa btn-block">${I.wa} Order on WhatsApp</a>`;
  }

  // Delegated qty / remove handling (works for drawer + checkout summary)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty[data-id] button");
    if (btn) {
      const id = btn.parentElement.dataset.id;
      const item = Cart.items().find((i) => i.id === id);
      if (item) Cart.set(id, item.qty + (btn.dataset.act === "inc" ? 1 : -1));
      return;
    }
    const rm = e.target.closest("[data-remove]");
    if (rm) Cart.set(rm.dataset.remove, 0);
    const add = e.target.closest("[data-add]");
    if (add) { e.preventDefault(); addToCart(add.dataset.add, 1); }
  });

  function addToCart(id, qty) {
    Cart.add(id, qty);
    const p = byId(id);
    const t = $("#toast");
    t.innerHTML = `<img src="${sqSrc(p)}" alt=""><div><b>${esc(p.name)}</b><span>Added to your hangar</span></div><button type="button" id="toastView">View cart</button>`;
    t.classList.add("show");
    $("#toastView").onclick = () => { t.classList.remove("show"); openDrawer(); };
    clearTimeout(addToCart._t);
    addToCart._t = setTimeout(() => t.classList.remove("show"), 3200);
  }

  function orderText(extra = "") {
    const lines = Cart.items().map((i) => { const p = byId(i.id); return `• ${p.name} × ${i.qty} — ${money(p.price * i.qty)}`; });
    const ship = Cart.shipping();
    return `Hi ${S.name}! I'd like to order:\n${lines.join("\n")}\n\nSubtotal: ${money(Cart.subtotal())}\nDelivery: ${ship ? money(ship) : "Free"}\nTotal: ${money(Cart.total())}${extra}`;
  }

  /* ---------------- Product card ---------------- */
  function card(p) {
    const badges = [];
    if (p.stock <= 0) badges.push('<span class="badge">Sold out</span>');
    else if (p.compareAt) badges.push(`<span class="badge red">-${Math.round((1 - p.price / p.compareAt) * 100)}%</span>`);
    if (p.badge && p.badge !== "Sale") badges.push(`<span class="badge brass">${esc(p.badge)}</span>`);
    if (p.build === "kit") badges.push('<span class="badge light">Assembly kit</span>');
    return `<article class="card reveal ${p.stock <= 0 ? "sold-out" : ""}">
      <a class="card-stage" href="product.html?id=${p.id}" aria-label="${esc(p.name)}">
        <img class="main" src="${sqSrc(p, 1)}" alt="${esc(p.name)} scale model" loading="lazy">
        ${p.images > 1 ? `<img class="alt" src="${sqSrc(p, 2)}" alt="" loading="lazy">` : ""}
      </a>
      <div class="card-badges">${badges.join("")}</div>
      ${p.stock > 0 ? `<button class="quick-add" data-add="${p.id}">${I.plus} Add to cart</button>` : ""}
      <div class="card-info">
        <div>
          <div class="meta">${esc(p.origin)} · ${esc(p.era)}${p.scale ? " · " + p.scale : ""}</div>
          <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
        </div>
        <div class="price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ""}</div>
      </div>
    </article>`;
  }

  /* ---------------- Reveal on scroll ---------------- */
  let io;
  function observeReveals(root = document) {
    if (!("IntersectionObserver" in window)) { $$(".reveal", root).forEach((el) => el.classList.add("in")); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    $$(".reveal:not(.in)", root).forEach((el, idx) => { el.style.transitionDelay = `${(idx % 4) * 70}ms`; io.observe(el); });
  }

  /* =================================================================
     PAGES
     ================================================================= */
  const Pages = {};

  /* ---------- Home ---------- */
  Pages.home = function () {
    // Stats
    $("#statModels").textContent = PRODUCTS.length + "+";

    // Categories
    $("#catGrid").innerHTML = CATS.map((c) => {
      const n = PRODUCTS.filter((p) => p.category === c.id).length;
      if (c.comingSoon) {
        return `<div class="cat-tile soon reveal">
          <div class="soon-art">${c.id === "armor" ? I.tank : I.sat}</div>
          <div class="cat-body"><div><span class="tag-soon">Incoming</span><h3>${c.name}</h3><p>${c.blurb} — new arrivals soon.</p></div>
          <a class="arrow" href="${waLink(`Hi! Please notify me when ${c.name} models arrive.`)}" target="_blank" rel="noopener" aria-label="Get notified">${I.arrow}</a></div>
        </div>`;
      }
      return `<a class="cat-tile reveal" href="shop.html?cat=${c.id}">
        <img src="assets/products/${c.cover}" alt="${c.name}" loading="lazy">
        <div class="cat-body"><div><span class="count">${n} model${n === 1 ? "" : "s"}</span><h3>${c.name}</h3><p>${c.blurb}</p></div><span class="arrow">${I.arrow}</span></div>
      </a>`;
    }).join("");

    // Featured
    $("#featuredGrid").innerHTML = PRODUCTS.filter((p) => p.featured).slice(0, 8).map(card).join("");

    // Marquee
    const names = PRODUCTS.map((p) => `<span>${esc(p.name.replace(/“.*”/, "").trim())}</span>`).join("");
    $("#marquee").innerHTML = names + names;

    // F-14 sweep slider (images 3,4,5 show the wing positions)
    const f14 = byId("f-14-tomcat");
    const stage = $("#sweepStage");
    if (f14 && stage) {
      const frames = [5, 4, 3]; // forward → mid → swept
      const labels = ["Forward · 20°", "Mid · 45°", "Swept · 68°"];
      stage.insertAdjacentHTML("afterbegin", frames.map((n, i) => `<img src="${imgSrc(f14, n)}" alt="F-14 Tomcat wings ${labels[i]}" class="${i === 0 ? "on" : ""}">`).join(""));
      const range = $("#sweep"), out = $("#sweepVal");
      const imgs = $$("img", stage);
      range.addEventListener("input", () => {
        const v = +range.value;
        imgs.forEach((im, i) => im.classList.toggle("on", i === v));
        out.textContent = labels[v];
      });
      $("#f14Price").textContent = money(f14.price);
      $$("[data-add-f14]").forEach((b) => b.setAttribute("data-add", f14.id));
    }

    // Carrier
    const cv = byId("liaoning-cv-16");
    if (cv) $("#cvPrice").textContent = money(cv.price);

    // WhatsApp CTA
    $$("[data-wa]").forEach((a) => a.href = waLink(a.dataset.wa));
  };

  /* ---------- Shop ---------- */
  Pages.shop = function () {
    const state = {
      cat: params.get("cat") || "all",
      q: params.get("q") || "",
      origin: "all",
      sort: "featured"
    };
    const live = CATS.filter((c) => !c.comingSoon);
    const titleEl = $("#shopTitle"), subEl = $("#shopSub");

    $("#chips").innerHTML = [`<button class="chip" data-cat="all">All <small>${PRODUCTS.length}</small></button>`]
      .concat(live.map((c) => `<button class="chip" data-cat="${c.id}">${c.name} <small>${PRODUCTS.filter((p) => p.category === c.id).length}</small></button>`)).join("");

    const origins = [...new Set(PRODUCTS.map((p) => p.origin))].sort();
    $("#origin").innerHTML = `<option value="all">All nations</option>` + origins.map((o) => `<option value="${o}">${o}</option>`).join("");
    $("#q").value = state.q;

    function apply() {
      let list = PRODUCTS.slice();
      if (state.cat !== "all") list = list.filter((p) => p.category === state.cat);
      if (state.origin !== "all") list = list.filter((p) => p.origin === state.origin);
      if (state.q) {
        const q = state.q.toLowerCase();
        list = list.filter((p) => [p.name, p.subtitle, p.origin, p.era, catName(p.category), p.description].join(" ").toLowerCase().includes(q));
      }
      const sorters = {
        featured: (a, b) => (b.featured - a.featured) || 0,
        "price-asc": (a, b) => a.price - b.price,
        "price-desc": (a, b) => b.price - a.price,
        name: (a, b) => a.name.localeCompare(b.name)
      };
      list.sort(sorters[state.sort]);
      // in-stock first
      list.sort((a, b) => (b.stock > 0) - (a.stock > 0));

      $$(".chip", $("#chips")).forEach((c) => c.classList.toggle("active", c.dataset.cat === state.cat));
      const cat = CATS.find((c) => c.id === state.cat);
      titleEl.textContent = cat ? cat.name : "The Collection";
      subEl.textContent = cat ? cat.blurb + "." : "Every model in the arsenal — jets, warbirds, helicopters and capital ships.";
      document.title = `${cat ? cat.name : "Shop All"} — ${S.fullName}`;
      $("#count").textContent = `${list.length} model${list.length === 1 ? "" : "s"}`;
      $("#grid").innerHTML = list.length ? list.map(card).join("") :
        `<div class="empty"><h3>No targets found</h3><p>Try a different search or category.</p><button class="btn btn-ghost" id="resetFilters" style="margin-top:16px">Reset filters</button></div>`;
      $("#resetFilters")?.addEventListener("click", () => { state.cat = "all"; state.q = ""; state.origin = "all"; $("#q").value = ""; $("#origin").value = "all"; apply(); });
      observeReveals($("#grid"));

      const u = new URL(location);
      state.cat !== "all" ? u.searchParams.set("cat", state.cat) : u.searchParams.delete("cat");
      state.q ? u.searchParams.set("q", state.q) : u.searchParams.delete("q");
      history.replaceState(null, "", u);
    }

    $("#chips").addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) { state.cat = c.dataset.cat; apply(); } });
    let t; $("#q").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value.trim(); apply(); }, 150); });
    $("#origin").addEventListener("change", (e) => { state.origin = e.target.value; apply(); });
    $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; apply(); });
    apply();
    if (params.has("q") || document.referrer.endsWith("#search")) $("#q").focus();
  };

  /* ---------- Product ---------- */
  Pages.product = function () {
    const p = byId(params.get("id"));
    const root = $("#pdp");
    if (!p) {
      root.innerHTML = `<div class="empty" style="padding:140px 0"><h3>Model not found</h3><p>It may have flown off. Browse the full collection instead.</p><a class="btn btn-primary" href="shop.html" style="margin-top:20px">Shop all models</a></div>`;
      return;
    }
    document.title = `${p.name} Scale Model — ${S.fullName}`;
    $('meta[name="description"]')?.setAttribute("content", `${p.name} — ${p.subtitle}. ${p.description.slice(0, 120)}…`);

    const imgs = Array.from({ length: p.images }, (_, i) => sqSrc(p, i + 1));
    const full = Array.from({ length: p.images }, (_, i) => imgSrc(p, i + 1));
    const stockCls = p.stock <= 0 ? "out" : p.stock <= 3 ? "low" : "";
    const stockTxt = p.stock <= 0 ? "Sold out — message us to reserve the next batch" : p.stock <= 3 ? `Only ${p.stock} left in stock` : "In stock · ready to ship";
    const specs = [
      ["Model", p.subtitle],
      ["Category", catName(p.category)],
      ["Origin", p.origin],
      ["Era", p.era],
      p.scale ? ["Scale", p.scale] : null,
      ["Condition", p.build === "kit" ? "Assembly kit — some building required" : "Ready to display"],
      ["Material", "Premium die-cast alloy & detailed parts"],
      ["In the box", p.id === "liaoning-cv-16" ? "Model, display base & acrylic case" : "Model & display stand"]
    ].filter(Boolean);

    root.innerHTML = `
      <div class="gallery">
        <div class="thumbs" id="thumbs">${imgs.map((src, i) => `<button class="${i === 0 ? "active" : ""}" data-i="${i}" aria-label="View photo ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join("")}</div>
        <div class="main-stage" id="mainStage">
          <img id="mainImg" src="${imgs[0]}" alt="${esc(p.name)} scale model">
          ${imgs.length > 1 ? `<button class="nav-arrow prev" aria-label="Previous photo">${I.left}</button><button class="nav-arrow next" aria-label="Next photo">${I.right}</button>` : ""}
          <span class="zoom-hint">Click to enlarge</span>
          <span class="counter" id="counter">01 / ${String(imgs.length).padStart(2, "0")}</span>
        </div>
      </div>
      <div class="pdp-info">
        <div class="crumbs"><a href="index.html">Home</a>/<a href="shop.html">Shop</a>/<a href="shop.html?cat=${p.category}">${catName(p.category)}</a></div>
        ${p.badge ? `<span class="badge brass" style="display:inline-block;margin-bottom:14px">${esc(p.badge)}</span>` : ""}
        <h1 class="h-display">${esc(p.name)}</h1>
        <div class="subtitle">${esc(p.subtitle)}</div>
        <div class="pdp-price"><b>${money(p.price)}</b>${p.compareAt ? `<s>${money(p.compareAt)}</s><span class="badge red">Save ${money(p.compareAt - p.price)}</span>` : ""}</div>
        <div class="pdp-chips">
          ${p.scale ? `<span class="spec-chip">${I.ruler} ${p.scale} scale</span>` : ""}
          <span class="spec-chip">${I.stand} Display ${p.id === "liaoning-cv-16" ? "case" : "stand"} included</span>
          <span class="spec-chip">${p.build === "kit" ? I.wrench + " Assembly kit" : I.box + " Ready to display"}</span>
          <span class="spec-chip">${I.flag} ${esc(p.origin)}</span>
        </div>
        <p class="pdp-desc">${esc(p.description)}</p>
        <div class="buy-row">
          <div class="qty" id="pdpQty"><button type="button" data-q="-1" aria-label="Decrease">−</button><span id="qtyVal">1</span><button type="button" data-q="1" aria-label="Increase">+</button></div>
          <button class="btn btn-primary" id="addBtn" style="flex:1" ${p.stock <= 0 ? "disabled" : ""}>${I.plus} Add to cart</button>
        </div>
        <a class="btn btn-wa btn-block" id="waBtn" target="_blank" rel="noopener">${I.wa} ${p.stock > 0 ? "Order instantly on WhatsApp" : "Reserve on WhatsApp"}</a>
        <div class="stock-line ${stockCls}"><i></i> ${stockTxt}</div>

        <div class="pdp-block">
          <h3>Highlights</h3>
          <ul class="feat-list">${p.features.map((f) => `<li>${I.check}<span>${esc(f)}</span></li>`).join("")}</ul>
        </div>
        <div class="pdp-block">
          <h3>Specifications</h3>
          <table class="spec-table">${specs.map(([k, v]) => `<tr><td>${k}</td><td>${esc(v)}</td></tr>`).join("")}</table>
        </div>
        <div class="pdp-block assurances">
          <div>${I.truck}<b>Fast delivery</b>${esc(S.deliveryEstimate)}</div>
          <div>${I.cash}<b>Cash on delivery</b>Pay when it arrives</div>
          <div>${I.shield}<b>Packed safe</b>Foam-protected shipping</div>
        </div>
      </div>`;

    // Gallery
    let cur = 0;
    const main = $("#mainImg");
    const show = (i) => {
      cur = (i + imgs.length) % imgs.length;
      main.style.opacity = 0;
      setTimeout(() => { main.src = imgs[cur]; main.style.opacity = 1; }, 120);
      $$("#thumbs button").forEach((b, j) => b.classList.toggle("active", j === cur));
      $("#counter").textContent = `${String(cur + 1).padStart(2, "0")} / ${String(imgs.length).padStart(2, "0")}`;
    };
    $("#thumbs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) show(+b.dataset.i); });
    $(".prev", root)?.addEventListener("click", (e) => { e.stopPropagation(); show(cur - 1); });
    $(".next", root)?.addEventListener("click", (e) => { e.stopPropagation(); show(cur + 1); });
    // Swipe
    let sx = null;
    $("#mainStage").addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    $("#mainStage").addEventListener("touchend", (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); sx = null; });

    // Lightbox
    document.body.insertAdjacentHTML("beforeend", `<div class="lightbox" id="lb"><img id="lbImg" alt=""><button class="icon-btn lb-close" aria-label="Close">${I.close}</button><button class="icon-btn lb-prev" aria-label="Previous">${I.left}</button><button class="icon-btn lb-next" aria-label="Next">${I.right}</button></div>`);
    const lb = $("#lb"), lbImg = $("#lbImg");
    const lbShow = () => { lbImg.src = full[cur]; lbImg.alt = p.name; };
    $("#mainStage").addEventListener("click", () => { lbShow(); lb.classList.add("open"); document.body.classList.add("no-scroll"); });
    $(".lb-close", lb).addEventListener("click", () => { lb.classList.remove("open"); document.body.classList.remove("no-scroll"); });
    $(".lb-prev", lb).addEventListener("click", () => { show(cur - 1); lbShow(); });
    $(".lb-next", lb).addEventListener("click", () => { show(cur + 1); lbShow(); });
    lb.addEventListener("click", (e) => { if (e.target === lb) { lb.classList.remove("open"); document.body.classList.remove("no-scroll"); } });
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { show(cur + 1); if (lb.classList.contains("open")) lbShow(); }
      if (e.key === "ArrowLeft") { show(cur - 1); if (lb.classList.contains("open")) lbShow(); }
      if (e.key === "Escape") lb.classList.remove("open");
    });

    // Qty + add
    let qty = 1;
    const max = Math.max(1, p.stock);
    const updWa = () => { $("#waBtn").href = waLink(`Hi ${S.name}! I'd like to order the ${p.name} (${money(p.price)}) × ${qty}.\n${location.href}`); };
    $("#pdpQty").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; qty = Math.min(max, Math.max(1, qty + +b.dataset.q)); $("#qtyVal").textContent = qty; updWa(); });
    $("#addBtn").addEventListener("click", () => { addToCart(p.id, qty); });
    updWa();

    // Related
    const related = PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category)
      .concat(PRODUCTS.filter((x) => x.id !== p.id && x.category !== p.category && x.origin === p.origin))
      .concat(PRODUCTS.filter((x) => x.id !== p.id))
      .filter((x, i, arr) => arr.findIndex((y) => y.id === x.id) === i).slice(0, 4);
    $("#related").innerHTML = related.map(card).join("");
  };

  /* ---------- Checkout ---------- */
  Pages.checkout = function () {
    const form = $("#orderForm");
    $("#payOptions").innerHTML = S.paymentMethods.map((m, i) => `
      <label class="pay-option"><input type="radio" name="payment" value="${esc(m.label)}" ${i === 0 ? "checked" : ""} required>
      <div><b>${esc(m.label)}</b><span>${esc(m.note)}</span></div></label>`).join("");

    function renderSummary() {
      const items = Cart.items();
      const empty = !items.length;
      $("#checkoutEmpty").classList.toggle("hidden", !empty);
      $("#checkoutMain").classList.toggle("hidden", empty);
      if (empty) return;
      $("#summaryItems").innerHTML = items.map((i) => {
        const p = byId(i.id);
        return `<div class="line-item">
          <div class="thumb"><img src="${sqSrc(p)}" alt="${esc(p.name)}"><em>${i.qty}</em></div>
          <div><h4>${esc(p.name)}</h4><div class="sub">${money(p.price)} each</div>${qtyControl(p.id, i.qty)}</div>
          <div class="right"><b>${money(p.price * i.qty)}</b><button type="button" class="remove" data-remove="${p.id}">Remove</button></div>
        </div>`;
      }).join("");
      const ship = Cart.shipping();
      $("#summaryTotals").innerHTML = `
        <div class="totals-row"><span>Subtotal</span><span>${money(Cart.subtotal())}</span></div>
        <div class="totals-row"><span>Delivery</span><span>${ship ? money(ship) : "Free"}</span></div>
        <div class="totals-row grand"><span>Total</span><span>${money(Cart.total())}</span></div>`;
    }
    document.addEventListener("cart:change", renderSummary);
    renderSummary();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!Cart.items().length) return;
      const orderId = "ARM-" + Date.now().toString(36).toUpperCase().slice(-6);
      const items = Cart.items().map((i) => { const p = byId(i.id); return `${p.name} x${i.qty} = ${money(p.price * i.qty)}`; }).join("\n");
      form.elements["order-id"].value = orderId;
      form.elements["order-items"].value = items;
      form.elements["order-subtotal"].value = money(Cart.subtotal());
      form.elements["order-shipping"].value = Cart.shipping() ? money(Cart.shipping()) : "Free";
      form.elements["order-total"].value = money(Cart.total());

      const btn = $("#placeOrder");
      btn.disabled = true; btn.textContent = "Placing order…";

      const fd = new FormData(form);
      const summary = {
        id: orderId, name: fd.get("name"), phone: fd.get("phone"), city: fd.get("city"),
        address: fd.get("address"), payment: fd.get("payment"), total: money(Cart.total()),
        text: orderText(`\n\nOrder ID: ${orderId}\nName: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nAddress: ${fd.get("address")}, ${fd.get("city")}\nPayment: ${fd.get("payment")}`)
      };
      try {
        const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(fd).toString() });
        if (!res.ok && !/localhost|127\.0\.0\.1/.test(location.hostname)) throw new Error("Network response " + res.status);
      } catch (err) {
        if (!/localhost|127\.0\.0\.1|^$/.test(location.hostname)) {
          btn.disabled = false; btn.textContent = "Place order";
          alert("We couldn't submit your order online. Please use the WhatsApp button to send it directly — sorry about that!");
          return;
        }
        console.warn("Form submission only works when deployed on Netlify.", err);
      }
      sessionStorage.setItem("warcrafts_last_order", JSON.stringify(summary));
      Cart.clear();
      location.href = "thank-you.html";
    });

    $("#waCheckout").addEventListener("click", (e) => {
      const fd = new FormData(form);
      const extra = fd.get("name") ? `\n\nName: ${fd.get("name")}\nPhone: ${fd.get("phone") || "-"}\nAddress: ${fd.get("address") || "-"}, ${fd.get("city") || "-"}\nPayment: ${fd.get("payment")}` : "";
      e.currentTarget.href = waLink(orderText(extra));
    });
  };

  /* ---------- Thank you ---------- */
  Pages.thanks = function () {
    let o = null;
    try { o = JSON.parse(sessionStorage.getItem("warcrafts_last_order")); } catch {}
    if (o) {
      $("#orderId").textContent = "ORDER " + o.id;
      $("#thanksName").textContent = o.name ? `, ${o.name.split(" ")[0]}` : "";
      $("#thanksWa").href = waLink(o.text);
      $("#thanksTotal").textContent = `${o.total} · ${o.payment}`;
    } else {
      $("#orderId").classList.add("hidden");
      $("#thanksWa").href = waLink("Hi! I just placed an order on your website.");
    }
  };

  /* ---------- Contact ---------- */
  Pages.contact = function () {
    $("#cWa").href = waLink("Hi! I have a question about your scale models.");
    $("#cWaNum").textContent = S.phoneDisplay;
    $("#cMail").href = "mailto:" + S.email;
    $("#cMailTxt").textContent = S.email;
    $("#cIg").href = S.instagram;
    const pre = params.get("model");
    if (pre) $("#cMessage").value = `I'm interested in the ${pre}. `;
  };

  /* ---------------- Boot ---------------- */
  renderChrome();
  document.addEventListener("cart:change", renderDrawer);
  renderDrawer();
  const page = document.body.dataset.page;
  if (Pages[page]) Pages[page]();
  observeReveals();
})();
