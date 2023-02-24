
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/review';
import { useHistory } from 'react-router-dom';
import './CreateReview.css'
import { useModal } from "../../context/Modal";
const CreateReview = () => {
    const history = useHistory();
    const dispatch = useDispatch();
	const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);


    const movieObj = useSelector(state => {
        return state.movie
    })
    const movieId = movieObj.id
    console.log(movieId, 'movieeeiddddd')


const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(  'start',
    review,
    'end', movieId)



    const payload = {
    body:review
    }
    dispatch(createReviewThunk(payload, movieId)).then((data =>  history.push(`/movie/${movieId}`)));
    closeModal();


}

    return(

    <div className='createReviewContainer'>
        <div className='formTitle'> Create A Review</div>

        <form className='createForm' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Review'
          required
          value={review}
          onChange={(e) => setReview(e.target.value)}
          />

        <input className='submitCreateInfo' type='submit' value='Create Review'></input>

        </form>



    </div>




    );
}



export default CreateReview
