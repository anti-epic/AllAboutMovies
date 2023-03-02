import {csrfFetch} from "./csrf";


const LOAD_WATCHLIST = '/watchlist/load';
const ADD_TO_WATCHLIST = '/watchlist/add';
const DELETE_WATCHLIST = '/watchlist/delete'

export const getWatchlist = () => async dispatch => {

    const response = await csrfFetch('/api/watchlist')
    if(response.ok){

        const watchlist = await response.json()

            dispatch(loadWatchlist(watchlist))

    }
    else {
        console.log('watchlist response bad')
    }

}


export const deleteWatchlistThunk = (id) => async dispatch => {

    const response = await csrfFetch(`/api/watchlist/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){

        const data = await response.json();
        dispatch(deleteWatchlist(data))
    }

}




export const addWatchlistThunk = (payload,id) => async dispatch => {

    const response = await csrfFetch(`/api/watchlist/${id}/${payload.title}${payload.image}`, {
        method: 'POST',
        headers: {"Content-Type" : "application/json"}
    })
    if(response.ok){

        const data = await response.json();
        dispatch(addWatchlist(data))
    }

}

const deleteWatchlist = (watchlist) => {
    return{
        type: DELETE_WATCHLIST,
        watchlist
    }
}


const loadWatchlist = (watchlist) => {
    return {
        type: LOAD_WATCHLIST,
        watchlist
    }
}

const addWatchlist = (watchlist) => {
    return {
        type: ADD_TO_WATCHLIST,
        watchlist
    }
}




const initialState = {}



const watchlistReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_WATCHLIST:
            const newState={}

            if(action.watchlist.watchlist){
                action.watchlist.watchlist.forEach(movie => {
                    newState[movie.id] = movie
                })
            }
            return newState
        case ADD_TO_WATCHLIST:
            const addWatchlistState ={...state}

            addWatchlistState[action.watchlist.id] = action.watchlist
            return addWatchlistState
        case DELETE_WATCHLIST:
            const deleteWatchlistState = {...state}
            let removedId = action.watchlist.watchlistId


            delete deleteWatchlistState[removedId]
                return deleteWatchlistState
        default:
            return state
    }
}



export default watchlistReducer
