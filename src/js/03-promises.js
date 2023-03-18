import '../css/common.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  form: document.querySelector(".form"),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
}

refs.form.addEventListener('submit', submitCreatePromises);

function submitCreatePromises(e) {
  e.preventDefault();

  let delay = refs.firstDelay.valueAsNumber;
  const delayStepValue = refs.delayStep.valueAsNumber;
  const amountValue = refs.amount.valueAsNumber;

  for (let i = 1; i <= amountValue; i++) {

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

    delay += delayStepValue;
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      const shouldResolve = Math.random() > 0.3;
  
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
