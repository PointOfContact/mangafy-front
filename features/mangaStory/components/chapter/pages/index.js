import React from 'react';

import EditCard from 'components/projectScripts/editCard';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Pages = ({ pages }) => {
  const pagesArray = pages.map((value) => {
    console.log(value, 'pages');
    return (
      <div key={value._id} className={styles.itemPage}>
        <div className={styles.content}>
          <h2>{value.title}</h2>
          <p>{value.text}</p>
          <EditCard />
        </div>
        <div className={styles.pageImage}></div>
      </div>
    );
  });

  return <div className={styles.card_wrap}>{pagesArray}</div>;
};

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default Pages;
