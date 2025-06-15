// The id for PracticePlan is tbl3FisNmoYOiIucq.

import React, { useState, useEffect } from 'react';

function PracticeForm() {
  const [practiceSnippet, setPracticeSnippet] = useState([]);
  const [goal, setGoal] = useState('');
  const [newSnippet, setNewSnippet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  function handleGoalChange(e) {
    setGoal(e.target.value);
    console.log(e.target.value);
  }
  //1. function for adding a goal/practice snippet

  async function addSnippet(newSnippet) {
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
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error('Failed to add new practice snippet');
      }

      const { records } = await resp.json();
      const savedSnippet = {
        id: records[0].id,
        ...records[0].fields,
      };
      console.log(savedSnippet);
      setPracticeSnippet([...practiceSnippet, savedSnippet]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setGoal('');
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    const newSnippet = {
      goal,
      isCompleted: false,
    };

    await addSnippet(newSnippet);
    setGoal('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="goal">Enter your practice goal:</label>
      <br />
      <input
        type="text"
        id="goal"
        value={goal}
        onChange={handleGoalChange}
        placeholder="e.g., Practice scales for 20 minutes"
      />
      <br />
      <button type="submit" disabled={goal === ''}>
        Submit
      </button>
    </form>
  );
}

export default PracticeForm;
