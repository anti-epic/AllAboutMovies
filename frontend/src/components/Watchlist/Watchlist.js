import React, { useEffect, useState } from 'react';
import './Watchlist.css';
import { getWatchlist } from '../../store/watchlist';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../../store/movie';

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



return isLoaded ? (<div>hi

    <div>watchlist
        {watchlist.map((movie) => (
                <div>{movie.movieId}</div>
        ))}
    </div>
</div>) : (<div> loading watchlist</div>)
}
