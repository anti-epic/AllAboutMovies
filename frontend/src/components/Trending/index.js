import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {getTrendingMoviesByDay, getTrendingMoviesByWeek} from '../../store/trending';
import './Trending.css'
import {clearMovie} from '../../store/movie';


export default function Trending() {
    let trendingTodayMovies = []
    let trendingWeekMovies = []
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [trending, setTrending] = useState(1);
    const trendingTodayMoviesObj = useSelector(state => {
        return state.trending.day
    })
    const trendingWeekMoviesObj = useSelector(state => {
        return state.trending.week
    })
    if (trendingTodayMoviesObj) {
        trendingTodayMovies = Object.values(trendingTodayMoviesObj.movies)
    }
    if (trendingWeekMoviesObj) {
        trendingWeekMovies = Object.values(trendingWeekMoviesObj.movies)
    }


    useEffect(() => {
        dispatch(getTrendingMoviesByDay()).then(() => {
            dispatch(getTrendingMoviesByWeek()).then(() => {
                dispatch(clearMovie())
            })
        }).then(() => {
            setIsLoaded(true);
        })

    }, [dispatch, trendingTodayMovies.length, trendingWeekMovies.length])

    if (! trendingTodayMovies || ! trendingWeekMovies) {
        return null
    }
    return isLoaded ? (
        <>
            <div className='trendingButtonsContainer'>
                <div className='trendingButtonHeader'>Trending</div>
                <button className='buttonOptions' autoFocus
                    onClick={
                        () => setTrending(1)
                }>Today</button>
                <button className='buttonOptions'
                    onClick={
                        () => setTrending(2)
                }>This Week</button>
            </div>
            <div className='trendingMovies animate'
                style={
                    {
                        backgroundImage: `url("./movie-background.png")`,
                        backgroundSize: 'contain'
                    }
            }>

                {
                trending == 1 && (
                    <> {
                        trendingTodayMovies.map((movie, i) => (movie ? (
                            <div className='trendingSingleMovie'>
                                <NavLink key={
                                        movie.id
                                    }
                                    to={
                                        `/movie/${
                                            movie.id
                                        }`
                                }>
                                    <img className="trendingSingleMovieImage"
                                        src={
                                            `https://image.tmdb.org/t/p/w154/${
                                                movie.poster_path
                                            }`
                                    }></img>
                                </NavLink>
                                <div className='trendingSingleMovieRating'>
                                    {
                                    Math.round(movie.vote_average * 10)
                                }
                                    <i className="fa-solid fa-percent fa-2xs"></i>

                                </div>
                                <div className='trendingSingleMovieTitleContainer'>

                                    <NavLink className='trendingSingleMovieTitle'
                                        style={
                                            {textDecoration: 'none'}
                                        }
                                        to={
                                            `/movies/${
                                                movie.id
                                            }`
                                    }><h1 className='Ranking'>
                                    {i+1} |
                                    </h1>
                                        {
                                        movie.title ? (movie.title) : (movie.name)
                                    } </NavLink>
                                </div>
                            </div>


                        ) : (
                            <div>
                                loading trending movies by day</div>
                        )))

                    }{
                        trendingTodayMovies.map((movie,i) => (movie ? (
                            <div className='trendingSingleMovie'>
                                <NavLink key={
                                        movie.id
                                    }
                                    to={
                                        `/movie/${
                                            movie.id
                                        }`
                                }>
                                    <img className="trendingSingleMovieImage"
                                        src={
                                            `https://image.tmdb.org/t/p/w154/${
                                                movie.poster_path
                                            }`
                                    }></img>
                                </NavLink>
                                <div className='trendingSingleMovieRating'>
                                    {
                                    Math.round(movie.vote_average * 10)
                                }
                                    <i className="fa-solid fa-percent fa-2xs"></i>
                                </div>
                                <div className='trendingSingleMovieTitleContainer'>
                                    <NavLink className='trendingSingleMovieTitle'
                                        style={
                                            {textDecoration: 'none'}
                                        }
                                        to={
                                            `/movies/${
                                                movie.id
                                            }`
                                    }><h1 className='Ranking'>
                                    {i+1} |
                                    </h1>
                                        {
                                        movie.title ? (movie.title) : (movie.name)
                                    } </NavLink>
                                </div>
                            </div>


                        ) : (
                            <div>
                                loading trending movies by day</div>
                        )))

                    }</>
                )
            }
                {

                trending === 2 && (
                    <> {
                        trendingWeekMovies.map((movie, i) => (movie ? (
                            <div className='trendingSingleMovie'>
                                <NavLink key={
                                        movie.id
                                    }
                                    to={
                                        `/movie/${
                                            movie.id
                                        }`
                                }>
                                    <img className="trendingSingleMovieImage"
                                        src={
                                            `https://image.tmdb.org/t/p/w154/${
                                                movie.poster_path
                                            }`
                                    }></img>
                                </NavLink>
                                <div className='trendingSingleMovieRating'>
                                    {
                                    Math.round(movie.vote_average * 10)
                                }
                                    <i className="fa-solid fa-percent fa-2xs"></i>
                                </div>
                                <div className='trendingSingleMovieTitleContainer'>
                                    <NavLink className='trendingSingleMovieTitle'
                                        style={
                                            {textDecoration: 'none'}
                                        }
                                        to={
                                            `/movies/${
                                                movie.id
                                            }`
                                    }><h1 className='Ranking'>
                                    {i+1} |
                                    </h1>
                                        {
                                        movie.title ? (movie.title) : (movie.name)
                                    } </NavLink>
                                </div>
                            </div>

                        ) : (
                            <div>
                                loading trending movies by day</div>
                        )))

                    }
                    {
                        trendingWeekMovies.map((movie,i) => (movie ? (
                            <div className='trendingSingleMovie'>
                                <NavLink key={
                                        movie.id
                                    }
                                    to={
                                        `/movie/${
                                            movie.id
                                        }`
                                }>
                                    <img className="trendingSingleMovieImage"
                                        src={
                                            `https://image.tmdb.org/t/p/w154/${
                                                movie.poster_path
                                            }`
                                    }></img>
                                </NavLink>
                                <div className='trendingSingleMovieRating'>
                                    {
                                    Math.round(movie.vote_average * 10)
                                }
                                    <i className="fa-solid fa-percent fa-2xs"></i>
                                </div>
                                <div className='trendingSingleMovieTitleContainer'>
                                    <NavLink className='trendingSingleMovieTitle'
                                        style={
                                            {textDecoration: 'none'}
                                        }
                                        to={
                                            `/movies/${
                                                movie.id
                                            }`
                                    }><h1 className='Ranking'>
                                        {i+1} |
                                        </h1>
                                        {
                                        movie.title ? (movie.title) : (movie.name)
                                    } </NavLink>
                                </div>
                            </div>

                        ) : (
                            <div>
                                loading trending movies by day</div>
                        )))

                    }

                    </>
                )
            } </div>
        </>
    ) : (
        <div>
            loading movies</div>
    )
}
