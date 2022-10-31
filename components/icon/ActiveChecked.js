import * as React from 'react';

function SvgActiveChecked(props) {
  return (
    <svg viewBox="0 0 56 54" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#active-checked_svg__active-checked_svg__filter0_d)">
        <circle cx={28.273} cy={27} r={7} fill="#8672F4" />
      </g>
      <g filter="url(#active-checked_svg__active-checked_svg__filter1_d)">
        <circle cx={27} cy={27} r={7} fill="#FEC447" />
      </g>
      <path
        d="M30.84 24.078a.326.326 0 00-.52 0l-4.408 5.29-1.694-2.034a.326.326 0 00-.52 0 .506.506 0 000 .625l1.954 2.345a.326.326 0 00.52 0l4.668-5.601a.506.506 0 000-.625z"
        fill="#212121"
      />
      <defs>
        <filter
          id="active-checked_svg__active-checked_svg__filter0_d"
          x={1.272}
          y={0}
          width={54}
          height={54}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation={10} />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="active-checked_svg__active-checked_svg__filter1_d"
          x={0}
          y={0}
          width={54}
          height={54}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation={10} />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgActiveChecked;
