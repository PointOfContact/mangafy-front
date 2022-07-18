import React from 'react';

const ArrowDown2 = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M20 8L12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L4 8"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowDown2;
