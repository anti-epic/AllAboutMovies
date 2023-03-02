import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import './MoviePage.css'
import { getMovie } from '../../store/movie';
import Reviews from '../Reviews'
import CreateReview from '../CreateReview';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import UpdateReview from '../UpdateReview';
import { getWatchlist} from '../../store/watchlist';
import AddMovieToWatchlist from '../AddMovieToWatchlist/Index';



const MoviePage = () => {
const dispatch = useDispatch()
let movie =[];
let reviews = [];
let watchlist = [];
let image;
let title;
const [isLoaded, setIsLoaded] = useState(false);
const [onWatchlist, setOnWatchlist] = useState(false);
const {movieId} = useParams();
let sessionUser = useSelector(state => state.session.user);
let isLoggedIn = false
let alreadyReviewed = false;
if(sessionUser){
    isLoggedIn = true
}
if(!sessionUser){
    sessionUser = 'not logged in';
    sessionUser = Infinity;

}




const movieObj = useSelector(state => {
    return state.movie
})
const genres = useSelector(state => {
    return state.movie.genres
})
const releaseDate = useSelector(state => {
    return state.movie.release_date
})
const runtime = useSelector(state => {
    return state.movie.runtime
})
const reviewObj = useSelector(state => {
    return state.review
})

let usersWatchlistObj = useSelector(state => {
    return state.watchlist
})



if(reviewObj) {
    reviews = Object.values(reviewObj)


}





if(movieObj){
movie = Object.values(movieObj);
title = movieObj.title
image = movieObj.poster_path

}

for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].User && reviews[i].userId === sessionUser.id) {
        alreadyReviewed = 'modalComponent';
    }
}


useEffect(() => {
    const payload = {title, image}

dispatch(getMovie(payload, movieId))
.then((data) => {
dispatch(getWatchlist())})
.then(() => {
    if(usersWatchlistObj[movieId]){
        setOnWatchlist(true)
    }
    setIsLoaded(true)
})
},[dispatch, movieId, reviews.length, sessionUser,watchlist.length, onWatchlist])



   return  isLoaded  ? (
        <div className='singleMovieContainer'>
        <div className = 'singleMovieTopContainer' style = {{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieObj.backdrop_path})`,  backgroundSize: 'cover'}} >

    <div className='imageContainer'> <img  className="singleMovieImage"src={`https://image.tmdb.org/t/p/w300/${movieObj.poster_path}`}></img>
    </div>
    <div className='singleMovieRating'>User Score<br/>{Math.round(movieObj.vote_average * 10)} %</div>
    <div className='singleMovieTitle'>{movieObj.title}
    <div className='singleMovieSubDescription'>({releaseDate})

    {genres.map((genre) => (
        <div className='singleMovieGenres'> {genre.name}
        </div>
        ))}
    <div className='singleMovieRuntime'>
        |{runtime}(mins)
        </div>
    </div>
    <div className='singleMovieDescription'>{movieObj.overview}</div>
    </div>

            <div className='overlay'></div>


</div>

<AddMovieToWatchlist movieId={movieId} />


<div className='rContainer'>
< div className = 'leaveReviewButton' > {
    (alreadyReviewed === false) && (sessionUser.id !== undefined) ? (

        <OpenModalMenuItem itemText="Leave A Review"modalComponent={<CreateReview/>}/>
    ) : (

        <div className='disabledCreateReview'>
            {isLoggedIn ? (
< OpenModalMenuItem itemText = "Update Review" modalComponent = {<UpdateReview/>} />
            ) : (
                <OpenModalMenuItem itemText="Leave a review" modalComponent={<LoginFormModal/>}/>
            )
        } </div>
    )
}
        </div>

            <Reviews/></div>
< div > </div>


        </div>
    ) : (<> loading movie data</>)
}

export default MoviePage
