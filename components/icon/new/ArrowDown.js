import React from 'react';

const ArrowDown = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}
      strokeWidth={strokeWidth}
    >
      <path
        d="M12 3V21M12 21L19.5 14M12 21L4.5 14"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowDown;
