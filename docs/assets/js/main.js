// Без зависимостей, без сборки. Прогрессивное улучшение: без JS сайт
// остаётся полностью читаемым (см. AGENTS.md).

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // --- Мобильное меню --------------------------------------------------
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Reveal-on-scroll --------------------------------------------------
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Нет поддержки IO — просто показываем всё
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // --- "$ whoami" эффект печати (только если анимации разрешены) -------
  var whoamiEl = document.getElementById("whoamiLine");
  if (whoamiEl && !prefersReducedMotion) {
    var fullText = whoamiEl.textContent;
    whoamiEl.textContent = "";
    var i = 0;
    var typeNext = function () {
      if (i <= fullText.length) {
        whoamiEl.textContent = fullText.slice(0, i);
        i += 1;
        setTimeout(typeNext, 38);
      }
    };
    typeNext();
  }

  // --- Обфускация email против простых спам-ботов -----------------------
  // TODO: замените user/domain на реальные части вашего email.
  var emailLink = document.getElementById("emailLink");
  if (emailLink) {
    var user = "hello";
    var domain = "example.com";
    emailLink.setAttribute("href", "mailto:" + user + "@" + domain);
    emailLink.textContent = user + "@" + domain;
  }

  // --- Футер: год + метка последнего изменения файла --------------------
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var lastDeployedEl = document.getElementById("lastDeployed");
  if (lastDeployedEl && document.lastModified) {
    var d = new Date(document.lastModified);
    if (!isNaN(d.getTime())) {
      lastDeployedEl.textContent =
        "last updated: " + d.toISOString().slice(0, 10);
    }
  }
})();
