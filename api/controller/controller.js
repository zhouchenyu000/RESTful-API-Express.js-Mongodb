const dbo = require('../models/conn_db');

exports.list_all_data = async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('matches')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
};

exports.insert_data = function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    listing_id: req.body.listing_id,
    price:req.body.price,
    last_modified: new Date(),
  };
  dbConnect
    .collection('matches')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.json({ message: 'data successfully Added' });
      }
    });
};

exports.update_data = function (req, res) {
  console.log(req.params)
  console.log(req.query)
  const dbConnect = dbo.getDb();
  const listingQuery = { listing_id: req.params.id};
  console.log(listingQuery)
  const updates = {
    $set: {
      price: req.query.price,
    },
  };

  dbConnect
    .collection('matches')
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        res.json({ message: 'data successfully updated' });
      }
    });
};

exports.delete_data = (req, res) => {
  console.log(req.params.id)
  const dbConnect = dbo.getDb();
  const listingQuery = { listing_id: req.params.id };
  console.log(listingQuery)
  dbConnect
    .collection('matches')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        res.json({ message: 'data successfully deleted' });
      }
    });
};
