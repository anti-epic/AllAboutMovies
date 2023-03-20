import {csrfFetch} from './csrf'
const LOAD_CAST = './cast/load'


export const getCastThunk = (movieId) => async dispatch => {
    const response = await csrfFetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=61e69f523be7c038d620f35a02dd450e&language=en-US`)

    if(response.ok){
        const cast = await response.json()
        dispatch(getCast(cast))
    }

}



const getCast = (cast) => {
    return {
        type:LOAD_CAST,
        cast
    }
}


const initialState = {
};


const castReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_CAST:
                let loadCastState = {...action.movie ,cast : action.cast}
                return loadCastState
        default:
            return state
    }
}


export default castReducer
