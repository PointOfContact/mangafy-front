import React from 'react';

const Settings3 = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path d="M21 7H18M3 7H12" stroke-width={strokeWidth} stroke-linecap="round" />
      <path
        d="M15 10C16.6569 10 18 8.65685 18 7C18 5.34315 16.6569 4 15 4C13.3431 4 12 5.34315 12 7C12 8.65685 13.3431 10 15 10Z"
        stroke-width={strokeWidth}
      />
      <path d="M21 17H12M3 17H6" stroke-width={strokeWidth} stroke-linecap="round" />
      <path
        d="M9 20C10.6569 20 12 18.6569 12 17C12 15.3431 10.6569 14 9 14C7.34315 14 6 15.3431 6 17C6 18.6569 7.34315 20 9 20Z"
        stroke-width={strokeWidth}
      />
    </svg>
  );
};

export default Settings3;
