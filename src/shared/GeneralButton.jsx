import React from 'react';
import styles from './GeneralButton.module.css';

function GeneralButton({ children, className = '', style = {}, ...props }) {
  return (
    <button className={className} style={style} {...props}>
      {children}
    </button>
  );
}

export default GeneralButton;
