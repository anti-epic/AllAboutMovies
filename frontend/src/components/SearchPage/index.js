import React, {useEffect, useState} from 'react';
import './SearchPage.css';
import {useDispatch, useSelector} from 'react-redux'
import Search from '../Search';
import { Link } from 'react-router-dom';


const SearchPage = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const searchDataObj = useSelector(state => state.search);
    let searchData = []
    if(searchDataObj){
        searchData = Object.values(searchDataObj)
    }
    useEffect(() => {
        setIsLoaded(true)
    }, [dispatch, searchData.length])


    return isLoaded ? (<div className='searchContainer'>
       <div className='searchPageSearchContainer'>
        <Search/>
        </div>
  {searchData.map((movie) => movie.poster_path ? (
            <div  className='searchCard'>
                <Link to={`movie/${movie.id}`}> <img  className="searchSingleMovieImage"src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}></img>
                    </Link>

                <div className='searchTitle'>
                <Link className='searchTitleLink' to={`movie/${movie.id}`}>
                    {movie.title}
                    </Link>
                    <div className='searchDescription'>{movie.overview}</div>
                    </div>
                    <div className='searchDate'>
                    Release-Date - {movie.release_date}
                    </div>
                    </div>
                ) : (<div></div>))}
    </div>) :
    (<div>
        loading movies
    </div>)

}


export default SearchPage
