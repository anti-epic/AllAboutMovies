import React from 'react';
import './SplashPage.css';
import Trending from '../Trending';
const SplashPage = () => {


    return (
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
    )

}


export default SplashPage
