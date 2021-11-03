import React from 'react';

import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

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
            const data = [
              {
                event_type: EVENTS.CLOSE_UPDATE_USER_MODAL,
                event_properties: { userData },
                user_id: user._id,
                user_properties: {
                  ...user,
                },
              },
            ];
            myAmplitude(data);
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
            if (errorAboutMe || !userData?.content?.length) {
              setUserData({ ...userData, content: user.content });
              saveUserDataByKey('genresIds', 'name', 'types');
            } else {
              saveUserDataByKey('content', 'genresIds', 'name', 'types');
            }
            const data = [
              {
                event_type: EVENTS.UPDATE_USER_IN_MODAL,
                user_id: user._id,
                user_properties: {
                  ...user,
                },
              },
            ];
            myAmplitude(data);
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
