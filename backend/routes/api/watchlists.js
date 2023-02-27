const express = require('express');
const router = express.Router();
const {
    User,
    Review,
    Movie,
    Watchlist
} = require('../../db/models');






// router.get('/:movieId/reviews', async (req ,res, next) => {
//     const {movieId} = req.params;
//     let movieChecker = await Movie.findByPk(movieId);
//     if(!movieChecker){
//         const createMovieLink =  await Movie.create({id:movieId})
//         return res.json({createMovieLink})
//     }
//     let reviews = await Review.findAll({
//         where: {
//            movieId
//         }
//     })
//     let user
//     for(let i = 0; i < reviews.length; i++){
//         let currReview = reviews[i].dataValues;
//         let currReviewUser = currReview.userId

//         user = await User.findByPk(currReviewUser, {
//             attributes: ['id', 'username']
//         })
//         currReview.User = user.dataValues
//     }
//     return res.json({reviews})
//     });


    router.get('/', async (req, res, next) => {
            console.log(req.user.id)
            if(!req.user){
                return res.json({"message": "you must be logged in to see your watchlist"})
            }
            let watchlist = await Watchlist.findAll({
                where: {userId: req.user.id}
            })
            return res.json({watchlist})
    });








module.exports = router;
