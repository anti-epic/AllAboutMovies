const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../utils/auth');
const {
   Rating,
   Movie,
   User
} = require('../../db/models')







router.get('/', requireAuth, async(req,res,next) =>{


  console.log(typeof req.user.id)

  const rating = await Rating.findAll({
    attributes: ['id', 'userId', 'movieId', 'stars', 'createdAt', 'updatedAt'],
    where: {userId:req.user.id}
  });
  const movieIds = rating.map((rating) => rating.movieId);
  const movies = await Movie.findAll({
    where: {
      id: movieIds,
    },
  });

  return res.json({rating, movies})


})





router.post('/:movieId', requireAuth, async (req, res, next) => {
  const {movieId} = req.params;
  const {rating} = req.body;
  console.log(typeof req.user.id)
  const movie = await Movie.findByPk(movieId);
  if (! movie) {
      res.statusCode = 404;
      return res.json({"message": "Movie couldn't be found", "statusCode": res.statusCode})
  }

  let userRatings = await Rating.findAll({
    attributes: ['id', 'userId', 'movieId', 'stars', 'createdAt', 'updatedAt'],
    where: {userId:req.user.id}
})
for(let i = 0; i < userRatings.length; i++){
  if(userRatings[i].dataValues.movieId == movieId){
    userRatings[i].destroy()
  }
}
  const newRating = await Rating.create({stars:rating, movieId, userId:req.user.id})
  res.statusCode = 201;
  return res.json({"message" : "new rating added"})
});
















module.exports = router;
