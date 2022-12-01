import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryContainer = document.querySelector('country-info');
input.addEventListener('input', event => {
    event.preventDefault();
    const nameCountry = event.target.value;
    if( nameCountry === '') {
        return alert('пустая строка');
    }
    fetchCountries(nameCountry).then(data => {
        countryContainer.innerHTML = data.results.map(country => `<div>
        <h2>${country.name}</h2>
        <p>${country.name.official}</p>
        <p>${population}</p>
        <p>${flags.svg}</p>
        <p>${languages}</p>
        </div>`).join("");
    });
});


function fetchCountries(nameCountry) {
    
    return fetch(`https://restcountries.com/v3.1/name/${nameCountry}?fields=,name,capital,population,flags,languages`
    ).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    });

} 
fetchCountries('peru').then(data => console.log(data))
