import * as React from 'react';

function SvgWhiteChecked(props) {
  return (
    <svg viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={15.5} cy={15.5} r={15.5} fill="#fff" />
      <path
        d="M24.003 9.03c-.318-.381-.834-.381-1.152 0l-9.76 11.712L9.34 16.24c-.318-.381-.834-.381-1.152 0a1.12 1.12 0 000 1.383l4.327 5.193c.318.381.834.381 1.152 0l10.336-12.403c.318-.382.318-1 0-1.383z"
        fill="#7B65F3"
      />
    </svg>
  );
}

export default SvgWhiteChecked;
