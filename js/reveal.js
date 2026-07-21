/* ============================================================
   ES11 · Reveal — entradas no scroll (IntersectionObserver)
   - Fatia títulos .reveal-lines em linhas (mask-reveal).
   - Indexa filhos .reveal dentro de .stagger (cascata via --i).
   - Adiciona .is-visible uma única vez quando o elemento entra.
   Sem dependências. Degrada sem JS (a classe .js nem é aplicada).
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1) Fatiar títulos em linhas (pelo <br>), preservando <em>/<strong>. */
  function sliceLines() {
    var titles = document.querySelectorAll(".reveal-lines");
    titles.forEach(function (el) {
      if (el.dataset.sliced) return;
      var parts = el.innerHTML.split(/<br\s*\/?>/i);
      if (parts.length < 2 && !/\S/.test(el.innerHTML)) return;
      el.innerHTML = parts
        .map(function (part) {
          return (
            '<span class="line"><span class="line__inner">' + part.trim() + "</span></span>"
          );
        })
        .join("");
      el.dataset.sliced = "true";
    });
  }

  /* 2) Indexar filhos .reveal dentro de cada .stagger. */
  function indexStagger() {
    document.querySelectorAll(".stagger").forEach(function (group) {
      var i = 0;
      group.querySelectorAll(":scope > .reveal").forEach(function (child) {
        child.style.setProperty("--i", i++);
      });
    });
  }

  /* 3) HERO: revela no load, nunca via scroll.
     A 1ª dobra (incluindo o CTA principal) precisa estar sempre visível ao
     abrir — não pode depender do IntersectionObserver. Mantém-se a animação
     de entrada, apenas disparada imediatamente e com leve cascata. */
  function revealHero() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var els = hero.querySelectorAll(".reveal, .reveal-lines, .reveal-media");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        els.forEach(function (el, i) {
          el.style.transitionDelay = Math.min(i, 6) * 60 + "ms";
          el.classList.add("is-visible");
        });
      });
    });
  }

  /* 4) Observar e revelar o restante da página. */
  function observe() {
    var all = document.querySelectorAll(".reveal, .reveal-lines, .reveal-media");
    var targets = Array.prototype.filter.call(all, function (el) {
      return !el.closest(".hero"); // hero já tratado em revealHero()
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      io.observe(el);
    });
  }

  // Fatiar só em telas largas: no mobile os títulos precisam quebrar
  // naturalmente (o mask-reveal assume 1 linha visual por fatia).
  if (!reduce && window.innerWidth >= 700) sliceLines();
  indexStagger();
  revealHero();
  observe();
})();
