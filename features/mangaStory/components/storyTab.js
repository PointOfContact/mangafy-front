import React, { useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Card from 'components/card';
import Modal from 'components/modals/joinToTeam';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const StoryTab = ({ baseData, isOwn, user }) => {
  const [showModal, changeShowModal] = useState(false);
  const {
    _id,
    author,
    introduce,
    story,
    preferredLanguage,
    searchingFor,
    authorInfo,
    participentsInfo,
  } = baseData;
  const history = useRouter();

  const toTeam = () => {
    if (user) {
      changeShowModal(true);
    } else {
      history.push(`/sign-in?page=manga-story/${_id}`);
    }
  };

  return (
    <div className={styles.storyTab}>
      {isOwn && (
        <div>
          <h1 className={styles.storyTabTitle}>My inspiration</h1>
          <pre>{introduce}</pre>
        </div>
      )}
      <div>
        <h1 className={styles.storyTabTitle}>Description</h1>
        <pre>{story}</pre>
      </div>
      <div className={styles.storyTabDescription}>
        <div>
          <span className={styles.storyKey}>Language: </span>
          <span className={styles.storyValue}> {preferredLanguage}</span>
        </div>
        <div>
          <span className={styles.storyKey}>We are looking for: </span>
          {searchingFor.map((name, index) => (
            <span key={name} className={styles.storyValue}>
              {' '}
              {name}
              {index < searchingFor.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>
      {!isOwn && (
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <Card
              description="Join to us and let’s make a fun"
              btnText="Join to Team"
              items={[<img key="1" src="/img/storyCardImg.png" alt="" />]}
              onClick={() => toTeam()}
            />
          </div>
        </div>
      )}
      <div className={cn(styles.storyTabDescription, styles.autherBlock)}>
        <Link href={`/profile/${author}`}>
          <div>
            <a className={styles.storyKey}>Owner | </a>
            <span className={styles.storyValue}> {authorInfo.name}</span>
          </div>
        </Link>
        <div className={styles.participents}>
          {participentsInfo.map(({ avatar, name, _id }) => (
            <Link key={name} href={`/profile/${_id}`}>
              <Tooltip placement="topLeft" title={name} arrowPointAtCenter>
                <Image
                  width={65}
                  height={65}
                  src={
                    avatar
                      ? client.UPLOAD_URL + avatar
                      : `https://ui-avatars.com/api/?background=9A87FE&name=${name}&rounded=true&color=ffffff`
                  }
                  alt="Picture of the user"
                />
              </Tooltip>
            </Link>
          ))}
        </div>
      </div>
      <Modal baseData={baseData} changeShowModal={changeShowModal} showModal={showModal} />
    </div>
  );
};

StoryTab.propTypes = {
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

StoryTab.defaultProps = {
  user: null,
};

export default StoryTab;
