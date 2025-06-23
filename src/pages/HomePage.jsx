import React from 'react';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div>
      <h1 className={styles.homePageHeading}>Practice Planner Pro</h1>
      <p className={styles.homePageParagraph}>
        Structured Practice. Pro Results.
      </p>
    </div>
  );
}

export default HomePage;
