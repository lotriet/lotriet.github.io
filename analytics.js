// Simple page view counter with geolocation
(function() {
  'use strict';

  // Track page view
  async function trackPageView() {
    const pagePath = window.location.pathname;
    const timestamp = new Date().toISOString();

    // Get location data
    let locationData = {
      country: 'Unknown',
      city: 'Unknown',
      countryCode: 'XX'
    };

    try {
      // Use ipapi.co for geolocation (free, no API key required)
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        locationData = {
          country: data.country_name || 'Unknown',
          city: data.city || 'Unknown',
          countryCode: data.country_code || 'XX',
          region: data.region || 'Unknown'
        };
      }
    } catch (e) {
      // If geolocation fails, continue with 'Unknown'
      console.log('Geolocation unavailable');
    }

    // Get existing analytics data
    let analytics = [];
    try {
      const stored = localStorage.getItem('siteAnalytics');
      if (stored) {
        analytics = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading analytics:', e);
    }

    // Add new page view with location
    analytics.push({
      page: pagePath,
      timestamp: timestamp,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      country: locationData.country,
      countryCode: locationData.countryCode,
      city: locationData.city,
      region: locationData.region
    });

    // Store updated analytics
    try {
      localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
    } catch (e) {
      console.error('Error storing analytics:', e);
    }
  }

  // Track on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageView);
  } else {
    trackPageView();
  }
})();
