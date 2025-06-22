import React from 'react';
import styles from './NumberInput.module.css';

function NumberInput({
  label,
  id,
  value,
  onChange,
  min,
  max,
  placeholder = '',
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        type="number"
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        required
      />
    </>
  );
}

export default NumberInput;
