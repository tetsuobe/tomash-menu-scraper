const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'http://www.adong.gdansk.pl/menu/gdansk';

request(url, function (error, response, html) {
  if (error) {
    throw Error(error);
  }

  const $ = cheerio.load(html);
  let menu = [];

  $('.dish').each(function () {
    let data = $(this);
    let price = data.find('.dishPT').text().replace(/^\s*x\s/g, '').split(',');
    let dish = {
      position: parseInt(data.find('.dishNumT').text()),
      name: data.find('.dishName').text(),
      price: {
        zl: parseInt(price[0]),
        gr: parseInt(price[1]),
      }
    }
    menu.push(dish);
  })

  fs.writeFile(`menu.json`, JSON.stringify(menu, null, 2), function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`Menu successfully scrapped! - Check your project directory for the menu.json file`);
  })
});