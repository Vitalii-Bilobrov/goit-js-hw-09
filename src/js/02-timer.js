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

    function counts() {
      let now = new Date();
      localStorage.setItem('selectedDates', selectedDates[0]);

      let ms = localStorage.getItem('selectedDates');
      if (!ms) return;
      let diff = new Date(ms) - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      console.log(days, hours, minutes, seconds);
      dataSeconds.textContent = seconds;
      dataMinutes.textContent = minutes;
      dataHours.textContent = hours;
      dataDays.textContent = days;
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timerId);
        timerId = null;
        startBtn.disabled = true;
      }
    }
    function onStartBtnClick() {
      if (timerId) {
        clearInterval(timerId);
      }
      counts();
      timerId = setInterval(counts, 1000);
    }
    startBtn.addEventListener('click', onStartBtnClick);
  },
};

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

flatpickr(input, options);
