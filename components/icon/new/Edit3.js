import React from 'react';

const Edit3 = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M20 22L4 22"
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.5227 10.4441L10.1363 17.8305C9.87995 18.0868 9.55879 18.2687 9.20713 18.3566L4.33047 19.5758C3.96428 19.6673 3.63258 19.3356 3.72413 18.9694L4.94329 14.0928C5.03121 13.7411 5.21305 13.4199 5.46937 13.1636L12.8558 5.77716M17.5227 10.4441L19.9976 7.96919C20.7787 7.18814 20.7787 5.92181 19.9976 5.14077L18.1591 3.30229C17.3781 2.52124 16.1117 2.52124 15.3307 3.30229L12.8558 5.77716M17.5227 10.4441L12.8558 5.77716"
        stroke-width="2"
      />
    </svg>
  );
};

export default Edit3;
