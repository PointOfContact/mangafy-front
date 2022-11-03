import React from 'react';

const Settings2 = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path d="M12 7L20 7" strokeWidth={strokeWidth} stroke-linecap="round" />
      <path d="M4 7L8 7" strokeWidth={strokeWidth} stroke-linecap="round" />
      <path d="M17 17L20 17" strokeWidth={strokeWidth} stroke-linecap="round" />
      <path d="M4 17L12 17" strokeWidth={strokeWidth} stroke-linecap="round" />
      <circle
        cx="10"
        cy="7"
        r="2"
        transform="rotate(90 10 7)"
        strokeWidth={strokeWidth}
        stroke-linecap="round"
      />
      <circle
        cx="15"
        cy="17"
        r="2"
        transform="rotate(90 15 17)"
        strokeWidth={strokeWidth}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Settings2;
