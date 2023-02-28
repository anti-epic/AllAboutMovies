
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import { addWatchlistThunk, deleteWatchlistThunk} from '../../store/watchlist';
import RemoveMovieFromWatchlist from '../RemoveMovieFromWatchlist';
import './AddMovieToWatchlist.css'

export default function AddMovieToWatchlist ({movieId}) {
    const dispatch = useDispatch()
    const [message, setMessage] = React.useState("-");
    const timeoutIdRef = React.useRef();
    const [onWatchlist, setOnWatchlist] = useState(false);


    useEffect(() => {




    },[dispatch, onWatchlist])



    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addWatchlistThunk(movieId))
        setMessage("Movie added to your personal watchlist");
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setMessage(" ");
            setOnWatchlist(true)
        }, 2000);

    }
        const handleunSubmit = async (e) => {
            e.preventDefault();
            dispatch(deleteWatchlistThunk(movieId))
            setMessage("Removed from your watchlist");
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = setTimeout(() => {
                setMessage(" ");
                setOnWatchlist(false)
            }, 2000);

        }




    return (<div>
        {onWatchlist === false ? (

            <form className='watchlistSingleMovieContainerAdd ' onSubmit={handleSubmit}>
        <input className='watchlistButton' type='submit' value='add to watchlist'></input>
        <div className='watchlistMessagePopup'>
                    {message}
                    </div>
        </form>
            ) : (<div>        <form className='watchlistSingleMovieContainerDelete ' onSubmit={handleunSubmit}>
            <input className='watchlistButton' type='submit' value='remove from watchlist'></input>

                <div className='watchlistMessagePopup'>
                    {message}
                    </div>
            </form></div>)}
    </div>
    )
}
