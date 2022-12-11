/* <input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div> */
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let timerId = null;
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onTimerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    onSelectDate(selectedDates);
  },
};

const flatPickr = flatpickr('#datetime-picker', options);

function onSelectDate(selectedDates) {
  if (selectedDates[0] >= new Date()) {
    console.log('Вибрана дата підходить');
    refs.startBtn.disabled = false;
  } else {
    refs.startBtn.disabled = true;
    console.log('Вибрана дата непідходить!!!');
    Notify.failure('Please choose a date in the future', {
      width: '320px',
      position: 'left-top',
      distance: '10px',
    });
  }
}

function onTimerStart() {
  const selectedDate = flatPickr.selectedDates[0];
  refs.inputDate.disabled = true;
  refs.startBtn.disabled = true;

  timerId = setInterval(() => {
    const currentDate = new Date();
    const timerValue = selectedDate - currentDate;

    const timeComponents = convertMs(timerValue);
    console.log(timeComponents);

    if (timerValue <= 0) {
      clearInterval(timerId);
      return;
    }
    showTimer(convertMs(timerValue));
  }, 1000);
}

// двозначне значення лічильника
const addLeadingZero = value => value.toString().padStart(2, 0);

function showTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
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
