import React, { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import ProjectStory from '../ProjectStory';
import ProjectMembers from '../ProjectMembers';
import ProjectJobs from '../ProjectJobs';
import ProjectChapters from '../ProjectChapters';
import SubscribeField from '../SubscribeField';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';
import Diamond from 'components/icon/new/Diamond';
import PrimaryButton from 'components/ui-elements/button';
import { useAppContext } from 'context';

const ProjectInfo = ({
  isOwner,
  className,
  project,
  user,
  updateProjectInfo,
  subscribe,
  unsubscribe,
  subscription,
  chapters,
  setOpenPaymentModal,
  subscribedProject,
}) => {
  return (
    <div className={cn(className, styles.info)}>
      <div className={styles.info__rates}>
        <div className={styles.rate}>
          <div className={styles.rate__value}>{project?.subscribers?.length}</div>
          <div className={styles.rate__title}>following</div>
        </div>
        <div className={styles.rate}>
          <div className={styles.rate__value}>{project?.status}</div>
          <div className={styles.rate__title}>status</div>
        </div>
      </div>
      <ProjectStory className={styles.info__story} project={project} user={user} />
      <SubscribeField
        openPledgeModal={() => setOpenPaymentModal({ item: project, type: 'Project' })}
        payPalEmail={project?.authorInfo?.payPalEmail}
        user={user}
        subscribedProject={subscribedProject}
        className={styles.info__subscribe}
        subscription={subscription}
        subscribe={subscribe}
        unsubscribe={unsubscribe}
        project={project}
      />
      {!!project?.authorInfo?.payPalEmail && (
        <a
          onClick={() => {
            myAmplitude([
              {
                event_type: EVENTS.SUPPORT_LINK_CLICKED,
                event_properties: {
                  author_id: project?.authorInfo?._id,
                  supporter_id: user?._id,
                },
              },
            ]);
          }}
          className={styles.info__support}
          href={`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${project?.authorInfo?.payPalEmail}&item_name=Friends+of+the+Park&item_number=Fall+Cleanup+Campaign&currency_code=USD`}>
          Support
          <Diamond />
        </a>
      )}
      <ProjectChapters
        className={styles.project__chapters}
        project={project}
        updateProjectInfo={updateProjectInfo}
        user={user}
        subscribedProject={subscribedProject}
        isMobile={true}
        chapters={chapters}
        setOpenPaymentModal={setOpenPaymentModal}
      />
      <div className={styles.info__title}>Members</div>
      <div className={styles.info__line}></div>
      <ProjectMembers className={styles.info__members} project={project} />
      <div className={styles.info__title}>Tasks</div>
      <div className={styles.info__line}></div>
      <ProjectJobs className={styles.info__jobs} project={project} user={user} isOwner={isOwner} />
    </div>
  );
};

export default ProjectInfo;
