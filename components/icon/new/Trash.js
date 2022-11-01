import React from 'react';

const Trash = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.5 20L3.5 5H5.5L5.5 20H3.5ZM20.5 5L20.5 20H18.5V5L20.5 5ZM17.5 23H6.5V21H17.5V23ZM20.5 20C20.5 21.6569 19.1569 23 17.5 23V21C18.0523 21 18.5 20.5523 18.5 20H20.5ZM5.5 20C5.5 20.5523 5.94772 21 6.5 21V23C4.84315 23 3.5 21.6569 3.5 20H5.5Z"
        fill="#121219"
      />
      <path
        d="M14 11V16"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
      <path
        d="M10 11V16"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
      <path
        d="M2.5 5H21.5"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
      <path
        d="M7 5L7.22147 3.6712C7.3822 2.70683 8.21658 2 9.19425 2H12H14.8057C15.7834 2 16.6178 2.70683 16.7785 3.6712L17 5"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Trash;
