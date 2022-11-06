import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Mismates from './pages/mismates';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mismates" element={<Mismates />} />
      </Routes>
    </div>
  );
}

export default App;
