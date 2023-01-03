import React from 'react';

const Lock = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke-width={strokeWidth}>
      <path
        d="M7.5 7L7.5 6.5C7.5 4.01472 9.51472 2 12 2V2C14.4853 2 16.5 4.01472 16.5 6.5L16.5 7"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
      <path
        d="M22 9V19H20V9H22ZM2 19V9H4V19H2ZM5 6H19V8H5V6ZM5 20H19V22H5V20ZM2 9C2 7.34315 3.34315 6 5 6V8C4.44772 8 4 8.44772 4 9H2ZM4 19C4 19.5523 4.44772 20 5 20V22C3.34315 22 2 20.6569 2 19H4ZM22 19C22 20.6569 20.6569 22 19 22V20C19.5523 20 20 19.5523 20 19H22ZM20 9C20 8.44772 19.5523 8 19 8V6C20.6569 6 22 7.34315 22 9H20Z"
        fill={props.color || '#121219'}
      />
      <path
        d="M13.5 13C13.5 12.1716 12.8284 11.5 12 11.5C11.1716 11.5 10.5 12.1716 10.5 13C10.5 13.8284 11.1716 14.5 12 14.5C12.8284 14.5 13.5 13.8284 13.5 13Z"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
      />
      <path
        d="M12 15L12 17"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Lock;
