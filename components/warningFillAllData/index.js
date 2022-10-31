import React from 'react';

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const WarningFillAllData = ({ user, setShowModalEdit }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Hey! We&apos;re glad you found us - but wait, what&apos;s your name? You can share anything
        you want
        <span
          onClick={() => {
            setShowModalEdit(true);
            router.push(`/profile/${user?._id}?editModal=true`, undefined, { shallow: true });
          }}
          className={styles.outLine}
        >
          here.
        </span>
      </p>
    </div>
  );
};

WarningFillAllData.propTypes = {
  user: PropTypes.object.isRequired,
  setShowModalEdit: PropTypes.func.isRequired,
};

export default WarningFillAllData;
