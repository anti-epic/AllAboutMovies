import { csrfFetch } from "./csrf";
import { getMovie } from "./movie";

const LOAD_WATCHLIST = '/watchlist/load';
const GET_WATCHLIST_SUCCESS = 'GET_WATCHLIST_SUCCESS';

export const getWatchlistSuccess = (movies) => ({
    type: GET_WATCHLIST_SUCCESS,
    payload: movies,
  });




export const getWatchlist = () => async dispatch => {
    console.log('in get all watchlist thunk')
    const response = await csrfFetch('/api/watchlist')
    if(response.ok){
        console.log('watchlist response good', response)
        const watchlist = await response.json()

            dispatch(loadWatchlist(watchlist))

    }
    else {
        console.log('watchlist response bad')
    }

}

const loadWatchlist = (watchlist) => {
    return {
        type: LOAD_WATCHLIST,
        watchlist
    }
}





const initialState = {}



const watchlistReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_WATCHLIST:
            const newState={}
            console.log(action, 'in watchlist reducder')
            if(action.watchlist.watchlist){
                action.watchlist.watchlist.forEach(movie => {
                    newState[movie.id] = movie
                })
            }

            return newState
        case GET_WATCHLIST_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  movies: action.payload,
                };
        default:
            return state
    }
}



export default watchlistReducer
