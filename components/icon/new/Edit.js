import React from 'react';

const Edit = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 21L5.81092 17.9747C5.37149 10.9438 10.9554 5 18 5V5L16.7827 5.97387C14.3918 7.88656 13 10.7824 13 13.8442V13.8442C13 15.9831 11.0278 17.5774 8.93642 17.1292L6 16.5"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
      />
    </svg>
  );
};

export default Edit;