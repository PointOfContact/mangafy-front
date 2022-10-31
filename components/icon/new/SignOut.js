import React from 'react';

const SignOut = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}
      stroke-width={strokeWidth}
    >
      <path d="M4.08679 2.5L4.08679 21.5" stroke-linecap="round" />
      <path
        d="M9.36449 11.9999H19.92M19.92 11.9999L16.0106 6.72212M19.92 11.9999L16.0106 17.2777"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SignOut;
