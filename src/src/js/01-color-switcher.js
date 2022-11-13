const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartClick);
function onStartClick() {
  timerId = setInterval(getRandomHexColor, 1000);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
body.style.bacgroundColor = getRandomHexColor();
