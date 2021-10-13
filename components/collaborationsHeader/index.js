import React, { useState } from 'react';

import Imgix from 'components/imgix';
import ModalCreateProject from 'components/modalCreateProject/modalCreateProject';
import HugeButton from 'components/ui-elements/huge-button';

import styles from './styles.module.scss';

const CollaborationsHeader = () => {
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
              width={378}
              height={284}
              src="https://mangafy.club/img/collab.webp"
              alt="MangaFy collab"
            />
          </div>
          <div className={styles.box__content}>
            <div className={styles.box__title_wrap}>
              <div className={styles.box__title}>
                <p>A platform for community collaboration.</p>
              </div>
              <div className={styles.box__description}>
                <p>Create, make decisions, and get published, together.</p>
              </div>
            </div>
            <div className={styles.box__link}>
              <HugeButton
                onClick={() => showCreateProjectModal(true)}
                text="Post Collaborations"
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
      />
    </div>
  );
};

export default CollaborationsHeader;
