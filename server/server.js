require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { Photo } = require('../database/photomodel');
//const { db } = require('../database/index');
const { getRestaurantById } = require('../database/dataGenerate/controller');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const port = 3002;

app.use('/restaurants/:id', express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/restaurants/:id/photos', getRestaurantById);

// app.get('/api/restaurants/:id/photos', (req, res) => {
//   Photo.findOne({ restaurantId: req.params.id }, (err, results) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.status(200).send(results);
//     }
//   });
// });

// app.post('/api/restaurants/:id/photos', (req, res) => {
//   Photo.update({ restaurantId: req.params.id },
//     {
//       $push: {
//         image: req.body,
//       },
//     }).exec((err, image) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(image);
//     }
//   });
// });

// app.patch('/api/restaurants/:id/photos', (req, res) => {
//   Photo.update({ restaurantId: req.params.id }, { images: req.body },
//     ((err, image) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(200).send(image);
//       }
//     }));
// });

// app.delete('/api/restaurants/:id/photos', (req, res) => {
//   Photo.findByIdAndRemove({ restaurantId: req.params.id }, (err) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
