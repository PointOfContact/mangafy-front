import React, { useState } from 'react';

import { Row } from 'antd';
import ModalCreateProject from 'components/modalCreateProject';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import AnimePlatformCard from './anime-platform copy';
import styles from './styles.module.scss';

const AnimePlatform = ({ user }) => {
  const [createProjectModal, showCreateProjectModal] = useState(false);

  const platforms = [
    {
      key: '1',
      img: 'Artists1.webp',
      title: 'Place for creators',
      description:
        'Fans around the world want to read graphic novels, and artists, writers, editors, and translators all contribute to the magic.',
    },
    {
      key: '2',
      img: 'NovelType.webp',
      title: 'Creating webcomics alone is tough',
      width: 170,
      description:
        'To create and promote webcomics, you need more than one person, you need a team and everyone does their job.',
    },
    {
      key: '3',
      img: 'Cycle1.webp',
      title: 'Manage your production',
      width: 157,
      description: "Manage Your Workflows With Collaboration Apps Customized to Your Team's Needs.",
    },
    {
      key: '4',
      img: 'Publish.webp',
      title: 'When ready, show to world',
      width: 154,
      description:
        'Create a space unique to your early fans and collaborators to get webcomics feedback and follow your dream',
    },
  ];

  return (
    <div className={'container'}>
      <div className={styles.animePlatform}>
        <h3 className={styles.title}>Create Better, Together.</h3>
        <p className={styles.info}>
          Start your webcomics project now. Collaborate, Produce, and Self-publish your story with
          MangaFY
        </p>
        <Row
          gutter={[
            { xs: 20, sm: 30, md: 40, lg: 60 },
            { xs: 20, sm: 40, md: 10, lg: 10 },
          ]}
        >
          {platforms.map((platform) => (
            <AnimePlatformCard
              key={platform.key}
              img={platform.img}
              title={platform.title}
              description={platform.description}
              width={platform.width}
            />
          ))}
        </Row>
        <PrimaryButton
          className={styles.joinBtn}
          text="Create a profile"
          isRound={true}
          onClick={() => showCreateProjectModal(true)}
        />
      </div>
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
        user={user}
      />
    </div>
  );
};

AnimePlatform.propTypes = {
  user: PropTypes.object,
};

AnimePlatform.defaultProps = {
  user: {},
};

export default AnimePlatform;
