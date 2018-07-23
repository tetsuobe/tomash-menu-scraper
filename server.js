const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
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

  fs.writeFile(`menu.json`, JSON.stringify(menu, null, 2), function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`Menu successfully scrapped! - Check your project directory for the menu.json file`);
  })
});