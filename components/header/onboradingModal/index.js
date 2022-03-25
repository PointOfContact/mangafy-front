import React from 'react';

import Modal from 'antd/lib/modal/Modal';
import Imgix from 'components/imgix';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const OnBoardingModal = ({ showModal, setShowModal, user }) => {
  const router = useRouter();

  const onPost = () => {
    const data = [
      {
        event_type: EVENTS.ON_BOARDING,
        event_properties: { userData: user, type: 'onPost' },
      },
    ];
    myAmplitude(data);
    setShowModal(false);
    router.push(`/feed`, undefined, { shallow: true });
  };

  const onStart = () => {
    const data = [
      {
        event_type: EVENTS.ON_BOARDING,
        event_properties: { userData: user, type: 'onStart' },
      },
    ];
    myAmplitude(data);
    setShowModal(false);
    router.push(`/profile/${router.query.pid}?start=true`, undefined, { shallow: true });
  };

  const onPortfolio = () => {
    const data = [
      {
        event_type: EVENTS.ON_BOARDING,
        event_properties: { userData: user, type: 'onPortfolio' },
      },
    ];
    myAmplitude(data);
    setShowModal(false);
    router.push(`/profile/${router.query.pid}`, undefined, { shallow: true });
  };

  return (
    <Modal
      onCancel={() => {
        setShowModal(false);
      }}
      className={styles.modal}
      footer={null}
      visible={showModal}>
      <div className={styles.content}>
        <div className={styles.title}>Bring your ideas to life at MangaFY</div>
        <div className={styles.subtitle}>
          My fellow creators, welcome! As a MangaFY family member, you get access to simple tools
          and resources
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.circle}>
              <Imgix
                width={66}
                height={66}
                layout="fixed"
                src="/img/pencil.png"
                alt="MangaFy share"
              />
            </div>
            <div className={styles.cardTitle}>To share your art</div>
            <div className={styles.cardDescription}>
              Only 4% Of people see art on their social media feeds. That's why we created a manga
              and anime feed!
            </div>
            <PrimaryButton
              onClick={onPost}
              className={styles.button}
              text="Post your art"></PrimaryButton>
          </div>

          <div className={styles.card}>
            <div className={styles.circle}>
              <Imgix
                width={66}
                height={66}
                layout="fixed"
                src="/img/todo.png"
                alt="MangaFy create"
              />
            </div>
            <div className={styles.cardTitle}>To create</div>
            <div className={styles.cardDescription}>
              And organize your webcomic creation process from idea to publication.
            </div>
            <PrimaryButton
              onClick={onStart}
              className={styles.button}
              text="Start now"></PrimaryButton>
          </div>

          <div className={styles.card}>
            <div className={styles.circle}>
              <Imgix
                width={66}
                height={66}
                layout="fixed"
                src="/img/folder.png"
                alt="MangaFy indtoduce"
              />
            </div>
            <div className={styles.cardTitle}>To indtoduce</div>
            <div className={styles.cardDescription}>
              Create a portfolio and intoduce your records that reflect your skills, experiences,
              and attributes.{' '}
            </div>
            <PrimaryButton
              onClick={onPortfolio}
              className={styles.button}
              text="Indroduce"></PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

OnBoardingModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  user: PropTypes.object,
};

OnBoardingModal.defaultProps = {
  user: {},
};

export default OnBoardingModal;
