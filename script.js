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
      name: "Brunch Fun",
      address: "123 Main St",
      hours: "9:00 AM - 10:00 PM",
      type: "Brunch",
      menu: ["Item 1", "Item 2", "Item 3"],
      reviews: [
        { user: "User 1", rating: 4, comment: "Great food!" },
        { user: "User 2", rating: 5, comment: "Excellent service!" }
      ]
    },
    {
      id: 2,
      name: "Superior Grill",
      address: "456 Main St",
      hours: "9:00 AM - 10:00 PM",
      type: "Mexican",
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
    detailsContainer.innerHTML = ''; // clears the innerHTML property (the HTML markup of the div element), resetting it
    if (selectedRestaurant) { // if the selectedRestaurant variable is truthy (aka not empty/false/0), which it will be once a restauraunt is selected
      const tabButtons = document.createElement('div'); // creates a div element, assigning it to a variable called tabButtons
      tabButtons.classList.add('tab-buttons'); // adds the class tab-buttons to that div element
      
      const menuButton = document.createElement('button'); // creates a button element, assigning it to a variable called menuButton
      menuButton.textContent = 'Menu'; // assigning the button's textContent (text property) as Menu
      menuButton.addEventListener('click', function() { // listens for an event (clicking) to run this function 
        handleTabChange('menu'); // calls handleTabChange function, setting the tab to menu
      });
      menuButton.classList.toggle('selected', selectedTab === 'menu'); // adds a class (called "selected") that gets toggled when selectedTab has the value of menu
      
      const reviewsButton = document.createElement('button'); // creates a button element, assigning it to a variable called reviewsButton
      reviewsButton.textContent = 'Reviews'; // assigning the button's textContent (text property) as Reviews
      reviewsButton.classList.toggle('selected', selectedTab === 'reviews'); // adds a class (called "selected") that gets toggled when selectedTab has the value of reviews
      reviewsButton.addEventListener('click', function() { // listens for an event (clicking) to run this function 
        handleTabChange('reviews'); // calls handleTabChange function, setting the tab to reviews
      });
      
      tabButtons.appendChild(menuButton); // adds the menuButton button to be a child of the tabButtons div
      tabButtons.appendChild(reviewsButton); // adds the reviewsButton button to be a child of the tabButtons div
      detailsContainer.appendChild(tabButtons); // adds the tabButtons div to be a child of the detailsContainer div
      
      const tabContent = document.createElement('div'); // creates a div element, assigning it to a variable named tabContent
      tabContent.classList.add('tab-content');  // adds the class tab-content to that div element
      if (selectedTab === 'menu') { // if the selectedTab is menu
        const menuHeader = document.createElement('h2'); // create an h2 element, assigning it to variable menuHeader
        menuHeader.textContent = 'Menu'; // assigning the h2's's textContent (text property) as Menu
        const menuList = document.createElement('ul'); // create an unordered list element, assigning it to variable menuList
        filteredRestaurants.find(restaurant => restaurant.id === selectedRestaurant).menu.forEach(item => { // iterating through the fitleredRestaurants array to find the element/restaurant whose id property matches that of the selectedRestaurant variable, then accessing that restauraunt's menu property and iterating through each item in that menu property
          const menuItem = document.createElement('li'); // for each item in the selected restaurant's menu, it creates a list item element, assinging it to variable menuItem
          menuItem.textContent = item; // assigning the li's's textContent (text property) as item (the value held in the menu's item)
          menuList.appendChild(menuItem); // adds the menuItem element to be a child of the menuList ul
        });
        tabContent.appendChild(menuHeader); // adds the menuHeader element to be a child of the tabContent div
        tabContent.appendChild(menuList); // adds the menuList element to be a child of the tabContent div
      } else if (selectedTab === 'reviews') { // if the selectedTab is reviews
        const reviewsHeader = document.createElement('h2'); // create an h2 element, assigning it to variable reviewsHeader
        reviewsHeader.textContent = 'Reviews'; // assigning the h2's's textContent (text property) as Reviews
        const reviewsList = document.createElement('ul'); // create an unordered list element, assigning it to variable reviewsList
        filteredRestaurants.find(restaurant => restaurant.id === selectedRestaurant).reviews.forEach(review => { // iterating through the fitleredRestaurants array to find the element/restaurant whose id property matches that of the selectedRestaurant variable, then accessing that restauraunt's reviews property and iterating through each review in that review property
          const reviewItem = document.createElement('li');  // for each review in the selected restaurant's reviews, it creates a list item element, assinging it to variable reviewItem
          // sets up the HTML content of the reviewItem li element
          reviewItem.innerHTML = `
            <p><strong>${review.user}</strong></p>
            <p>Rating: ${review.rating}</p>
            <p>Comment: ${review.comment}</p>
          `;
          reviewsList.appendChild(reviewItem); // adds the reviewItem element to be a child of the reviewsList ul
        });
        tabContent.appendChild(reviewsHeader); // adds the reviewsHeader element to be a child of the tabContent div
        tabContent.appendChild(reviewsList); // adds the reviewsList element to be a child of the tabContent div
      }
      detailsContainer.appendChild(tabContent); // adds the tabContent div to be a child of the detailsContainer div
    }
  }

  /* 
  // Function to initialize the page
  function initializePage() {
    filterRestaurants(); // calls the filterRestaurants function 
  }

  initializePage(); // calls the initialize page function, filtering the restaurants right when the page is loaded and parsed // right when the page is loaded, the searchQuery is an empty string, so it will display all restaurants 
  */
  filterRestaurants();
});
