import Notiflix from 'notiflix';

const promiseFormEl = document.querySelector('.form');
const inputDelay = document.querySelector('[name=delay]')
const inputStep = document.querySelector('[name=step]')
const inputAmount = document.querySelector('[name=amount]')

promiseFormEl.addEventListener('submit', onFormSubmit);
inputDelay.addEventListener('input', onInputDelay)
inputStep.addEventListener('input', onInputStep)
inputAmount.addEventListener('input', onInputAmount)


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
    resolve({position, delay});

  } else {
    reject({position, delay});

  }}, delay)
  
})
}

function onFormSubmit(event) {

  event.preventDefault();

  const amount = onInputAmount();
  const firstDelay = onInputDelay();
  const step = onInputStep();

  let promiseDelay = firstDelay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    promiseDelay += step;
  }
}

function onInputDelay() {
  return Number(inputDelay.value);
}

function onInputStep() {
  return Number(inputStep.value);
}

function onInputAmount() {
  return Number(inputAmount.value);
}
