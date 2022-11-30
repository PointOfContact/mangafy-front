import React from 'react';

const Eye = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || '#121219'}
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12C21 9 16.5 5 12 5C7.5 5 3 9 2 12" stroke-linecap="round" />
      <path d="M2 12C3 15 7.5 19 12 19C16.5 19 21 15 22 12" stroke-linecap="round" />
      <path d="M14.7462 11.9472C14.7462 13.4812 13.5188 14.7499 12 14.7499C10.4812 14.7499 9.24512 13.4812 9.24512 11.9472C9.24512 10.4132 10.4812 9.24988 12 9.24988C13.5188 9.24988 14.7462 10.4132 14.7462 11.9472Z" />
      <path d="M21.5 19.5L4.5 2.5" stroke-linecap="round" />
      <path d="M20.5 20.5L3.5 3.5" stroke-linecap="round" />
    </svg>
  );
};

export default Eye;
