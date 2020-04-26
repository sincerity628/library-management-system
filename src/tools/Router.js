import React, { useState, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import { UserContext } from '../contexts/UserContext';

const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      { user !== null? (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      ) }
    </div>
  );
}

export default Router;
