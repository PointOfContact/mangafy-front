import React, { useState } from 'react';

import Imgix from 'components/imgix';
import ModalCreateProject from 'components/modalCreateProject';
import HugeButton from 'components/ui-elements/huge-button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ProfilesHeader = ({ user }) => {
  const [createProjectModal, showCreateProjectModal] = useState(false);

  return (
    <div className={styles.box}>
      {/* TODO convert Imgix */}
      <img src={'img/colabbg.webp'} alt="MangaFy background" />
      <div className={'container'}>
        <div className={styles.box__container}>
          <div className={styles.box__bgImg}>
            <Imgix
              priority
              layout="intrinsic"
              width={428}
              height={294}
              src="https://mangafy.club/img/people.webp"
              alt="MangaFy people"
            />
          </div>
          <div className={styles.box__content}>
            <div className={styles.box__title_wrap}>
              <div className={styles.box__title}>
                <p>Collect them All!</p>
              </div>
              <div className={styles.box__description}>
                <p>All manga enthusiast, all genres, one Place - MangaFY</p>
              </div>
            </div>
            <div className={styles.box__link}>
              {user ? (
                <HugeButton
                  text="Post Collaborations"
                  disabled={false}
                  onClick={() => showCreateProjectModal(true)}
                />
              ) : (
                <Link href="/sign-in">
                  <a>
                    <span>
                      <HugeButton text="Join MangaFy" disabled={false} />
                    </span>
                  </a>
                </Link>
              )}
              <span className={styles.img}>
                <Imgix
                  layout="intrinsic"
                  width={233}
                  height={54}
                  src={`https://mangafy.club/img/persons.webp`}
                  alt="MangaFy persons"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
        user={user}
      />
    </div>
  );
};

ProfilesHeader.propTypes = {
  user: PropTypes.object,
};

ProfilesHeader.defaultProps = {
  user: null,
};

export default ProfilesHeader;
