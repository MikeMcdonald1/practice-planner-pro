import React from 'react';
import styles from './SnippetEditRow.module.css';
import NumberInput from '../shared/NumberInput';
import GeneralButton from '../shared/GeneralButton';

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

      <GeneralButton
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className={styles.saveEditButton}
      >
        Save
      </GeneralButton>
      <GeneralButton
        type="button"
        onClick={onCancel}
        disabled={isSaving}
        className={styles.cancelEditButton}
      >
        Cancel
      </GeneralButton>
    </>
  );
}

export default SnippetEditRow;
