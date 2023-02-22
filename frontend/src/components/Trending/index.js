import React from 'react';
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import { getTrendingMoviesByDay } from '../../store/trending';
import './Trending.css'


export default function Trending(){
    let trendingMovies = []
    const dispatch = useDispatch()
    const trendingMoviesObj = useSelector(state => {
        return state.trending.day
    })
    console.log('in trending component')
    if(trendingMoviesObj){
        console.log(trendingMoviesObj, 'here2')
        trendingMovies = Object.values(trendingMoviesObj.movies)
        console.log(trendingMovies, 'here3')
    }

    useEffect(() => {
        dispatch(getTrendingMoviesByDay())
    },[dispatch, trendingMovies.length])

    if(!trendingMovies) {
        return null}
    return trendingMovies ? (
        <div className='trendingMoviesDay' style={{backgroundImage: `url("./movie-background.png")`,  backgroundSize: 'contain'}}>

            {trendingMovies.map((movie) => (
                movie ? (<div className='trendingSingleMovieDay'>
                    <NavLink key={movie.id} to={`/movies/${movie.id}`}>
                        <img  className="trendingSingleMovieDayImage"src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}></img>
                            </NavLink>
                            <div className='trendingSingleMovieRating'>{Math.round(movie.vote_average * 10)} <i className="fa-solid fa-percent fa-2xs"></i></div>
                        <div className='trendingSingleMovieTitleContainer'>
                         <NavLink  className='trendingSingleMovieTitle'style={{ textDecoration: 'none' }} to={`/movies/${movie.id}`}>
                            {movie.title}
                            </NavLink>
                            </div>
                    </div>
                ): (<div> loading trending movies by day</div>)
            ))}
        </div>
    ) : ( <div> nothing</div>)
}
