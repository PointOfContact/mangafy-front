import React from 'react';

const Flash = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M14 10.2093V2.30749C14 1.84868 13.4337 1.63212 13.1276 1.97386L3.74679 12.4454C3.45831 12.7675 3.68687 13.2791 4.11921 13.2791H10"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M14 10.2093H19.9105C20.3381 10.2093 20.5684 10.7111 20.2896 11.0353L10.8791 21.9778C10.5767 22.3294 10 22.1156 10 21.6518V13.2791"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Flash;
