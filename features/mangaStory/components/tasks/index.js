import React, { useState } from 'react';

import { Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import ButtonColab from 'components/colaborationCard/buttonColab';
import SvgDustbin from 'components/icon/Dustbin';
import SvgPencilColored from 'components/icon/PencilColored';
import Imgix from 'components/imgix';
import Modal from 'components/modals/createTaskModal';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Tasks = ({ baseData, isOwn, user, toTeam, isParticipent }) => {
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
            platform: 'WEB',
            event_type: EVENTS.MINI_JOB_REMOVED,
            event_properties: { mangaStoryId: baseData._id, taskId },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(eventData);
      })
      .catch((err) => err);
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
  return (
    <div className={cn(styles.tasks, !taskList.length && styles.noTasks)}>
      <span className={styles.mobile_add}>
        {isOwn && (
          <AddButton
            text={'create a task'}
            onClick={() => {
              changeShowModal(true);
              setSelectedTask(null);
            }}
          />
        )}
      </span>
      {!!taskList.length && (
        <div className={styles.items}>
          {!isParticipent && !taskList.length && !isOwn && (
            <PrimaryButton
              className={styles.contributeBtn}
              onClick={() => {
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
                    {task?.rewardType && (
                      <ButtonColab
                        className={cn(styles.ButtonPurple, styles.rewardType)}
                        text={task.rewardType === 'Free' ? 'Free' : `${task?.amount} $`}
                      />
                    )}
                    <div className={styles.description}>-{task.description}</div>
                  </div>
                </div>
                {isOwn ? (
                  <div className={styles.editBtns}>
                    <SvgPencilColored
                      onClick={() => {
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
                  <div className={styles.contribiutContent}>
                    {!isParticipent && (
                      <PrimaryButton
                        onClick={() => {
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
      <div className={styles.creatTask}>
        <div className={styles.addBtn}>
          <Imgix
            width={264}
            height={241}
            layout="fixed"
            src="https://mangafy.club/img/storyCardImg1.webp"
            alt=""
          />
          {isOwn && (
            <PrimaryButton
              onClick={() => {
                changeShowModal(true);
                setSelectedTask(null);
              }}
              text="create a task"
            />
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
  isParticipent: PropTypes.bool.isRequired,
};

Tasks.defaultProps = {
  user: null,
};

export default Tasks;
