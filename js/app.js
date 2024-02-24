function searchCondition() {
  // Prevent default form submission behavior
  event.preventDefault();
  
  const input = document.getElementById('conditionInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('jsonFiles/travel_recommendation.json')
    .then(response => response.json())
    .then(data => {
      let found = false; // Flag to check if any results are found

      // Search for countries
      if (input === 'country' || input === 'countries') {
        data.countries.slice(0, 2).forEach(country => {
          resultDiv.innerHTML += `<h2>${country.name}</h2>`
          country.cities.forEach(city => {
            resultDiv.innerHTML += `<div> ` +
              `<h3>${city.name}</h3>` +
              `<img src="${city.imageUrl}" alt="${city.name}">` +
              `<p>${city.description}</p>` +
              `</div>`;
          });
        });
        found = true;
      } else {
        const matchedCountries = data.countries.filter(country => country.name.toLowerCase().includes(input));
        matchedCountries.forEach(country => {
          resultDiv.innerHTML += `<h2>${country.name}</h2>`;
          country.cities.slice(0, 2).forEach(city => {
            resultDiv.innerHTML += `
              <div>
                <h3>${city.name}</h3>
                <img src="${city.imageUrl}" alt="${city.name}">
                <p>${city.description}</p>
              </div>`;
          });
        });
        if (matchedCountries.length > 0) {
          found = true;
        }

      }

      // Search for temples
      if (input === 'temple' || input === 'temples') {
        data.temples.slice(0, 2).forEach(temple => {
          resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
          resultDiv.innerHTML += `<div>` +
            `<img src="${temple.imageUrl}" alt="${temple.name}">`+
            `<p>${temple.description}</p>` +
            `</div>`;
        });
        found = true;
      } else {
        const matchedTemples = data.temples.filter(temple => temple.name.toLowerCase().includes(input));
        matchedTemples.forEach(temple => {
          resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
          resultDiv.innerHTML += `<div>
            <img src="${temple.imageUrl}" alt="${temple.name}">
            <p>${temple.description}</p>
          </div>`;
        });
        if (matchedTemples.length > 0) {
          found = true;
        }

      }

      // Search for beaches
      if (input === 'beach' || input === 'beaches') {
        data.beaches.slice(0, 2).forEach(beach => {
          resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
          resultDiv.innerHTML += `<div>` +
            `<img src="${beach.imageUrl}" alt="${beach.name}">` +
            `<p>${beach.description}</p>` +
            `</div>`;
        });
        found = true;
      } else {
        const matchedBeaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(input));
        matchedBeaches.forEach(beach => {
          resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
          resultDiv.innerHTML += `<div>
            <img src="${beach.imageUrl}" alt="${beach.name}">
            <p>${beach.description}</p>
          </div>`;
        });
        if (matchedBeaches.length > 0) {
          found = true;
        }

      }

      console.log(found)

      // If no matches found
      if(!found) {
        resultDiv.innerHTML = 'No matching results found.';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data: ' + error.message;
    });
}


const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', searchCondition);

function clearEntries() {
  const input = document.getElementById('conditionInput');
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  input.value = '';
}

const clearButton = document.getElementById('btnClear');
clearButton.addEventListener('click', clearEntries);

