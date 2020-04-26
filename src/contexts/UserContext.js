import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(localStorage.getItem('user'));

  const signin = (user) => {
    history.push('/');
    setUser(JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
  }

  const signout = () => {
    history.push('/login');
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <UserContext.Provider value={{ user: JSON.parse(user), signin, signout }}>
      { props.children }
    </UserContext.Provider>
  );
}

export default UserContextProvider;
