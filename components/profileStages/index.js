import React, { useEffect, useState } from 'react';

import { Steps } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Step } = Steps;

const ProfileStages = ({ user }) => {
  const [isContent, setIsContent] = useState(!!user?.content);
  const [stages] = useState([
    {
      title: 'Introduce the artist in you!',
      description:
        'Tell us your story about yourself, what drives you? where do you draw inspiration from?',
      status: isContent ? 'process' : 'wait',
    },
    {
      title: "It's all about portfolio",
      description:
        'Upload or share links to your work, social artistic profile. Highlight your presence in the MangaFY community.',
      status: 'process',
    },
    {
      title: 'Are you open for commissions?',
      description:
        'Add your commission list and get more relevant offers for collaboration on paid projects.',
      status: 'finish',
    },
    {
      title: 'Create a task',
      description: 'We believe no one should work alone, create task and find collaboration',
      status: 'error',
    },
    {
      title: 'Start a project',
      description: 'Now you are ready to get started on your comic or manga project',
      status: true,
    },
  ]);
  // content
  console.log('useruseruseruser', user);

  useEffect(() => {
    setIsContent(!!user?.content);
    stages[0].status = !!user?.content;
    console.log('isContentisContentisContent', user?.content, isContent);
  }, [user]);

  // const getIsContent = () => {
  //   if (!!user?.content) {
  //     return true
  //   }
  // };

  return (
    <div className={cn(styles.profileStages)}>
      <Steps direction="vertical">
        {stages.map((stage) => (
          <Step status title description />
        ))}
      </Steps>
    </div>
  );
};

ProfileStages.propTypes = {
  user: PropTypes.string.isRequired,
};

ProfileStages.defaultProps = {};

export default ProfileStages;
