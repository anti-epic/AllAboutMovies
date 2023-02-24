const express = require('express');
const router = express.Router();
const {
    User,
    Review,
    Movie
} = require('../../db/models')



router.get('/:movieId/reviews', async (req ,res, next) => {
const {movieId} = req.params;
console.log('in backend review', movieId)
let movieChecker = await Movie.findByPk(movieId);
if(!movieChecker){
    console.log('no movie found', movieId)
    const createMovieLink =  await Movie.create({id:movieId})
    return res.json({createMovieLink})
}

let reviews = await Review.findAll({
    where: {
       movieId
    }
})

let user
for(let i = 0; i < reviews.length; i++){
    let currReview = reviews[i].dataValues;
    let currReviewUser = currReview.userId

    user = await User.findByPk(currReviewUser, {
        attributes: ['id', 'firstName', 'lastName']
    })
    currReview.User = user.dataValues
    console.log(currReview, 'lol')
}
return res.json({reviews})
});


router.post('/:movieId/reviews', async (req ,res, next) => {
const {movieId} = req.params;
const {body} = req.body
const userId = req.user.id
console.log(body, 'body', movieId, 'user id next', userId)
const movie = await Movie.findByPk(movieId);
if(!movie){
    res.statusCode =404;
    return res.json({"message": "movie can not be found", "statusCode": res.statusCode})
}
const userReviews = await Review.findAll({where: {userId}})
userReviews.forEach(review => {
    if(review.movieId === Number(movieId)){
        res.statusCode = 403;
        return res.json({"message": "User already has a review for this spot", "statusCode": res.statusCode})
    }
})
let movieIdNumber = Number(movieId)
const newReview = await Review.create({body,userId,movieId: movieIdNumber})
res.statusCode = 201;
return res.json(newReview)
});


module.exports = router;
