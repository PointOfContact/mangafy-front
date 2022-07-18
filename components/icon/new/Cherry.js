import React from 'react';

const Cherry = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M20.4807 6.70332L20.8596 8.02857C20.8778 8.0925 20.8704 8.15686 20.8434 8.211C20.8101 8.25768 20.7604 8.29315 20.6995 8.30838L19.3773 8.63896C16.6391 9.03948 13.9214 7.32436 13.1444 4.60668L12.8836 3.69471C12.8642 3.62663 12.9048 3.55603 12.9732 3.53891L13.8902 3.30965C16.6193 2.62735 19.4537 4.12818 20.4807 6.70332Z"
        strokeWidth={strokeWidth}
      />
      <path
        d="M11.0542 16.9589C11.0542 14.4485 9.02733 12.4135 6.52709 12.4135C4.02685 12.4135 2 14.4485 2 16.9589C2 19.4693 4.02685 21.5044 6.52709 21.5044C9.02733 21.5044 11.0542 19.4693 11.0542 16.9589Z"
        strokeWidth={strokeWidth}
      />
      <path
        d="M21.9192 16.9589C21.9192 14.4485 19.8923 12.4135 17.3921 12.4135C14.8918 12.4135 12.865 14.4485 12.865 16.9589C12.865 19.4693 14.8918 21.5044 17.3921 21.5044C19.8923 21.5044 21.9192 19.4693 21.9192 16.9589Z"
        strokeWidth={strokeWidth}
      />
      <path
        d="M6.52661 11.9589C6.52661 8.06512 9.37135 4.32678 13.0002 3.5"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M3L16.4868 12.4136"
        stroke="#121219"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Cherry;
