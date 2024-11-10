// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:idMeal" element={<RecipePage />} /> {/* Dynamic route for recipe details */}
      </Routes>
    </Router>
  );
}

export default App;
