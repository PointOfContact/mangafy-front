import Imgix from 'components/imgix';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import client from 'api/client';
import PropTypes from 'prop-types';
import cn from 'classnames';
import PledgeModal from 'components/modals/PlegeModal';
import { SignInModal } from 'components/modals/SignInModal';

const Pledge = ({ item, image, user, updatePage, ifPayed, type }) => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isSignInModalOpened, setIsSignInModalOpened] = useState(false);

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
            onClick={() => {
              const jwt = client.getCookie('feathers-jwt');
              if (jwt) return setOpenPaymentModal({ item, type });
              setIsSignInModalOpened(true);
            }}
            className={cn(styles.pledge, ifPayed && styles.disabled)}>
            Pledge
          </div>
        )}
      </div>
      <PledgeModal
        isOpen={!!openPaymentModal}
        setIsOpen={setOpenPaymentModal}
        object={openPaymentModal}
        updatePage={updatePage}
        user={user}
      />
      <SignInModal
        title={'Sign in to pledge shot'}
        page={'/shot/' + item?._id}
        visible={isSignInModalOpened}
        setVisible={setIsSignInModalOpened}
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
