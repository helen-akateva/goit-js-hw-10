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

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        return resolve(delay);
      } else {
        return reject(delay);
      }
    }, delay);
  });

  promise
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
