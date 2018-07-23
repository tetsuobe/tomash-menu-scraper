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

  menu.sort(function (a, b) {
    if (a.position < b.position)
      return -1;
    if (a.position > b.position)
      return 1;
    return 0;
  })

  return menu;
};
