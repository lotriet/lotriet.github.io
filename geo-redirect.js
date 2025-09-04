// Geo-based redirection script
document.addEventListener("DOMContentLoaded", function () {
  // Redirect all visitors who don't have a specific CV in the URL
  // This covers landing page, index.html, and resume.html access
  if (!window.location.pathname.includes("sa-resume.html")) {
    // Use the free ipinfo.io service to get user's country
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        const country = data.country;
        console.log("Detected country:", country);

        // If in South Africa, redirect to SA resume
        if (country === "ZA") {
          window.location.replace("sa-resume.html");
        } else {
          // For non-SA visitors, ensure they see the US CV
          if (
            window.location.pathname === "/" ||
            window.location.pathname.endsWith("lotriet.github.io/") ||
            window.location.pathname.includes("landing.html")
          ) {
            window.location.replace("index.html");
          }
        }
      })
      .catch((error) => {
        console.error("Error detecting country:", error);
        // On error, default to showing the US CV
        if (
          window.location.pathname === "/" ||
          window.location.pathname.endsWith("lotriet.github.io/") ||
          window.location.pathname.includes("landing.html")
        ) {
          window.location.replace("index.html");
        }
      });
  }
});
