import React from 'react';

function PracticeForm() {
  return (
    <form>
      <label htmlFor="goal">Enter your practice goal:</label>
      <br />
      <input type="text" placeholder="e.g., Practice scales for 20 minutes" />
    </form>
  );
}

export default PracticeForm;
