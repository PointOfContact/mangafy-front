import React from 'react';

import { Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import ButtonColab from 'components/colaborationCard/buttonColab';
import SvgDustbin from 'components/icon/Dustbin';
import SvgPencilColored from 'components/icon/PencilColored';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import router from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const TaskItems = ({
  task,
  isOwn,
  baseData,
  isParticipant,
  deleteTask,
  sendMiniJobEvent,
  changeShowModal,
  setSelectedTask,
  sendEvent,
  toTeam,
}) => {
  const getFeedLink = (taskItem) =>
    `${client.API_ENDPOINT}/feed?postType=Task&pid=${baseData?._id}&text=${
      taskItem.description
    }&lookingFor=${taskItem?.lookingFor}&title=${baseData?.title}${
      taskItem?.amount ? `&money=${taskItem?.amount}` : ''
    }`;

  const getFeedLinkAS = (taskItem) =>
    `${client.API_ENDPOINT}/feed?postType=Task&&pid=${
      baseData?._id
    }&text=${taskItem.description?.slice(-10)}&lookingFor=${taskItem?.lookingFor}&title=${
      baseData?.title
    }${taskItem?.amount ? `&money=${taskItem?.amount}` : ''}`;

  return (
    <>
      <div key={task._id} className={styles.taskCont}>
        <div>
          <h2 className={styles.taskName}>Looking For - {task?.lookingFor}</h2>
          <div>
            <ButtonColab className={cn(styles.ButtonPurple)} text={task?.lookingFor} />
            {!!task?.status && (
              <ButtonColab className={cn(styles.ButtonPurple)} text={task?.status} />
            )}
            {task?.rewardType && (
              <ButtonColab
                className={cn(styles.ButtonPurple, styles.rewardType)}
                text={task.rewardType === 'Free' ? 'Free' : `${task?.amount || task?.maxValue} $`}
              />
            )}
            <div className={styles.description}>-{task.description}</div>
          </div>
        </div>
        {isOwn ? (
          <div className={styles.editBtns}>
            <SvgPencilColored
              onClick={() => {
                sendMiniJobEvent(EVENTS.MINI_JOB_OPEN_EDIT_MODAL, task);
                changeShowModal(true);
                setSelectedTask(task);
              }}
              white="22px"
              height="22px"
            />
            <Popconfirm
              placement="topRight"
              title="You want to delete this task?"
              onConfirm={() => deleteTask(baseData._id, task._id)}
              okText="Yes"
              cancelText="No">
              <SvgDustbin white="22px" height="22px" />
            </Popconfirm>
          </div>
        ) : (
          task.status !== 'Hired' && (
            <div className={styles.contributeContent}>
              {!isParticipant && (
                <PrimaryButton
                  onClick={() => {
                    sendEvent(EVENTS.OPEN_MODAL_REQUEST_TO_JOIN);
                    toTeam(task);
                  }}
                  text="Join a team"
                />
              )}
            </div>
          )
        )}
      </div>
      <div className={styles.line}></div>
    </>
  );
};

TaskItems.propTypes = {
  task: PropTypes.object.isRequired,
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  isParticipant: PropTypes.bool.isRequired,
  deleteTask: PropTypes.func.isRequired,
  sendMiniJobEvent: PropTypes.func.isRequired,
  changeShowModal: PropTypes.func.isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  sendEvent: PropTypes.func.isRequired,
  toTeam: PropTypes.func.isRequired,
};

export default TaskItems;
