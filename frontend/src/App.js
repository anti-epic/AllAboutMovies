import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from './components/SplashPage'
import MoviePage from "./components/MoviePage";
import Watchlist from "./components/Watchlist/Watchlist";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={SplashPage} />
          <Route path='/movie/:movieId' component={MoviePage} />
          <Route path='/watchlist' component={Watchlist} />
        </Switch>
      )}
    </>
  );
}

export default App;
