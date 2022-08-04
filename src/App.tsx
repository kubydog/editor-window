import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Main from './Main';

const App = () => {
  return (
    <>
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
        </ul>
        <hr/>
        <Main />
      </div>
    </>
  );
};
export default App;
