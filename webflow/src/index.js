// Function to initialize the application
function initApp() {
  //displayLoader();
  const path = window.location.pathname;

  console.log("Hello World!");
  
  // Handle authentication and user display for app routes
  if (path.startsWith('/generate-products') || path.startsWith('/find-products')) {
    import('../src/generate_products.js').then(module => module.render())
  }
}

// Listen for when the DOM content is fully loaded, then initialize the app
document.addEventListener("DOMContentLoaded", initApp);