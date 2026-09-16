// Sean Jung — Portfolio site scripts
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  // Highlight active nav link
  var here = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a[data-nav]").forEach(function (a) {
    if (a.getAttribute("data-nav") === here || (here === "" && a.getAttribute("data-nav") === "index.html")) {
      a.classList.add("active");
    }
  });

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Pause/play background videos when out of view (perf)
  document.querySelectorAll("video[data-autoplay]").forEach(function (v) {
    if ("IntersectionObserver" in window) {
      var vio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              v.play().catch(function () {});
            } else {
              v.pause();
            }
          });
        },
        { threshold: 0.25 }
      );
      vio.observe(v);
    }
  });
})();
