import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from 'components/ui-new/Button';
import Tasks from 'features/mangaStory/components/tasks';
import ModalStart from 'components/modals/joinToTeam';
import Flash from 'components/icon/new/Flash';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';
import Link from 'next/link';

const ProjectJobs = ({ className, project, user, isOwner }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  function onApplyButtonClick(taskId) {
    myAmplitude([
      {
        event_type: EVENTS.TASK_APPLY_BUTTON_CLICKED,
        event_properties: {
          task_id: taskId,
          subscribed_user: user?._id,
        },
      },
    ]);
  }

  return (
    <>
      <div className={cn(className, styles.jobs)}>
        {project?.tasks?.length === 0 && (
          <div className={styles.jobs__empty}>
            {isOwner ? (
              <>
                Need help with your project?
                <Link href={'/project/production/' + project._id + '?tab=details&createTask'}>
                  <a>
                    <Button md rounded pink>
                      Post a Task
                    </Button>
                  </a>
                </Link>
              </>
            ) : (
              <>
                No tasks are open at the moment... Interested in joining our journey?
                <Button
                  md
                  rounded
                  pink
                  onClick={() => {
                    setSelectedTask({});
                    setShowModal(true);
                  }}>
                  Offer your service
                </Button>
              </>
            )}
          </div>
        )}
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
                  onApplyButtonClick(task._id);
                }}>
                Apply
              </Button>
            </div>
          </div>
        ))}
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
