import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from 'components/ui-new/Button';
import Tasks from 'features/mangaStory/components/tasks';
import ModalStart from 'components/modals/joinToTeam';
import Flash from 'components/icon/new/Flash';

const ProjectJobs = ({ className, project, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <>
      <div className={cn(className, styles.jobs)}>
        {project?.tasks.map((task) => (
          <div className={styles.jobs__job}>
            <div className={styles.jobs__info}>
              <div className={styles.jobs__title}>{task.lookingFor}</div>
              <div className={styles.jobs__description}>{task.description}</div>
            </div>
            <div className={styles.jobs__button}>
              <Button
                pink
                rounded
                iconRight
                icon={<Flash color="#fff" bold />}
                sm
                onClick={() => {
                  setSelectedTask(task);
                  setShowModal(true);
                }}>
                Apply
              </Button>
            </div>
          </div>
        ))}

        {project?.tasks.length === 0 && <div className={styles.jobs__nojob}>No jobs yet</div>}
      </div>
      <ModalStart
        user={user}
        baseData={project?.storyBoards.data[0]}
        changeShowModal={setShowModal}
        showModal={showModal}
        selectedTask={selectedTask}
      />
    </>
  );
};

export default ProjectJobs;
