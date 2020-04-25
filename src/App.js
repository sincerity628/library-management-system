import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </div>
  );
}

export default App;
