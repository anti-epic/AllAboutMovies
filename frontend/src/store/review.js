import { csrfFetch } from "./csrf";


const LOAD_REVIEWS = '/reviews/LOAD';



const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
     reviews
    };
};



export const getReviews = (id) => async dispatch => {
    console.log('this is the id', id)
    const response = await csrfFetch(`/api/movies/${id}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        console.log(reviews, 'its ok')
        dispatch(loadReviews(reviews));
      }
      console.log('im down here')
    //  const responseUser = await csrfFetch(``)

};


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
        default:
            return state

    }



}


export default reviewReducer
