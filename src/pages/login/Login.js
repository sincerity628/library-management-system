import React, { useState, useEffect, useContext } from 'react';
import { Input, Button, Select } from 'semantic-ui-react';
import api from '../../tools/api';
import './login.css';

const initUser = {
  identity: 0,
  id: '',
  password: ''
}

const initError = {
  id: false,
  password: false
}

const identityList = [
  { value: 0, text: 'Manager' },
  { value: 1, text: 'Reader' }
];

const Login = () => {
  const [user, setUser] = useState(initUser);
  const [error, setError] = useState(initError);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (v, e) => {
    setUser({
      ...user,
      [e.id]: e.value
    });

    setError({
      ...error,
      [e.id]: false
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // empty
    console.log(user);
    for(let item in user) {
      if(user[item] === '') {
        setError({
          ...error,
          [item]: true
        });
        return;
      }
    }

    // sent the data
    setBtnLoading(true);

    api
      .login(user)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="login-page">
      <h1 className="login-title">图书管理系统</h1>
      <div className="login-form">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <Select
            id="identity"
            className="form-select"
            placeholder="Identity"
            value={user.identity}
            onChange={handleChange}
            options={identityList}
          />
          <Input
            fluid
            id="id"
            value={user.id}
            error={error.id}
            type="text"
            autoComplete="off"
            placeholder="Number"
            className="form-input"
            onChange={handleChange}
          />
          <Input
            fluid
            id="password"
            type="password"
            autoComplete="off"
            value={user.password}
            error={error.password}
            className="form-input"
            placeholder="Password"
            onChange={handleChange}
          />

          <Button
            className="form-btn"
            loading={btnLoading}
          >CONFIRM</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
