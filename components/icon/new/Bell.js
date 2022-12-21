import React from 'react';

const Bell = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.62562 10.3403V10.1761C1.64971 9.69018 1.80545 9.21937 2.07677 8.8122C2.52838 8.3231 2.83753 7.72373 2.97179 7.07698C2.97179 6.57713 2.97179 6.07013 3.01544 5.57027C3.24102 3.16381 5.62046 1.5 7.97079 1.5H8.02901C10.3793 1.5 12.7588 3.16381 12.9916 5.57027C13.0353 6.07013 12.9916 6.57713 13.028 7.07698C13.1641 7.72523 13.4729 8.32646 13.923 8.81934C14.1964 9.2229 14.3524 9.692 14.3742 10.1761V10.3332C14.3904 10.986 14.1656 11.6226 13.7411 12.1255C13.1802 12.7136 12.4191 13.0795 11.6018 13.1538C9.20525 13.4109 6.78727 13.4109 4.39072 13.1538C3.57436 13.0762 2.81432 12.7109 2.2514 12.1255C1.8335 11.6222 1.61168 10.9894 1.62562 10.3403Z"
        stroke="#131313"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.16602 15.6387C6.54047 16.1087 7.09036 16.4129 7.69399 16.4839C8.29761 16.5549 8.90519 16.3869 9.38226 16.0171C9.52899 15.9078 9.66102 15.7806 9.7752 15.6387"
        stroke={props.color || '#121219'}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Bell;
