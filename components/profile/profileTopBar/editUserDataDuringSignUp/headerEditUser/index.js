import React from 'react';

import PrimaryButton from 'components/ui-elements/button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const HeaderEditUser = ({
  setShowModalEdit,
  saveUserDataByKey,
  errorAboutMe,
  nameRequired,
  user,
  userData,
  setUserData,
}) => {
  const router = useRouter();

  return (
    <div className={styles.containerHeader}>
      <h2>Edit Page</h2>
      <div className={styles.containerButton}>
        <PrimaryButton
          text="Cancel"
          onClick={() => {
            setShowModalEdit(false);
            setUserData(user);
            router.push(`/profile/${router.query.pid}`, undefined, { shallow: true });
          }}
        />
        <PrimaryButton
          isActive={true}
          disabled={errorAboutMe || nameRequired}
          text="Save"
          onClick={() => {
            setShowModalEdit(false);
            if (errorAboutMe || !userData.content.lenngth) {
              setUserData({ ...userData, content: user.content });
              saveUserDataByKey('genresIds', 'name', 'types');
            } else {
              saveUserDataByKey('content', 'genresIds', 'name', 'types');
            }
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
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
};

export default HeaderEditUser;
