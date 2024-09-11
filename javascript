let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval = null;
let isPaused = false;
let lapCount = 0;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// Function to format time
function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Start the stopwatch
startBtn.addEventListener('click', () => {
    if (!interval) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateTime, 10);
        isPaused = false;
    }
});

// Pause the stopwatch
pauseBtn.addEventListener('click', () => {
    if (!isPaused) {
        clearInterval(interval);
        interval = null;
        isPaused = true;
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    difference = 0;
    lapCount = 0;
    isPaused = false;
    timeDisplay.textContent = "00:00:00.000";
    lapsList.innerHTML = '';
});

// Lap time tracking
lapBtn.addEventListener('click', () => {
    if (!isPaused && interval) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${timeDisplay.textContent}`;
        lapsList.appendChild(lapTime);
    }
});

// Update the time display
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeDisplay.textContent = formatTime(difference);
}
