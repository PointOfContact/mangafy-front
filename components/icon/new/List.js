import React from 'react';

const List = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg className={props.className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 6L21 6"
        stroke={props.color || '#121219'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M8 12L21 12"
        stroke={props.color || '#121219'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M8 18L21 18"
        stroke={props.color || '#121219'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M3.25 13.25C3.94036 13.25 4.5 12.6904 4.5 12C4.5 11.3096 3.94036 10.75 3.25 10.75C2.55964 10.75 2 11.3096 2 12C2 12.6904 2.55964 13.25 3.25 13.25Z"
        fill={props.color || '#121219'}
      />
      <path
        d="M3.25 7.25C3.94036 7.25 4.5 6.69036 4.5 6C4.5 5.30964 3.94036 4.75 3.25 4.75C2.55964 4.75 2 5.30964 2 6C2 6.69036 2.55964 7.25 3.25 7.25Z"
        fill={props.color || '#121219'}
      />
      <path
        d="M3.25 19.25C3.94036 19.25 4.5 18.6904 4.5 18C4.5 17.3096 3.94036 16.75 3.25 16.75C2.55964 16.75 2 17.3096 2 18C2 18.6904 2.55964 19.25 3.25 19.25Z"
        fill={props.color || '#121219'}
      />
    </svg>
  );
};

export default List;
