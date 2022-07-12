import React from 'react';

const Close = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path d="M19 19L5 5" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M19 5L5 19" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
};

export default Close;
