import React from 'react';

const Eye = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}
      strokeWidth={strokeWidth}
    >
      <path d="M21 8C20 5 15.5 1 11 1C6.5 1 2 5 1 8" stroke-linecap="round" />
      <path d="M1 8C2 11 6.5 15 11 15C15.5 15 20 11 21 8" stroke-linecap="round" />
      <path d="M13.7462 7.94721C13.7462 9.48123 12.5188 10.7499 11 10.7499C9.48124 10.7499 8.24512 9.48123 8.24512 7.94721C8.24512 6.41318 9.48124 5.24988 11 5.24988C12.5188 5.24988 13.7462 6.41318 13.7462 7.94721Z" />
    </svg>
  );
};

export default Eye;
