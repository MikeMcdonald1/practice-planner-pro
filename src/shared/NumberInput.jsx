import React from 'react';

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
