import {csrfFetch} from './csrf'

const LOAD_TRAILER= '/trailer/load'



export const getTrailerThunk = (movieId) => async dispatch => {
    const response = await csrfFetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=61e69f523be7c038d620f35a02dd450e&language=en-US`)
if(response.ok){
    const trailer = await response.json()
    dispatch(getTrailer(trailer))
}
}





const getTrailer = (trailer) =>{
    return {type: LOAD_TRAILER,
        trailer
    }
}




const initialState = {
};




const trailerReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TRAILER:
            let loadTrailerState = {
            }
            if(action.trailer.results){
                action.trailer.results.forEach(video => {
                    if(video.site === "YouTube" && video.type === 'Trailer'){
                        loadTrailerState[video.id] = video
                    }
                })
            }

            return loadTrailerState
        default:
            return state
    }
}


export default trailerReducer
