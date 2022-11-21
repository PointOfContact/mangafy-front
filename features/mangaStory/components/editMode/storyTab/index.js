import React, { useState, useEffect } from 'react';

import { Popover, Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import Modal from 'components/modals/joinToTeam';
import Avatar from 'components/ui-elements/avatar';
import ShowSomeData from 'components/ui-elements/showSomeData';
import mangaStoryClient from 'api/mangaStoryClient';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { deleteTagsFromString } from '../../../../../components/gallery/utils';
import BuyBubbleTea from '../../../../../components/ui-elements/buyBubbleTea';
import Tasks from '../../tasks/index';
import Participants from './participents';
import styles from './styles.module.scss';

const StoryTab = ({
  setBaseData,
  baseData,
  isOwn,
  user,
  isParticipant,
  mangaStory,
  showPayPalContent,
  userData,
}) => {
  const [showModal, changeShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { _id, author, introduce, story, authorInfo, participentsInfo, participents } = baseData;
  const [participantsData, setParticipantsData] = useState(participentsInfo);
  const history = useRouter();

  useEffect(() => {
    changeShowModal(history.query.hasOwnProperty('createTask'));
  }, []);

  const leaveManga = (participantId) =>
    mangaStoryClient.storyTab.leaveManga(
      participantId,
      _id,
      setBaseData,
      history,
      user,
      setParticipantsData,
      baseData
    );

  const toTeam = (task) => {
    if (user) {
      changeShowModal(true);
      setSelectedTask(task);
    } else {
      history.push(`/sign-in?page=project/production/${_id}`);
    }
  };

  useEffect(() => {
    if (Array.isArray(baseData.tasks) && !isOwn) {
      const task = baseData.tasks.find((task) => task._id === history.query?.task);
      if (task) toTeam();
    }
  }, []);

  return (
    <div className={cn(styles.storyTab, isOwn && styles.isOwner)}>
      {isOwn && (
        <div>
          <h1 className={styles.storyTabTitle}>My Goal</h1>
          <span className={styles.sub_info}>
            This is private text and is displayed only to the user
          </span>
          <pre>{introduce}</pre>
        </div>
      )}
      <div>
        <h2 className={styles.storyTabTitle}>Project Description</h2>
        <pre>{deleteTagsFromString(story)}</pre>
      </div>
      <div>
        {isOwn ? (
          <div className={styles.containerTasks}>
            <div>
              <h3 className={cn(styles.storyTabTitle, styles.participate)}>Find a team</h3>
              <span className={styles.sub_info}>
                It takes more than one person to make an amazing webcomic.
              </span>
              <Tasks
                baseData={baseData}
                isOwn={isOwn}
                user={user}
                toTeam={toTeam}
                isParticipant={isParticipant}
                showImage={true}
                showPayPalContent={showPayPalContent}
                // openedTask={history.query?.task}
              />
            </div>
          </div>
        ) : (
          <>
            <h4 className={cn(styles.storyTabTitle, styles.participate)}>How To Participate</h4>
            <span className={styles.sub_info}>
              Let&apos;s collaborate, here&apos;s what I look for
            </span>
            <Tasks
              mangaStory={mangaStory}
              baseData={baseData}
              isOwn={isOwn}
              user={user}
              toTeam={toTeam}
              isParticipant={isParticipant}
              showPayPalContent={showPayPalContent}
              // openedTask={history.query?.task}
            />
          </>
        )}
      </div>
      <div className={styles.isOwnBubble}>
        {showPayPalContent && <BuyBubbleTea payPalEmail={userData?.authorInfo?.payPalEmail} />}
      </div>
      <div className={cn(styles.storyTabDescription, styles.authorBlock)}>
        <Link href={`/profile/${author}`}>
          <a>
            <span className={styles.storyKey}>Owner | </span>
            <span className={styles.storyValue}>{authorInfo.name}</span>
          </a>
        </Link>
        <div className={styles.participants}>
          <Participants
            participantsData={participantsData}
            author={authorInfo}
            leaveManga={leaveManga}
            user={user}
            isOwn={isOwn}
          />
          <ShowSomeData
            participantsData={participantsData}
            size={40}
            leaveManga={leaveManga}
            deleteButton={true}
            isOwn={isOwn}
            user={user}
          />
        </div>
      </div>
      <Modal
        user={user}
        baseData={baseData}
        changeShowModal={changeShowModal}
        showModal={showModal}
        selectedTask={selectedTask}
      />
    </div>
  );
};

StoryTab.propTypes = {
  mangaStory: PropTypes.object,
  setBaseData: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  isParticipant: PropTypes.bool.isRequired,
  showPayPalToggle: PropTypes.bool,
  showPayPalContent: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

StoryTab.defaultProps = {
  user: null,
  showPayPalToggle: false,
  mangaStory: {},
};

export default StoryTab;
