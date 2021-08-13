import React from 'react';

import PrimaryButton from 'components/ui-elements/button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const HeaderEditUser = ({ userData, setShowModalEdit, saveUserDataByKey }) => {
  const history = useRouter();
  const errorAboutMe = userData?.content?.length < 3 || userData?.content === undefined;
  const nameRequired = userData?.name?.length < 3 || userData?.name === undefined;
  return (
    <div className={styles.containerHeader}>
      <h2>Edit Page</h2>
      <div className={styles.containerButton}>
        <PrimaryButton
          text="Cancel"
          onClick={() => {
            setShowModalEdit(false);
          }}
        />
        <PrimaryButton
          isActive={true}
          disabled={errorAboutMe || nameRequired}
          text="Save"
          onClick={() => {
            setShowModalEdit(false);
            saveUserDataByKey('content', 'genresIds');
            saveUserDataByKey('name', 'types');
            history.push(`/profile/${history.query.pid}`);
          }}
        />
      </div>
    </div>
  );
};

HeaderEditUser.propTypes = {
  userData: PropTypes.object.isRequired,
  setShowModalEdit: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
};

export default HeaderEditUser;
