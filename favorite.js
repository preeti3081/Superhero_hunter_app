function populateFavorites() {
  // Get the favorites from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Select the elements to populate
  const favoritesContainer = document.getElementById('favoritesContainer');

  // Iterate over the favorites array and create HTML elements for each favorite
  favorites.forEach((favorite) => {
    // Create the card elements
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const image = document.createElement('img');
    image.src = favorite.photo;
    image.classList.add('card-img-top');
    image.alt = 'Superhero Image';

    const name = document.createElement('h5');
    name.textContent = favorite.name;

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = favorite.description;

    const removeButton = document.createElement('button');
    removeButton.type = 'submit';
    removeButton.classList.add('btn', 'btn-primary');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeFavorite(favorite);
      card.remove(); // Remove the card from the DOM
    });

    // Append the elements to the card body
    cardBody.appendChild(image);
    cardBody.appendChild(name);
    cardBody.appendChild(description);
    cardBody.appendChild(removeButton);

    // Append the card body to the card
    card.appendChild(cardBody);

    // Append the card to the favorites container
    favoritesContainer.appendChild(card);
  });
}

function removeFavorite(favorite) {
  // Get the favorites from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Find the index of the favorite in the array
  const index = favorites.findIndex((item) => item.name === favorite.name);

  if (index !== -1) {
    // Remove the favorite from the array
    favorites.splice(index, 1);

    // Store the updated favorites array in local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateFavorites();
});
