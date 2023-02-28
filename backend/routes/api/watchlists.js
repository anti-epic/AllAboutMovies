const express = require('express');
const router = express.Router();
const {
    User,
    Review,
    Movie,
    Watchlist
} = require('../../db/models');





    router.get('/', async (req, res, next) => {
            if(!req.user){
                return res.json({"message": "you must be logged in to see your watchlist"})
            }


            let watchlist = []
            const userMovies = await Watchlist.findAll({
                where: { userId: req.user.id },
              });


              for(let i = 0; i < userMovies.length; i++){
                let tempMovie = userMovies[i];
                console.log(tempMovie.dataValues.movieId)
                watchlist[i] = await Movie.findByPk(tempMovie.dataValues.movieId)
              }

            return res.json({watchlist})
    });






router.post('/:movieId/:title/:image', async (req ,res, next) => {
  const {movieId,title,image} = req.params;
  console.log(movieId, title, image, 'here')
  const userId = req.user.id
  console.log(movieId, 'user id next', userId)
  const movie = await Movie.findByPk(movieId);
  if(!movie){
    const movieData = {
        title,
        image: `https://image.tmdb.org/t/p/w500/${image}`
    }
    console.log(movieData, 'moviedata here')
    const createMovieLink =  await Movie.create({id:movieId, title: movieData.title, image: movieData.image})
    let movieIdNumber = Number(movieId)
    const newWatchlist = await Watchlist.create({userId,movieId: movieIdNumber})
    res.statusCode = 201;
    return res.json({newWatchlist})
  }
  const userWatchlist = await Watchlist.findAll({where: {userId}})
  for(let i = 0;i < userWatchlist.length; i++){
    if(userWatchlist[i].movieId === Number(movieId)){
        res.statusCode = 403;
        return res.json({"message": "User already has this movie added to their watchlist", "statusCode": res.statusCode})
    }
  }
//   userWatchlist.forEach(movie => {
//       if(movie.movieId === Number(movieId)){
//           res.statusCode = 403;
//           return res.json({"message": "User already has this movie added to their watchlist", "statusCode": res.statusCode})
//       }
//   })
  let movieIdNumber = Number(movieId)
  const newWatchlist = await Watchlist.create({userId,movieId: movieIdNumber})
  res.statusCode = 201;
  return res.json({newWatchlist})
  });




router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    deleteWatchlist = await Watchlist.findAll({  where: {
        userId: req.user.id,
        movieId: id
}})

    if (!deleteWatchlist) {
        res.statusCode = 404;
        return res.json({"message": "Movie in your watchlist couldn't be found", "statusCode": res.statusCode})
    }

    else if(deleteWatchlist[0].dataValues.userId != req.user.id){


        res.statusCode = 403;
        return res.json({error: "you do not have access to editing a watchlist you are not the owner of", statusCode: res.statusCode})
    }

    else if (deleteWatchlist[0].dataValues.userId === req.user.id) {
        await deleteWatchlist[0].destroy();
        return res.json({message: "Successfully deleted", statusCode: res.statusCode})
    }
})



module.exports = router;
