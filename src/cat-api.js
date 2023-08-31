import axios from 'axios';
import Notiflix from 'notiflix';

import { elements } from './index.js';

axios.defaults.baseURL = 'https://api.thecatapi.com';
axios.defaults.headers.common['x-api-key'] =
  'live_3haHg6Q7z6UXJqKUf1BtJyjvCFJOFD8RDRSf0YBbEAFblishlneb18iSErtUj0cO';

// Функція запиту на бекенд для отримання колекції порід
function fetchBreeds() {
  elements.select.classList.replace('breed-select', 'breed-select-hidden');
  return axios
    .get('/v1/breeds')
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    });
}

// Функція запиту на бекенд для отримання опису породу
function fetchCatByBreed(breedId) {
  elements.loader.classList.replace('loader-hidden', 'loader');
  elements.catInfo.classList.replace('cat-info', 'cat-info-hidden');
  return axios
    .get(`/v1/images/search?breed_ids=${breedId}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    });
}

export { fetchBreeds, fetchCatByBreed };
