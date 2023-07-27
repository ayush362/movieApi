var express = require('express');
var router = express.Router();

const movies = require('../data/movies')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/most_popular', (req, res, next) => {
  // doubt
  let page = req.query.page
  if (page === undefined) { page = 1 }
  // if (req.query.api_key != 12345678) {
  //   res.json("Invalid Api key!")
  // }
  // else {
    let results = movies.filter((movie) => {
      return movie.most_popular
    })
    // doubt
    const indexToStart = (page - 1) * 20
    results = results.slice(indexToStart, indexToStart + 19)
    res.json({results})
  }

)

module.exports = router;
