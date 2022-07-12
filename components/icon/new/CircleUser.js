import React from 'react';

const CircleUser = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
        strokeWidth={strokeWidth}
      />
      <path
        d="M15 10C15 11.6569 13.6568 13 12 13C10.3432 13 9 11.6569 9 10C9 8.34314 10.3432 7 12 7C13.6568 7 15 8.34314 15 10Z"
        strokeWidth={strokeWidth}
      />
      <path
        d="M18 20C18 17.7909 15.3137 16 12 16C8.68629 16 6 17.7909 6 20"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CircleUser;
