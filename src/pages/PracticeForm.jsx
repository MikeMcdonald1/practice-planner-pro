import React, { useState } from 'react';

function PracticeForm() {
  const [goal, setGoal] = useState('');

  function handleGoalChange(e) {
    setGoal(e.target.value);
  }

  return (
    <form>
      <label htmlFor="goal">Enter your practice goal:</label>
      <br />
      <input
        type="text"
        id="goal"
        value={goal}
        onChange={handleGoalChange}
        placeholder="e.g., Practice scales for 20 minutes"
      />
    </form>
  );
}

export default PracticeForm;
