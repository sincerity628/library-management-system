import React, { useState, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Navbar from '../components/navbar/Navbar';
import { UserContext } from '../contexts/UserContext';

const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      { user !== null? (
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      ) }
    </div>
  );
}

export default Router;
