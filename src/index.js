import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  // error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// console.log(elements);

elements.select.addEventListener('change', handlerSelect);

import axios from 'axios';

fetchBreeds()
  .then(resp => {
    elements.select.classList.replace('breed-select-hidden', 'breed-select');
    elements.select.innerHTML = createOptions(resp);
    new SlimSelect({
      select: elements.select,
    });
  })
  .catch(error => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  })
  .finally(() => elements.loader.classList.replace('loader', 'loader-hidden'));

// Функція для створення опцій селекту
function createOptions(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
console.log(fetchBreeds());

export { elements };

function handlerSelect(evt) {
  fetchCatByBreed(evt.target.value)
    .then(resp => {
      elements.catInfo.classList.replace('cat-info-hidden', 'cat-info');
      elements.catInfo.innerHTML = createMarkup(resp);
    })
    .catch(error => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    })
    .finally(() =>
      elements.loader.classList.replace('loader', 'loader-hidden')
    );
}

// Функція для створення розмітки картки породи
function createMarkup(arr) {
  const { url, breeds } = arr[0];
  const { name, description, temperament } = breeds[0];
  return ` 
    <img class="info-img"src="${url}" alt="${name}" width="400">
      <div class="info-text">
      <h1 class="info-title">${name}</h1>
      <p>${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
      </div>
  `;
}
