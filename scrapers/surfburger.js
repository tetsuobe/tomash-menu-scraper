module.exports = function ({ cheerio, html }) {
  const $ = cheerio.load(html)
  let menu = []
  let index = 0

  $('#menu div:not(:last-child) .wpb_column.vc_column_container.vc_col-sm-3:nth-last-child(n+1)').each(function () {
    let data = $(this)
    let name = data.find('h5').text().split(/\n/)
    let dish = {
      position: ++index,
      name: name[0].trim(),
      description: data.find('p:last-child').text().trim(),
      price: {
        zl: parseInt(name[1].trim().replace(/\s?[;,:]-/g, '')),
        gr: 0
      }
    }
    menu.push(dish)
  })

  const fries = $('#menu .vc_row.wpb_row.vc_inner.vc_row-fluid:last-child .wpb_column.vc_column_container.vc_col-sm-3:nth-child(4)')
  const fryPrefix = fries.find('h3').text()
  const fryDescription = fries.find('p:nth-child(3)').text()
  const fryNames = fries.find('h5').text().split(/[;,:]-/)
  fryNames.forEach(function (name) {
    let data = name.trim()
    if (data == null || data === '') {
      return
    }
    let dish = {
      position: ++index,
      name: `${fryPrefix} - ${data.substr(0, data.length - 2)}`,
      description: fryDescription,
      price: {
        zl: parseInt(data.substr(-1, 1)),
        gr: 0
      }
    }
    menu.push(dish)
  }, {fryPrefix, fryDescription})

  return menu
}
