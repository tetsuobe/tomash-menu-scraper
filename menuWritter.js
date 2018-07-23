module.exports = function ({ fs }) {
  return {
    write ({ menu, restaurant }) {
      fs.writeFile(`menu/${restaurant.name}.json`, JSON.stringify(menu, null, 2), function (err) {
        if (err) {
          console.error(err.message)
        }
        console.log(`Menu for '\x1b[36m${restaurant.fullName}\x1b[0m' successfully scraped! - Check your project \x1b[33mmenu\x1b[0m directory for the \x1b[35m${restaurant.name}.json\x1b[0m file`)
      })
    }
  }
}
