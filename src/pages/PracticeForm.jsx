import React, { useState } from 'react';

function PracticeForm() {
  const [goal, setGoal] = useState('');

  function handleGoalChange(e) {
    setGoal(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); //prevents page from reloading upon form submission
    console.log('Goal Submitted:', goal);
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default PracticeForm;
