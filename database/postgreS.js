const { Client } = require('pg');

const pgdb = new Client({
  host: 'localhost',
  port: 5432,
  user: 'tampopo',
  database: 'test',
});

pgdb.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

pgdb.query('DROP TABLE IF EXISTS username');
const createNameTable = 'CREATE table username (username_id SERIAL PRIMARY KEY, username_name TEXT);';

pgdb.query(createNameTable, (err) => {
  if (err) {
    console.log(err);
  }
});

pgdb.query('DROP TABLE IF EXISTS restaurant');
const createResTable = 'CREATE table restaurant (restaurant_id SERIAL PRIMARY KEY, restaurant_name TEXT);';

pgdb.query(createResTable, (err) => {
  if (err) {
    console.log(err);
  }
});

pgdb.query('DROP TABLE IF EXISTS photos');
const createMainTable = 'CREATE table photos (photo_id SERIAL PRIMARY KEY, date TEXT, image_url TEXT, photo_username INTEGER REFERENCES username (username_id) on delete cascade, photo_restaurant INTEGER REFERENCES restaurant (restaurant_id) on delete cascade);';

pgdb.query(createMainTable, (err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = { pgdb };

//ALTER TABLE photos ADD CONSTRAINT photo_restaurant_idx FOREIGN KEY (photo_restaurant) REFERENCES restaurant (restaurant_id) ON DELETE CASCADE;

//ALTER TABLE photos ADD CONSTRAINT username_restaurant_idx FOREIGN KEY (photo_username) REFERENCES username (username_id) ON DELETE CASCADE;