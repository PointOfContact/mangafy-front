import * as React from 'react';

function SvgMone(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 20a9.935 9.935 0 01-7.071-2.929A9.935 9.935 0 010 10a9.935 9.935 0 012.929-7.071A9.934 9.934 0 0110 0a9.935 9.935 0 017.071 2.929A9.935 9.935 0 0120 10a9.935 9.935 0 01-2.929 7.071A9.934 9.934 0 0110 20zm0-18.75c-4.825 0-8.75 3.925-8.75 8.75s3.925 8.75 8.75 8.75 8.75-3.925 8.75-8.75S14.825 1.25 10 1.25z"
        fill="#212121"
      />
      <path
        d="M10 9.375c-.862 0-1.563-.7-1.563-1.563a1.564 1.564 0 013.126.001.625.625 0 101.25 0 2.817 2.817 0 00-2.188-2.742v-.696a.625.625 0 10-1.25 0v.696a2.817 2.817 0 00-2.188 2.742A2.816 2.816 0 0010 10.624c.862 0 1.563.7 1.563 1.563a1.564 1.564 0 01-3.126-.001.625.625 0 10-1.25 0c0 1.337.937 2.457 2.188 2.742v.696a.625.625 0 101.25 0v-.696a2.817 2.817 0 002.188-2.742A2.816 2.816 0 0010 9.376z"
        fill="#212121"
      />
    </svg>
  );
}

export default SvgMone;
