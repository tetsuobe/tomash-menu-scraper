const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const menuWritter = require('./menuWritter')({ fs });

const restaurants = [
  {
    name: 'adong',
    fullName: 'Orientalny Bar A-Dong',
    url: 'http://www.adong.gdansk.pl/menu/gdansk',
  }
];

const restaurantsArray = restaurants.reduce((map, obj) => (map[obj.name] = obj, map), {});

function scrape(restaurantName) {
  const restaurant = restaurantsArray[restaurantName.toLowerCase()] || null;
  if (restaurant == null) {
    throw Error('Unknown restaurant.');
  }

  request(restaurant.url, function (error, response, html) {
    if (error) {
      throw Error(error);
    }
  
    const menu = require(`./scrapers/${restaurant.name}`)({ cheerio, html});
    menuWritter.write({ menu, restaurant });
  })
}

module.exports = {
  restaurants,
  scrape
}