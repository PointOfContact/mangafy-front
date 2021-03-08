import * as React from 'react';

function SvgLink(props) {
  return (
    <svg viewBox="0 0 8 8" {...props}>
      <g clipPath="url(#link_svg__link_svg__clip0)">
        <path d="M4.881 3.118a1.866 1.866 0 00-2.64 0L.547 4.815a1.866 1.866 0 002.638 2.641l1.4-1.4a.133.133 0 00-.095-.228h-.053a2.244 2.244 0 01-.853-.165.133.133 0 00-.146.03L2.431 6.7a.8.8 0 01-1.132-1.132l1.702-1.7a.8.8 0 011.13 0c.211.198.54.198.75 0a.533.533 0 000-.75z" />
        <path d="M7.453.547a1.866 1.866 0 00-2.64 0L3.415 1.944a.133.133 0 00.097.228h.05c.292 0 .58.056.851.166.05.02.108.01.146-.029l1.003-1.002a.8.8 0 111.132 1.131l-1.25 1.25-.01.011-.438.435a.8.8 0 01-1.13 0 .547.547 0 00-.75 0 .533.533 0 000 .752c.154.155.335.281.533.373l.084.036c.028.012.058.021.086.032.028.01.057.02.085.028l.079.021a1.653 1.653 0 00.36.052h.101l.08-.009c.03-.001.06-.008.095-.008h.045l.092-.013.043-.008.077-.016h.015c.327-.082.626-.252.865-.49l1.697-1.698a1.866 1.866 0 000-2.64z" />
      </g>
      <defs>
        <clipPath id="link_svg__link_svg__clip0">
          <path fill="#fff" d="M0 0h8v8H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgLink;
