import React, { useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import Modal from 'components/modals/joinToTeam';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';
import Tasks from './tasks';

const StoryTab = ({ baseData, isOwn, user, isParticipent }) => {
  const [showModal, changeShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { _id, author, introduce, story, authorInfo, participentsInfo } = baseData;
  const history = useRouter();

  const toTeam = (task) => {
    if (user) {
      changeShowModal(true);
      setSelectedTask(task);
    } else {
      history.push(`/sign-in?page=manga-story/${_id}`);
    }
  };

  return (
    <div className={styles.storyTab}>
      {isOwn && (
        <div>
          <h1 className={styles.storyTabTitle}>My inspiration</h1>
          <span className={styles.sub_info}>
            This is private text and is displayed only to the user
          </span>
          <pre>{introduce}</pre>
        </div>
      )}
      <div>
        <h1 className={styles.storyTabTitle}>Description</h1>
        <pre>{story}</pre>
      </div>
      <div>
        {isOwn ? (
          <>
            <h1 className={cn(styles.storyTabTitle, styles.participate)}>
              On your way to producing your own story? Fantastic!
            </h1>
            <span className={styles.sub_info}>Add who you want to join your team and why</span>
            <h1 className={cn(styles.storyTabTitle)}>Tasks</h1>
          </>
        ) : (
          <>
            <h1 className={cn(styles.storyTabTitle, styles.participate)}>How To Participate</h1>
            <span className={styles.sub_info}>
              Let&apos;s collaborate, here&apos;s what I look for
            </span>
          </>
        )}
        <Tasks
          baseData={baseData}
          isOwn={isOwn}
          user={user}
          toTeam={toTeam}
          isParticipent={isParticipent}
        />
      </div>
      <div className={cn(styles.storyTabDescription, styles.autherBlock)}>
        <Link href={`/profile/${author}`}>
          <a>
            <span className={styles.storyKey}>Owner | </span>
            <span className={styles.storyValue}> {authorInfo.name}</span>
          </a>
        </Link>
        <div className={styles.participents}>
          {[authorInfo].concat(participentsInfo).map(({ avatar, name, _id }) => (
            <Link className={styles.participentsCont} key={name} href={`/profile/${_id}`}>
              <a>
                <Tooltip placement="topLeft" title={name} arrowPointAtCenter>
                  {avatar ? (
                    <Imgix
                      width={65}
                      height={65}
                      src={client.UPLOAD_URL + avatar}
                      alt="Picture of the user"
                    />
                  ) : (
                    <Avatar text={name} size={69} />
                  )}
                </Tooltip>
              </a>
            </Link>
          ))}
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
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  isParticipent: PropTypes.bool.isRequired,
};

StoryTab.defaultProps = {
  user: null,
};

export default StoryTab;
