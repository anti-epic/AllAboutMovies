import React, { useEffect, useState } from 'react';
import './SplashPage.css';
import Trending from '../Trending';
import {useDispatch, useSelector} from 'react-redux'
import { getWatchlist } from '../../store/watchlist';
const SplashPage = () => {
    const dispatch = useDispatch();
    let watchlist = []
    const watchlistObj = useSelector(state => {
        return state.watchlist
    })
	const [isLoaded, setIsLoaded] = useState(false);
    if(watchlistObj){
        watchlist = Object.values(watchlistObj)

    }
    let sessionUser
    sessionUser = useSelector(state => state.session.user);
    if(!sessionUser){
        sessionUser = Infinity
    }
    useEffect(() => {
    dispatch(getWatchlist()).then(() => {
        setIsLoaded(true)
    })
    },[dispatch, watchlist.length, sessionUser])

    return isLoaded ? (
        <div className='container'>

            <div className='splashBanner'  style={{backgroundImage: `url("./movie-banner.jpg")`}}>
            <div className='splashWelcome'>
                Welcome.
                </div >
                <div className='splashMessage'>Millions of movies, TV shows and people to discover. Explore now </div>
            </div>
            <div className='trending'>
                
              <Trending />
            </div>

    </div>
    ) : (<div> loading movies</div>)

}


export default SplashPage
