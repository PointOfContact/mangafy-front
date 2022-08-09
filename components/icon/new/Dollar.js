import React from 'react';

const Dollar = (props) => {
  return (
    <svg
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fill={props.color || '#121219'}
      className={props.className}>
      <path d="M6.875 8.25H4.125C3.76033 8.25 3.41059 8.10513 3.15273 7.84727C2.89487 7.58941 2.75 7.23967 2.75 6.875C2.75 6.51033 2.89487 6.16059 3.15273 5.90273C3.41059 5.64487 3.76033 5.5 4.125 5.5H9.625C9.98967 5.5 10.3394 5.35513 10.5973 5.09727C10.8551 4.83941 11 4.48967 11 4.125C11 3.76033 10.8551 3.41059 10.5973 3.15273C10.3394 2.89487 9.98967 2.75 9.625 2.75H6.875V1.375C6.875 1.01033 6.73013 0.660591 6.47227 0.402728C6.21441 0.144866 5.86467 0 5.5 0C5.13533 0 4.78559 0.144866 4.52773 0.402728C4.26987 0.660591 4.125 1.01033 4.125 1.375V2.75C3.03098 2.75 1.98177 3.1846 1.20818 3.95818C0.434597 4.73177 0 5.78098 0 6.875C0 7.96902 0.434597 9.01823 1.20818 9.79182C1.98177 10.5654 3.03098 11 4.125 11H6.875C7.23967 11 7.58941 11.1449 7.84727 11.4027C8.10513 11.6606 8.25 12.0103 8.25 12.375C8.25 12.7397 8.10513 13.0894 7.84727 13.3473C7.58941 13.6051 7.23967 13.75 6.875 13.75H1.375C1.01033 13.75 0.660591 13.8949 0.402728 14.1527C0.144865 14.4106 0 14.7603 0 15.125C0 15.4897 0.144865 15.8394 0.402728 16.0973C0.660591 16.3551 1.01033 16.5 1.375 16.5H4.125V17.875C4.125 18.2397 4.26987 18.5894 4.52773 18.8473C4.78559 19.1051 5.13533 19.25 5.5 19.25C5.86467 19.25 6.21441 19.1051 6.47227 18.8473C6.73013 18.5894 6.875 18.2397 6.875 17.875V16.5C7.96902 16.5 9.01823 16.0654 9.79182 15.2918C10.5654 14.5182 11 13.469 11 12.375C11 11.281 10.5654 10.2318 9.79182 9.45819C9.01823 8.6846 7.96902 8.25 6.875 8.25Z" />
    </svg>
  );
};

export default Dollar;
