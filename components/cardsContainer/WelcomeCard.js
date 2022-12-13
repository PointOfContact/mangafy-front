import { Close } from 'components/icon';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import React from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

const WelcomeCard = ({ openCreateShotModal, createProjectHandler, closeWelcomeCard, user }) => {
  const router = useRouter();
  return (
    <div className={styles.welcomeCard}>
      <div className={styles.welcomeCard__title}>Our community is a place where you can</div>
      <div className={styles.welcomeCard__text}>
        Connect with other graphic novel creators, share your work, and get inspiration for your
        next project.
      </div>
      <div className={styles.welcomeCard__buttons}>
        <div
          className={styles.welcomeCard__button}
          // onClick={() => router.push('/profile/' + user._id + '?active=project')}
          onClick={() => openCreateShotModal()}>
          <div>Share Your Progress</div> <ArrowDown2 color="#fff" />
        </div>
        <div className={styles.welcomeCard__button} onClick={() => createProjectHandler()}>
          <div>Start your new project</div> <ArrowDown2 color="#fff" />
        </div>
        <div
          className={styles.welcomeCard__button}
          onClick={() => router.push('/profile/' + user?._id)}>
          <div>Edit Your Profile</div> <ArrowDown2 color="#fff" />
        </div>
      </div>
      <div className={styles.welcomeCard__close} onClick={closeWelcomeCard}>
        <Close color="#fff" />
      </div>
    </div>
  );
};

export default WelcomeCard;
