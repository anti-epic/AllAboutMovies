import {csrfFetch} from "./csrf";


const LOAD_WATCHLIST = '/watchlist/load';
const ADD_TO_WATCHLIST = '/watchlist/add';
const DELETE_WATCHLIST = '/watchlist/delete'

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


export const deleteWatchlistThunk = (id) => async dispatch => {
    console.log('in delete thunk')
    const response = await csrfFetch(`/api/watchlist/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        console.log('delete thunk response ok')
        const data = await response.json();
        dispatch(deleteWatchlist(data))
    }

}




export const addWatchlistThunk = (id) => async dispatch => {
    console.log( id, ' in create  watchlist thunk')
    const response = await csrfFetch(`/api/watchlist/${id}`, {
        method: 'POST',
        headers: {"Content-Type" : "application/json"}
    })
    if(response.ok){
        console.log('create response ok')
        const data = await response.json();
        dispatch(addWatchlist(data))
    }

}

const deleteWatchlist = (review) => {
    return{
        type: DELETE_WATCHLIST,
        review
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
            console.log(action, 'in watchlist reducder')
            if(action.watchlist.watchlist){
                action.watchlist.watchlist.forEach(movie => {
                    newState[movie.id] = movie
                })
            }
            return newState
        case ADD_TO_WATCHLIST:
            const addWatchlistState ={...state}
            console.log(action , 'in add watchlist')
            addWatchlistState[action.watchlist.id] = action.watchlist
            return addWatchlistState
        case DELETE_WATCHLIST:
            const deleteWatchlistState = {...state}
            console.log(action , 'in delete watchlist')
            delete deleteWatchlistState.watchlist[action.movieId]
                return deleteWatchlistState
        default:
            return state
    }
}



export default watchlistReducer
