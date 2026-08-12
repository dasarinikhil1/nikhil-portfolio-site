/* Sky Atlas wireframe behaviors.
   No scroll listeners: IntersectionObserver + pointer events only.
   All motion gated behind prefers-reduced-motion. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- interior pages: scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- hub: cloud parallax on pointer (rAF-batched) ---------- */
  var hub = document.querySelector(".hub");
  if (hub && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    var layers = hub.querySelectorAll(".cloud-layer");
    var targetX = 0, targetY = 0, rafId = null;

    function apply() {
      layers.forEach(function (layer, i) {
        var depth = (i + 1) * 8; /* farther layer moves less */
        layer.style.transform =
          "translate3d(" + targetX * depth + "px," + targetY * depth + "px,0)";
      });
      rafId = null;
    }

    hub.addEventListener("pointermove", function (e) {
      targetX = (e.clientX / window.innerWidth - 0.5) * -1;
      targetY = (e.clientY / window.innerHeight - 0.5) * -1;
      if (rafId === null) rafId = requestAnimationFrame(apply);
    });
  }

  /* ---------- hub: zoom-depart on island click ---------- */
  if (hub) {
    hub.querySelectorAll(".island").forEach(function (island) {
      island.addEventListener("click", function (e) {
        if (reduceMotion) return; /* instant navigation */
        e.preventDefault();
        var href = island.getAttribute("href");
        hub.classList.add("is-departing");
        island.classList.add("is-target");
        window.setTimeout(function () {
          window.location.href = href;
        }, 560);
      });
    });
  }

  /* ---------- work page: card click opens detail panel ---------- */
  var flipCards = document.querySelectorAll(".flip-nav");
  var lastPanelTrigger = null;

  flipCards.forEach(function (card) {
    var dialog = document.getElementById(card.getAttribute("data-dialog-target"));
    if (!dialog) return;

    function openPanel() {
      lastPanelTrigger = card;
      dialog.showModal();
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { dialog.classList.add("is-open"); });
      });
    }

    function closePanel() {
      if (!dialog.open) return;
      dialog.classList.remove("is-open");
      if (reduceMotion) { dialog.close(); return; }
      window.setTimeout(function () { dialog.close(); }, 220);
    }

    card.addEventListener("click", function () {
      if (dialog.open) return;
      openPanel();
    });

    dialog.querySelector("[data-panel-close]").addEventListener("click", closePanel);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closePanel(); });
    dialog.addEventListener("cancel", function (e) { e.preventDefault(); closePanel(); });
    dialog.addEventListener("close", function () {
      dialog.classList.remove("is-open");
      if (lastPanelTrigger) { lastPanelTrigger.focus({ preventScroll: true }); lastPanelTrigger = null; }
    });
  });
})();
