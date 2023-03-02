import {csrfFetch} from './csrf'

const LOAD_MOVIE = '/movie/load'
const CLEAR_MOVIE ='/movie/clear'

export const getMovie = (payload, movieId) => async dispatch => {
    const response = await csrfFetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=61e69f523be7c038d620f35a02dd450e&language=en-US`)

    if(response.ok){

        const movie = await response.json()
        dispatch(getSingleMovie(movie))
    }
}




const getSingleMovie = (movie) =>{
    return {type: LOAD_MOVIE,
    movie
    }
}

export const clearMovie = () => {
    return {
        type: CLEAR_MOVIE,
    }
}


const initialState = {
};


const movieReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_MOVIE:
            let loadMovieState = { ...action.movie
            }
            return loadMovieState
        case CLEAR_MOVIE:
            const clearedState = {}
            return clearedState
        default:
            return state
    }
}


export default movieReducer
