const timerDisplay = document.getElementById("timer");
const focusBtn = document.getElementById("focus-btn");
const focusLight = document.getElementById("focus-light");
const timerCircle = document.getElementById("timer-circle");
const clickSound = document.getElementById("click-sound");

// ایجاد مارکرهای تایمر
const createTimerMarkers = () => {
  const totalMarkers = 60;
  for (let i = 0; i < totalMarkers; i++) {
    const marker = document.createElement("div");
    marker.className = i % 5 === 0 ? "timer-marker minute" : "timer-marker";
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
let isAnimating = false;

function displayTime() {
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function countdown() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timerId);
      isRunning = false;
      focusLight.classList.remove("active");
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  displayTime();
}

function addBounceAnimation(element, className) {
  if (isAnimating) return;
  isAnimating = true;

  element.classList.remove("bouncing-pressed", "bouncing-released");
  void element.offsetWidth;

  element.addEventListener(
    "animationend",
    () => {
      element.style.transition = "transform 0.3s ease";
    },
    { once: true }
  );

  element.classList.add(className);

  element.addEventListener(
    "animationend",
    () => {
      element.classList.remove(className);
      isAnimating = false;
      element.style.transition = ""; // Reset transition
    },
    { once: true }
  );
}

focusBtn.addEventListener("click", () => {
  clickSound.play().catch(() => console.log("Playback error"));

  if (!isRunning) {
    if (minutes === 0 && seconds === 0) {
      minutes = 25;
      displayTime();
    }
    isRunning = true;
    focusLight.classList.add("active");
    addBounceAnimation(focusBtn, "bouncing-pressed");
    timerId = setInterval(countdown, 1000);
  } else {
    isRunning = false;
    focusLight.classList.remove("active");
    addBounceAnimation(focusBtn, "bouncing-released");
    clearInterval(timerId);
  }
});

displayTime();
