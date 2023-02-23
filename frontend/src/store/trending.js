import {csrfFetch} from './csrf'

const LOAD_TRENDING_MOVIES_DAY = '/movies/trending/day'
const LOAD_TRENDING_MOVIES_WEEK = '/movies/trending/week'

export const getTrendingMoviesByDay = () => async dispatch => {
    // await console.log('trying to get movies in thunk')
    const response = await csrfFetch('https://api.themoviedb.org/3/movie/popular?api_key=61e69f523be7c038d620f35a02dd450e&language=en-US&page=1')
    if(response.ok){
        const movies = await response.json()
        dispatch(loadTrendingMoviesDay(movies))
    }
}

export const getTrendingMoviesByWeek = () => async dispatch => {
    const response = await csrfFetch('https://api.themoviedb.org/3/trending/movie/week?api_key=61e69f523be7c038d620f35a02dd450e')
    if(response.ok){
        const movies = await response.json()
        dispatch(loadTrendingMoviesWeek(movies))
    }
}



const loadTrendingMoviesDay = (movies) => {
    return {
        type: LOAD_TRENDING_MOVIES_DAY,
         movies
    }
}
const loadTrendingMoviesWeek = (movies) => {
    return {
        type: LOAD_TRENDING_MOVIES_WEEK,
         movies
    }
}


const initialState = {
    day: {
        movies:{}
    },
    week:{
        movies: {}
    }
};



const trendingReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TRENDING_MOVIES_DAY:
           let newDayState ={...state}
             action.movies.results.forEach(movie => {
                newDayState.day.movies[movie.id] = movie
            })

            return newDayState
        case LOAD_TRENDING_MOVIES_WEEK:
            let newWeekState = {...state}
            action.movies.results.forEach(movie => {
                newWeekState.week.movies[movie.id] = movie
            })
            return newWeekState
        default:
            console.log('in default')
            return state
    }
}


export default trendingReducer
