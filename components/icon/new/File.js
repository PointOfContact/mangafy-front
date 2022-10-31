import React from 'react';

const File = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}
    >
      <path
        d="M3 20V4C3 2.89543 3.89543 2 5 2H14.1716C14.702 2 15.2107 2.21071 15.5858 2.58579L20.4142 7.41421C20.7893 7.78929 21 8.29799 21 8.82843V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20Z"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default File;
