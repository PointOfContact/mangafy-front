import * as React from 'react';

function SvgSearch(props) {
  return (
    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#search_svg__search_svg__search_svg__clip0)">
        <path
          d="M29.039 24.4l-7.857-7.857A11.2 11.2 0 0022.5 11.25c0-2.96-1.14-5.755-3.211-7.87A11.185 11.185 0 0011.25.001C5.047.001 0 5.048 0 11.251S5.047 22.5 11.25 22.5a11.191 11.191 0 005.292-1.318l7.856 7.856a3.26 3.26 0 002.32.962c.878 0 1.702-.342 2.32-.961a3.26 3.26 0 00.962-2.32c0-.877-.341-1.7-.961-2.32zm-17.575-3.777c-.07.002-.143.003-.214.003-5.17 0-9.375-4.206-9.375-9.375 0-5.17 4.206-9.375 9.375-9.375.072 0 .143.001.215.003 5.05.113 9.16 4.317 9.16 9.372s-4.11 9.26-9.16 9.372z"
          fill="#212121"
        />
      </g>
      <defs>
        <clipPath id="search_svg__search_svg__search_svg__clip0">
          <path fill="#fff" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgSearch;
