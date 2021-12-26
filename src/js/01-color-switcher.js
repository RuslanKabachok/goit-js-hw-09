const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartClick() {
  intervalId = setInterval(() => {
    refs.bodyEl.style.background = getRandomHexColor();
  }, 1000);

  refs.startBtnEl.setAttribute('disabled', 'disabled');
}

function onStopClick() {
  clearInterval(intervalId);
  refs.startBtnEl.removeAttribute('disabled');
}

refs.startBtnEl.addEventListener('click', onStartClick);
refs.stopBtnEl.addEventListener('click', onStopClick);
