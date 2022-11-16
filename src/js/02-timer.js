import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timerBox = document.querySelector('.timer');
const fieldBoxes = document.querySelectorAll('.field');
const startBtn = document.querySelector('[type="button"]');
const input = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
startBtn.disabled = true;
let timerId = null;
const addZeroNumber = value => String(value).padStart(2, 0);
let targetDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    targetDate = selectedDates[0];
  },
};
function counts() {
  let diff = targetDate - Date.now();
  if (diff < 1000) {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = true;
  }
  const { days, hours, minutes, seconds } = convertMs(diff);
  console.log(days, hours, minutes, seconds);

  dataSeconds.textContent = addZeroNumber(seconds);
  dataMinutes.textContent = addZeroNumber(minutes);
  dataHours.textContent = addZeroNumber(hours);
  dataDays.textContent = addZeroNumber(days);
}
timerBox.style.display = 'flex';
timerBox.style.gap = '20px';
fieldBoxes.forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.firstElementChild.style.fontSize = '25px';
  element.lastElementChild.style.fontSize = '15px';
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function onStartBtnClick() {
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(counts, 1000);
  startBtn.disabled = true;
  input.disabled = true;
}
startBtn.addEventListener('click', onStartBtnClick);
flatpickr(input, options);
