const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const menuWritter = require('./menuWritter')({ fs })

const restaurants = [
  {
    name: 'adong',
    fullName: 'Orientalny Bar A-Dong',
    url: 'http://www.adong.gdansk.pl/menu/gdansk'
  },
  {
    name: 'surfburger',
    fullName: 'SurfBurger',
    url: 'http://surfburger.pl'
  }
]

const restaurantsArray = restaurants.reduce(function (map, restaurant) {
  map[restaurant.name] = restaurant
  return map
}, {})

function scrape (restaurantName) {
  const restaurant = restaurantsArray[restaurantName.toLowerCase()] || null
  if (restaurant == null) {
    throw Error('Unknown restaurant.')
  }

  request(restaurant.url, function (error, response, html) {
    if (error) {
      throw Error(error)
    }

    const menu = require(`./scrapers/${restaurant.name}`)({ cheerio, html })
    menuWritter.write({ menu, restaurant })
  })
}

function list () {
  console.log(`Choose one of available restaurants:`)
  restaurants.forEach(restaurant => (
    console.log(`\x1b[32m${restaurant.name}\x1b[0m - menu for \x1b[36m${restaurant.fullName}\x1b[0m`)
  ), {})
}

module.exports = {
  restaurants,
  scrape,
  list
}
