import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <h3>*Sad Trombone*</h3>
      <p className={styles.womp}>womp womp wommmp</p>
      <Link to="/" className={styles.backHome}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
