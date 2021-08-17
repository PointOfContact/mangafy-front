import React from 'react';

import PrimaryButton from 'components/ui-elements/button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const HeaderEditUser = ({ setShowModalEdit, saveUserDataByKey, errorAboutMe, nameRequired }) => {
  const router = useRouter();

  return (
    <div className={styles.containerHeader}>
      <h2>Edit Page</h2>
      <div className={styles.containerButton}>
        <PrimaryButton
          text="Cancel"
          onClick={() => {
            setShowModalEdit(false);
            router.push(`/profile/${router.query.pid}`, undefined, { shallow: true });
          }}
        />
        <PrimaryButton
          isActive={true}
          disabled={errorAboutMe || nameRequired}
          text="Save"
          onClick={() => {
            setShowModalEdit(false);
            saveUserDataByKey('content', 'genresIds', 'name', 'types');
            router.push(`/profile/${router.query.pid}`, undefined, { shallow: true });
          }}
        />
      </div>
    </div>
  );
};

HeaderEditUser.propTypes = {
  setShowModalEdit: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
  errorAboutMe: PropTypes.bool.isRequired,
  nameRequired: PropTypes.bool.isRequired,
};

export default HeaderEditUser;
