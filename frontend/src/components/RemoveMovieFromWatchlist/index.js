
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import { deleteWatchlistThunk} from '../../store/watchlist';

export default function RemoveMovieFromWatchlist ({movieId}) {
    const dispatch = useDispatch()
    const [message, setMessage] = React.useState("-");
    const timeoutIdRef = React.useRef();
    const [onWatchlist, setOnWatchlist] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(deleteWatchlistThunk(movieId))
        setMessage("Removed from your watchlist");
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setMessage("");
            setOnWatchlist(false)
        }, 2000);

    }


    return (
        <form className='watchlistSingleMovieContainer ' onSubmit={handleSubmit}>
        <input className='watchlistButton' type='submit' value='remove from watchlist'></input>
        {message}
        </form>
    )
}
