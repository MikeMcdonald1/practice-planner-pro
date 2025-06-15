import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './shared/NavBar';
import PracticeForm from './pages/PracticeForm';

function App() {
  const [practiceSnippet, setPracticeSnippet] = useState([]);
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const url = `https://api.airtable.com/v0/${import.meta.env.app1eig7m0uO4LtUt}/${import.meta.env.PracticePlan}`;
  const token = `Bearer ${import.meta.env.patPp2fUtGYYH2NEq.2df470a08153e254b540489a9932a27fa3f24dcc99132dd27fce39d9809196c2}`;

  function handleGoalChange(e) {
    setGoal(e.target.value);
    // console.log(e.target.value);
  }
//1. function for adding a goal/practice snippet

  const addSnippet = async (newSnippet) => {
    const payload = {
      records: [
        {
          fields: {
            // type:
            // musicalKey:
            // metronome:
            // timeSpent:
            goal: newSnippet.goal,
            isCompleted: newSnippet.isCompleted,
          },
        },
      ],
    };

  const options = {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
};

try {
  setIsSaving(true);
  const resp = await fetch(url, options);

  if(!resp.ok) {
    throw new Error('Failed to add new practice snippet');
  }

  const { records } = await resp.json();
  const savedSnippet = {
    id: records[0].id,
    ...records[0].fields,
  };

  // if (!records[0].fields.isCompleted) {
  //   savedSnippet.isCompleted = false;
  // }

  setPracticeSnippet([...practiceSnippet, savedSnippet]);
} catch (error) {
  console.log(error);
  setErrorMessage(error.message);
} finally {
  setIsSaving(false);
}
  
};

// 2. useEffect for fetching goals/practice snippets from Airtable
// useEffect(() => {
//   const fetchGoals = async (newGoal) => {
//     setIsLoading(true);
//     const options = {
//       method: 'GET',
//       headers: {
//         'Authorization': token,
//       }
//     }
//   };
//   fetchGoals();
// }, [])

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
