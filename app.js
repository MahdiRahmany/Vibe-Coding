const timerDisplay = document.getElementById("timer");
const focusBtn = document.getElementById("focus-btn");
const focusLight = document.getElementById("focus-light");
const timerCircle = document.getElementById("timer-circle");
const startIndicator = document.getElementById("start-indicator");
const clickSound = document.getElementById("click-sound");

// ایجاد مارکرهای دایره‌ای مشابه ساعت
const createTimerMarkers = () => {
  const totalMarkers = 60;
  for (let i = 0; i < totalMarkers; i++) {
    const marker = document.createElement("div");
    // هر 5 امین مارکر به عنوان مارکر اصلی با سایز و رنگ متفاوت
    if (i % 5 === 0) {
      marker.className = "timer-marker minute";
    } else {
      marker.className = "timer-marker";
    }
    const angle = i * (360 / totalMarkers);
    marker.style.transform = `rotate(${angle}deg) translateY(-140px)`;
    marker.style.left = "50%";
    marker.style.top = "50%";

    timerCircle.appendChild(marker);
  }
};

createTimerMarkers();

let minutes = 25;
let seconds = 0;
let timerId;
let isRunning = false;

function displayTime() {
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
}

function countdown() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timerId);
      isRunning = false;
      focusLight.classList.remove("active");
      focusBtn.classList.remove("pressed");
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  displayTime();
}

focusBtn.addEventListener("click", () => {
  // پخش صدای کلیک و ریست زمان پخش
  clickSound.currentTime = 0;
  clickSound.play().catch(error => {});

  // تنظیم شروع یا توقف تایمر بدون حذف راهنمای شروع
  if (!isRunning) {
    if (minutes === 0 && seconds === 0) {
      minutes = 25;
      seconds = 0;
      displayTime();
    }
    isRunning = true;
    focusLight.classList.add("active");
    focusBtn.classList.add("pressed");
    timerId = setInterval(countdown, 1000);
  } else {
    isRunning = false;
    focusLight.classList.remove("active");
    focusBtn.classList.remove("pressed");
    clearInterval(timerId);
  }
});

displayTime();
