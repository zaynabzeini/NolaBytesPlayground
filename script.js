document.addEventListener('DOMContentLoaded', function() { // listening for the event of loading and parsing of the DOM, at which point it will run this function

  // assigns variables that will be used throughout
  const searchInput = document.getElementById('searchInput'); // the element in the document with the id "searchInput" aka the input element
  const restaurantList = document.getElementById('restaurantList'); // the element in the document with the id "restaurantList" aka the div for the list
  const detailsContainer = document.getElementById('detailsContainer'); // the element in the document with the id "detailsContainer" aka the div for details
  let searchQuery = ''; // variable for the searchQuery (what the user is going to search for)
  let selectedRestaurant = null; // variable for the selected restaurant (which restaurant the user clicks on to see more details about)
  let selectedTab = ''; // variable for the selected tab (which tab, between menu and reviews, that the user clicks on)
  let filteredRestaurants = []; // variable for the filtered restaurants (list of returned restaurants that fit the user's search query)

  const restaurantsData = [ // temporary data until backend database is connected
    {
      id: 1,
      name: "Restaurant 1",
      address: "123 Main St",
      hours: "9:00 AM - 10:00 PM",
      type: "Cuisine 1",
      menu: ["Item 1", "Item 2", "Item 3"],
      reviews: [
        { user: "User 1", rating: 4, comment: "Great food!" },
        { user: "User 2", rating: 5, comment: "Excellent service!" }
      ]
    },
    {
      id: 2,
      name: "Restaurant 2",
      address: "456 Main St",
      hours: "9:00 AM - 10:00 PM",
      type: "Cuisine 2",
      menu: ["Item 1", "Item 2", "Item 3"],
      reviews: [
        { user: "User 1", rating: 4, comment: "Great food!" },
        { user: "User 2", rating: 5, comment: "Excellent service!" }
      ]
    }
  ];

  // Event handler for search input change
  searchInput.addEventListener('input', function(event) { // listens for an event for the <input> element, specifically an input event, which is triggered when the field's value is changed at all, and the function that runs takes in the parameter "event" (an object that has information about the event)
    searchQuery = event.target.value; // assigns searchQuery with the value of the input field change (aka what was typed in)
    filterRestaurants(); // calls the filterRestaurants function
  });

  // Event handler for selecting a restaurant card
  function handleRestaurantSelect(id) { // a function that takes in id as a parameter
    selectedRestaurant = id; // assigns selectedRestaurant with that id
    renderDetailsContainer(); // calls renderDetailsContainer function
  }

  // Event handler for tab change
  function handleTabChange(tab) { // a function that takes in tab as a parameter
    selectedTab = tab; // assigns selectedTab with that tab
    renderDetailsContainer(); // calls renderDetailsContainer function
  }

  // Function to filter restaurants based on search query
  function filterRestaurants() {
    filteredRestaurants = restaurantsData.filter(restaurant => { // assigns filteredRestauraunts with the restauruants that meet the criteria, filtering through the array of all restaurants and adding each element in that array (aka each restaurant) that satisfies the below conditions
      return (
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || // if the element in the array (restaurant object) has a name variable that includes the searchQuery (both name and searchQuery are made toLowerCase to match)
        restaurant.type.toLowerCase().includes(searchQuery.toLowerCase()) // if the element in the array (restaurant object) has a type variable that includes the searchQuery (both type and searchQuery are made toLowerCase to match)
      );
    });
    renderRestaurantList(); // calls renderRestaurantList function
  }

  // Function to render restaurant list
  function renderRestaurantList() {
    restaurantList.innerHTML = ''; // clears the innerHTML property (the HTML markup of the div element), resetting it
    filteredRestaurants.forEach(restaurant => { // goes through the array of restaurants that meet the criteria and forEach restaurant
      const restaurantCard = document.createElement('div'); // creates a div element, assigning it to a variable called restaurant card
      restaurantCard.classList.add('restaurant-card'); // adds the class restaurant-card to that div element
      restaurantCard.addEventListener('click', function() { // adds an event handler for restaurant card, where if it's clicked it will...
        handleRestaurantSelect(restaurant.id); // pass the restauraunt's id into the handleRestaurantSelect function, setting selectedRestaurant variable to be this restaurant's id
      });
      if (selectedRestaurant === restaurant.id) { // checks to see if the card has been selected 
        restaurantCard.classList.add('selected'); // if it has, it adds the "selected" part of the class (check out the css!)
      }
      // sets up the HTML content of the restaurant card div element
      restaurantCard.innerHTML = ` 
        <h2>${restaurant.name}</h2>
        <p><strong>Address:</strong> ${restaurant.address}</p>
        <p><strong>Hours:</strong> ${restaurant.hours}</p>
        <p><strong>Type:</strong> ${restaurant.type}</p>
      `;
      restaurantList.appendChild(restaurantCard); // adds the restaurant card as a child of the restaurant list, the div element
    });
  }

  // Function to render details container
  function renderDetailsContainer() {
    detailsContainer.innerHTML = '';
    if (selectedRestaurant) {
      const tabButtons = document.createElement('div');
      tabButtons.classList.add('tab-buttons');
      const menuButton = document.createElement('button');
      menuButton.textContent = 'Menu';
      menuButton.classList.toggle('selected', selectedTab === 'menu');
      menuButton.addEventListener('click', function() {
        handleTabChange('menu');
      });
      const reviewsButton = document.createElement('button');
      reviewsButton.textContent = 'Reviews';
      reviewsButton.classList.toggle('selected', selectedTab === 'reviews');
      reviewsButton.addEventListener('click', function() {
        handleTabChange('reviews');
      });
      tabButtons.appendChild(menuButton);
      tabButtons.appendChild(reviewsButton);
      detailsContainer.appendChild(tabButtons);
      const tabContent = document.createElement('div');
      tabContent.classList.add('tab-content');
      if (selectedTab === 'menu') {
        const menuHeader = document.createElement('h2');
        menuHeader.textContent = 'Menu';
        const menuList = document.createElement('ul');
        filteredRestaurants.find(restaurant => restaurant.id === selectedRestaurant).menu.forEach(item => {
          const menuItem = document.createElement('li');
          menuItem.textContent = item;
          menuList.appendChild(menuItem);
        });
        tabContent.appendChild(menuHeader);
        tabContent.appendChild(menuList);
      } else if (selectedTab === 'reviews') {
        const reviewsHeader = document.createElement('h2');
        reviewsHeader.textContent = 'Reviews';
        const reviewsList = document.createElement('ul');
        filteredRestaurants.find(restaurant => restaurant.id === selectedRestaurant).reviews.forEach(review => {
          const reviewItem = document.createElement('li');
          reviewItem.innerHTML = `
            <p><strong>${review.user}</strong></p>
            <p>Rating: ${review.rating}</p>
            <p>Comment: ${review.comment}</p>
          `;
          reviewsList.appendChild(reviewItem);
        });
        tabContent.appendChild(reviewsHeader);
        tabContent.appendChild(reviewsList);
      }
      detailsContainer.appendChild(tabContent);
    }
  }

  // Function to initialize the page
  function initializePage() {
    filterRestaurants();
  }

  initializePage();
});
