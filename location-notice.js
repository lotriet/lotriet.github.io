// This file is now empty as we no longer need location notices
// Location detection and redirection is handled by geo-redirect.js

// Add this to your styles.css
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    .location-message {
      background-color: #f0f4ff;
      border: 1px solid #d1d5f0;
      border-left: 4px solid #4f46e5;
      color: #1f2937;
      padding: 10px 15px;
      margin: 10px auto 20px auto;
      max-width: 880px;
      border-radius: 4px;
      position: relative;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .location-message a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }
    
    .location-message a:hover {
      text-decoration: underline;
    }
    
    .close-btn {
      cursor: pointer;
      padding: 0 5px;
      font-size: 20px;
      font-weight: bold;
    }
    
    .close-btn:hover {
      color: #4f46e5;
    }
  </style>
`
);
