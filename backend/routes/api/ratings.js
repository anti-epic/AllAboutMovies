const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../utils/auth');
const {
   Rating,
   Movie
} = require('../../db/models')







router.get('/', requireAuth, async(req,res,next) =>{
const {id} = req.user
console.log(id, 'here with user')


const rating = await Rating.findAll({
    where: {
      userId: id
    }
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
  const userId = req.user.id
  const movie = await Movie.findByPk(movieId);
  if (! movie) {
      res.statusCode = 404;
      return res.json({"message": "Movie couldn't be found", "statusCode": res.statusCode})
  }

  let userRatings = await Rating.findAll({
    where: {userId},
})
for(let i = 0; i < userRatings.length; i++){
  if(userRatings[i].dataValues.movieId == movieId){
    userRatings[i].destroy()
  }
}
  const newRating = await Rating.create({stars:rating, movieId, userId})
  res.statusCode = 201;
  return res.json({newRating})
});
















module.exports = router;
