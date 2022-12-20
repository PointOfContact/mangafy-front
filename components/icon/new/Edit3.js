import React from 'react';

const Edit3 = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M18.8115 21.1116L2.81152 21.1116"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.3343 9.556L8.94779 16.9425C8.69148 17.1988 8.37032 17.3806 8.01865 17.4685L3.14199 18.6877C2.7758 18.7792 2.44411 18.4476 2.53565 18.0814L3.75482 13.2047C3.84273 12.853 4.02457 12.5319 4.28089 12.2756L11.6673 4.8891M16.3343 9.556L18.8091 7.08113C19.5902 6.30008 19.5902 5.03375 18.8091 4.2527L16.9706 2.41422C16.1896 1.63318 14.9233 1.63318 14.1422 2.41423L11.6673 4.8891M16.3343 9.556L11.6673 4.8891"
        stroke-width={strokeWidth}
      />
    </svg>
  );
};

export default Edit3;
