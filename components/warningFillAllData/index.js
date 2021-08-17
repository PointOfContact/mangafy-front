import React from 'react';

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const WarningFillAllData = ({ user, setShowModalEdit }) => {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      onClick={() => {
        setShowModalEdit(true);
        router.push(`/profile/${user?._id}?editModal=true`, undefined, { shallow: true });
      }}>
      <span>Warning</span>: Please complete your account setup to participate in the community here
    </div>
  );
};

WarningFillAllData.propTypes = {
  user: PropTypes.object.isRequired,
  setShowModalEdit: PropTypes.object.isRequired,
};

export default WarningFillAllData;
