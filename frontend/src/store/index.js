import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import trending from './trending'
import movie from './movie'
import review from './review'
import watchlist from './watchlist'
import search from './search'
import discover from './discover'
import cast from './cast'
import trailer from './trailer'
const rootReducer = combineReducers({
    session: sessionReducer,
    trending,
    movie,
    review,
    watchlist,
    search,
    discover,
    cast,
    trailer
});


let enhancer;


if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require("redux-logger").default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;
