const faker = require('faker');
const fs = require('fs');

const file = fs.createWriteStream('sqlGenerate.csv');

const PhotoHeader = ['id', 'date', 'imageUrl', 'username'];
file.write(`${PhotoHeader.join(',')}\n`);

function generatePhotos() {
  let photoData;
  const pictureID = (Math.ceil(Math.random() * 100)).toString();
  photoData = {
    imageUrl: `https://s3-us-west-1.amazonaws.com/photowheelopentabs/Photo/s${pictureID}_tn.jpg`,
    user: faker.lorem.word(),
    date: faker.date.recent(),
  };
  return photoData;
}

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  write();

  function write() {
    let ok = true;
    do {
      i--;
      let restaurant = generatePhotos();
      const randomRestaurantID = Math.ceil(Math.random() * 20);
      restaurant.id = randomRestaurantID;
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

writeOneMillionTimes(file, 'utf8', () => console.log('done!'));
