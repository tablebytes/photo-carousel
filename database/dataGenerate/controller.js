const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'tampopo',
  database: 'tablebytes',
});

const getRestaurantById = (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM photos WHERE photo_restaurant=${id} limit 10`, (err, results) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(results.rows);
    }
  });
};

module.exports = { getRestaurantById };
