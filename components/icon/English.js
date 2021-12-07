import * as React from 'react';

function SvgEnglish(props) {
  return (
    <svg viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#English_svg__English_svg__filter0_d_4653_28)">
        <path
          d="M19.95 10.333V5.226a1.188 1.188 0 00-.604-1.033l-.81-.462-.76-.433-.61-.348-3.247-1.853-.683-.39-.424-.241a1.218 1.218 0 00-1.206 0l-.42.24-.684.39L7.255 2.95l-1.023.584-.759.434-.4.228a1.188 1.188 0 00-.603 1.033v1.433l.001.918v3.67l.001 1.436a1.188 1.188 0 00.603 1.032l.8.456.758.433.622.355 3.247 1.852.684.39.423.242c.373.213.833.213 1.206 0l.42-.24.684-.39 3.247-1.854.934-.534.758-.433.49-.28c.029-.016.056-.034.083-.052.324-.222.52-.587.52-.98v-2.351z"
          fill="#F5F5F5"
        />
        <path
          d="M13.918 16.817l3.246-1.854-3.247-2.857v4.711zm3.247-13.868l-3.247-1.853v4.71l3.247-2.857zM7.26 14.963l3.247 1.853v-4.71L7.26 14.963zm12.175-1.298c.324-.221.52-.587.52-.98v-1.433h-3.262l2.742 2.413zM4.474 11.251v1.436c0 .392.196.756.518.978l2.743-2.414h-3.26zm.52-7.001c-.324.222-.52.587-.52.98v1.434h3.262L4.994 4.25zm14.96 2.414V5.228a1.19 1.19 0 00-.518-.978l-2.743 2.414h3.26zm-9.448-5.568L7.26 2.95l3.246 2.857v-4.71z"
          fill="#41479B"
        />
        <path
          d="M13.235.707l-.423-.241a1.218 1.218 0 00-1.206 0l-.42.24v6.873H4.47v2.754h6.714v6.872l.424.242c.373.213.832.213 1.206 0l.42-.24v-6.874h6.715V7.58h-6.715V.707z"
          fill="#FF4B55"
        />
        <path
          d="M9.225 11.252l-3.354 2.924.759.433 3.85-3.357H9.225zm5.23 0l3.646 3.178.758-.433-3.149-2.745h-1.255zM9.82 6.664L6.233 3.537l-.758.433 3.09 2.694H9.82zm4.095 0h1.255l3.361-2.93-.759-.434-3.857 3.364z"
          fill="#FF4B55"
        />
      </g>
      <defs>
        <filter
          id="English_svg__English_svg__filter0_d_4653_28"
          x={0.471}
          y={0.306}
          width={23.484}
          height={25.301}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_4653_28" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_4653_28" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgEnglish;
