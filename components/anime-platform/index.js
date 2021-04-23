import React from 'react';

import { Row } from 'antd';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';

import AnimePlatformCard from './anime-platform copy';
import styles from './styles.module.scss';

const AnimePlatform = () => {
  const platforms = [
    {
      key: '1',
      img: 'Artists.webp',
      title: 'Grow As an Artist',
      description:
        'MangaFY connects you with an active community of aspiring, amateur, and freelance artists and freelance professionals (translators, editors, etc.), direct content from self-publishing experts, tutorials, tips of the trade, all to grow your inner artists to success. ',
    },
    {
      key: '2',
      img: 'NovelType.webp',
      title: 'Discover The Power of Collaboration',
      width: 170,
      description:
        "Got a story to tell but cannot illustrate? Have great characters but lack the storytelling behind them? collaborate with MangaFY's community of freelance and amateur partners.",
    },
    {
      key: '3',
      img: 'Cycle.webp',
      title: 'Manage Your Comic',
      width: 157,
      description:
        "Manga and Comic production simplified through MangaFY. Use our platform's tools to manage tasks, organize time, and team collaboration communication to take your story from idea to a ready-to-be-published product.",
    },
    {
      key: '4',
      img: 'Publish.webp',
      title: 'Ready, Set - Publish!',
      width: 154,
      description:
        'Done with the production of your Manga or comics? MangaFY got you covered. Start monetizing and making money with exclusive benefits via our direct self-publishing platform partners.',
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
        <Link href="/sign-in">
          <a>
            <PrimaryButton className={styles.joinBtn} text="Join Now" isRound={true} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AnimePlatform;
