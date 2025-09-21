document.addEventListener("DOMContentLoaded", function() {

  // breathing animation
  const breathingCircle = document.getElementById("breathingCircle");         // Circle element
  let inhale = true;                                                          // Track inhale/exhale state


  // toggle inhale/exhale every 4 seconds
  setInterval(() => {
    if (inhale) {
      breathingCircle.style.transform = "scale(1.5)";                       // Expand circle
      breathingCircle.innerText = "Inhale";                                 // Show "Inhale"
    } else {
      breathingCircle.style.transform = "scale(1)";                         // Shrink back
      breathingCircle.innerText = "Exhale";                                 // Show "Exhale"
    }
    inhale = !inhale;                                                       // Switch state
  }, 4000);                                                                 // 4 seconds inhale/exhale cycle


  // meditation timer 
  const startBtn = document.getElementById("startTimer");                   // Start button
  const timerDisplay = document.getElementById("timerDisplay");             // Display timer
  const sessionInput = document.getElementById("sessionTime");              // Input minutes
  const completedCount = document.getElementById("completedCount");         // Track completed sessions


  // reset completed sessions every time page is loaded
  let completed = 0;
  localStorage.setItem("completedSessions", completed);
  completedCount.innerText = completed;


  // start meditation session on button click
  startBtn.addEventListener("click", function() {
    let totalMinutes = parseInt(sessionInput.value);                        // User input
    if(totalMinutes <= 0) return;                                           // Stop if invalid

    let totalSeconds = totalMinutes * 60;                                   // Convert minutes → seconds


    // countdown timer
    const timer = setInterval(() => {
      let mins = Math.floor(totalSeconds / 60);                             // Remaining minutes
      let secs = totalSeconds % 60;                                         // Remaining seconds
      timerDisplay.innerText = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
      totalSeconds--;


    // session complete
      if(totalSeconds < 0) {
        clearInterval(timer);
        timerDisplay.innerText = "00:00";

        // increase completed sessions
        completed++;
        localStorage.setItem("completedSessions", completed);
        completedCount.innerText = completed;
        alert("Session complete! Good job!");
      }
    }, 1000);                                                            // Update every second
  });


  // ambient sound toggle 
  const soundToggle = document.getElementById("soundToggle");           // Button for sound
  const ambientAudio = document.getElementById("ambientAudio");         // Audio element


  // toggle play/pause sound
  soundToggle.addEventListener("click", function() {
    if (ambientAudio.paused) {
      ambientAudio.play();
      soundToggle.innerText = "Pause Sound";                            // Update button text
    } else {
      ambientAudio.pause();
      soundToggle.innerText = "Play Sound";                             // Update button text
    }
  });
});
