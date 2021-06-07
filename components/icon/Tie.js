import * as React from 'react';

function SvgTie(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#tie_svg__tie_svg__tie_svg__clip0)" fill="#212121">
        <path d="M12.457 5.063l1.397-3.495a1.17 1.17 0 00-1.088-1.607H7.262a1.17 1.17 0 00-1.088 1.607l1.332 3.331.002.004.064.16-2.65 9.862c-.117.436.03.905.374 1.197l3.955 3.556.01.008a1.17 1.17 0 001.516-.008l3.956-3.556c.344-.292.49-.761.373-1.197l-2.65-9.862zm-4.174.367h2.778l-3.8 3.799 1.022-3.8zM13.09.914a.385.385 0 01.04.364l-1.349 3.37H8.528L12.434.742h.332c.132 0 .25.063.324.172zm-6.151 0a.385.385 0 01.323-.172h4.067L8.012 4.06 6.9 1.278a.384.384 0 01.04-.364zM5.677 15.128l1.179-4.388 4.979-4.98.702 2.613-2.424 2.424a.391.391 0 00.553.552l2.105-2.105.702 2.613-5.564 5.564-1.746-1.57 2.293-2.292a.39.39 0 00-.552-.553l-2.24 2.24a.388.388 0 01.013-.118zm8.548.4a.167.167 0 00-.01.01l-3.954 3.553a.39.39 0 01-.494 0l-1.276-1.147 5.216-5.216.644 2.4a.392.392 0 01-.126.4z" />
        <path d="M9.285 12.568a.393.393 0 00.39-.39.393.393 0 00-.39-.39.392.392 0 00-.276.666.393.393 0 00.276.114z" />
      </g>
      <defs>
        <clipPath id="tie_svg__tie_svg__tie_svg__clip0">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgTie;
