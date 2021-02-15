import * as React from 'react';

function SvgTime(props) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 0C2.691 0 0 2.691 0 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm2.854 9.103a.499.499 0 01-.707 0l-2.5-2.5A.498.498 0 015.5 6.25V3a.5.5 0 111 0v3.043l2.354 2.353a.5.5 0 010 .707z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgTime;
