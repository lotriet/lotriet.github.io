// Geo-based redirection script
document.addEventListener("DOMContentLoaded", function () {
  // Set a flag in sessionStorage to prevent redirect loops
  const hasRedirected = sessionStorage.getItem("hasRedirected");
  
  // If we already redirected once in this session and we're on index.html or sa-resume.html, 
  // don't redirect again
  if (hasRedirected === "true") {
    if (window.location.pathname.includes("index.html") || 
        window.location.pathname.includes("sa-resume.html")) {
      console.log("Already redirected this session, stopping redirect loop");
      return;
    }
  }
  
  // Check if we're on resume.html and redirect to the appropriate full CV
  if (window.location.pathname.includes("resume.html")) {
    // Use the free ipinfo.io service to get user's country
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        const country = data.country;
        console.log("Detected country:", country);

        // If in South Africa, redirect to SA resume
        if (country === "ZA") {
          sessionStorage.setItem("hasRedirected", "true");
          window.location.replace("sa-resume.html");
        }
      });
    return;
  }

  // Redirect based on location for all other pages
  if (!window.location.pathname.includes("sa-resume.html")) {
    // Use the free ipinfo.io service to get user's country
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        const country = data.country;
        console.log("Detected country:", country);

        // If in South Africa, redirect to SA resume
        if (country === "ZA") {
          sessionStorage.setItem("hasRedirected", "true");
          window.location.replace("sa-resume.html");
        } else {
          // For non-SA visitors, ensure they see the US CV
          if (
            window.location.pathname === "/" ||
            window.location.pathname.endsWith("lotriet.github.io/") ||
            window.location.pathname.endsWith("lotriet.dev/") ||
            window.location.pathname.includes("landing.html")
          ) {
            sessionStorage.setItem("hasRedirected", "true");
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
          window.location.pathname.endsWith("lotriet.dev/") ||
          window.location.pathname.includes("landing.html")
        ) {
          sessionStorage.setItem("hasRedirected", "true");
          window.location.replace("index.html");
        }
      });
  }
});
