const faker = require('faker');
const fs = require('fs');

const file = fs.createWriteStream('sqlGenerate.csv');

const PhotoHeader = ['photo_id', 'date', 'image_url', 'photo_username', 'photo_restaurant'];
file.write(`${PhotoHeader.join(',')}\n`);

function generatePhotos() {
  let photoData;
  const pictureID = (Math.ceil(Math.random() * 100)).toString();
  photoData = {
    image_url: `https://s3-us-west-1.amazonaws.com/photowheelopentabs/Photo/s${pictureID}_tn.jpg`,
    date: faker.date.recent(),
  };
  return photoData;
}

function writeTwoHundredMillionTimes(writer, encoding, callback) {
  let i = 200000000;

  write();

  function write() {
    let ok = true;
    do {
      i--;  
      let restaurant = generatePhotos();
      restaurant.photo_restaurant = Math.ceil(Math.random() * 10000000);
      restaurant.photo_username = Math.ceil(Math.random() * 10000000);
      restaurant.photo_id = i;
      const data = (PhotoHeader.map(photoColumn => restaurant[photoColumn])).join(',') + ('\n');
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

writeTwoHundredMillionTimes(file, 'utf8', () => console.log('done!'));
