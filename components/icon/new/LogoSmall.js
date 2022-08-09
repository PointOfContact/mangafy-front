import React from 'react';

const LogoSmall = (props) => {
  return (
    <svg
      className={props.className}
      viewBox="0 0 36 24"
      fill={props.color || '#121219'}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M35.4614 22.9658H29.9243C29.4914 21.7581 28.9616 20.3568 28.335 18.7617C27.7197 17.1553 26.9792 15.2811 26.1133 13.1392C25.8854 12.5581 25.2645 10.8833 24.2505 8.11475C23.7606 6.79313 23.3561 5.92725 23.0371 5.51709C22.6383 5.01579 22.0801 4.76514 21.3623 4.76514C21.18 4.76514 20.9521 4.74805 20.6787 4.71387C20.4053 4.67969 20.166 4.6626 19.9609 4.6626L26.4551 23.0684C26.2956 23.0684 25.6462 23.057 24.5068 23.0342C23.3675 23.0114 22.2111 23 21.0376 23C20.6958 22.248 20.3825 21.4106 20.0977 20.4878C19.8584 19.7358 19.6419 19.0921 19.4482 18.5566C18.776 16.8135 17.9102 14.3924 16.8506 11.2935C15.9733 8.74137 15.3638 7.08366 15.022 6.32031C14.4637 5.08984 13.951 4.47461 13.4839 4.47461H8.32275C8.32275 6.76465 8.32845 8.88379 8.33984 10.832C8.35124 12.7689 8.36263 14.7114 8.37402 16.6597C8.39681 18.5965 8.4082 20.71 8.4082 23H0.273438L0.239258 19.189C0.672201 19.189 1.05387 19.1947 1.38428 19.2061C1.71468 19.2174 2.00521 19.2231 2.25586 19.2231C2.7002 19.1206 2.99642 18.9098 3.14453 18.5908C3.29264 18.2604 3.3667 17.8104 3.3667 17.2407C3.3667 15.3494 3.35531 13.8911 3.33252 12.8657C3.32113 11.8289 3.30404 10.5472 3.28125 9.02051C3.25846 7.48242 3.24707 5.98991 3.24707 4.54297C2.59766 4.54297 2.00521 4.54297 1.46973 4.54297C0.945638 4.53158 0.478516 4.52018 0.0683594 4.50879L0.0341797 0.133789L15.1416 0.0996094C15.6315 0.0996094 16.0588 0.202148 16.4233 0.407227C17.1639 0.828776 18.2007 1.76872 19.5337 3.22705V0.0996094C20.2173 0.0996094 20.9066 0.111003 21.6016 0.133789C22.3079 0.145182 23.0029 0.156576 23.6865 0.167969C25.2132 0.167969 26.3127 0.583822 26.9849 1.41553C27.4292 2.06494 27.8735 2.70866 28.3179 3.34668V0.167969H33.4277V4.47461C33.1771 4.47461 32.6473 4.47461 31.8384 4.47461C31.0295 4.47461 29.9813 4.47461 28.6938 4.47461C29.0356 5.54557 29.6167 7.19189 30.437 9.41357C30.6421 9.96045 31.451 12.1195 32.8638 15.8906C33.8892 18.625 34.755 20.9834 35.4614 22.9658Z" />
    </svg>
  );
};

export default LogoSmall;
