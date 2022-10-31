import React from 'react';

const Comment = (props) => {
  const strokeWidth = props.bold ? 2 : 1.5;
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12V20.6909C2.5 21.0626 2.8912 21.3044 3.22365 21.1381L6.29907 19.6C7.88699 20.793 9.86093 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12Z"
        stroke={props.color || '#121219'}
        strokeWidth={strokeWidth}
      />
      <path
        d="M17.2802 13.0561C17.8631 13.0561 18.3357 12.5835 18.3357 12.0006C18.3357 11.4176 17.8631 10.945 17.2802 10.945C16.6972 10.945 16.2246 11.4176 16.2246 12.0006C16.2246 12.5835 16.6972 13.0561 17.2802 13.0561Z"
        fill={props.color || '#121219'}
      />
      <path
        d="M12.0028 13.0561C12.5858 13.0561 13.0584 12.5835 13.0584 12.0006C13.0584 11.4176 12.5858 10.945 12.0028 10.945C11.4199 10.945 10.9473 11.4176 10.9473 12.0006C10.9473 12.5835 11.4199 13.0561 12.0028 13.0561Z"
        fill={props.color || '#121219'}
      />
      <path
        d="M6.72548 13.0561C7.30844 13.0561 7.78103 12.5835 7.78103 12.0006C7.78103 11.4176 7.30844 10.945 6.72548 10.945C6.14251 10.945 5.66992 11.4176 5.66992 12.0006C5.66992 12.5835 6.14251 13.0561 6.72548 13.0561Z"
        fill={props.color || '#121219'}
      />
    </svg>
  );
};

export default Comment;
