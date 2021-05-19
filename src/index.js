import './styles.css';
import fetchCountries from './js/fetchCountries';
import countryListTemplate from './templates/country.hbs';
import countriesListTemplate from './templates/countries.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial';

import debounce from 'lodash.debounce';
import getRefs from './js/get-refs';

const refs = getRefs();

refs.form.addEventListener('submit', event => {
  event.preventDefault();
});

refs.form.addEventListener(
  'input',
  debounce(e => {
    searchFormInput(e);
  }, 500),
);

function searchFormInput(e) {
  const searchQuery = e.target.value;

  clearListItems();

  fetchCountries(searchQuery).then(data => {
    const markup = buildListMarkup(data);
    const renderCountriesList = buildCountriesList(data);
    if (!data) {
      return;
    } else if (data.length > 10) {
      PNotify.defaults.styling = 'material';
      PNotify.defaults.icons = 'material';
      PNotify.error({
        title: 'Oh, No!',
        text: 'Too many matches found. Please enter a more specific query!',
      });
    } else if (data.length >= 2 && data.length <= 10) {
      insertListItem(renderCountriesList);
    } else if (data.length === 1) {
      insertListItem(markup);
    } else {
      alert('Упс, что-то пошло не так. Корректно введите запрос');
    }
  });
}

function insertListItem(items) {
  refs.list.insertAdjacentHTML('beforeend', items);
  console.log(items)
}

function buildCountriesList(items) {
  return countriesListTemplate(items);
}

function buildListMarkup(items) {
  return countryListTemplate(items);
}

function clearListItems() {
  refs.list.innerHTML = '';
}