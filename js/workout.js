document.addEventListener("DOMContentLoaded", function() {

  const bodyPartSelect = document.getElementById("bodyPart");           // Body part dropdown
  const equipmentSelect = document.getElementById("equipment");         // Equipment dropdown
  const generateBtn = document.getElementById("generateBtn");           // Generate button
  const exerciseName = document.getElementById("exerciseName");         // Shows current exercise
  const countdown = document.getElementById("countdown");               // Shows timer
  const workoutList = document.getElementById("workoutList");           // List of exercises


  // define exercises
  const exercises = [
    {name: "Jumping Jacks", body: "Full Body", equip: "None", time: 10},
    {name: "Push-ups", body: "Arms", equip: "None", time: 10},
    {name: "Squats", body: "Legs", equip: "None", time: 10},
    {name: "Plank", body: "Core", equip: "None", time: 10},
    {name: "Bicep Curls", body: "Arms", equip: "Dumbbells", time: 10},
    {name: "Lunges", body: "Legs", equip: "None", time: 10},
    {name: "Shoulder Press", body: "Arms", equip: "Dumbbells", time: 10},
    {name: "Russian Twists", body: "Core", equip: "None", time: 10},
  ];


  // generate workout button click 
  generateBtn.addEventListener("click", function() {
    const selectedBody = bodyPartSelect.value;                                   // Selected body part
    const selectedEquip = equipmentSelect.value;                                 // Selected equipment


    // filter exercises based on selection
    const filtered = exercises.filter(ex => 
      (ex.body === selectedBody || selectedBody === "Full Body") &&
      (ex.equip === selectedEquip || selectedEquip === "None")
    );


    // if no exercises found
    if(filtered.length === 0) {
      workoutList.innerHTML = "<li>No exercises found!</li>";
      exerciseName.innerText = "---";
      countdown.innerText = "0";
      countdown.style.transform = "scale(1)";
      countdown.style.borderColor = "green";
      return;
    }

    // display workout plan
    workoutList.innerHTML = "";
    filtered.forEach(ex => {
      const li = document.createElement("li");
      li.innerText = `${ex.name} - ${ex.time}s`;
      workoutList.appendChild(li);
    });


    // start workout timer
    startWorkout(filtered, 0);
  });


  // function to run each exercise
  function startWorkout(list, index) {
      // if workout finished
    if(index >= list.length) {
      exerciseName.innerText = "Workout Completed..";
      countdown.innerText = "";
      countdown.style.transform = "scale(1)";
      countdown.style.borderColor = "green";
      return;
    }

    let timeLeft = list[index].time;                                                          // Time for current exercise
    exerciseName.innerText = list[index].name;                                                // Show exercise name

    countdown.style.transform = "scale(1)";
    countdown.style.borderColor = "green";


    // countdown timer
    const timer = setInterval(function() {
      countdown.innerText = timeLeft + "s";

      // animate countdown size
      let scale = 0.5 + 0.5 * (timeLeft / list[index].time);
      countdown.style.transform = `scale(${scale})`;

      // change border color based on remaining time
      if(timeLeft <= list[index].time / 3) {
        countdown.style.borderColor = "red";
      } else if(timeLeft <= list[index].time * 2/3) {
        countdown.style.borderColor = "orange";
      }

      timeLeft--;

      // when exercise ends, move to next
      if(timeLeft < 0) {
        clearInterval(timer);
        startWorkout(list, index + 1);
      }
    }, 1000);                                                       // Timer updates every second
  }
});
