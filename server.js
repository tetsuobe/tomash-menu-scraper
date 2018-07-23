const app = require('./app');

app.restaurants.forEach(restaurant => app.scrape(restaurant.name));