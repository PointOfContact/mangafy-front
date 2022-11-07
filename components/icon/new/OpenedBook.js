import React from 'react';

const OpenedBook = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg className={props.className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 3H14C13.2596 3.00251 12.5466 3.28057 12 3.78C11.4534 3.28057 10.7404 3.00251 10 3H3C2.73478 3 2.48043 3.10536 2.29289 3.29289C2.10536 3.48043 2 3.73478 2 4V19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H8.758C9.284 20 9.8 20.214 10.172 20.586L11.293 21.707C11.302 21.716 11.314 21.719 11.323 21.728C11.409 21.807 11.505 21.877 11.617 21.924H11.619C11.863 22.025 12.137 22.025 12.381 21.924H12.383C12.495 21.877 12.591 21.807 12.677 21.728C12.686 21.719 12.698 21.716 12.707 21.707L13.828 20.586C14.2039 20.2123 14.7119 20.0017 15.242 20H21C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V4C22 3.73478 21.8946 3.48043 21.7071 3.29289C21.5196 3.10536 21.2652 3 21 3ZM8.758 18H4V5H10C10.552 5 11 5.449 11 6V18.689C10.3375 18.2422 9.5571 18.0024 8.758 18ZM20 18H15.242C14.443 18 13.658 18.246 13 18.689V6C13 5.449 13.448 5 14 5H20V18Z"
        fill={props.color || '#121219'}
      />
    </svg>
  );
};

export default OpenedBook;