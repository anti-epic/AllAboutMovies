import {csrfFetch} from "./csrf";


const LOAD_REVIEWS = '/reviews/LOAD';
const ADD_REVIEW = '/review/ADD'
const EDIT_REVIEW = '/review/EDIT'
const DELETE_REVIEW = '/review/DELETE'


const editReview = (review) => {
    return {type: EDIT_REVIEW, review}
}

const loadReviews = (reviews) => {
    return {type: LOAD_REVIEWS, reviews};
};

const addReview = (review) => {
    return {type: ADD_REVIEW, review};
}


const deleteReview = (review) => {
    return {type: DELETE_REVIEW, review}
}

export const editReviewThunk = (payload, id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(editReview(data))
    }

}


export const getReviews = (payload, id) => async dispatch => {
    const response = await csrfFetch(`/api/movies/${id}/${payload.title}${payload.image}/reviews`)
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }


};


export const createReviewThunk = (payload, id) => async dispatch => {
    const response = await csrfFetch(`/api/movies/${id}/${
        payload.title
    }${
        payload.image
    }/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data))
    }

}

export const deleteReviewThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {method: 'DELETE'})
    if (response.ok) {

        const data = await response.json();
        dispatch(deleteReview(data))
    }

}


const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: const newState = {}
            if (action.reviews.reviews) {
                action.reviews.reviews.forEach(review => {
                    newState[review.id] = review
                })
            }
            return newState
        case ADD_REVIEW: const addReviewState = {
                ...state
            };
            addReviewState[action.review.id] = action.review;
            return addReviewState
        case EDIT_REVIEW: const editReviewState = {
                ...state
            }
            editReviewState[action.review.id] = action.review
            return editReviewState
        case DELETE_REVIEW: const deleteReviewState = {}
            return deleteReviewState
        default:
            return state

    }


}


export default reviewReducer
