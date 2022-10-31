import React from 'react';

const Diamond = (props) => {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={props.color || '#121219'}
    >
      <path d="M13.6275 20.7215L13.0172 20.2856L13.6275 20.7215ZM2.65186 7.88252L3.2997 8.26042L2.65186 7.88252ZM2.75195 10.0527L3.36225 9.61681L2.75195 10.0527ZM4.92118 3.99226L5.56902 4.37016L4.92118 3.99226ZM17.3513 3L17.3513 3.75L17.3513 3ZM21.3481 7.88252L21.996 7.50461L21.3481 7.88252ZM21.248 10.0527L21.8583 10.4887L21.248 10.0527ZM21.996 7.50461L19.7267 3.61435L18.431 4.37016L20.7003 8.26042L21.996 7.50461ZM17.3513 2.25L6.64874 2.25L6.64874 3.75L17.3513 3.75L17.3513 2.25ZM4.27335 3.61436L2.00403 7.50462L3.2997 8.26042L5.56902 4.37016L4.27335 3.61436ZM2.14165 10.4887L9.76223 21.1575L10.9828 20.2856L3.36225 9.61681L2.14165 10.4887ZM14.2378 21.1575L21.8583 10.4887L20.6377 9.61681L13.0172 20.2856L14.2378 21.1575ZM9.76223 21.1575C10.859 22.6929 13.141 22.6929 14.2378 21.1575L13.0172 20.2856C12.5186 20.9836 11.4814 20.9836 10.9828 20.2856L9.76223 21.1575ZM2.00403 7.50462C1.45857 8.43969 1.51244 9.60777 2.14165 10.4887L3.36225 9.61681C3.07625 9.2164 3.05176 8.68545 3.2997 8.26042L2.00403 7.50462ZM6.64874 2.25C5.67066 2.25 4.76618 2.76951 4.27335 3.61436L5.56902 4.37016C5.79303 3.98614 6.20416 3.75 6.64874 3.75L6.64874 2.25ZM19.7267 3.61435C19.2338 2.7695 18.3293 2.25 17.3513 2.25L17.3513 3.75C17.7958 3.75 18.207 3.98614 18.431 4.37016L19.7267 3.61435ZM20.7003 8.26042C20.9482 8.68545 20.9237 9.2164 20.6377 9.61681L21.8583 10.4887C22.4876 9.60777 22.5414 8.43969 21.996 7.50461L20.7003 8.26042Z" />
      <path d="M3 8.25C2.58579 8.25 2.25 8.58579 2.25 9C2.25 9.41421 2.58579 9.75 3 9.75V8.25ZM21 9.75C21.4142 9.75 21.75 9.41421 21.75 9C21.75 8.58579 21.4142 8.25 21 8.25V9.75ZM3 9.75H21V8.25H3V9.75Z" />
    </svg>
  );
};

export default Diamond;
