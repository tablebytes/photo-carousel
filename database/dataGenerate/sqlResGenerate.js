const faker = require('faker');
const fs = require('fs');

const file = fs.createWriteStream('sqlResGenerate.csv');

const restaurantHeader = ['restaurant_id', 'restaurant_name'];
file.write(`${restaurantHeader.join(',')}\n`);

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 10000000;

  write();

  function write() {
    let ok = true;
    do {
      i--;
      let restaurantInfo = {};
      restaurantInfo.restaurant_id = i + 1;
      restaurantInfo.restaurant_name =   i + '-' + faker.commerce.productMaterial()  + '-' + faker.commerce.product();
      const data = (restaurantHeader.map(photoColumn => restaurantInfo[photoColumn])).join(',') + ('\n');
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

writeTenMillionTimes(file, 'utf8', () => console.log('done!'));
