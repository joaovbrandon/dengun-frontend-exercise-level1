import Mustache from 'mustache';
import loader from '../partials/loader.html';
import modal from '../partials/modal.html';

// Formatters
const currencyFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
});

const currencyFormat = value => currencyFormatter.format(value);

const phoneFormat = value => value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '($1) $2-$3-$4');

// Loader
const startLoader = (element, id, position) => {
  element.insertAdjacentHTML(position, Mustache.render(loader, { id }));
};

const stopLoader = (element, id) => {
  element.querySelector(`#loader--${id}`).remove();
};


// Modal
const escapeListener = (event) => {
  const key = event.key || event.keyCode;
  if (key === 'Escape' || key === 'Esc' || key === 27) document.hideModal();
};

const showModal = (title, message) => {
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  document.body.insertAdjacentHTML('beforeend', Mustache.render(modal, { title, message }));
  document.addEventListener('keyup', escapeListener);
};

const hideModal = () => {
  document.body.style.height = 'unset';
  document.body.style.overflow = 'unset';
  document.querySelector('#modal').remove();
  document.removeEventListener('keyup', escapeListener);
};

const init = () => {
  document.hideModal = hideModal;
};

init();

export {
  currencyFormat,
  phoneFormat,
  startLoader,
  stopLoader,
  showModal,
  hideModal,
};
