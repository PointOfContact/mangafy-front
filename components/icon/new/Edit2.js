import React from 'react';

const Edit2 = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || '#121219'}>
      <path
        d="M12.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V11.5"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M18.6888 8.85937L12.3566 15.146C12.1225 15.3784 11.8346 15.5493 11.5184 15.6434L7.76128 16.7625C7.57411 16.8182 7.39816 16.6474 7.4483 16.4587L8.36383 13.0126C8.45307 12.6767 8.6283 12.3698 8.87226 12.1223L15.3642 5.53472M18.6888 8.85937L20.5055 7.04267C21.2866 6.26162 21.2866 4.99529 20.5055 4.21424L20.0093 3.71802C19.2283 2.93697 17.9619 2.93697 17.1809 3.71802L15.3642 5.53472M18.6888 8.85937L15.3642 5.53472"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default Edit2;
