import * as React from 'react';

function SvgClock(props) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 0C2.692 0 0 2.692 0 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6zm0 11.25A5.256 5.256 0 01.75 6 5.256 5.256 0 016 .75 5.256 5.256 0 0111.25 6 5.256 5.256 0 016 11.25z"
        fill="#212121"
      />
      <path d="M6.375 2.25h-.75v3.906l2.36 2.36.53-.53-2.14-2.141V2.25z" fill="#212121" />
    </svg>
  );
}

export default SvgClock;
