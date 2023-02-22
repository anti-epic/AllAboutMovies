import {csrfFetch} from './csrf'

const LOAD_TRENDING_MOVIES_DAY = '/movies/trending/day'

export const getTrendingMoviesByDay = () => async dispatch => {
    // await console.log('trying to get movies in thunk')
    const response = await csrfFetch('https://api.themoviedb.org/3/trending/movie/day?api_key=61e69f523be7c038d620f35a02dd450e')
    if(response.ok){
        const movies = await response.json()
        dispatch(loadTrendingMoviesDay(movies))
    }
}

const loadTrendingMoviesDay = (movies) => {
    return {
        type: LOAD_TRENDING_MOVIES_DAY,
         movies
    }
}


const initialState = {
};



const trendingReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TRENDING_MOVIES_DAY:
           let newState ={day : {movies: {}}}
             action.movies.results.forEach(movie => {
                newState.day.movies[movie.id] = movie
            })
            return newState
        default:
            console.log('in default')
            return state
    }
}


export default trendingReducer
