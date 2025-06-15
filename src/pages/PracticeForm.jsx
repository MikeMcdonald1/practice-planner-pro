// The id for PracticePlan is tbl3FisNmoYOiIucq.

import React, { useState, useEffect } from 'react';
import App from './App';

function PracticeForm() {
  //   async function handleSubmit(e) {
  //     e.preventDefault();
  //     const payload = {
  //       records: [
  //         {
  //         fields: {
  //         goal: goal,
  //         isCompleted: false,
  //         },
  //       },
  //       ],
  //     };

  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'Authorization: token',
  //       },
  //       body: JSON.stringify(payload),
  //     };

  //     try {
  //       })
  //     }
  //     // console.log('Goal Submitted:', goal);
  //     setGoal('');
  //   }

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
