// Constants for Marvel API authentication
const publicKey = '19810046f694391491cd0773ce7fe660';
const privateKey = 'dde174ee21d1a017094e3fc11b888bf71549fc8a';

// Function to generate the hash required for Marvel API authentication
function generateHash(ts) {
  const hash = CryptoJS.MD5(ts + privateKey + publicKey);
  return hash;
}

// Function to handle input box input event
function handleInputBox(event) {
  event.preventDefault();
  const searchTerm = document.getElementById('searchInput').value;
  
  // Make the API request to search for superheroes
  const ts = new Date().getTime();
  const hash = generateHash(ts.toString());
  
  // Get request and return promise
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(searchTerm)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.data && data.data.results) {
        const superheroes = data.data.results;
        console.log(superheroes); //{id: 1017100, name: 'A-Bomb (HAS)', description: "Rick Jones has been Hulk's best bud since day one,…ses it like a giant bowling ball of destruction! ", modified: '2013-09-18T15:54:04-0400', thumbnail: {…}, …}
        
        populateSuperheroesDropdown(superheroes);
      } else {
        console.log('No results found.');
      }
      
    })
    .catch(function(error){
      console.log('error', error);
    });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const selectedSuperhero = document.getElementById('searchInput').value;
  redirectToSuperheroPage(selectedSuperhero);
}

// Function to populate the superheroes dropdown menu
function populateSuperheroesDropdown(superheroes) {
  const dropdownOptions = document.getElementById('dropdownOptions');
  dropdownOptions.innerHTML = '';

  superheroes.forEach(superhero => {
    const listItem = document.createElement('li');
    
    // Create an image for the superhero
    const image = document.createElement('img');
    image.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    image.style.width = "40px";
    image.style.height = "40px";

    listItem.appendChild(image);
    
    // Create a span element for the superhero name
    const nameSpan = document.createElement('span');
    nameSpan.textContent = superhero.name;
    listItem.appendChild(nameSpan);
    
    // Create a favorite button for the superhero
    // const favoriteButton = document.createElement('button');
    // favoriteButton.innerHTML = '&#10084;';
    // favoriteButton.style.border = "0px";
    // favoriteButton.style.left= "100px";
    // //favoriteButton.textContent = '❤️';
    // favoriteButton.addEventListener('click', () => addToFavorites(superhero));
    // listItem.appendChild(favoriteButton);
    
    listItem.addEventListener('click', () => selectSuperhero(superhero.name));

    dropdownOptions.appendChild(listItem);
  });
}

// Function to select a superhero from the dropdown menu and update the input box value
function selectSuperhero(name) {
  document.getElementById('searchInput').value = name;
}

// Function to redirect to the superhero page with the selected superhero as a query parameter
function redirectToSuperheroPage(selectedSuperhero) {
  if (selectedSuperhero) {
    const url = `superhero.html?name=${encodeURIComponent(selectedSuperhero)}`;
    window.location.href = url;
  }
}

// Add event listeners
document.getElementById('searchForm').addEventListener('submit', handleFormSubmit);

//document.getElementById('searchInput').addEventListener('click', handleInputBox);
document.getElementById('searchInput').addEventListener('input', handleInputBox);
