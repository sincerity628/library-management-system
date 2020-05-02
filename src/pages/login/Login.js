import React, { useState, useContext } from 'react';
import { Input, Button, Message } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import api from '../../tools/api';
import './login.css';

const initUser = {
  id: '',
  pwd: ''
}

const initError = {
  id: false,
  pwd: false,
  isError: false,
  text: ''
}

const Login = () => {
  const [user, setUser] = useState(initUser);
  const [error, setError] = useState(initError);
  const [btnLoading, setBtnLoading] = useState(false);
  const { signin } = useContext(UserContext);

  const handleChange = (v, e) => {
    setUser({
      ...user,
      [e.id]: e.value
    });

    setError({
      ...error,
      [e.id]: false,
      isError: false
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // empty
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
        if(res.status === 200) {
          let data = res.data;
          setBtnLoading(false);
          if(res.data.code === 0) {
            setError({
              ...error,
              id: true,
              isError: true,
              errorText: 'User not exist.'
            });
          } else if(res.data.code === 1) {
            setError({
              ...error,
              pwd: true,
              isError: true,
              errorText: 'Wrong Password.'
            });
          } else if(res.data.code === 2) {
            // login success
            signin(data);
          }
        }
      })
      .catch(error => {
        setBtnLoading(false);

        setError({
          ...error,
          isError: true,
          errorText: 'Something Wrong...'
        });
      })
  }

  return (
    <div className="login-page">
      <h1 className="login-title">图书管理系统</h1>
      <div className="login-form">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
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
            id="pwd"
            type="password"
            autoComplete="off"
            value={user.pwd}
            error={error.pwd}
            className="form-input"
            placeholder="Password"
            onChange={handleChange}
          />

          { error.isError ? (
            <Message color="red">{ error.errorText }</Message>
          ) : null }

          <Button
            className="form-btn"
            loading={btnLoading}
            onClick={handleSubmit}
          >CONFIRM</Button>
        </form>
      </div>
      <div className="filter"></div>
    </div>
  );
}

export default Login;
