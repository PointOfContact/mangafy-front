import React, { useState } from 'react';

import cn from 'classnames';
import Card from 'components/card';
import Modal from 'components/modals/Modal';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const StoryTab = ({ baseData }) => {
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
          {searchingFor.map((name) => (
            <span key={name} className={styles.storyValue}>
              {`${name}, `}
            </span>
          ))}
        </div>
      </div>
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
      <div className={cn(styles.storyTabDescription, styles.autherBlock)}>
        <div>
          <a className={styles.storyKey}>Team Lead | </a>
          <span className={styles.storyValue}>{authorInfo.name}</span>
        </div>
        <div className={styles.participents}>
          {participents.map((item) => (
            <img key="1" src="/img/myprofportfolio3.png" alt="" />
          ))}
        </div>
      </div>
      <Modal baseData={baseData} changeShowModal={changeShowModal} showModal={showModal} />
    </div>
  );
};

StoryTab.propTypes = {
  baseData: PropTypes.object.isRequired,
};

export default StoryTab;
