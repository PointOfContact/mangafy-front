import * as React from 'react';

function SvgEdit(props) {
  return (
    <svg viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#edit_svg__edit_svg__clip0)">
        <path
          d="M15.062 1.364A3.18 3.18 0 0012.8.426a3.18 3.18 0 00-2.264.938L1.588 10.31a.625.625 0 00-.16.274l-1.405 5.05a.625.625 0 00.773.768l5.048-1.434a.625.625 0 00.272-1.042l-3.183-3.193 7.417-7.416 2.758 2.758-5.678 5.662a.625.625 0 00.883.885l6.75-6.73A3.18 3.18 0 0016 3.627a3.18 3.18 0 00-.938-2.264zM4.482 14.056l-2.956.84.827-2.974 2.128 2.134zm9.697-9.05l-.186.187-2.76-2.76.186-.185a1.938 1.938 0 011.38-.572c.52 0 1.01.203 1.38.572.368.368.571.858.571 1.38 0 .52-.203 1.01-.57 1.379z"
          fill="#212121"
        />
      </g>
      <defs>
        <clipPath id="edit_svg__edit_svg__clip0">
          <path fill="#fff" transform="translate(0 .426)" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgEdit;
