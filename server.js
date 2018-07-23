const request = require('request');
const cheerio = require('cheerio');

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

  console.log(menu);
});