import {BrowserRouter , Navigate,Router,Route, Routes } from 'react-router-dom'
import LogInPage from './scenes/logInPage';
import HomePage from './scenes/homePage';
import ProfilePage from './scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './scenes/Navbar';

function App() {
  const mode = useSelector((state) => state.mode)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogInPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile/:userId' element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
