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





//   const {movieId} = req.params;
//   const {rating} = req.body;
//   console.log(typeof req.user.id)
//   const user = await User.findByPk(req.user.id);
//   const movie = await Movie.findByPk(movieId);
//   if (! movie) {
//       res.statusCode = 404;
//       return res.json({"message": "Movie couldn't be found", "statusCode": res.statusCode})
//   }

//   let userRatings = await Rating.findAll({
//     attributes: ['id', 'userId', 'movieId', 'stars', 'createdAt', 'updatedAt'],
//     where: {userId:req.user.id}
// })
// for(let i = 0; i < userRatings.length; i++){
//   if(userRatings[i].dataValues.movieId == movieId){
//     userRatings[i].destroy()
//   }
// }
//   const newRating = await Rating.create({
//   stars: rating,
//   movieId: movieId,
//   userId: req.user.id,
//   UserId: user.id // use the user's id as the foreign key value
// });
//   res.statusCode = 201;
//   return res.json({"message" : "new rating added"})

// router.post('/:movieId', requireAuth, async (req, res, next) => {


//   const rating = req.body.rating;
//   const movieId = req.params.movieId;



//   if (!req.user || !req.user.id) {
//     return res.status(401).json({ message: 'User is not authenticated' });
//   }

//   try {
//       let userRatings = await Rating.findAll({
//     attributes: ['id', 'userId', 'movieId', 'stars', 'createdAt', 'updatedAt'],
//     where: {userId:req.user.id}
// })
//     for(let i = 0; i < userRatings.length; i++){
//   if(userRatings[i].dataValues.movieId == movieId){
//     userRatings[i].destroy()
//   }
// }
//     const newRating = await Rating.create({
//       stars: rating,
//       movieId,
//       userId: req.user.id
//     });
//     return res.json(newRating);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }










// });







router.post('/:movieId', requireAuth, async (req, res, next) => {

  const rating = req.body.rating;
  const movieId = req.params.movieId;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'User is not authenticated' });
  }

  try {
    let userRatings = await Rating.findAll({
      attributes: ['id', 'userId', 'movieId', 'stars', 'createdAt', 'updatedAt'],
      where: { userId: req.user.id }
    });

    for (let i = 0; i < userRatings.length; i++) {
      if (userRatings[i].dataValues.movieId == movieId) {
        userRatings[i].destroy()
      }
    }

    // If the user has not rated the movie before, create a new rating
    if (userRatings.length === 0) {
      const newRating = await Rating.create({
        stars: rating,
        movieId,
        userId: req.user.id
      });
      return res.json(newRating);
    }

    // Otherwise, update the existing rating
    const updatedRating = await Rating.create({
      stars: rating,
      movieId,
      userId: req.user.id
    });
    return res.json(updatedRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});








module.exports = router;
