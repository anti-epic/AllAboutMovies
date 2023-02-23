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





module.exports = router;
