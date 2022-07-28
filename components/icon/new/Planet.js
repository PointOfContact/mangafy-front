import React from 'react';

const Planet = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.5 6L18.0333 7.1C17.6871 7.35964 17.2661 7.5 16.8333 7.5H13.475C12.8775 7.5 12.3312 7.83761 12.064 8.37206V8.37206C11.7342 9.03161 11.9053 9.83161 12.476 10.2986L14.476 11.9349C16.0499 13.2227 16.8644 15.22 16.6399 17.2412L16.5936 17.6577C16.5314 18.2177 16.4102 18.7695 16.232 19.304L16 20"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
      />
      <path
        d="M2.5 10.5L5.7381 9.96032C7.09174 9.73471 8.26529 10.9083 8.03968 12.2619L7.90517 13.069C7.66434 14.514 8.3941 15.9471 9.70437 16.6022V16.6022C10.7535 17.1268 11.2976 18.3097 11.0131 19.4476L10.5 21.5"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
      />
      <circle cx="12" cy="12" r="9" stroke={props.color || '#121219'} stroke-width={strokeWidth} />
    </svg>
  );
};

export default Planet;
