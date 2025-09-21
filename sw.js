// service worker installation
self.addEventListener("install", (event) => {           // This runs when the service worker is installed for the first time
  console.log("Service Worker installed");
});


// service worker activation
self.addEventListener("activate", (event) => {          // This runs when the service worker becomes active
  console.log("Service Worker activated");
});


// Fetch Event (Network Requests)
self.addEventListener("fetch", (event) => {
});
