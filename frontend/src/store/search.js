import {bindActionCreators} from "redux";
import {csrfFetch} from "./csrf";


const LOAD_SEARCH = '/search/LOAD';


export const getSearch = (payload) => async dispatch => {
    console.log(payload, 'search payload here')
    let parsed = payload.split(' ').join('+');
    console.log(parsed, 'parsed')
    const response = await csrfFetch(`https://api.themoviedb.org/3/search/movie?api_key=61e69f523be7c038d620f35a02dd450e&query=${parsed}`)
    if (response.ok) {
        const movies = await response.json();
        dispatch(loadSearch(movies));
    }


};

const loadSearch = (movies) => {
    return {type: LOAD_SEARCH, movies};
};


const initialState = {}
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SEARCH: const newState = {}
            if (action.movies.results) {
                action.movies.results.forEach(movie => {
                    newState[movie.id] = movie
                })
            }
            return newState
        default:
            return state

    }


}


export default searchReducer
