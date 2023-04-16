import {csrfFetch} from "./csrf"


const LOAD_RATINGS = '/ratings/LOAD'
const CREATE_RATING = 'ratings/CREATE'

const loadRatings = (ratings) => {
    return {
        type: LOAD_RATINGS,
        ratings
    }
}

const createRating = (rating) => {
    return {
        type: CREATE_RATING,
        rating
    };
}

export const loadRatingsThunk = () => async dispatch => {
const response = await csrfFetch(`/api/ratings`)
if(response.ok){
    const ratings = await response.json();
    dispatch(loadRatings(ratings))
}

}



export const createRatingThunk = (movieId, rating) => async dispatch => {
    const response = await csrfFetch(`/api/ratings/${movieId}`, {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(rating)
    })
    if(response.ok){

        const data = await response.json();
        dispatch(createRating(data))
    }


}




const initialState = {

}




 const ratingReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_RATINGS:
            const newState={...action.ratings}
            return newState
        case CREATE_RATING:
            const createRatingState= {...state};
            return createRatingState
        default:
            return state
    }
}


export default ratingReducer
