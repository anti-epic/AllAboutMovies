const express = require('express');
const router = express.Router();
const {
    User,
    Review,
    Movie
} = require('../../db/models')




router.put('/:reviewId', async (req, res ,next) => {

    const {reviewId} = req.params;
   const {body} = req.body
    updateReview = await Review.findByPk(reviewId);
    if(!updateReview){
        res.statusCode = 404;
        return res.json({"message": "Review couldn't be found", "statusCode": res.statusCode})
    }
    const reviewOwner = updateReview.dataValues.userId
    const currentUser = req.user.id
    if(reviewOwner !== currentUser){
        res.statusCode = 403;
        return res.json({
             "message": "You can not modify a review you did not make",
             statusCode: res.statusCode

         })
    }
    updateReview.body = body
    updateReview.save()
    return res.json(updateReview)

})



router.delete('/:reviewId', async(req,res,next)=> {
    const {reviewId} = req.params;
    const currUser = req.user.id;
    console.log(currUser)
    let review = await Review.findByPk(reviewId)

    if(!review){
        res.statusCode = 404;
      return  res.json({
            "message": "Review couldn't be found",
            "statusCode": res.statusCode
        })
    }
    const ownerId = review.dataValues.userId

    if(currUser !== ownerId){
        res.statusCode = 403;
      return  res.json({
            message: "Forbidden, you can not delete a review you did not create",
            statusCode:   res.statusCode
        })
    }

    review.destroy();
    res.statusCode = 200;
   return res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode
   })
})

module.exports = router;
