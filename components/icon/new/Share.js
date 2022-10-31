import React from 'react';

const Share = (props) => {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      stroke={props.color || '#121219'}
      strokeWidth={props.bold ? 2 : 1.5}
      fill={props.color || '#121219'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8C20.6569 8 22 6.65685 22 5Z" />
      <path d="M8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15C6.65685 15 8 13.6569 8 12Z" />
      <path d="M22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22C20.6569 22 22 20.6569 22 19Z" />
      <path d="M16 5.5L7.5 10" stroke-linecap="round" />
      <path d="M16 18.5L7.5 14" stroke-linecap="round" />
    </svg>
  );
};

export default Share;
