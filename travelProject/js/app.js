function searchCondition() {
  const input = document.getElementById('conditionInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('jsonFiles/travel_recommendation.json')
    .then(response => response.json())
    .then(data => {
      // Search for countries
      const matchedCountries = data.countries.filter(country => country.name.toLowerCase().includes(input));
      matchedCountries.forEach(country => {
        resultDiv.innerHTML += `<h2>${country.name}</h2>`;
        country.cities.forEach(city => {
          resultDiv.innerHTML += `
            <div>
              <h3>${city.name}</h3>
              <img src="${city.imageUrl}" alt="${city.name}">
              <p>${city.description}</p>
            </div>`;
        });
      });

      // Search for temples
      const matchedTemples = data.temples.filter(temple => temple.name.toLowerCase().includes(input));
      matchedTemples.forEach(temple => {
        resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
        resultDiv.innerHTML += `<div>
          <img src="${temple.imageUrl}" alt="${temple.name}">
          <p>${temple.description}</p>
        </div>`;
      });

      // Search for beaches
      const matchedBeaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(input));
      matchedBeaches.forEach(beach => {
        resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
        resultDiv.innerHTML += `<div>
          <img src="${beach.imageUrl}" alt="${beach.name}">
          <p>${beach.description}</p>
        </div>`;
      });

      // If no matches found
      if (matchedCountries.length === 0 && matchedTemples.length === 0 && matchedBeaches.length === 0) {
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

