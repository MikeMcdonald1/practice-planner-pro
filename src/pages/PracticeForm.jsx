// The id for PracticePlan is tbl3FisNmoYOiIucq.

import React, { useState } from 'react';

function PracticeForm() {
  const [goal, setGoal] = useState('');

  function handleGoalChange(e) {
    setGoal(e.target.value);
    console.log(e.target.value); //for testing
  }

  function handleSubmit(e) {
    //user hits submit, run this function
    e.preventDefault(); //prevents page from reloading upon form submission
    console.log('Goal Submitted:', goal); //for testing
    setGoal(''); //clear input field after submission
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
