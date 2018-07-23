module.exports = function ({ cheerio, html }) {
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

  return menu;
};
