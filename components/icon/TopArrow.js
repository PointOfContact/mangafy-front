import * as React from 'react';

function SvgTopArrow(props) {
  return (
    <svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#filter0_d)">
        <circle cx={64.915} cy={64.915} r={34.915} fill="#fff" />
      </g>
      <path
        d="M50.376 65.947a4.699 4.699 0 003.299 1.336 4.693 4.693 0 003.32-1.359l2.763-2.726v16.13c0 2.576 2.122 4.672 4.73 4.672 2.61 0 4.732-2.096 4.732-4.671v-16.13l2.72 2.684a4.845 4.845 0 003.383 1.377h.016a4.66 4.66 0 003.308-1.358A4.58 4.58 0 0080 62.645a4.575 4.575 0 00-1.376-3.28L67.237 48.123A3.9 3.9 0 0064.489 47a3.9 3.9 0 00-2.749 1.122L50.395 59.324c-.89.88-1.4 2.103-1.395 3.357a4.542 4.542 0 001.376 3.266z"
        fill="#7B65F3"
      />
      <defs>
        <filter
          id="filter0_d"
          x={0}
          y={0}
          width={129.83}
          height={129.83}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation={15} />
          <feColorMatrix values="0 0 0 0 0.482353 0 0 0 0 0.396078 0 0 0 0 0.952941 0 0 0 0.7 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgTopArrow;
