const app = require('./app');

const selectedRestaurant = process.argv.slice(2)[0];

switch (selectedRestaurant) {
  case undefined: app.restaurants.forEach(restaurant => app.scrape(restaurant.name)); break;
  case 'list': app.list(); break;
  default: app.scrape(selectedRestaurant);
}