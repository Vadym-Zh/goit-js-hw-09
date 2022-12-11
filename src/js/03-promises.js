/* <form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>; */

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onCreatePromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    timeId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

let timeId = null;
function onCreatePromise(e) {
  e.preventDefault();
  clearTimeout(timeId);

  let delayValue = Number(document.querySelector('[name="delay"]').value);
  let stepValue = Number(document.querySelector('[name="step"]').value);
  let amountValue = Number(document.querySelector('[name="amount"]').value);

  console.log('delay:', delayValue);
  console.log('step:', stepValue);
  console.log('amount:', amountValue);

  if (delayValue < 1 || stepValue < 1 || amountValue < 1) {
    Notify.failure(`All values must be greater than zero`);
    return;
  }
  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        console.log({ position, delay });
        Notify.success(`✅ Fulfilled promise #${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log({ position, delay });
        Notify.failure(`❌ Rejected promise #${position} in ${delay}ms`);
      });

    delayValue += stepValue;
  }
  e.currentTarget.reset();
}
