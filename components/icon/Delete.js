import * as React from 'react';

function SvgDelete(props) {
  return (
    <svg viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#delete_svg__delete_svg__clip0)" fill="#858585">
        <path d="M7.92 2.538H2.08a.23.23 0 00-.173.058.196.196 0 00-.058.173l.6 5.227c.07.576.562 1.008 1.142 1.004H6.5c.597.008 1.1-.444 1.154-1.039l.496-5.215a.196.196 0 00-.058-.15.23.23 0 00-.173-.058zm-.728 5.4a.67.67 0 01-.692.6H3.592a.658.658 0 01-.68-.588L2.335 3h5.33l-.473 4.938zm1.569-6.9H6.385V.67A.646.646 0 005.727 0H4.273a.646.646 0 00-.658.67v.368H1.24a.23.23 0 100 .462h7.52a.23.23 0 100-.462zM5.923.67v.37H4.077V.67a.185.185 0 01.196-.207h1.454a.185.185 0 01.196.207z" />
      </g>
      <defs>
        <clipPath id="delete_svg__delete_svg__clip0">
          <path fill="#fff" transform="translate(.5)" d="M0 0h9v9H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgDelete;
