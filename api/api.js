var router = require('express').Router();
var async = require('async');
var faker = require('faker');
var Category = require('../models/category');
var Product = require('../models/product');

//instant search api
router.post('/search', function(req, res, next) {
  console.log(req.body.search_term);
  Product.search({
    query_string: { query: req.body.search_term }
  }, function(err, results) {
    if (err) return next(err);
    res.json(results);
  })
});

//asynchronous executing to populate with fake product data
router.get('/:name', function(req, res, next) { //searching the name of the product category into the url
  async.waterfall([
    function(callback){      //below in req.params.name will be the searched product category, if found will be passed into a callback
      Category.findOne({ name: req.params.name }, function(err, category) {
        if (err) return next(err);
        callback(null, category); //if passed will go into the next function
      });
    },
    //callback will be passed below
    function(category, callback) {
      for (var i = 0; i < 30; i++) { //will run through 30 times creating a new product each time
        var product = new Product(); //creating a new instance of the product
        product.category = category._id; //assigning a product category passed in from the above function
        product.name = faker.commerce.productName(); //faker library will create a product name
        product.price = faker.commerce.price();  //faker library will generate a product price
        product.image = faker.image.image();  //and image

        product.save();  //saving the product
      }
    }
  ]);
  res.json({ message: 'Success '});
});

module.exports = router;
