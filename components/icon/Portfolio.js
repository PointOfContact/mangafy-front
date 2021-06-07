import * as React from 'react';

function SvgPortfolio(props) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#portfolio_svg__portfolio_svg__portfolio_svg__clip0)" fill="#212121">
        <path d="M12.542 12.833H1.458A1.444 1.444 0 010 11.375v-7c0-.817.642-1.458 1.458-1.458h11.084c.816 0 1.458.641 1.458 1.458v7c0 .816-.642 1.458-1.458 1.458zM1.458 3.5a.897.897 0 00-.875.875v7c0 .466.409.875.875.875h11.084a.897.897 0 00.875-.875v-7a.897.897 0 00-.875-.875H1.458z" />
        <path d="M9.043 3.5c-.175 0-.292-.117-.292-.292V2.041c0-.174-.116-.291-.291-.291H5.543c-.175 0-.292.117-.292.292v1.166c0 .175-.116.292-.291.292s-.292-.117-.292-.292V2.041c0-.466.408-.874.875-.874H8.46c.466 0 .875.408.875.875v1.166c0 .175-.117.292-.292.292zM7 8.167h-.117L.175 5.833C.058 5.775-.058 5.6 0 5.425c.058-.117.233-.233.408-.175L7 7.583l6.592-2.333c.175-.058.291 0 .35.175.058.175 0 .292-.175.35L7.058 8.108c0 .059 0 .059-.058.059z" />
      </g>
      <defs>
        <clipPath id="portfolio_svg__portfolio_svg__portfolio_svg__clip0">
          <path fill="#fff" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgPortfolio;
