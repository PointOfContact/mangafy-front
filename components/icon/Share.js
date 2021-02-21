import * as React from 'react';

function SvgShare(props) {
  return (
    <svg viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0)" fill="#212121">
        <path d="M19.774 17.227c-1.305 0-2.47.614-3.221 1.568l-7.524-4.344a4.076 4.076 0 000-3.05l7.524-4.344a4.094 4.094 0 003.221 1.569c2.261 0 4.1-1.84 4.1-4.1s-1.839-4.1-4.1-4.1c-2.26 0-4.1 1.84-4.1 4.1 0 .539.106 1.053.296 1.525l-7.524 4.344a4.094 4.094 0 00-3.221-1.568c-2.26 0-4.1 1.839-4.1 4.1 0 2.26 1.84 4.099 4.1 4.099 1.306 0 2.47-.615 3.221-1.569l7.524 4.344a4.104 4.104 0 003.804 5.625c2.261 0 4.1-1.839 4.1-4.1 0-2.26-1.839-4.1-4.1-4.1zm0-15.638a2.94 2.94 0 012.938 2.937 2.94 2.94 0 01-2.938 2.937 2.94 2.94 0 01-2.937-2.937 2.94 2.94 0 012.937-2.937zM5.224 15.863a2.94 2.94 0 01-2.937-2.937A2.94 2.94 0 015.225 9.99a2.94 2.94 0 012.937 2.937 2.94 2.94 0 01-2.937 2.938zm14.55 8.4a2.94 2.94 0 01-2.937-2.936 2.94 2.94 0 012.937-2.938 2.94 2.94 0 012.938 2.938 2.94 2.94 0 01-2.938 2.937z" />
        <path d="M5.224 11.198a1.73 1.73 0 00-1.728 1.729.581.581 0 001.163 0c0-.313.253-.566.565-.566a.581.581 0 000-1.163z" />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" transform="translate(0 .426)" d="M0 0h25v25H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgShare;
