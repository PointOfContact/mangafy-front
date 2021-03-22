import React, { useState } from 'react';

import cn from 'classnames';
import ButtonColab from 'components/colaborationCard/buttonColab';
import Modal from 'components/modals/createTaskModal';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Tasks = ({ baseData, isOwn, toTeam }) => {
  const { tasks } = baseData;
  const [taskList, setTasks] = useState(tasks);
  const [showModal, changeShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className={styles.tasks}>
      {taskList.map((task) => (
        <div key={task._id} className={styles.taskCont}>
          <div>
            <ButtonColab className={cn(styles.ButtonPurple)} text={task.lookingFor} />
            <div className={styles.description}>{task.description}</div>
          </div>
          <div>
            <PrimaryButton
              onClick={() => {
                if (isOwn) {
                  changeShowModal(true);
                  setSelectedTask(task);
                } else {
                  toTeam(task);
                }
              }}
              text={isOwn ? 'Edit' : 'Сontribute'}
            />
          </div>
        </div>
      ))}
      {isOwn && (
        <div className={styles.addBtn}>
          {' '}
          <PrimaryButton
            onClick={() => {
              changeShowModal(true);
              setSelectedTask(null);
            }}
            text="create a task"
          />
        </div>
      )}
      <Modal
        baseData={baseData}
        changeShowModal={changeShowModal}
        showModal={showModal}
        task={selectedTask}
        tasks={tasks}
        setTasks={setTasks}
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
