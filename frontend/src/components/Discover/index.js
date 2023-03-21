import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getDiscoverMovies} from '../../store/discover';
import {NavLink, useHistory} from 'react-router-dom'
import './Discover.css'


export default function Discover() {
    const discoverObj = useSelector(state =>{
        return state.discover
    })
    let discover = [];

    if(discoverObj){
        discover = Object.values(discoverObj)
    }
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDiscoverMovies())
    },[dispatch, discover.length])


    return discoverObj ? (<>
            <div className='discoverButtonHeader'>Discover</div>
        <div className='discoverButtonContainer'>
        <div className='discoverMovies  animateDiscover ' style={{backgroundImage: `url("./movie-background.png")`,  backgroundSize: 'contain'}}>
            {discover.map((movie) => ( movie ? (
                <div className='discoverSingleMovie'>
                <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                <img  className="discoverSingleMovieImage"src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}></img>
                </NavLink>
                <div className='discoverSingleMovieRating'>{Math.round(movie.vote_average * 10)} <i className="fa-solid fa-percent fa-2xs"></i></div>
                <div className='discoverSingleMovieTitleContainer'>
                <NavLink  className='discoverSingleMovieTitle'style={{ textDecoration: 'none' }} to={`/movies/${movie.id}`}>
                    
                {movie.title ?(movie.title) : (movie.name)}
                </NavLink>
                </div>
                </div>

                ) : (<div></div>)))}
                           {discover.map((movie) => ( movie ? (
                <div className='discoverSingleMovie'>
                <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                <img  className="discoverSingleMovieImage"src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}></img>
                </NavLink>
                <div className='discoverSingleMovieRating'>{Math.round(movie.vote_average * 10)} <i className="fa-solid fa-percent fa-2xs"></i></div>
                <div className='discoverSingleMovieTitleContainer'>
                <NavLink  className='discoverSingleMovieTitle'style={{ textDecoration: 'none' }} to={`/movies/${movie.id}`}>
                {movie.title ?(movie.title) : (movie.name)}
                </NavLink>
                </div>
                </div>

                ) : (<div></div>)))}
                </div>
                </div>
                </> ) : (
        <div>
            not loaded</div>
    )
}
