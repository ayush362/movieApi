var express = require('express');
var router = express.Router();
const movieDetails = require('../data/movieDetails')

function requiredJSON(req, res, next) {
  // doubt
  if (!req.is('application/json')) {
    res.json({ msg: 'content type must be application/json' })
  }
  else {
    next()
  }
}

router.param(('movieId'), (req, res, next) => {
  console.log("Someone hit the route that use the movieId wildcard")
  next();
})
/* GET movie page. */
// /movie 

// GET /movie/topRated
router.get('/top_rated', (req, res, next) => {
  let page = req.query.page
  if (!page) { page = 1 }
  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average
  })
  const indexToStart = (page - 1) * 20
  res.json(results.slice(indexToStart, indexToStart + 20))
})


// GET /movie/movieId
router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId
  const results = movieDetails.find((movie) => {
    return movie.id == movieId
  })
  if (!results) {
    res.json({})
  }
  else {
    res.json(results)
    msg: "Movie not found"
    producton_company: []
  }
})


// POST /movie/{movie_id}/rating
router.post('/:movieId/rating', requiredJSON, (req, res, next) => {
  const movieId = req.params.movieId
  // console.log(req.get('content-type'))
  const userRating = req.body.value
  if (userRating < 0.5 || userRating > 10) {
    res.json({
      msg: "Rating should be between .5 and 10"
    })
  }
  else {
    res.json({
      msg: "Thanku for submitting your rating",
      status_code: 200
    })
  }
})
// DELETE /movie/{movie_id}/rating
router.delete('/:movieId/rating', requiredJSON, (req, res, next) => {
  res.json({
    msg: "Rating deleted"
  })
})
module.exports = router;
