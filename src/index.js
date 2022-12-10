import './css/styles.css'
import debounce from 'lodash.debounce'
// import Notiflix from 'notiflix'
// import { fetchCountries } from './js/fetch-countries'

const DEBOUNCE_DELAY = 30000;





const inputEl = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce( event => {
    const nameCountry = inputEl.value
    
    console.log(nameCountry);
    fetchCountries({
        nameCountry: inputEl.value
    })

}), DEBOUNCE_DELAY);

// function fetchCountries(nameCountry) {
    
//     return fetch(`https://restcountries.com/v3.1/name/${nameCountry}?fields=,name,capital,population,flags,languages`
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error(response.statusText);
//     });

// } 
// fetchCountries('peru').then(data => console.log(data))

function fetchCountries({nameCountry}) {
    const urlAPI = `https://restcountries.com/v3.1/name/${nameCountry}?fields=,name,capital,population,flags,languages`;
    
    fetch(urlAPI).then(res => {
        if(!res.ok) {
            throw new Error(res.message)
        }
        return res.json()
    }).then((countries) => {
       renderListCountry(countries)
    }).then((countries) => {
       renderInfoCountry(countries)
    })    
    
}

function renderListCountry(countries) {
    listCountry.innerHTML = '';
    const listMarkup = countries
        .map(({ name, flags }) => {
            return `
        <li class="country-list__item">
            <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 25px height = 25px>
            <h2 class="country-list__name">${name.official}</h2>
        </li>
        `
        })

        listCountry.insertAdjacentHTML ('beforeend', listMarkup.join(''));
   
}

function renderInfoCountry(countries) {
    infoCountry.innerHTML = '';
    const infoMarkup = countries
        .map(({ capital, population, languages }) => {
            return `
        <ul class="country-info__list">
            <li class="country-info__item"><span class="country-info__item--weight">Capital:</span> ${capital}</li>
            <li class="country-info__item"><span class="country-info__item--weight">Population:</span> ${population}</li>
            <li class="country-info__item"><span class="country-info__item--weight">Languages:</span> ${Object.values(languages)}</li>
        </ul>
        `
        })
       infoCountry.insertAdjacentHTML ('beforeend', infoMarkup.join('')); 
}

// function render (articles) {
//     // listContainer.innerHTML = '';
//     const listElements = articles.map(({name, capital, flag, languages}) => {
//         return `<article class="news">
//       <h2>${name}</h2>
//       <div>${capital}</div>
//       <img src="${flag}" alt="${name}">
//       <a href="${languages}">more</a>
//     </article>`;
    
//       });
//       articlesContainer.insertAdjacentHTML('beforeend', listElements.join(''));
     
//  }