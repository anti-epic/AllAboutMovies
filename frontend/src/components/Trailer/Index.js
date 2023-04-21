import React, {useEffect, useState} from 'react';
import './Trailer.css';
import {useDispatch, useSelector} from 'react-redux'
import { getTrailerThunk } from '../../store/trailer';
const Trailer = ({movieId}) => {
    const dispatch = useDispatch();
    let trailers = [];
    const [isLoaded, setIsLoaded] = useState(false);
    let count = 0;
    const trailerObj = useSelector(state => {
        return state.trailer
    })
    if(trailerObj){
        trailers = Object.values(trailerObj)
    }
    useEffect(() => {
        dispatch(getTrailerThunk(movieId)).then((data)=> {
            setIsLoaded(true)
        })
    }, [dispatch])


    return isLoaded ? (
<div>
<h1 className='trailersTitle'>Trailers</h1>
      <div className='videosContainer'>
        {trailers.map((trailer) => (
            count < 2 ? ++count &&(

                <div className='singleVideoContainer'>


<iframe className='trailers' src={`https://www.youtube.com/embed/${trailer.key}`}
frameborder="0"
allowFullScreen></iframe>
                </div>
        ): (<></>)
        ))}

        </div></div>) :
        (<div>
        loading trailer data
    </div>)

}


export default Trailer
