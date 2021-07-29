import React, { useState } from 'react';

import { notification, Popover, Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import Modal from 'components/modals/joinToTeam';
import Avatar from 'components/ui-elements/avatar';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import EditStoryTab from '../editStoryTab';
import ParticipantCard from '../participantCard';
import Tasks from '../tasks/index';
import BuyBubbleTea from './buyBubbleTea';
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
    <div className={cn(styles.storyTab, isOwn && styles.isOwner)}>
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
      <BuyBubbleTea profile={authorInfo} />
      <div className={cn(styles.storyTabDescription, styles.authorBlock)}>
        <Link href={`/profile/${author}`}>
          <a>
            <span className={styles.storyKey}>Owner | </span>
            <span className={styles.storyValue}> {authorInfo.name}</span>
          </a>
        </Link>
        <div className={styles.participants}>
          {[authorInfo].concat(participentsInfo).map(({ avatar, name, _id, type }) => (
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
                      alt="MangaFy picture of the user"
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

const TabPaneStory = ({
  setBaseData,
  baseData,
  isOwn,
  user,
  isParticipent,
  editMode,
  canEdit,
  setEditMode,
  onChangeSingleField,
  cancelEditMode,
  saveUserDataByKey,
}) => (
  <div className={styles.tabWrap}>
    {/* <StoryTab baseData={baseData} /> */}
    <p>
      {!editMode ? (
        <div>
          <StoryTab
            setBaseData={setBaseData}
            baseData={baseData}
            user={user}
            isOwn={isOwn}
            isParticipent={isParticipent}
          />
          {!isOwn && <BuyBubbleTea />}
          {canEdit && (
            <div className={styles.editDeleteButtons}>
              <PrimaryButton
                isWhite={true}
                className={styles.editTitleSvg}
                text={'Edit Project'}
                onClick={() => setEditMode(true)}
              />
              <Link href="/contact-us">
                <PrimaryButton
                  isWhite={true}
                  className={styles.deleteTitleSvg}
                  text={'Delete Project'}
                />
              </Link>
            </div>
          )}
        </div>
      ) : (
        canEdit && (
          <EditStoryTab
            baseData={baseData}
            onChangeSingleField={onChangeSingleField}
            cancelEditMode={cancelEditMode}
            saveUserDataByKey={saveUserDataByKey}
          />
        )
      )}
      <p></p>
    </p>
  </div>
);

TabPaneStory.propTypes = {
  setBaseData: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  isParticipant: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  cancelEditMode: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
};

TabPaneStory.defaultProps = {
  user: null,
};

export default TabPaneStory;
