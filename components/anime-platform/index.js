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
      title: 'Grow As an Artist',
      description:
        'Connect with an active community of aspiring and freelance artists (inc. writers, illustrators, editors, inkers, etc.), and get direct content and tutorials from self-published professionals. ',
    },
    {
      key: '2',
      img: 'NovelType.webp',
      title: 'Discover The Power of Collaboration',
      width: 170,
      description:
        "Don't let the Skill Gap bite you -  collaborate with fellow artists at MangaFY.",
    },
    {
      key: '3',
      img: 'Cycle1.webp',
      title: 'Manage Your Comic',
      width: 157,
      description:
        "Simplify the comic production process via our platform's tools to manage tasks, organize time, and team collaboration communication.",
    },
    {
      key: '4',
      img: 'Publish.webp',
      title: 'Ready, Set - Publish!',
      width: 154,
      description:
        "Start monetizing with exclusive benefits via MangaFY's direct self-publishing platform partners.",
    },
  ];

  return (
    <div className={'container'}>
      <div className={styles.animePlatform}>
        <h3 className={styles.title}>The Next-Generation Self-Production Platform</h3>
        <p className={styles.info}>
          Collaborate, Produce, and Self-publish your story as a Manga or Comics with MangaFY
        </p>
        <Row
          gutter={[
            { xs: 20, sm: 30, md: 40, lg: 60 },
            { xs: 20, sm: 40, md: 10, lg: 10 },
          ]}>
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
