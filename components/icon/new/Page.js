import React from 'react';

const Page = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.5 4H6C5.44772 4 5 4.44772 5 5V19.5C5 20.0523 5.44772 20.5 6 20.5H17.5C18.0523 20.5 18.5 20.0523 18.5 19.5V5C18.5 4.44772 18.0523 4 17.5 4Z"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
      />
    </svg>
  );
};

export default Page;
