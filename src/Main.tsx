import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Settings from './Settings';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/settings' element={<Settings/>} />
    </Routes>
  );
}

export default Main;