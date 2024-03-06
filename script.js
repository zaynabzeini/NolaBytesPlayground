document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const restaurantList = document.getElementById('restaurantList');
  const detailsContainer = document.getElementById('detailsContainer');
  let searchQuery = '';
  let selectedRestaurant = null;
  let selectedTab = '';
  let filteredRestaurants = [];

  const restaurantsData = [
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
  searchInput.addEventListener('input', function(event) {
    searchQuery = event.target.value;
    filterRestaurants();
  });

  // Event handler for selecting a restaurant card
  function handleRestaurantSelect(id) {
    selectedRestaurant = id;
    renderDetailsContainer();
  }

  // Event handler for tab change
  function handleTabChange(tab) {
    selectedTab = tab;
    renderDetailsContainer();
  }

  // Function to filter restaurants based on search query
  function filterRestaurants() {
    filteredRestaurants = restaurantsData.filter(restaurant => {
      return (
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    renderRestaurantList();
  }

  // Function to render restaurant list
  function renderRestaurantList() {
    restaurantList.innerHTML = '';
    filteredRestaurants.forEach(restaurant => {
      const restaurantCard = document.createElement('div');
      restaurantCard.classList.add('restaurant-card');
      if (selectedRestaurant === restaurant.id) {
        restaurantCard.classList.add('selected');
      }
      restaurantCard.addEventListener('click', function() {
        handleRestaurantSelect(restaurant.id);
      });
      restaurantCard.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p><strong>Address:</strong> ${restaurant.address}</p>
        <p><strong>Hours:</strong> ${restaurant.hours}</p>
        <p><strong>Type:</strong> ${restaurant.type}</p>
      `;
      restaurantList.appendChild(restaurantCard);
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
