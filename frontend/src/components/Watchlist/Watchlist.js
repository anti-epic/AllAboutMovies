import React, { useEffect, useState } from 'react';
import './Watchlist.css';
import { getWatchlist } from '../../store/watchlist';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../../store/movie';
import {Link} from 'react-router-dom';

export default function Watchlist() {
const dispatch = useDispatch();
let watchlist = []

const [isLoaded, setIsLoaded] = useState(false);
const watchlistObj = useSelector(state => {
    return state.watchlist
})

if(watchlist){
    watchlist = Object.values(watchlistObj)
}
useEffect(() => {


        dispatch(getWatchlist()).then((async(data) => {
            setIsLoaded(true)
        }))
},[dispatch, watchlist.length])

if(!watchlistObj){
    return null
}



return isLoaded ? (<div>
        <h1 className='watchlistTitle'> WATCHLIST</h1>

    <div className='watchlistContainer'>
        {watchlist.map((movie) => (
                <Link className='watchlistCard' to={`movie/${movie.id}`}> <img  className="watchlistSingleMovieImage"src={`${movie.image}`}></img>
                <div className='testing'>
                    {movie.title}
                    </div>
                    </Link>
        ))}
    </div>
</div>) : (<div> loading watchlist</div>)
}
