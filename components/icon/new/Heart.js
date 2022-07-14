import React from 'react';

const Heart = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M12.0001 6.36393L13.1881 5.17178C15.1636 3.18937 18.2266 3.12908 20.2693 5.03239V5.03239C22.5682 7.17436 22.6876 10.9449 20.5293 13.2474L18.12 15.8178L13.2676 20.315C12.5402 20.9892 11.4586 20.9893 10.731 20.3154L9.11099 18.8149"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M11.9995 6.36395L10.8119 5.1721C8.83639 3.18953 5.77338 3.12914 3.73058 5.03248V5.03248C1.43174 7.17439 1.31242 10.9448 3.47062 13.2472L5.88006 15.8177L10.7316 20.3149C11.4589 20.9891 12.5404 20.9895 13.2681 20.3157L14.8889 18.8148"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Heart;
