import * as React from 'react';

function SvgHand(props) {
  return (
    <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#hand_svg__hand_svg__clip0)">
        <path
          d="M17.238 10.703a.492.492 0 00-.196-.358c-.68-.51-1.078-.697-1.99-.697-.974 0-2.583 1.084-2.583 1.084h-1.788a2.427 2.427 0 00-2.425 2.425.557.557 0 01-1.113 0 3.542 3.542 0 013.538-3.538h1.788V2.703a.914.914 0 00-1.828 0v5.605a.557.557 0 01-1.113 0V.914a.914.914 0 00-1.829 0v7.394a.557.557 0 01-1.113 0V2.106a.914.914 0 10-1.828 0v6.798a.557.557 0 11-1.113 0V4.49a.914.914 0 00-1.828 0v8.653c0 .822.194 1.646.562 2.382l.63 1.26v1.657c0 .308.25.557.556.557h7.155c.308 0 .557-.25.557-.557v-1.558l5.818-5.799c.1-.1.153-.24.143-.383z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="hand_svg__hand_svg__clip0">
          <path fill="#fff" d="M0 0h19v19H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgHand;
