// @ts-ignore
import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Main from './Main';

const App = () => {
  return (
    <>
      <div data-disabled={true}>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/readonly'>Readonly</Link></li>
        </ul>
        <hr/>
        <Main />
      </div>
    </>
  );
};
export default App;
