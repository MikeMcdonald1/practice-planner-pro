import React, { useState, useEffect, useCallback } from 'react';
import styles from './PracticeForm.module.css';
import SnippetList from '../features/SnippetList';
import NumberInput from '../shared/NumberInput';
import GeneralButton from '../shared/GeneralButton';

function PracticeForm() {
  const [practiceType, setPracticeType] = useState('');
  const [goal, setGoal] = useState('');
  const [metronome, setMetronome] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [allSnippets, setAllSnippets] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?sort[0][field]=createdTime&sort[0][direction]=asc`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const activeSnippets = allSnippets.filter((snippet) => !snippet.isCompleted);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  function handleGoalChange(e) {
    setGoal(e.target.value);
  }

  async function addSnippet(newSnippet) {
    const payload = {
      records: [
        {
          fields: {
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
        id: records[0].id,
        ...records[0].fields,
      };
      setAllSnippets((prevSnippets) => [...prevSnippets, savedSnippet]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  const handleAddSnippet = useCallback(
    async (e) => {
      e.preventDefault();

      const newSnippet = {
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
      setSuccessMessage('Practice snippet saved!');
    },
    [practiceType, goal, metronome, timeSpent]
  );

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
        setAllSnippets(
          data.records.map((record) => ({
            id: record.id,
            ...record.fields,
          }))
        );
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllSnippets();
  }, []);

  async function updateSnippet(editedSnippet) {
    const originalSnippet = allSnippets.find(
      (snippet) => snippet.id === editedSnippet.id
    );

    const payload = {
      records: [
        {
          id: editedSnippet.id,
          fields: {
            practiceType: editedSnippet.practiceType,
            goal: editedSnippet.goal,
            metronome: editedSnippet.metronome,
            timeSpent: editedSnippet.timeSpent,
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

      setAllSnippets(updatedSnippets);
      setSuccessMessage('Practice snippet updated!');
    } catch (error) {
      setErrorMessage(`Error updating practice snippet. Reverting changes...`);
      const revertedSnippets = allSnippets.map((snippet) =>
        snippet.id === originalSnippet.id ? { ...originalSnippet } : snippet
      );
      setAllSnippets([...revertedSnippets]);
    } finally {
      setIsSaving(false);
    }
  }

  function handleSaveEdit(id) {
    updateSnippet({ id, ...editFields });
    setEditId(null);
    setEditFields({});
  }

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
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <>
      <div className={styles.practiceFormContainer}>
        <form onSubmit={handleAddSnippet} className={styles.practiceForm}>
          <label htmlFor="practiceType">Practice Type:</label>
          <select
            id="practiceType"
            value={practiceType}
            onChange={(e) => setPracticeType(e.target.value)}
            required
          >
            <option value="">-</option>
            <option value="Warmups">Warmups</option>
            <option value="Scales">Scales</option>
            <option value="Exercises">Exercises</option>
            <option value="Repertoire & Songs">Repertoire & Songs</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="goal">Enter your practice goal:</label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={handleGoalChange}
            placeholder="e.g., G Major Pentatonic"
            required
          />

          <NumberInput
            label="Metronome (BPM)"
            id="metronome"
            value={metronome}
            onChange={(e) => setMetronome(e.target.value)}
            min={1}
            max={500}
            placeholder="e.g., 100"
          />

          <NumberInput
            label="Time Spent (minutes)"
            id="timeSpent"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            min={1}
            max={500}
            placeholder="e.g., 30"
          />

          <GeneralButton
            type="submit"
            id="submit"
            className={styles.submitButton}
            disabled={
              practiceType === '' ||
              goal === '' ||
              metronome === '' ||
              timeSpent === '' ||
              isSaving
            }
          >
            {isSaving ? 'Saving...' : 'Submit'}
          </GeneralButton>
        </form>
      </div>
      {successMessage && (
        <div className={styles.successMessage} aria-live="polite">
          {successMessage}
        </div>
      )}

      {isLoading && (
        <div className={styles.isLoadingMessage} aria-live="polite">
          Loading practice routine...
        </div>
      )}

      {errorMessage && <div aria-live="polite">{errorMessage}</div>}

      {!isLoading && activeSnippets.length === 0 && !errorMessage && (
        <div className={styles.emptyFormMessage}>
          Please use the form above to add a practice snippet!
        </div>
      )}

      <SnippetList
        snippets={activeSnippets}
        editId={editId}
        editFields={editFields}
        setEditId={setEditId}
        setEditFields={setEditFields}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={() => setEditId(null)}
        onComplete={completeSnippet}
        isSaving={isSaving}
      />
    </>
  );
}

export default PracticeForm;
