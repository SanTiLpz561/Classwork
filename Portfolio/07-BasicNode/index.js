console.log('Hello World');
const sw = require('star-wars-quotes');
const sh = require('superheroes');
const sv = require('supervillains');
const fs = require('fs');
const path = require('path');

const hero = sh.random();
const villain = sv.random();

const filePath = path.join(__dirname, 'data', 'input.txt');

console.log(sw());
console.log(`Batalla de ${hero} VS ${villain}`);

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }
  
  console.log("Mensaje secreto:", data);
});