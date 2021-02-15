import * as React from 'react';

function SvgFiltr(props) {
  return (
    <svg viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#212121" d="M0 1h15v1H0zm0 4h15v1H0zm0 4h15v1H0z" />
      <circle cx={10.5} cy={1.5} r={1} fill="#fff" stroke="#212121" />
      <circle cx={4.5} cy={5.5} r={1} fill="#fff" stroke="#212121" />
      <circle cx={8.5} cy={9.5} r={1} fill="#fff" stroke="#212121" />
    </svg>
  );
}

export default SvgFiltr;
