import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Add from './pages/Add';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import Month from './pages/Month';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import Week from './pages/Week';
import Year from './pages/Year';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Main />}>
          <Route index element={<Home />}></Route>
          <Route path="add" element={<Add />}></Route>
          <Route path="add/:id" element={<Add />}></Route>
          <Route path="plan" element={<Year />}></Route>
          <Route path="plan/:year" element={<Month />}></Route>
          <Route path="plan/:year/:month" element={<Week />}></Route>
          <Route path="plan/:year/:month/:week" element={<Schedule />}></Route>

          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>

          <Route path="404" element={<ErrorPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
