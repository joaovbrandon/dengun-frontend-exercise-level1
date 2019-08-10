import { showModal } from './utils';

const share = (id) => {
  showModal('Thank you for share!', `You shared #${id}`);
};

const init = () => {
  document.share = share;
};

init();
