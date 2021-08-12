import React from 'react';

import PrimaryInput from 'components/ui-elements/input';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ContentEditUser = () => {
  console.log(1);
  return (
    <div className={styles.container}>
      <div className={styles.card_wrap}>
        <div className={styles.containerContent}>
          <div className={styles.fullNameContainer}>
            <h3>Full Name</h3>
            <PrimaryInput placeholder="Your name" className={styles.fullNameInput} />
          </div>
        </div>
      </div>
    </div>
  );
};

ContentEditUser.propTypes = {
  showModalEdit: PropTypes.bool.isRequired,
};

ContentEditUser.defaultProps = {};

export default ContentEditUser;
