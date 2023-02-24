import { csrfFetch } from "./csrf";


const LOAD_REVIEWS = '/reviews/LOAD';
const ADD_REVIEW = '/review/ADD'


const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
     reviews
    };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
}



export const getReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/movies/${id}/reviews`)
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
      }


};


export const createReviewThunk = (payload, id) => async dispatch => {
    console.log(payload, id, ' in create review thunk')
    const response = await csrfFetch(`/api/movies/${id}/reviews`, {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){
        console.log('create response ok')
        const data = await response.json();
        dispatch(addReview(data))
    }

}



const initialState = {

}

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_REVIEWS:
            const newState={}
            console.log(action, 'in action review reducer')
            if(action.reviews.reviews){
                action.reviews.reviews.forEach(review => {
                    newState[review.id] = review
                })
            }
        return newState
        case ADD_REVIEW:
            const addReviewState = {...state};
            console.log('in create reducer', action)
            addReviewState[action.review.id] = action.review;
            return addReviewState
        default:
            return state

    }



}


export default reviewReducer
