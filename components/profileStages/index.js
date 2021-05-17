import React, { useEffect, useState } from 'react';

import { Steps } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Quest from './card';
import styles from './styles.module.scss';

const AllQuests = [
  {
    point: 5,
    status: 'finish',
    title: 'Introduce the artist in you!',
    description:
      'Tell us your story about yourself, what drives you? where do you draw inspiration from?',
    navUrl: ' ',
  },
  {
    point: 5,
    status: 'wait',
    title: 'Introduce the artist in you!',
    description:
      'Tell us your story about yourself, what drives you? where do you draw inspiration from?',
    navUrl: ' ',
  },
  {
    point: 5,
    status: 'wait',
    title: 'Introduce the artist in you!',
    description:
      'Tell us your story about yourself, what drives you? where do you draw inspiration from?',
    navUrl: ' ',
  },
  {
    point: 5,
    status: 'wait',
    title: 'Introduce the artist in you!',
    description:
      'Tell us your story about yourself, what drives you? where do you draw inspiration from?',
    navUrl: ' ',
  },
  {
    point: 5,
    status: 'wait',
    title: 'Introduce the artist in you!',
    description:
      'Tell us your story about yourself, what drives you? where do you draw inspiration from?',
    navUrl: ' ',
  },
  {
    point: 5,
    status: 'wait',
    title: 'Introduce the artist in you!',
    description:
      'Tell us your story about yourself, what drives you? where do you draw inspiration from?',
    navUrl: ' ',
  },
];
const { Step } = Steps;

const ProfileStages = ({ user, userData, total }) => {
  const [visible, setVisible] = useState(false);
  const [quests, setQuests] = useState(AllQuests);
  const [isContent, setIsContent] = useState(!!userData?.content);
  const [content] = useState({
    title: 'Introduce the artist in you!',
    description:
      'Tell us your story about yourself, what drives you? where do you draw inspiration from?',
  });

  const [isGeleriOrLink, setIsGeleriOrLink] = useState(
    !!(user?.gallery?.length || user?.socialLinks?.length)
  );
  const [geleriOrLink] = useState({
    title: "It's all about portfolio",
    description:
      'Upload or share links to your work, social artistic profile. Highlight your presence in the MangaFY community.',
    status: 'process',
  });

  const [isPricingTable, setIsPricingTable] = useState(!!user?.pricingTable?.length);
  const [pricingTable] = useState({
    title: 'Are you open for commissions?',
    description:
      'Add your commission list and get more relevant offers for collaboration on paid projects.',
  });

  const [isMangaStories, setIsMangaStories] = useState(total > 0);
  const [mangaStories] = useState({
    title: 'Start a project',
    description: 'Now you are ready to get started on your comic or manga project',
    status: true,
  });

  const [stages] = useState([
    {
      title: 'Create a task',
      description: 'We believe no one should work alone, create task and find collaboration',
      status: 'error',
    },
  ]);
  // content

  useEffect(() => {
    setIsContent(!!userData?.content);
    setIsGeleriOrLink(!!(user?.gallery?.length || user?.socialLinks?.length));
    setIsPricingTable(!!user?.pricingTable?.length);
    setIsMangaStories(total > 0);
  }, [userData, user, total]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  };

  return (
    <div className={cn(styles.profileStages)}>
      {/* <Steps direction="vertical">
        <Step
          status={isContent ? 'process' : 'wait'}
          title={content.title}
          description={content.description}
        />
        <Step
          status={isGeleriOrLink ? 'process' : 'wait'}
          title={geleriOrLink.title}
          description={geleriOrLink.description}
        />
        <Step
          status={isPricingTable ? 'process' : 'wait'}
          title={pricingTable.title}
          description={pricingTable.description}
        />
        <Step
          status={isMangaStories ? 'process' : 'wait'}
          title={mangaStories.title}
          description={mangaStories.description}
        />
      </Steps> */}
      <>
        <div
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className={cn(styles.bar, visible && styles.visible)}>
          <div className={styles.content}>
            <h2 className={styles.title}>Fill out the form and get points</h2>
            <div className={styles.img}>
              <img src="/img/quests.png" />
            </div>
            <h2 className={styles.filter}>All Quests</h2>
            <div className={styles.quests}>
              {quests.map((quest, index) => (
                <Quest
                  key={index}
                  point={quest.point}
                  status={quest.status}
                  title={quest.title}
                  description={quest.description}
                  navUrl={quest.navUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

ProfileStages.propTypes = {
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  total: PropTypes.number,
};

ProfileStages.defaultProps = {
  total: 0,
};

export default ProfileStages;
