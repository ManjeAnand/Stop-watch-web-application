let timer;
    let running = false;
    let milliseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let laps = [];

    const hand = document.getElementById('hand');

    function updateDisplay() {
      const formattedMilliseconds = String(milliseconds).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedHours = String(hours).padStart(2, '0');

      document.getElementById("display").textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;

      // Smooth rotation: include fractional seconds using milliseconds
      const degree = ((seconds % 60) + milliseconds / 100) * 6;
      hand.style.transform = `rotate(${degree}deg)`;
    }

    function start() {
      if (!running) {
        running = true;
        timer = setInterval(function() {
          milliseconds++;
          if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
          }
          if (seconds >= 60) {
            seconds = 0;
            minutes++;
          }
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
          updateDisplay();
        }, 10); 
      }
    }

    function pause() {
      if (running) {
        clearInterval(timer);
        running = false;
      }
    }

    function reset() {
      clearInterval(timer);
      running = false;
      milliseconds = 0;
      seconds = 0;
      minutes = 0;
      hours = 0;
      updateDisplay();
      laps = [];
      document.getElementById("laps").innerHTML = '';
    }

    function lap() {
      if (running) {
        const lapTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
        laps.push(lapTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        document.getElementById("laps").appendChild(lapItem);
      }
    }

    
    updateDisplay();