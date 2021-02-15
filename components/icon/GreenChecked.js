import * as React from 'react';

function SvgGreenChecked(props) {
  return (
    <svg viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={11.931} cy={11.69} r={11.31} fill="#6DCF56" />
      <path
        d="M18.274 6.274c-.266-.32-.697-.32-.963 0l-8.153 9.784-3.134-3.761c-.266-.319-.697-.319-.963 0a.936.936 0 000 1.155l3.616 4.338a.603.603 0 00.962 0l8.635-10.36a.936.936 0 000-1.155z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgGreenChecked;
