document.addEventListener("DOMContentLoaded", function() {
    
// auto-rotating health quotes array
const quotes = [
    "Eat healthy, live healthy",
    "Small steps every day lead to big changes",
    "Choose health, choose happiness",
    "Good health is the best investment",
    "Balance is the key to wellbeing",
    "Fitness is a journey, not a destination"
];

let quoteIndex = 0;                                             // Track which quote to show
const quoteElement = document.getElementById("healthQuote");     // Target quote display element


// function to update quote text
function showQuote() {
    quoteElement.innerText = quotes[quoteIndex];                // Show current quote
    quoteIndex = (quoteIndex + 1) % quotes.length;              // Move to next quote (loops back at end)
}

showQuote();                                        // Initial display
setInterval(showQuote, 4000);                       // Changes every 4 seconds


// health tip of the day
const tipsContainer = document.getElementById("tipsContainer");       // Target tip container


// daily health tips array
const tips = [
    "Drink at least 8 glasses of water",
    "Take a 30-minute walk to boost your energy",
    "Include fruits and vegetables in your meals",
    "Sleep at least 7-8 hours for proper rest",
    "Take a few minutes to meditate and clear your mind",
    "Limit screen time before bed for better sleep"
];


const today = new Date().getDate();                         // gets day of month (1-31)
const tipOfTheDay = tips[today % tips.length];              // picks tip based on day


// insert the tip into the container
tipsContainer.innerHTML = `<p>${tipOfTheDay}</p>`;
});

