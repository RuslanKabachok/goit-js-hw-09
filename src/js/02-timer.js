import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const data = selectedDates[0];

    choseCorrectTime(data);
  },
};

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let time;

refs.startBtnEl.setAttribute('disabled', 'disabled');
refs.startBtnEl.addEventListener('click', startCount);

flatpickr(refs.dateInput, options);

function choseCorrectTime(data) {
  time = data;
  if (data < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtnEl.removeAttribute('disabled');
    return time;
  }
}

function startCount() {
  const timerId = setInterval(() => {
    const newTime = Date.now();
    let timeLeft = time - newTime;

    const result = convertMs(timeLeft);

    if (newTime > time) {
      clearInterval(timerId);
    } else {
      refs.days.textContent = addLeadingZero(result.days);
      refs.hours.textContent = addLeadingZero(result.hours);
      refs.minutes.textContent = addLeadingZero(result.minutes);
      refs.seconds.textContent = addLeadingZero(result.seconds);
    }
  }, 1000);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
