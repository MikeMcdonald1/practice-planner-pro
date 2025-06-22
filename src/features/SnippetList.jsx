import React from 'react';
import styles from './SnippetList.module.css';
import SnippetEditRow from './SnippetEditRow';
import GeneralButton from '../shared/GeneralButton';

function SnippetList({
  snippets,
  editId,
  editFields,
  setEditId,
  setEditFields,
  onSaveEdit,
  onCancelEdit,
  onComplete,
  isSaving,
}) {
  return (
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      {snippets
        .filter((snippet) => !snippet.isCompleted)
        .map((snippet) => (
          <li key={snippet.id}>
            {editId === snippet.id ? (
              <SnippetEditRow
                editFields={editFields}
                setEditFields={setEditFields}
                onSave={() => onSaveEdit(snippet.id)}
                onCancel={() => onCancelEdit(null)}
                isSaving={isSaving}
              />
            ) : (
              <>
                <input
                  type="checkbox"
                  className="checkboxItem"
                  checked={false}
                  onChange={() => onComplete(snippet.id)}
                  disabled={isSaving}
                />
                {snippet.practiceType && (
                  <span> {snippet.practiceType} | </span>
                )}
                {snippet.goal}
                {snippet.metronome && <span> | {snippet.metronome} BPM</span>}
                {snippet.timeSpent && (
                  <span> | {snippet.timeSpent} Minutes</span>
                )}
                <GeneralButton
                  onClick={() => {
                    setEditId(snippet.id);
                    setEditFields({
                      practiceType: snippet.practiceType || '',
                      goal: snippet.goal || '',
                      metronome: snippet.metronome || '',
                      timeSpent: snippet.timeSpent || '',
                    });
                  }}
                  className="editButton"
                >
                  Edit
                </GeneralButton>
              </>
            )}
          </li>
        ))}
    </ul>
  );
}

export default SnippetList;
