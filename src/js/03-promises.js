import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('form'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
let position = 0;

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.elements.delay.value);
  const amount = Number(e.currentTarget.elements.amount.value);
  const step = Number(e.currentTarget.elements.step.value);

  for (let i = 0; i < Number(amount.length); i++) {
    position += 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      }, delay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        resolve({ position, delay });
      }
    }, delay);
  });
  return promise;
}
