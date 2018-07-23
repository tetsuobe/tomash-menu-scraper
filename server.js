const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const menuWritter = require('./menuWritter')({ fs });
const adongScraper = require('./scrapers/adong');

const restaurant = {
  name: 'Adong',
  url: 'http://www.adong.gdansk.pl/menu/gdansk',
};

request(restaurant.url, function (error, response, html) {
  if (error) {
    throw Error(error);
  }

  const menu = adongScraper({ cheerio, html});
  menuWritter.write({ menu, name: restaurant.name });
});