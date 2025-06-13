import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <br />
      <NavLink to="./pages/PracticeForm">Practice Form</NavLink>
    </nav>
  );
}

export default NavBar;
