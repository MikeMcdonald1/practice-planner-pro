import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
    </nav>
  );
}

export default NavBar;
