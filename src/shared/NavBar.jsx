import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.links}>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/practice-form" className={styles.link}>
          Practice Form
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
