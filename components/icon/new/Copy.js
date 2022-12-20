import React from 'react';

const Copy = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M15.4167 21.7502L4.25 21.7502C3.14543 21.7502 2.25 20.8547 2.25 19.7502L2.25 8.58351C2.25 7.47894 3.14543 6.58351 4.25 6.58351L15.4167 6.5835C16.5212 6.5835 17.4167 7.47893 17.4167 8.5835L17.4167 19.7502C17.4167 20.8547 16.5212 21.7502 15.4167 21.7502Z"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
      <path
        d="M6.58398 6.58333V4.25C6.58398 3.14543 7.47941 2.25 8.58398 2.25H19.7506C20.8552 2.25 21.7506 3.14543 21.7506 4.25V15.4167C21.7506 16.5212 20.8552 17.4167 19.7507 17.4167H17.4173"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Copy;
