import React from 'react';
import SnippetList from './SnippetList';
import NumberInput from '../shared/NumberInput';

function SnippetEditRow({
  editFields,
  setEditFields,
  onSave,
  onCancel,
  isSaving,
}) {
  return (
    <>
      <select
        value={editFields.practiceType}
        onChange={(e) =>
          setEditFields({ ...editFields, practiceType: e.target.value })
        }
        className="practiceTypeEditSelect"
        required
      >
        <option value="">-</option>
        <option value="Warmups">Warmups</option>
        <option value="Scales">Scales</option>
        <option value="Etudes & Exercises">Etudes & Exercises</option>
        <option value="Repertoire & Songs">Repertoire & Songs</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="text"
        value={editFields.goal}
        onChange={(e) => setEditFields({ ...editFields, goal: e.target.value })}
        className="goalEditSelect"
        placeholder="e.g., G Major Pentatonic"
        required
      />

      <NumberInput
        id="edit-metronome"
        value={editFields.metronome}
        onChange={(e) =>
          setEditFields({ ...editFields, metronome: e.target.value })
        }
        min={1}
        max={500}
        placeholder="e.g., 100"
      />

      <NumberInput
        id="edit-time-spent"
        value={editFields.timeSpent}
        onChange={(e) =>
          setEditFields({ ...editFields, timeSpent: e.target.value })
        }
        min={1}
        max={500}
        placeholder="e.g., 30"
      />

      <button onClick={onSave} disabled={isSaving} className="saveEditButton">
        Save
      </button>
      <button
        onClick={onCancel}
        disabled={isSaving}
        className="cancelEditButton"
      >
        Cancel
      </button>
    </>
  );
}

export default SnippetEditRow;
