import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from 'react-ratings-declarative';
import {createRatingThunk, loadRatingsThunk} from '../../store/rating'



export default function CreateRating ({movieId}){
    const dispatch = useDispatch();
const [rating, setRating] = useState(1);
const userRatingsObj = useSelector(state => state.rating.rating)
let ratingsArray = []

if(userRatingsObj){
    ratingsArray = Object.values(userRatingsObj)


}
useEffect(() => {
const movie = ratingsArray.find(movie => movie.movieId === Number(movieId))
if(movie){
    setRating(movie.stars)
}
},[dispatch])

const handleRatingChange = (newRating) => {
    setRating(newRating);
    const payload = {rating:newRating}
    dispatch(createRatingThunk(movieId, payload));
  };


    return (

        <div>
        <Rating

          rating={rating}
          widgetRatedColors="rgb(22,33,58)"
          widgetDimensions="2em"
          changeRating={handleRatingChange}
        >
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)" />
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
          <Rating.Widget           widgetHoverColor="rgb(155,169,201)"/>
        </Rating>
        <p>Your rating: {rating}</p>
      </div>



    );
}
