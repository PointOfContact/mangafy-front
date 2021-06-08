import * as React from 'react';

function SvgChat(props) {
  return (
    <svg viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#chat_svg__chat_svg__clip0)">
        <path
          d="M13.837.078H6.272A5.68 5.68 0 00.598 5.752v4.413a5.681 5.681 0 005.358 5.665v2.63a.537.537 0 00.914.379l.591-.592a8.168 8.168 0 015.814-2.408h.562a5.68 5.68 0 005.674-5.674V5.752A5.68 5.68 0 0013.837.078zM5.957 9.22a1.262 1.262 0 01-1.262-1.26 1.262 1.262 0 012.522 0c0 .695-.566 1.26-1.26 1.26zm4.097 0a1.261 1.261 0 010-2.521 1.262 1.262 0 010 2.521zm4.098 0a1.262 1.262 0 01-1.261-1.26 1.262 1.262 0 012.522-.001c0 .696-.566 1.261-1.261 1.261z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="chat_svg__chat_svg__clip0">
          <path fill="#fff" transform="translate(.594 .078)" d="M0 0h18.918v18.918H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgChat;
