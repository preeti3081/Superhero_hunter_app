document.addEventListener('DOMContentLoaded', () => {
  const params = (new URL(document.location)).searchParams;
  const name = params.get('name');

  document.getElementById('superheroName').textContent = name;

  // Constants for Marvel API authentication
  const publicKey = '19810046f694391491cd0773ce7fe660';
  const privateKey = 'dde174ee21d1a017094e3fc11b888bf71549fc8a';

  // Function to generate the hash required for Marvel API authentication
  function generateHash(ts) {
    const hash = CryptoJS.MD5(ts + privateKey + publicKey);
    return hash;
  }

  // Make the API request to search for superheroes
  const ts = new Date().getTime();
  const hash = generateHash(ts.toString());
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(name)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;



  fetch(url)
    .then(response => response.json())
    .then(data => {
      const superhero = data.data.results[0]; // Assuming the API returns an array of superheroes and we select the first one
      console.log(superhero); //check your object then use its keys

      if (superhero) {
        // const photo = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
        const photo = superhero.thumbnail.path + '.' + superhero.thumbnail.extension;
        const description = superhero.description;
        const about = superhero.thumbnail.stories;

        document.getElementById('superheroImage').src = photo;
        document.getElementById('superheroDescription').textContent = description;
        document.getElementById('about').textContent = about;

        // Update the onclick attribute of the button to pass the name and photo variables
        const addToFavoritesButton = document.getElementById('fav');
        addToFavoritesButton.onclick = function() {
          addToFavorites(name, photo);
        };
      } else {
        console.log('Superhero not found.');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
    // favorite button which add details to loac storage of browser

});
function addToFavorites(name, photo) {
  // Get the existing favorites from local storage or initialize an empty array
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Create a new object representing the superhero
  const superhero = {
    name: name,
    photo: photo
  };

  // Add the superhero to the favorites array
  favorites.push(superhero);

  // Store the updated favorites array in local storage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
