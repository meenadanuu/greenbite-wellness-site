document.addEventListener("DOMContentLoaded", function() {

  // form submission 
  const form = document.getElementById("contactForm");
  const confirmation = document.getElementById("confirmation");


  // handle form submission
  form.addEventListener("submit", function(e) {
    e.preventDefault();                                         // Prevent page reload on form submit


    // get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();


    // validate inputs (basic check: name not empty, email contains "@", message not empty)
    if(name && email.includes("@") && message) {
      
      
      // save to localStorage
      let feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
      feedbacks.push({name, email, message, date: new Date().toLocaleString()});  // Add timestamp
      localStorage.setItem("feedbacks", JSON.stringify(feedbacks));               // Store updated feedbacks


      // show confirmation message
      confirmation.innerText = "Thank you for your feedback!";
      confirmation.style.display = "block";


      // reset form fields after submission
      form.reset();
    } else {
      alert("Please fill all fields correctly!");
    }
  });


  // FAQ accordion
  const faqQuestions = document.querySelectorAll(".faq-question");


  // toggle FAQ answer when a question is clicked
  faqQuestions.forEach(q => {
    q.addEventListener("click", function() {
      const answer = this.nextElementSibling;


      // toggle between show/hide
      answer.style.display = (answer.style.display === "block") ? "none" : "block";  
    });
  });
});
