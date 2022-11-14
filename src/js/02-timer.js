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
const x = new flatpickr(input);

timerBox.style.display = 'flex';
timerBox.style.gap = '20px';
fieldBoxes.forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.firstElementChild.style.fontSize = '25px';
  element.lastElementChild.style.fontSize = '15px';
});
function counts() {
  let date = new Date('2022-11-15 00:00:00');
  let now = new Date();
  ms = date - now;

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
    dataSeconds = seconds;
    dataMinutes = minutes;
    dataHours = hours;
    dataDays = days;
  }
}
counts();
startBtn.addEventListener('click', setInterval(counts, 1000));

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };
