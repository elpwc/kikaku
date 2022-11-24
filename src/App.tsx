import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Add from './pages/Add';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Main from './pages/Main';
import Month from './pages/Month';
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
          <Route path="year" element={<Year />}></Route>
          <Route path="year/:year" element={<Month />}></Route>
          <Route path="year/:year/month/:month" element={<Week />}></Route>
          <Route path="year/:year/month/:month/week/:week" element={<Month />}></Route>
          <Route path="404" element={<ErrorPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
