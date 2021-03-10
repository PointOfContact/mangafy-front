import React, { useState } from 'react';

import cn from 'classnames';
import Card from 'components/card';
import Modal from 'components/modals/Modal';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const StoryTab = ({ baseData, isOwn }) => {
  const [showModal, changeShowModal] = useState(false);
  const { story, preferredLanguage, searchingFor, authorInfo, participents } = baseData;
  return (
    <div className={styles.storyTab}>
      <div>
        <h1 className={styles.storyTabTitle}>{story}</h1>
      </div>
      <div className={styles.storyTabDescription}>
        <div>
          <span className={styles.storyKey}>Lenguage: </span>
          <span className={styles.storyValue}>{preferredLanguage}</span>
        </div>
        <div>
          <span className={styles.storyKey}>We are looking for: </span>
          {searchingFor.map((name, index) => (
            <span key={name} className={styles.storyValue}>
              {index === searchingFor.length - 1 ? name : `${name}, `}
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
              onClick={() => changeShowModal(true)}
            />
          </div>
        </div>
      )}
      <div className={cn(styles.storyTabDescription, styles.autherBlock)}>
        <div>
          <Link href={`/profile/${authorInfo._id}`}>
            <div className={styles.storyKey}>
              Team Lead | <span className={styles.storyValue}>{authorInfo.name}</span>
            </div>
          </Link>
        </div>
        <div className={styles.participents}>
          {participents.map((item) => (
            <img key="1" src="/img/myprofportfolio3.png" alt="" />
          ))}
        </div>
      </div>
      <div className="storyTabModal">
        <Modal baseData={baseData} changeShowModal={changeShowModal} showModal={showModal} />
      </div>
    </div>
  );
};

StoryTab.propTypes = {
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
};

export default StoryTab;
