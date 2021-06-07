import * as React from 'react';

function SvgGoogle(props) {
  return (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#google_svg__google_svg__google_svg__clip0)">
        <path
          d="M5.762 15.712l-.905 3.379-3.308.07A12.941 12.941 0 010 13c0-2.157.524-4.19 1.454-5.98l2.945.54 1.29 2.928A7.728 7.728 0 005.272 13c0 .954.173 1.869.49 2.712z"
          fill="#FBBB00"
        />
        <path
          d="M25.772 10.571a13.057 13.057 0 01-.057 5.143 12.997 12.997 0 01-4.577 7.424v-.001l-3.71-.19-.525-3.276a7.748 7.748 0 003.334-3.957h-6.952v-5.143h12.487z"
          fill="#518EF8"
        />
        <path
          d="M21.137 23.137h.001A12.945 12.945 0 0113 26c-4.95 0-9.254-2.767-11.45-6.84l4.213-3.448a7.73 7.73 0 0011.141 3.959l4.234 3.466z"
          fill="#28B446"
        />
        <path
          d="M21.297 2.993L17.086 6.44a7.732 7.732 0 00-11.397 4.048L1.454 7.02A12.997 12.997 0 0113 0c3.154 0 6.046 1.124 8.297 2.993z"
          fill="#F14336"
        />
      </g>
      <defs>
        <clipPath id="google_svg__google_svg__google_svg__clip0">
          <path fill="#fff" d="M0 0h26v26H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgGoogle;
