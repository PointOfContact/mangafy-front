import React, { useEffect, useState } from 'react';

import { Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import ButtonColab from 'components/colaborationCard/buttonColab';
import SvgDustbin from 'components/icon/Dustbin';
import SvgPencilColored from 'components/icon/PencilColored';
import Modal from 'components/modals/createTaskModal';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import router from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const Tasks = ({ baseData, isOwn, user, toTeam, isParticipant, showPayPalContent }) => {
  const { tasks } = baseData;
  const [taskList, setTasks] = useState(tasks);
  const [showModal, changeShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const deleteTask = async (mangaStoryId, taskId) => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/tasks')
      .remove(taskId, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then(() => {
        updateTasks();

        const eventData = [
          {
            event_type: EVENTS.MINI_JOB_REMOVED,
            event_properties: { mangaStoryId: baseData._id, taskId, tasks },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        myAmplitude(eventData);
      })
      .catch(() => updateTasks());
    // To do 404
  };

  const sendEvent = (event_type) => {
    const data = [
      {
        event_type,
        event_properties: {
          authorId: baseData.author,
          authorInfo: baseData.authorInfo,
          mangaStory: baseData,
          mangaStoryId: baseData._id,
        },
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    myAmplitude(data);
  };

  const updateTasks = async () => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/tasks')
      .find({
        query: {
          mangaStoryId: baseData._id,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    setTasks(baseData.tasks);
  }, [baseData.tasks]);

  const sendMiniJobEvent = (event_type, task = 'new') => {
    const eventData = [
      {
        event_type,
        event_properties: {
          mangaStory: baseData,
          mangaStoryId: baseData._id,
          task,
          taskId: task !== 'new' ? task._id : '',
        },
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    myAmplitude(eventData);
  };

  const getFeedLink = (task) =>
    `${client.API_ENDPOINT}/feed?postType=task&pid=${baseData?._id}&text=${
      task.description
    }&lookingFor=${task?.lookingFor}&title=${baseData?.title}${
      task?.amount ? `&money=${task?.amount}` : ''
    }`;

  const getFeedLinkAS = (task) =>
    `${client.API_ENDPOINT}/feed?postType=task&&pid=${baseData?._id}&text=${task.description.slice(
      -10
    )}&lookingFor=${task?.lookingFor}&title=${baseData?.title}${
      task?.amount ? `&money=${task?.amount}` : ''
    }`;

  return (
    <div className={cn(styles.tasks, !taskList.length && styles.noTasks)}>
      <span className={styles.mobile_add}>
        {isOwn && (
          <AddButton
            className={styles.createTaskMobileBut}
            text={'Create a task'}
            onClick={() => {
              sendMiniJobEvent(EVENTS.MINI_JOB_OPEN_CREATE_MODAL);
              changeShowModal(true);
              setSelectedTask(null);
            }}
          />
        )}
      </span>
      {!!taskList.length && (
        <div className={styles.items}>
          {!isParticipant && !taskList.length && !isOwn && (
            <PrimaryButton
              className={styles.contributeBtn}
              onClick={() => {
                sendEvent(EVENTS.OPEN_MODAL_REQUEST_TO_JOIN);
                toTeam(null);
              }}
              text="Contribute"
            />
          )}
          {taskList.map((task) => (
            <>
              <div key={task._id} className={styles.taskCont}>
                <div>
                  <h2 className={styles.taskName}>Looking For - {task?.lookingFor}</h2>
                  <div>
                    <ButtonColab className={cn(styles.ButtonPurple)} text={task?.lookingFor} />
                    {!!task?.type && (
                      <ButtonColab className={cn(styles.ButtonPurple)} text={task?.type} />
                    )}
                    {task?.rewardType && (
                      <ButtonColab
                        className={cn(styles.ButtonPurple, styles.rewardType)}
                        text={
                          task.rewardType === 'Free'
                            ? 'Free'
                            : `${task?.amount || task?.maxValue} $`
                        }
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
                    <PrimaryButton
                      onClick={() => {
                        router.push(getFeedLink(task), getFeedLinkAS(task), { shallow: false });
                      }}
                      isActive={true}
                      className={styles.postTask}
                      text="Post Task"
                    />
                  </div>
                ) : (
                  <div className={styles.contributeContent}>
                    {!isParticipant && (
                      <PrimaryButton
                        onClick={() => {
                          sendEvent(EVENTS.OPEN_MODAL_REQUEST_TO_JOIN);
                          toTeam(task);
                        }}
                        text="Contribute"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className={styles.line}></div>
            </>
          ))}
        </div>
      )}
      <div className={styles.createTask}>
        <div className={isOwn ? styles.addButtonOwn : styles.addBtn}>
          {isOwn ? (
            <PrimaryButton
              onClick={() => {
                sendMiniJobEvent(EVENTS.MINI_JOB_OPEN_CREATE_MODAL);
                changeShowModal(true);
                setSelectedTask(null);
              }}
              className={showPayPalContent && styles.createTaskButton}
              text="Create a task"
            />
          ) : (
            <>
              {!tasks?.length && !isParticipant && (
                <PrimaryButton
                  onClick={() => {
                    sendEvent(EVENTS.OPEN_MODAL_REQUEST_TO_JOIN);
                    toTeam(null);
                  }}
                  text="Contribute"
                />
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        baseData={baseData}
        changeShowModal={changeShowModal}
        showModal={showModal}
        task={selectedTask}
        tasks={tasks}
        setTasks={setTasks}
        updateTasks={updateTasks}
        user={user}
      />
    </div>
  );
};

Tasks.propTypes = {
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  toTeam: PropTypes.func.isRequired,
  isParticipant: PropTypes.bool,
  showPayPalContent: PropTypes.bool.isRequired,
};

Tasks.defaultProps = {
  user: null,
  isParticipant: false,
};

export default Tasks;
