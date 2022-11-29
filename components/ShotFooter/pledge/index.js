import Imgix from 'components/imgix';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import client from 'api/client';
import PropTypes from 'prop-types';
import cn from 'classnames';
import PledgeModal from 'components/modals/PlegeModal';

const Pledge = ({ item, image, user, updatePage, ifPayed, setIfPayed }) => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  return (
    <>
      <div className={styles.chapterAvatar}>
        <Imgix
          width={60}
          height={60}
          objectFit="cover"
          src={client.UPLOAD_URL + image}
          alt="Mangafy image"
        />
        {!!item.planId && (
          <div
            onClick={() => setOpenPaymentModal(item)}
            className={cn(styles.pledge, (ifPayed || !user) && styles.disabled)}>
            Pledge
          </div>
        )}
      </div>
      <PledgeModal
        isOpen={!!openPaymentModal}
        setIsOpen={setOpenPaymentModal}
        item={openPaymentModal}
        updatePage={() => setIfPayed(true)}
        user={user}
      />
    </>
  );
};

Pledge.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  image: PropTypes.string,
  setShot: PropTypes.func,
  updatePage: PropTypes.func.isRequired,
};

Pledge.defaultProps = {
  image: '',
  setShot: () => {},
};

export default Pledge;
