const faker = require('faker');
const fs = require('fs');

const file = fs.createWriteStream('sqlNameGenerate.csv');

const usernameHeader = ['username_id', 'username_name'];
file.write(`${usernameHeader.join(',')}\n`);

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 10000000;

  write();

  function write() {
    let ok = true;
    do {
      i--;
      let usernameInfo = {};
      usernameInfo.username_id = i + 1;
      usernameInfo.username_name = faker.internet.userName() + i;
      const data = (usernameHeader.map(photoColumn => usernameInfo[photoColumn])).join(',') + ('\n');
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
