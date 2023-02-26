import React from 'react';
import { useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editReviewThunk} from '../../store/review';
import {useHistory} from 'react-router-dom';
import './UpdateReview.css'
import { useModal } from "../../context/Modal";

export default function UpdateReview() {
    let reviews = [];
    let reviewId;
    const reload=()=>window.location.reload()
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const reviewObj = useSelector(state => state.review)
    const sessionUser = useSelector(state => state.session)
    const [body, setBody] = useState('')
    const movieId = useSelector(state => state.movie.id)
    let bodyText =''
    if(reviewObj){
        reviews = Object.values(reviewObj)
      for(let i = 0; i < reviews.length; i++){
        if(reviews[i].userId === sessionUser.user.id){
            reviewId = reviews[i].id
        bodyText = reviews[i].body
        }

      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {

          body
        }
        dispatch(editReviewThunk(payload, reviewId)).then((data => reload()));
    }



    return reviewObj ? (
        <div className='editContainer'>
     <div className='updateFormTitle'> Update Your Review</div>
            <form className='updateForm' onSubmit={handleSubmit}>

            <textarea
            className='reviewText'
            type="text"
            placeholder={bodyText}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)} />
        <input className='submitUpdatedInfo' type='submit' value='Update Review'></input>
            </form>
        </div>
    ): (<div></div>)
}
