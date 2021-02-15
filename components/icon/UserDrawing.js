import * as React from 'react';

function SvgUserDrawing(props) {
  return (
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.64 10.686a5.957 5.957 0 002.324-4.722A5.97 5.97 0 0011 0a5.97 5.97 0 00-5.964 5.964c0 1.92.912 3.63 2.325 4.722C3.17 12.15 0 16.172 0 21.072c0 .512.416.928.928.928h20.144a.928.928 0 00.928-.928c0-4.901-3.172-8.922-7.36-10.386zM6.891 5.964A4.112 4.112 0 0111 1.857a4.112 4.112 0 014.108 4.107A4.112 4.112 0 0111 10.072a4.112 4.112 0 01-4.108-4.108zm-4.989 14.18c.467-4.608 4.369-8.216 9.097-8.216 4.729 0 8.63 3.608 9.097 8.215H1.903z"
        fill="#212121"
      />
    </svg>
  );
}

export default SvgUserDrawing;
