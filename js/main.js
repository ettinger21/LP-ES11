/* ============================================================
   ES11 · Main — nav, WhatsApp e analytics
   - Estado "scrolled" do header flutuante.
   - Menu mobile (toggle + fecha ao navegar/Esc).
   - Sincroniza links de WhatsApp a partir de js/consultor.js.
   - Dispara eventos de analytics (no-op se não houver gtag/dataLayer).
   ============================================================ */
(function () {
  "use strict";

  var C = window.ES11_CONSULTOR || {};

  /* -------- Analytics --------
     Envia para o Vercel Analytics e, se um dia houver GA4/GTM na página,
     para eles também. Tudo opcional: sem nenhum deles, vira no-op. */
  function track(event, params) {
    var payload = Object.assign({ consultant_id: C.id || "joao-vittor-andrade" }, params || {});
    try {
      // Vercel Web Analytics (eventos personalizados exigem plano Pro;
      // no plano Hobby as visitas de página continuam sendo contadas)
      if (typeof window.va === "function") {
        window.va("event", { name: event, data: payload });
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", event, payload);
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(Object.assign({ event: event }, payload));
      }
    } catch (e) {
      /* silencioso — analytics nunca deve quebrar a página */
    }
  }

  /* -------- Header: estado ao rolar -------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* -------- Menu mobile -------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
  }
  if (links) {
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* -------- WhatsApp: re-sincroniza hrefs a partir da config -------- */
  if (typeof window.ES11_waLink === "function") {
    document.querySelectorAll("a.js-wa").forEach(function (a) {
      // mantém mensagem específica quando o link é da FAQ
      var pos = a.getAttribute("data-cta-position");
      var msg = pos === "faq" ? (C.whatsapp && C.whatsapp.mensagemDuvida) : null;
      a.setAttribute("href", window.ES11_waLink(msg));
    });
  }

  /* -------- Eventos de clique -------- */
  document.querySelectorAll("a.js-wa").forEach(function (a) {
    a.addEventListener("click", function () {
      track("whatsapp_click", { cta_position: a.getAttribute("data-cta-position") || "unknown" });
    });
  });
  document.querySelectorAll("a.js-ig").forEach(function (a) {
    a.addEventListener("click", function () {
      track("instagram_click", {});
    });
  });
  document.querySelectorAll("a.js-es11").forEach(function (a) {
    a.addEventListener("click", function () {
      track("es11_site_click", {});
    });
  });

  /* -------- Page view -------- */
  track("consultant_page_view", { page_type: "consultant_profile" });
})();
