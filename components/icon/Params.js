import * as React from 'react';

function SvgParams(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.063 0H3.937A3.938 3.938 0 000 3.938v10.124A3.938 3.938 0 003.938 18h10.124A3.938 3.938 0 0018 14.062V3.938A3.938 3.938 0 0014.062 0zm2.812 14.063a2.813 2.813 0 01-2.813 2.812H3.938a2.812 2.812 0 01-2.813-2.813V3.938a2.812 2.812 0 012.813-2.813h10.124a2.812 2.812 0 012.813 2.813v10.124z"
        fill="#7B65F3"
      />
      <path
        d="M5.063 5.164V3.375H3.938v1.789a1.687 1.687 0 000 3.167v6.294h1.125V8.336a1.688 1.688 0 000-3.172zm4.5 4.506V3.374H8.438v6.289a1.687 1.687 0 000 3.167v1.794h1.125v-1.789a1.688 1.688 0 000-3.167zm4.5-3.376V3.375h-1.126v2.914a1.688 1.688 0 000 3.167v5.169h1.126V9.461a1.687 1.687 0 000-3.167z"
        fill="#7B65F3"
      />
    </svg>
  );
}

export default SvgParams;
