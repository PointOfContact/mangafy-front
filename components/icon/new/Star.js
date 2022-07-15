import React from 'react';

const Star = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M11.1157 2.81994C11.4824 2.07605 12.5431 2.07605 12.9097 2.81994L15.1881 7.44276C15.3338 7.73833 15.6157 7.94316 15.9418 7.99037L21.0001 8.72264C21.8194 8.84125 22.1481 9.84709 21.5568 10.4265L17.8802 14.0297C17.646 14.2592 17.5392 14.5889 17.5944 14.9121L18.4618 19.9969C18.6013 20.8149 17.7412 21.4372 17.0078 21.0487L12.4809 18.6502C12.1881 18.4951 11.8374 18.4951 11.5446 18.6502L7.0176 21.0487C6.28427 21.4372 5.42412 20.8149 5.56367 19.9969L6.43081 14.9135C6.48608 14.5896 6.37861 14.2591 6.14334 14.0296L2.45153 10.4281C1.85803 9.84917 2.18639 8.84098 3.00701 8.72258L8.0833 7.99016C8.4096 7.94308 8.69173 7.7382 8.83748 7.44249L11.1157 2.81994Z"
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default Star;