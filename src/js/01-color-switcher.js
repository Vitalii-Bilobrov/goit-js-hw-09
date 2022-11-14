const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId;
startBtn.addEventListener('click', onStartClick);
function onStartClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
stopBtn.addEventListener('click', onStopClick);
function onStopClick() {
  clearInterval(timerId);
  startBtn.disabled = false;
}
