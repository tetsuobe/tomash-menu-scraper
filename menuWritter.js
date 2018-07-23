module.exports = function ({ fs }){
  
  return {
    write({ menu, name }) {
      const fileName = name.toLowerCase();
      fs.writeFile(`menu/${fileName}.json`, JSON.stringify(menu, null, 2), function (err) {
        if (err) {
          console.error(err.message);
        }
        console.log(`Menu \x1b[36m${name}\x1b[0m successfully scraped! - Check your project \x1b[33mmenu\x1b[0m directory for the \x1b[35m${fileName}.json\x1b[0m file`);
      })
    }
  }
}
