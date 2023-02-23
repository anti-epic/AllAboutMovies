import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import './MoviePage.css'
import { getMovie } from '../../store/movie';
import Reviews from '../Reviews'


export default function MoviePage() {
const dispatch = useDispatch()
let movie =[];


const {movieId} = useParams();


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


if(movieObj){
movie = Object.values(movieObj);
}

useEffect(() => {
dispatch(getMovie(movieId))
console.log(movieObj, 'here')
},[dispatch, movieId])


   return movie && movieObj && genres ? (
        <div className='singleMovieContainer'>
            <div className='singleMovieTopContainer' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieObj.backdrop_path})`,  backgroundSize: 'cover'}}>
    <div> <img  className="singleMovieImage"src={`https://image.tmdb.org/t/p/w300/${movieObj.poster_path}`}></img></div>
    <div className='singleMovieRating'>User Score<br/>{Math.round(movieObj.vote_average * 10)} %</div>
    <div className='singleMovieTitle'>{movieObj.title}
    <div className='singleMovieSubDescription'>({releaseDate})
    {/* ({movieObj.production_countries[0].iso_3166_1}) */}
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
    <button className='createReviewButton'>Leave A Review</button>

            </div>
            <div> <Reviews/></div>
        </div>
    ) : (<> loading movie data</>)
}
