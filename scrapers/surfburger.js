module.exports = function ({ cheerio, html }) {
  const $ = cheerio.load(html);
  let menu = [];

  $('#menu div:not(:last-child) .wpb_column.vc_column_container.vc_col-sm-3:nth-last-child(n+2)').each(function (index) {
    let data = $(this);
    let name = data.find('h5').text().split(/\n/);
    let dish = {
      position: index + 1,
      name: name[0].trim(),
      description: data.find('p:last-child').text().trim(),
      price: {
        zl: parseInt(name[1].trim().replace(/\s?[;,:]-/g, '')),
        gr: 0,
      }
    }
    menu.push(dish);
  })

  return menu;
};
