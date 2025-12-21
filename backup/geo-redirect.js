// Geo-based variant selection for the single resume page
(function () {
  "use strict";

  const VARIANT_KEY = "resumeVariant";
  const DEFAULT_VARIANT = "us";

  function normalizeVariant(value) {
    if (!value) return "";
    const normalized = String(value).toLowerCase();
    if (normalized === "sa" || normalized === "za" || normalized === "south-africa") {
      return "sa";
    }
    if (normalized === "us" || normalized === "usa" || normalized === "default") {
      return "us";
    }
    return "";
  }

  function applyVariant(variant) {
    const normalized = variant === "sa" ? "sa" : "us";
    document.documentElement.dataset.variant = normalized;

    document.querySelectorAll("[data-variant-us], [data-variant-sa]").forEach((el) => {
      if (normalized === "sa" && el.hasAttribute("data-variant-sa")) {
        el.textContent = el.getAttribute("data-variant-sa") || "";
        return;
      }
      if (normalized !== "sa" && el.hasAttribute("data-variant-us")) {
        el.textContent = el.getAttribute("data-variant-us") || "";
      }
    });

    document.title =
      normalized === "sa"
        ? "Christo Lotriet - Software Developer - South Africa"
        : "Christo Lotriet - Software Developer";
  }

  function init() {
    const params = new URLSearchParams(window.location.search);
    const paramVariant = normalizeVariant(params.get("variant"));
    const storedVariant = normalizeVariant(sessionStorage.getItem(VARIANT_KEY));

    if (paramVariant) {
      applyVariant(paramVariant);
      sessionStorage.setItem(VARIANT_KEY, paramVariant);
      return;
    }

    if (storedVariant) {
      applyVariant(storedVariant);
      return;
    }

    applyVariant(DEFAULT_VARIANT);

    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        const country = (data && data.country) || "";
        const detectedVariant = country === "ZA" ? "sa" : "us";
        applyVariant(detectedVariant);
        sessionStorage.setItem(VARIANT_KEY, detectedVariant);
      })
      .catch(() => {
        applyVariant(DEFAULT_VARIANT);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
