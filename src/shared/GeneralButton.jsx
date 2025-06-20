import React from 'react';

function GeneralButton({ children, className = '', style = {}, ...props }) {
  return (
    <button className={className} style={style} {...props}>
      {children}
    </button>
  );
}

export default GeneralButton;
