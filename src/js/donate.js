import Mustache from 'mustache';
import donationListTemplate from '../partials/donation-list.html';

import {
  currencyFormat, phoneFormat, startLoader, stopLoader, showModal,
} from './utils';

const donate = (id) => {
  showModal('Thank you for your donation!', `You donate to #${id}`);
  const donateButton = document.querySelector(`#donation-item--${id} .donate-content button`);
  donateButton.setAttribute('disabled', true);
  donateButton.innerText = 'Donated';
};

const getDonationList = async () => {
  const content = document.getElementById('content');
  startLoader(content, 'getDonationList', 'afterbegin');

  const response = await fetch('./assets/donationList.json');
  let donationList = await response.json();

  donationList = donationList.map(donationItem => ({
    ...donationItem,
    donatedAmount: currencyFormat(donationItem.donatedAmount),
    phone: phoneFormat(donationItem.phone),
  }));

  await content.insertAdjacentHTML('afterbegin', Mustache.render(donationListTemplate, { donationList }));

  stopLoader(content, 'getDonationList');
};

const init = () => {
  document.donate = donate;
  getDonationList();
};

init();
