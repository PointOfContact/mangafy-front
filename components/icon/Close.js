import * as React from 'react';

function SvgClose(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.65 9l7.008-7.01A1.165 1.165 0 1016.009.342l-7.01 7.01L1.992.341a1.165 1.165 0 10-1.649 1.65L7.351 9 .342 16.008A1.165 1.165 0 001.167 18c.298 0 .597-.114.824-.342L9 10.65l7.009 7.01a1.163 1.163 0 001.649 0 1.165 1.165 0 000-1.65L10.649 9z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgClose;
