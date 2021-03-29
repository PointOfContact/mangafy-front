import React, { useState } from 'react';

import { Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import ButtonColab from 'components/colaborationCard/buttonColab';
import SvgDustbin from 'components/icon/Dustbin';
import SvgPencilColored from 'components/icon/PencilColored';
import Modal from 'components/modals/createTaskModal';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Tasks = ({ baseData, isOwn, toTeam }) => {
  const { tasks } = baseData;
  const [taskList, setTasks] = useState(tasks);
  const [showModal, changeShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const deleteTask = async (taskId) => {
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
    <div className={styles.tasks}>
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
      <div className={styles.items}>
        {taskList.map((task) => (
          <div key={task._id} className={styles.taskCont}>
            <div>
              <ButtonColab className={cn(styles.ButtonPurple)} text={task.lookingFor} />
              <div className={styles.description}>{task.description}</div>
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
                  onConfirm={() => deleteTask(task._id)}
                  okText="Yes"
                  cancelText="No">
                  <SvgDustbin white="22px" height="22px" />
                </Popconfirm>
              </div>
            ) : (
              <div>
                <PrimaryButton
                  className={styles.editBtn}
                  onClick={() => {
                    toTeam(task);
                  }}
                  text="Contribute"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <div className={styles.addBtn}>
          <img src="/img/storyCardImg.webp" alt="" />
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
      />
    </div>
  );
};

Tasks.propTypes = {
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  toTeam: PropTypes.func.isRequired,
};

Tasks.defaultProps = {
  user: null,
};

export default Tasks;
