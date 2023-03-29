// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js')
const reviewsRouter = require('./reviews.js')
const watchlistsRouter = require('./watchlists.js')
const ratingsRouter = require('./ratings.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/movies', moviesRouter);

router.use('/reviews', reviewsRouter);

router.use('/watchlist', watchlistsRouter);

router.use('/ratings', ratingsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
