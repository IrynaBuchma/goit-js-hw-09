import '../css/common.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';


const refs = {
    startBtn: document.querySelector('button[data-start]'),
    dateChosen: document.querySelector('#datetime-picker'),
    label: document.querySelector('.timer'),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
}

let timer = null;

refs.startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        if (selectedDates[0] <= Date.now()) {
            refs.startBtn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.disabled = false;

            refs.startBtn.addEventListener('click', countdownTime);

            function countdownTime() {
                const timer = setInterval(() => {
                    refs.startBtn.disabled = true;


                    const choosenDate = selectedDates[0].getTime();
                    const currentDate = Date.now();
                    const timeLeft = choosenDate - currentDate;
                   
                    const { days, hours, minutes, seconds } = convertMs(timeLeft);
                    
                    refs.days.innerHTML = days/* < 10 ? pad(days) : days */;
                    refs.hours.innerHTML = hours/*  < 10 ? pad(hours) : hours */;
                    refs.minutes.innerHTML = minutes/*  < 10 ? pad(minutes) : minutes */;
                    refs.seconds.innerHTML = seconds/*  < 10 ? pad(seconds) : seconds */;

                    if (timeLeft < 1000) {
                        clearInterval(timer);
                        refs.startBtn.disabled = false;
                    }
                }, 1000);
            }

            function pad(value) {
                return String(value).padStart(2, '0');
            }

            function convertMs(ms) {

                    // Number of milliseconds per unit of time
                        const second = 1000;
                        const minute = second * 60;
                        const hour = minute * 60;
                        const day = hour * 24;

                        // Remaining days
                        const days = pad(Math.floor(ms / day));
                        // Remaining hours
                        const hours = pad(Math.floor((ms % day) / hour));
                        // Remaining minutes
                        const minutes = pad(Math.floor(((ms % day) % hour) / minute));
                        // Remaining seconds
                        const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

                        return { days, hours, minutes, seconds };
            }
        }
    }
}

flatpickr(refs.dateChosen, options);


refs.label.style.textTransform = 'uppercase';