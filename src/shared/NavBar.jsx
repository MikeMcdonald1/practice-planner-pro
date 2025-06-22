import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <br />
      <NavLink to="/practice-form">Practice Form</NavLink>
    </nav>
  );
}

export default NavBar;
