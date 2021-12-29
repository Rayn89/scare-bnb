import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ViewSpots from './components/viewSpots/ViewSpots'
import CreateSpotForm from './components/postSpot/PostSpot'
import SplashPage from './components/splashPage/SplashPage';
import SingleSpot from './components/singleSpot/SingleSpot';
import EditSpotForm from './components/editSpotForm/EditSpotForm';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/spots/" exact={true}>
          <ViewSpots />
        </Route>
        <Route path="/spots/new" exact={true}>
          <CreateSpotForm />
        </Route>
        <Route path="/spots/search" exact={true}>
          <SearchPage />
        </Route>
        <Route path="/spots/:id" exact={true}>
          <SingleSpot />
        </Route>
        <Route path="/spots/:id/edit" exact={true}>
          <EditSpotForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:id" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
