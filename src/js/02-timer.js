import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const startBtn = document.querySelector('button[data-start]');
const dateInput = document.querySelector('input#datetime-picker');
const timer = document.querySelector('.timer');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
    const currentTime = new Date().getTime();

    const promise = new Promise((resolve) => {});

    if (selectedTime < currentTime) {
      return window.alert('Please choose a date in the future');
    }

    startBtn.disabled = false;

    startBtn.addEventListener('click', () => {
      setInterval(() => {
        const timeNow = new Date().getTime();
        const deltaTime = selectedTime - timeNow;

        const timeToEnd = convertMs(deltaTime);

        updateTimer(timeToEnd);
      }, 1000);
    });
  },
};

flatpickr(dateInput, options);

function updateTimer({ days, hours, minutes, seconds }) {
  const dateDays = document.querySelector('.value[data-days]');
  const dateHours = document.querySelector('.value[data-hours]');
  const dateMinutes = document.querySelector('.value[data-minutes]');
  const dateSeconds = document.querySelector('.value[data-seconds]');
  dateDays.textContent = `${days}`;
  dateHours.textContent = `${hours}`;
  dateMinutes.textContent = `${minutes}`;
  dateSeconds.textContent = `${seconds}`;
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

function addLeadingZero(value) {
  // padStart();
}
