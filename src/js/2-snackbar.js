import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const formData = new FormData(form);
  const delay = formData.get('delay');
  const state = formData.get('state');

  createPromise(delay, state)
    .then(value => {
      return iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        icon: '',
      });
    })
    .catch(error => {
      return iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        icon: '',
      });
    });

  form.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
