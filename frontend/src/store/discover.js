import {csrfFetch} from "./csrf";

const LOAD_DISCOVER_MOVIES = '/movies/discover'


export const getDiscoverMovies = () => async dispatch => {
    const response = await csrfFetch('https://api.themoviedb.org/3/discover/movie?api_key=61e69f523be7c038d620f35a02dd450e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
    if (response.ok) {
        const movies = await response.json()
        dispatch(loadDiscoverMovies(movies))
    }
}


const loadDiscoverMovies = (movies) => {
    return {type: LOAD_DISCOVER_MOVIES, movies}
}


const initialState = {};


const discoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DISCOVER_MOVIES: let newDiscoverState = {
                ...state
            }
            action.movies.results.forEach(movie => {
                newDiscoverState[movie.id] = movie
            })

            return newDiscoverState
        default:
            return state
    }
}


export default discoverReducer
