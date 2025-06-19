import React, { useState, useEffect } from 'react';

function PracticeForm() {
  // const [formData, setFormData] = useState({}); USE THIS TO COMBINE ALL FIELDS INTO ONE COOL STATE

  const [practiceType, setPracticeType] = useState('');
  const [goal, setGoal] = useState('');
  const [metronome, setMetronome] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [newSnippet, setNewSnippet] = useState(''); //a snippet object requiring all 5 fields
  const [allSnippets, setAllSnippets] = useState([]); //an array of snippet objects, all the snippets together

  const [isLoading, setIsLoading] = useState(false); //for loading snippets
  const [errorMessage, setErrorMessage] = useState(''); //for error message
  const [isSaving, setIsSaving] = useState(false); //for updating snippets EVENTUALLY

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?sort[0][field]=Created%20time&sort[0][direction]=asc`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  function handleGoalChange(e) {
    //rename handleSnippetChange?
    setGoal(e.target.value); //maybe set newSnippet??
    console.log(e.target.value);
  }

  // 1. function for adding an entire practice snippet(only adds goal field currently)
  async function addSnippet(newSnippet) {
    const payload = {
      records: [
        {
          fields: {
            //add here and then in the return statement? what else is needed?
            // metronome: number labelled with bpm(beats per minute)
            // timeSpent: number labelled with minutes(time spent in minutes)
            practiceType: newSnippet.practiceType,
            goal: newSnippet.goal,
            metronome: newSnippet.metronome,
            timeSpent: newSnippet.timeSpent,
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
        //get the saved snippet from the POST response
        id: records[0].id,
        ...records[0].fields,
      };
      console.log(savedSnippet);
      setAllSnippets((prevSnippets) => [...prevSnippets, savedSnippet]); //prevSnippets is temporary label for most up to date value of state
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAddSnippet(e) {
    e.preventDefault();

    const newSnippet = {
      //same variable name declared earlier, choose new one
      practiceType,
      goal,
      metronome,
      timeSpent,
      isCompleted: false,
    };

    await addSnippet(newSnippet);
    setPracticeType('');
    setGoal('');
    setMetronome('');
    setTimeSpent('');
  }

  // 2. useEffect to fetchAllSnippets when App starts(maybe transfer this to the )
  useEffect(() => {
    async function fetchAllSnippets() {
      setIsLoading(true);
      setErrorMessage('');

      const options = {
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
          throw new Error('Failed to fetch practice snippets');
        }

        const data = await resp.json();
        console.log('Fetched data:', data.records);
        setAllSnippets(
          data.records.map((record) => ({
            id: record.id,
            ...record.fields,
          }))
        );
      } catch (error) {
        console.log('Error fetching snippets:', error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllSnippets();
  }, []);

  // 3. Update Snippet
  async function updateSnippet(editedSnippet) {
    const originalSnippet = allSnippets.find(
      (snippet) => snippet.id === editedSnippet.id
    );

    const payload = {
      records: [
        {
          id: editedSnippet.id,
          fields: {
            goal: editedSnippet.goal,
            isCompleted: editedSnippet.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
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
        throw new Error('Failed to update practice snippet');
      }

      const { records } = await resp.json();
      const updatedSnippet = {
        id: records[0].id,
        ...records[0].fields,
      };

      const updatedSnippets = allSnippets.map((snippet) =>
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      );

      setAllSnippets([updatedSnippets]);
    } catch (error) {
      console.log(error);
      setErrorMessage(`Error updating practice snippet. Reverting changes...`);
      const revertedSnippets = allSnippets.map((snippet) =>
        snippet.id === originalSnippet.id ? { ...originalSnippet } : snippet
      );
      setAllSnippets([...revertedSnippets]);
    } finally {
      setIsSaving(false);
    }
  }

  // 4. Complete a practice snippet
  async function completeSnippet(id) {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            id: id,
            fields: {
              isCompleted: true,
            },
          },
        ],
      }),
    };

    try {
      setIsSaving(true);
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error('Failed to mark snippet as complete');

      setAllSnippets((prevSnippets) =>
        prevSnippets.map((snippet) =>
          snippet.id === id ? { ...snippet, isCompleted: true } : snippet
        )
      );
    } catch (error) {
      setErrorMessage('Error marking snippet as complete');
      console.log('Error completing snippet:', error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleAddSnippet}>
        <label htmlFor="practiceType">Practice Type:</label>
        <br />
        <select
          id="practiceType"
          value={practiceType}
          onChange={(e) => setPracticeType(e.target.value)}
          required
        >
          <option value="">-</option>
          <option value="Warmups">Warmups</option>
          <option value="Scales">Scales</option>
          <option value="Etudes & Exercises">Etudes & Exercises</option>
          <option value="Repertoire & Songs">Repertoire & Songs</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <label htmlFor="goal">Enter your practice goal:</label>
        <br />
        <input
          type="text"
          id="goal"
          value={goal}
          onChange={handleGoalChange}
          placeholder="e.g., G Major Pentatonic"
          required
        />
        <br />
        <label htmlFor="metronome"> Metronome (BPM)</label>
        <br />
        <input
          type="number"
          id="metronome"
          value={metronome}
          onChange={(e) => setMetronome(e.target.value)}
          // min="1"
          // max="1000"
          placeholder="e.g., 120"
          required
        />
        <br />
        <label htmlFor="timeSpent">Time Spent (minutes)</label>
        <br />
        <input
          type="number"
          id="timeSpent"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          placeholder="e.g., 20"
          // min="1"
          // max="500"
          required
        />
        <br />
        <button
          type="submit"
          disabled={
            practiceType === '' ||
            goal === '' ||
            metronome === '' ||
            timeSpent === '' ||
            isSaving
          }
        >
          {isSaving ? 'Saving...' : 'Submit'}
        </button>
      </form>

      {isLoading && <div>Loading practice routine...</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {allSnippets
          .filter((snippet) => !snippet.isCompleted) // show only NOT completed
          .map((snippet) => (
            <li key={snippet.id}>
              <input
                type="checkbox"
                className="checkboxItem"
                checked={false}
                onChange={() => completeSnippet(snippet.id)}
                disabled={isSaving}
              />
              {snippet.practiceType && <span>({snippet.practiceType}) </span>}
              {snippet.goal}
              {snippet.metronome && <span> | {snippet.metronome} BPM</span>}
              {snippet.timeSpent && <span> | {snippet.timeSpent} Minutes</span>}
            </li>
          ))}
      </ul>
    </>
  );
}

export default PracticeForm;

// TASKS:
// Use "Task" for new things to do keyword
// Create select menu for practice type
// Create select menu for music key
// Create text/number input for metronome marking in bpm
// Create text/number input for time spent in min
// Create table for rendering all info in one snippet

// Make all fields required
// Add feedback to user behavior ("Please fill all fields to submit");

// How to fetch snippet and render all together (flexbox?) one checkbox, 1 snippet, 5 states(use table element with 5 columns)

// Add a way for users to update/patch a snippet
// Add a way for users to delete a snippet
