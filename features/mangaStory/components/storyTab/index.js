import React, { useState } from 'react';

import { notification, Popover, Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import Modal from 'components/modals/joinToTeam';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import ParticipantCard from '../participantCard';
import Tasks from '../tasks/index';
import styles from './styles.module.scss';

const StoryTab = ({ setBaseData, baseData, isOwn, user, isParticipant }) => {
  const [showModal, changeShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { _id, author, introduce, story, authorInfo, participentsInfo } = baseData;
  const history = useRouter();
  const leaveManga = (participantId) => {
    const data = { participantId };
    const jwt = client.getCookie('feathers-jwt');
    return import('api/restClient').then((m) =>
      m.default
        .service('/api/v2/manga-stories')
        .patch(_id, data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          if (participantId === user._id) {
            history.push(`/collaborations`);
          } else {
            setBaseData(res);
          }
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
        })
    );
  };
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
        <h1 className={styles.storyTabTitle}>Project Description</h1>
        <pre>{story}</pre>
      </div>
      <div>
        {isOwn ? (
          <div className={styles.containerTasks}>
            <div>
              <h1 className={cn(styles.storyTabTitle, styles.participate)}>
                On your way to producing your own story? Fantastic!
              </h1>
              <span className={styles.sub_info}>Add who you want to join your team and why</span>
              <Tasks
                baseData={baseData}
                isOwn={isOwn}
                user={user}
                toTeam={toTeam}
                isParticipant={isParticipant}
                showImage={true}
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className={cn(styles.storyTabTitle, styles.participate)}>How To Participate</h1>
            <span className={styles.sub_info}>
              Let&apos;s collaborate, here&apos;s what I look for
            </span>
            <Tasks
              baseData={baseData}
              isOwn={isOwn}
              user={user}
              toTeam={toTeam}
              isParticipant={isParticipant}
            />
          </>
        )}
      </div>
      <div className={cn(styles.storyTabDescription, styles.authorBlock)}>
        <Link href={`/profile/${author}`}>
          <a>
            <span className={styles.storyKey}>Owner | </span>
            <span className={styles.storyValue}> {authorInfo.name}</span>
          </a>
        </Link>
        <div className={styles.participants}>
          {[authorInfo].concat(participentsInfo).map(({ avatar, name, id, type }) => (
            <Popover
              key={_id}
              placement="bottomLeft"
              title={''}
              content={
                <ParticipantCard
                  isOwn={isOwn}
                  avatar={avatar}
                  name={name}
                  id={_id}
                  type={type}
                  leaveManga={leaveManga}
                  user={user}
                  author={author}
                />
              }
              trigger="click">
              <Tooltip placement="topLeft" title={name} arrowPointAtCenter>
                <div className={styles.participentInfo}>
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
                </div>
              </Tooltip>
            </Popover>
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
  setBaseData: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  isParticipant: PropTypes.bool.isRequired,
};

StoryTab.defaultProps = {
  user: null,
};

export default StoryTab;
