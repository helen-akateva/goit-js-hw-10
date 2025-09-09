import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonEl: document.querySelector('button[data-start]'),
  dataEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

refs.buttonEl.disabled = true;

let userSelectedDate;
let intervalId;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function updateTimer() {
  const timeDifference = userSelectedDate.getTime() - Date.now();

  if (timeDifference <= 0) {
    clearInterval(intervalId);
    refs.inputEl.disabled = false;
    refs.buttonEl.disabled = true;

    refs.dataEl.textContent = '00';
    refs.hoursEl.textContent = '00';
    refs.minutesEl.textContent = '00';
    refs.secondsEl.textContent = '00';
  } else {
    const timeComponents = convertMs(timeDifference);

    refs.dataEl.textContent = addLeadingZero(timeComponents.days);
    refs.hoursEl.textContent = addLeadingZero(timeComponents.hours);
    refs.minutesEl.textContent = addLeadingZero(timeComponents.minutes);
    refs.secondsEl.textContent = addLeadingZero(timeComponents.seconds);
  }
}

function handleButtonClick() {
  refs.buttonEl.disabled = true;
  refs.inputEl.disabled = true;
  intervalId = setInterval(updateTimer, 1000);
}

refs.buttonEl.addEventListener('click', handleButtonClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      refs.buttonEl.disabled = true;
      return iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        icon: '../img/sprite.svg',
        iconColor: '#fff',
      });
    } else {
      refs.buttonEl.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(refs.inputEl, options);
