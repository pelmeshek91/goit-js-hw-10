import './css/styles.css';
import * as debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

function handleSubmit() {
  const query = input.value;
  if (query) {
    fetchCountries(query)
      .then(setMarkup)
      .catch(err => Notify.failure('Oops, there is no country with that name'));
  } else {
    countryList.innerHTML = '';
    countryCard.innerHTML = '';
  }
}

function setMarkup(countries) {
  if (countries.length > 10) {
    countryList.innerHTML = '';
    countryCard.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  countryList.innerHTML = '';
  countryCard.innerHTML = '';
  if (countries.length === 1) {
    createMarkupCard(countries);

    return;
  }
  countryList.insertAdjacentHTML('afterbegin', createMarkupList(countries));
}

function createMarkupList(data) {
  return data.reduce(
    (acc, { name, flags }) =>
      acc +
      `<li class="list-item"><img src="${flags.svg}" style="width:30px;height:30px;"><p>${name.official}</p></li>`,
    ''
  );
}

function createMarkupCard(data) {
  const { flags, name, capital, population, languages } = data[0];

  countryCard.innerHTML = `<div class="wrap"><img src="${
    flags.svg
  }" style="width:40px;height:40px;"><h1>${
    name.official
  }</h1></div><p>Capital: <span>${capital}</span></p><p>Population: <span>${population}</span></p><p>Languages: <span>${Object.values(
    languages
  ).join(', ')}</span></p>`;
}

input.addEventListener('input', debounce(handleSubmit, DEBOUNCE_DELAY));
