
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewThunk } from '../../store/review';
import { useHistory, useParams } from 'react-router-dom';
import './DeleteReview.css';



const DeleteReview = ({reviewId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const reviewObj = useSelector(state => state.review);
    const {movieId} = useParams();




if(!reviewObj){
    return null
}

const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId));
    history.push(`/movie/${movieId}`);
}

    return(

    <div className='deleteContainer'>


        <form className='deleteForm' onSubmit={handleSubmit}>
        <input className='deleteReviewButtonConfirm'type='submit' value="DELETE" />
        </form>
        <p>

        </p>


    </div>




    );
}



export default DeleteReview
