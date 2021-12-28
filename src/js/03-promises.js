import Notiflix from 'notiflix';
const formEl = document.querySelector('form');
let position = 0;

formEl.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = Number(e.currentTarget.elements.delay.value);
  const amount = Number(e.currentTarget.elements.amount.value);
  const step = Number(e.currentTarget.elements.step.value);

  setInterval(() => {
    for (let i = 0; i <= Number(amount.value); i += 1) {
      position += 1;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, delay);
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
