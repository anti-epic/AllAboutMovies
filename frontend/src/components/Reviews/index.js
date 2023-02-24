import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import './Reviews.css'
import { getReviews } from '../../store/review';




export default function Reviews() {
    const dispatch = useDispatch()
    const {movieId} = useParams();
    let reviews = []


    const reviewsObj = useSelector(state => {
        return state.review
    })


    if(reviewsObj){
        reviews = Object.values(reviewsObj)
    }



    useEffect(() => {
    dispatch(getReviews(movieId))
    },[dispatch, reviews.length])

    if (!reviewsObj){
        return null
    }
       return reviews ? (
            <div className='reviewsContainer'>
               {reviews.map((review) =>  review.User ?(
                <div className='singleReviewContainer'>
                    <div className='singleReviewBody'>"{review.body}" </div>
                    <div className='singleReviewUser'> User:{review.User.firstName} </div>
                    </div>
               ) : (<div>loading </div>))}
            </div>
        ) : (<> loading reviews</>)
    }
