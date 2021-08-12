import React from 'react';

import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const HeaderEditUser = ({ setShowModalEdit }) => (
  <div className={styles.containerHeader}>
    <h2>Edit Page</h2>
    <div className={styles.containerButton}>
      <PrimaryButton
        text="Cancel"
        onClick={() => {
          setShowModalEdit(false);
        }}
      />
      <PrimaryButton isActive={true} text="Save" />
    </div>
  </div>
);

HeaderEditUser.propTypes = {
  setShowModalEdit: PropTypes.func.isRequired,
};

export default HeaderEditUser;
