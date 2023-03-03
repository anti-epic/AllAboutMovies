import React, {useEffect, useState} from 'react';
import './Trailer.css';
import {useDispatch, useSelector} from 'react-redux'
import { getTrailerThunk } from '../../store/trailer';
const Trailer = ({movieId}) => {
    const dispatch = useDispatch();
    let trailers = [];
    const [isLoaded, setIsLoaded] = useState(false);
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

      <div className='videosContainer'>
        {trailers.map((trailer) => (
            <div className='singleVideoContainer'>

<iframe width="600" height="400" src={`https://www.youtube.com/embed/${trailer.key}`}
frameborder="0"
allowFullScreen></iframe>
                </div>
        ))}


    </div>) :
    (<div>
        loading movies
    </div>)

}


export default Trailer
