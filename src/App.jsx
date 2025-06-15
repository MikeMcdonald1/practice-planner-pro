import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './shared/NavBar';
import PracticeForm from './pages/PracticeForm';

function App() {
  return (
    <>
      {' '}
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pages/PracticeForm" element={<PracticeForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
