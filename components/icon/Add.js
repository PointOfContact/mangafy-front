import * as React from 'react';

function SvgAdd(props) {
  return (
    <svg viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#add_svg__add_svg__filter0_d)">
        <circle cx={50.5} cy={50.5} r={30.5} fill="#fff" />
      </g>
      <path
        d="M50.5 20C33.682 20 20 33.682 20 50.5 20 67.318 33.682 81 50.5 81 67.318 81 81 67.318 81 50.5 81 33.682 67.318 20 50.5 20zm13.344 33.041H53.04v10.803a2.542 2.542 0 01-5.082 0V53.04H37.156a2.542 2.542 0 010-5.082H47.96V37.156a2.542 2.542 0 015.082 0V47.96h10.803a2.542 2.542 0 010 5.082z"
        fill="#7B65F3"
      />
      <defs>
        <filter
          id="add_svg__add_svg__filter0_d"
          x={0}
          y={0}
          width={101}
          height={101}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation={10} />
          <feColorMatrix values="0 0 0 0 0.482353 0 0 0 0 0.396078 0 0 0 0 0.952941 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgAdd;
