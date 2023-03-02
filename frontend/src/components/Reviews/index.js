import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import './Reviews.css'
import { getReviews } from '../../store/review';
import DeleteReview from '../DeleteReview';




export default function Reviews() {
    const dispatch = useDispatch()
    const {movieId} = useParams();
    let reviews = []
    let title;
    let image;
    let sessionUser
     sessionUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => {
        return state.review
    })

    let movieObj = useSelector(state => {
        return state.movie
    })
    if(movieObj){
        title = movieObj.title
        image = movieObj.poster_path

        }

    if(!sessionUser){
        sessionUser = Infinity
    }


    if(reviewsObj){
        reviews = Object.values(reviewsObj)
    }


    useEffect(() => {
        const payload = {title, image}

    dispatch(getReviews(payload,movieId))
    },[dispatch, reviews.length, title])

    if (!reviewsObj){
        return null
    }
       return reviews ? (
            <div className='reviewsContainer'>
               {reviews.map((review) =>  review.User ?(<>
                    { (sessionUser !== Infinity && review.User.id === sessionUser.id) ? (<div><DeleteReview className="foundme" reviewId={review.id} /></div>):(<></>)}
                <div className='singleReviewContainer'>
                    <div className='singleReviewBody'>"{review.body}" </div>
                    <div className='singleReviewUser'> username - {review.User.username} </div>
                    </div>
               </>
               ) : (<div>loading </div>))}
            </div>
        ) : (<> loading reviews</>)
    }
