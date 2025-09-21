document.addEventListener("DOMContentLoaded", function () {

    // load navbar
    fetch("navbar.html")
        .then(res => res.text())                                                // Convert response to text
        .then(data => {

            // insert navbar at the top of the body
            document.body.insertAdjacentHTML("afterbegin", data);


            // hamburger menu toggle for mobile
            const hamburger = document.querySelector('.hamburger');             // Hamburger button
            const navLinks = document.querySelector('.nav-links');              // Navigation links container

            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('show');                              // Show/hide links on click
            });
        });


    // load footer
    fetch("footer.html")
        .then(res => res.text())
        .then(data => {

            // insert footer at the bottom of the body
            document.body.insertAdjacentHTML("beforeend", data);


            // newsletter subscribe button
            var subscribeBtn = document.getElementById("subscribeBtn");
            var emailInput = document.getElementById("emailInput");

            subscribeBtn.addEventListener("click", function () {
                var email = emailInput.value.trim();


                // simple validation: must include "@" symbol
                if (email.includes("@")) {
                    localStorage.setItem("subscriberEmail", email);                 // Save email locally
                    alert("Thank you for subscribing");
                    emailInput.value = "";
                } else {
                    alert("Please enter a valid email");
                }
            });
        });
});


// highlight active page link
const navLinksArray = document.querySelectorAll(".nav-links a");                    // All nav links
const currentPage = window.location.pathname.split("/").pop();                      // Gets current file name

navLinksArray.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});


// reveal on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");                 // All elements with 'reveal' class
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;                            // Viewport height
    const elementTop = el.getBoundingClientRect().top;                  // Element's top distance from viewport
    const revealPoint = 100;                                            // Trigger point

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");                                       // Add 'active' class to reveal element
    }
  });
}


// run reveal effect on scroll and on page load
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// service worker registration (PWA support)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registered"))                   // Success
    .catch(err => console.log("SW registration failed: ", err));            // Failure
}

