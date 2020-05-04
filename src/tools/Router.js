import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Navbar from '../components/navbar/Navbar';
import Book from '../pages/book/Book';
import Borrow from '../pages/borrow/Borrow';
import Home from '../pages/home/Home';
import List from '../pages/list/List';
import Login from '../pages/login/Login';
import Reserve from '../pages/reserve/Reserve';
import Return from '../pages/return/Return';

const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      { user !== null? (
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/book/:id" component={Book} />
            <Route path="/borrow" component={Borrow} />
            <Route path="/reserve" component={Reserve} />
            <Route path="/return" component={Return} />
            <Route path="/list" component={List} />
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
