import '../css/common.css';
const body = document.body;
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");

body.style.backgroundColor = getRandomHexColor();
stopBtn.disabled = true;
let timerId = null;


startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {

    stopBtn.disabled = false;
    startBtn.disabled = true;

    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);    
}

function onStopBtnClick(e) {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }
