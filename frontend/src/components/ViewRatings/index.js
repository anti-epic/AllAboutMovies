import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loadRatingsThunk } from '../../store/rating';
import './viewRatings.css'
import {Link} from 'react-router-dom'


export default function ViewRatings() {
const dispatch = useDispatch();
const userRatingsObj = useSelector(state => state.rating.rating)
const ratedMoviesObj = useSelector(state => state.rating.movies)
const [isLoaded, setIsLoaded] = useState(false)
let userRatings = []
let movies = []



if(userRatingsObj && ratedMoviesObj){
    userRatings = Object.values(userRatingsObj)
    movies = Object.values(ratedMoviesObj)
}

useEffect(() => {
   dispatch(loadRatingsThunk()).then((setIsLoaded(true)))
}, [dispatch, userRatings.length])


return isLoaded && (
    <div className='ratingsContainer'>
{userRatings.map((rating) => (


  <div className='singleRatingContainer' key={rating.id}>
    <div>
      {movies.map((movie) =>
        rating.movieId === movie.id ? (

<Link className='ratingCard'
to={
    `movie/${
      rating.movieId
    }`
}>
<img className="ratingSingleMovieImage"
    src={
        `${
            movie.image
        }`
    }></img>
<div className='ratingStars'>
    Rating:{rating.stars} </div>
</Link>




        ) : (
          <div key={movie.movieId}> </div>
        )
      )}
    </div>
  </div>
))}
    </div>
)

}
