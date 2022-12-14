import React from 'react';

const User = (props) => {
  return (
    <svg
      className={props.className}
      style={props.style}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28.8236 12.1519C28.8236 17.047 24.8988 20.972 20.0003 20.972C15.1035 20.972 11.177 17.047 11.177 12.1519C11.177 7.25687 15.1035 3.3335 20.0003 3.3335C24.8988 3.3335 28.8236 7.25687 28.8236 12.1519ZM20.0003 36.6668C12.7709 36.6668 6.66699 35.4918 6.66699 30.9584C6.66699 26.4234 12.8093 25.29 20.0003 25.29C27.2314 25.29 33.3337 26.4651 33.3337 30.9984C33.3337 35.5335 27.1914 36.6668 20.0003 36.6668Z"
        fill={props.color || '#121219'}
      />
    </svg>
  );
};

export default User;
