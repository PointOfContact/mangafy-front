import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import ProjectStory from '../ProjectStory';
import ProjectMembers from '../ProjectMembers';
import ProjectJobs from '../ProjectJobs';
import ProjectChapters from '../ProjectChapters';
import SubscribeField from '../SubscribeField';

const ProjectInfo = ({
  className,
  project,
  user,
  updateProjectInfo,
  subscribe,
  unsubscribe,
  subscription,
}) => {
  return (
    <div className={cn(className, styles.info)}>
      <div className={styles.info__rates}>
        {/* <div className={styles.rate}>
          <div className={styles.rate__value}>4.345</div>
          <div className={styles.rate__title}>likes</div>
        </div> */}
        <div className={styles.rate}>
          <div className={styles.rate__value}>{project?.subscribers?.length}</div>
          <div className={styles.rate__title}>following</div>
        </div>
        <div className={styles.rate}>
          <div className={styles.rate__value}>{project?.status}</div>
          <div className={styles.rate__title}>status</div>
        </div>
      </div>
      <ProjectStory className={styles.info__story} project={project} />
      <SubscribeField
        className={styles.info__subscribe}
        subscription={subscription}
        subscribe={subscribe}
        unsubscribe={unsubscribe}
      />
      <div className={cn(styles.info__title, styles.info__title_mobile)}>Chapters</div>
      <div className={cn(styles.info__line, styles.info__line_mobile)}></div>
      <ProjectChapters
        className={styles.project__chapters}
        project={project}
        updateProjectInfo={updateProjectInfo}
        user={user}
        isMobile={true}
      />
      <div className={styles.info__title}>Members</div>
      <div className={styles.info__line}></div>
      <ProjectMembers className={styles.info__members} project={project} />
      <div className={styles.info__title}>Jobs</div>
      <div className={styles.info__line}></div>
      <ProjectJobs className={styles.info__jobs} project={project} user={user} />
    </div>
  );
};

export default ProjectInfo;
