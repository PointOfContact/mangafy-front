import * as React from 'react';

function SvgFiltr(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16" fill="#000" {...props}>
      <rect y="1.45508" width="21.8182" height="1.45455" />
      <rect y="7.27295" width="21.8182" height="1.45455" />
      <rect y="13.0911" width="21.8182" height="1.45455" />
      <circle cx="15.2717" cy="2.18182" r="1.68182" fill="white" stroke="#000" />
      <circle cx="6.5451" cy="7.99993" r="1.68182" fill="white" stroke="#000" />
      <circle cx="12.3635" cy="13.8178" r="1.68182" fill="white" stroke="#000" />
    </svg>
  );
}

export default SvgFiltr;
