/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import Modal from 'components/modals/createTaskModal';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';
import TaskItems from './taskItems';

const Tasks = ({ baseData, isOwn, user, toTeam, isParticipant, showPayPalContent }) => {
  const { tasks } = baseData;
  const [taskList, setTasks] = useState(tasks);
  const [showModal, changeShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskItemsArray, setTaskItemsArray] = useState(null);

  // useEffect(() => {
  //   const task = taskList.find((task) => task._id === openedTask);
  //   console.log(openedTask);
  //   console.log(task);
  //   if (task) toTeam(task);
  // }, []);

  useEffect(() => {
    const taskItemsArray = [];
    taskList.forEach((task) => {
      if (task.status === 'Archived') {
        if (isOwn)
          taskItemsArray.push(
            <TaskItems
              task={task}
              isOwn={isOwn}
              baseData={baseData}
              isParticipant={isParticipant}
              deleteTask={deleteTask}
              sendMiniJobEvent={sendMiniJobEvent}
              changeShowModal={changeShowModal}
              setSelectedTask={setSelectedTask}
              sendEvent={sendEvent}
              toTeam={toTeam}
            />
          );
      } else {
        taskItemsArray.push(
          <TaskItems
            task={task}
            isOwn={isOwn}
            baseData={baseData}
            isParticipant={isParticipant}
            deleteTask={deleteTask}
            sendMiniJobEvent={sendMiniJobEvent}
            changeShowModal={changeShowModal}
            setSelectedTask={setSelectedTask}
            sendEvent={sendEvent}
            toTeam={toTeam}
          />
        );
      }
    });
    setTaskItemsArray(taskItemsArray);
  }, [taskList]);

  const deleteTask = async (mangaStoryId, taskId) => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/tasks')
      .remove(taskId, {
        query: {
          mangaStoryId: baseData._id,
        },
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then(() => {
        updateTasks();

        const eventData = [
          {
            event_type: EVENTS.MINI_JOB_REMOVED,
            event_properties: { mangaStoryId: baseData._id, taskId, tasks },
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
      },
    ];
    myAmplitude(eventData);
  };

  return (
    <div className={cn(styles.tasks, !taskList.length && styles.noTasks)}>
      <span className={styles.mobile_add}>
        {isOwn && (
          <AddButton
            className={styles.createTaskMobileBut}
            text={'Post a job'}
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
              text="Join a team"
            />
          )}
          {taskItemsArray}
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
              text="Post a job"
            />
          ) : (
            <>
              {!tasks?.length && !isParticipant && (
                <PrimaryButton
                  onClick={() => {
                    sendEvent(EVENTS.OPEN_MODAL_REQUEST_TO_JOIN);
                    toTeam(null);
                  }}
                  text="Join a team"
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
