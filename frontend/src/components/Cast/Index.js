import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import './Cast.css'
import {getCastThunk} from '../../store/cast';


const Cast = () => {
    const dispatch = useDispatch()

    let cast = [];
    let crew = [];
    const [isLoaded, setIsLoaded] = useState(false);
    const [onWatchlist, setOnWatchlist] = useState(false);
    const {movieId} = useParams();
    let sessionUser = useSelector(state => state.session.user);
    let isLoggedIn = false
    let alreadyReviewed = false;


    const castObj = useSelector(state => {
        return state.cast.cast
    })


    if (castObj) {
        cast = Object.values(castObj)
    }


    useEffect(() => {


        dispatch(getCastThunk(movieId)).then((data) => {
            setIsLoaded(true)
        })

    }, [dispatch, movieId])


    return isLoaded ? (<div className='castComponentContainer'>
            <h1 className='castHeader'>Main Cast</h1>
        <div className='castContainer'>
            <div className='singleCastCard'>
            <img  className="singleCastImage"src={`https://image.tmdb.org/t/p/w300/${cast[1][0].profile_path}`}></img>
            <div className='castName'> {cast[1][0].name}</div>
            <div className='caseMovieName' >{cast[1][0].character}</div>
            </div>
            <div className='singleCastCard'>
            <img  className="singleCastImage"src={`https://image.tmdb.org/t/p/w300/${cast[1][1].profile_path}`}></img>
            <div className='castName'> {cast[1][1].name}</div>
            <div className='caseMovieName' >{cast[1][1].character}</div>
            </div>
            <div className='singleCastCard'>
            <img  className="singleCastImage"src={`https://image.tmdb.org/t/p/w300/${cast[1][2].profile_path}`}></img>
            <div className='castName'> {cast[1][2].name}</div>
            <div className='caseMovieName' >{cast[1][2].character}</div>
            </div>
            <div className='singleCastCard'>
            <img  className="singleCastImage"src={`https://image.tmdb.org/t/p/w300/${cast[1][3].profile_path}`}></img>
            <div className='castName'> {cast[1][3].name}</div>
            <div className='caseMovieName' >{cast[1][3].character}</div>
            </div>
            <div className='singleCastCard'>
            <img  className="singleCastImage"src={`https://image.tmdb.org/t/p/w300/${cast[1][4].profile_path}`}></img>
            <div className='castName'> {cast[1][4].name}</div>
            <div className='caseMovieName' >{cast[1][4].character}</div>
            </div>
            <div className='singleCastCard'>
            <img  className="singleCastImage"src={`https://image.tmdb.org/t/p/w300/${cast[1][5].profile_path}`}></img>
            <div className='castName'> {cast[1][5].name}</div>
            <div className='caseMovieName' >{cast[1][5].character}</div>
            </div>
            </div>
            </div>
    ) : (
        <>
            loading movie data</>
    )
}

export default Cast
