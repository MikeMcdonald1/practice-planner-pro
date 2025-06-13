import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <h3>*Sad Trombone*</h3>
      <p>womp womp wommmp</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
