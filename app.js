function exportToPDF() {
  window.print();
}

// Export the CV as a Word document (only the main CV content)
function exportToWord() {
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export as Word</title></head><body>";
  var footer = "</body></html>";
  // Only export the main CV content
  // Clone the CV container to avoid modifying the live DOM
  var cvContainer = document.querySelector(".cv-container");
  if (!cvContainer) {
    return;
  }
  cvContainer = cvContainer.cloneNode(true);

  var exportButtons = cvContainer.querySelectorAll(".export-btn-group");
  exportButtons.forEach(function (group) {
    group.parentNode.removeChild(group);
  });

  var portfolioSection = cvContainer.querySelector(".portfolio-section");
  if (portfolioSection && portfolioSection.parentNode) {
    portfolioSection.parentNode.removeChild(portfolioSection);
  }

  function replaceLinkWithText(link) {
    if (!link || !link.parentNode) {
      return;
    }
    var span = document.createElement("span");
    span.textContent = link.textContent;
    link.parentNode.replaceChild(span, link);
  }

  // Replace links with plain text while preserving icons/labels
  replaceLinkWithText(cvContainer.querySelector('a[href^="mailto:"]'));
  replaceLinkWithText(cvContainer.querySelector('a[href^="https://linkedin"]'));

  // Ensure icons render with spacing in Word
  var contactIcons = cvContainer.querySelectorAll(".contact-icon");
  contactIcons.forEach(function (icon) {
    icon.style.display = "inline-block";
    icon.style.width = "16px";
    icon.style.height = "16px";
    icon.style.marginRight = "6px";
    icon.style.verticalAlign = "middle";
    var svg = icon.querySelector("svg");
    if (svg) {
      svg.setAttribute("width", "16");
      svg.setAttribute("height", "16");
      svg.setAttribute("stroke", "#000");
      svg.setAttribute("fill", "none");
    }
  });

  var contactInfo = cvContainer.querySelector(".contact-info");
  if (contactInfo) {
    contactInfo.style.display = "block";
    contactInfo.style.textAlign = "left";
    contactInfo.style.marginTop = "12px";
    var contactItems = contactInfo.querySelectorAll(".contact-item");
    contactItems.forEach(function (item) {
      item.style.display = "block";
      item.style.marginBottom = "6px";
    });
  }

  // Add inline margin to each .job div for Word export spacing
  var jobs = cvContainer.querySelectorAll(".job");
  jobs.forEach(function (job) {
    job.style.marginBottom = "32px";
  });
  var content = cvContainer.outerHTML;
  var sourceHTML = header + content + footer;

  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = "Christo_Lotriet_CV.doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

function attachExportHandlers() {
  var pdfButton = document.querySelector(".pdf-export-btn");
  var wordButton = document.querySelector(".word-export-btn");

  if (pdfButton) {
    pdfButton.addEventListener("click", function (event) {
      event.preventDefault();
      exportToPDF();
    });
  }

  if (wordButton) {
    wordButton.addEventListener("click", function (event) {
      event.preventDefault();
      exportToWord();
    });
  }
}

function attachPortfolioToggle() {
  var section = document.querySelector(".portfolio-section");
  if (!section) {
    return;
  }

  var toggle = section.querySelector(".portfolio-toggle");
  var content = section.querySelector(".portfolio-content");
  if (!toggle || !content) {
    return;
  }

  var label = toggle.querySelector(".toggle-label");
  if (label) {
    label.textContent = "Show portfolio";
  }
  toggle.setAttribute("aria-expanded", "false");
  content.hidden = true;

  toggle.addEventListener("click", function () {
    var isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    content.hidden = isExpanded;
    if (label) {
      label.textContent = isExpanded ? "Show portfolio" : "Hide portfolio";
    }
  });
}

// Simple page view counter with geolocation
(function () {
  "use strict";

  // Track page view
  async function trackPageView() {
    const pagePath = window.location.pathname;
    const timestamp = new Date().toISOString();

    // Get location data
    let locationData = {
      country: "Unknown",
      city: "Unknown",
      countryCode: "XX",
    };

    try {
      // Use ipapi.co for geolocation (free, no API key required)
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        locationData = {
          country: data.country_name || "Unknown",
          city: data.city || "Unknown",
          countryCode: data.country_code || "XX",
          region: data.region || "Unknown",
        };
      }
    } catch (e) {
      // If geolocation fails, continue with 'Unknown'
      console.log("Geolocation unavailable");
    }

    // Get existing analytics data
    let analytics = [];
    try {
      const stored = localStorage.getItem("siteAnalytics");
      if (stored) {
        analytics = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading analytics:", e);
    }

    // Add new page view with location
    analytics.push({
      page: pagePath,
      timestamp: timestamp,
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      country: locationData.country,
      countryCode: locationData.countryCode,
      city: locationData.city,
      region: locationData.region,
    });

    // Store updated analytics locally
    try {
      localStorage.setItem("siteAnalytics", JSON.stringify(analytics));
    } catch (e) {
      console.error("Error storing analytics:", e);
    }

    // Track global hit counter using Abacus API
    try {
      // Increment total site visits (v2 - fresh counter)
      fetch("https://abacus.jasoncameron.dev/hit/lotriet.github.io/v2-total-visits").catch(
        () => console.log("Global counter unavailable")
      );

      // Increment page-specific counter (v2 - fresh counter)
      const pageKey = pagePath.replace(/\//g, "-").replace(/^-/, "") || "home";
      fetch(`https://abacus.jasoncameron.dev/hit/lotriet.github.io/v2-page-${pageKey}`).catch(
        () => console.log("Page counter unavailable")
      );

      // Increment country counter if available (v2 - fresh counter)
      if (locationData.countryCode !== "XX") {
        fetch(
          `https://abacus.jasoncameron.dev/hit/lotriet.github.io/v2-country-${locationData.countryCode}`
        ).catch(() => console.log("Country counter unavailable"));
      }
    } catch (e) {
      console.log("Global analytics unavailable");
    }
  }

  // Track on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackPageView);
  } else {
    trackPageView();
  }
})();

function initPage() {
  attachExportHandlers();
  attachPortfolioToggle();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
