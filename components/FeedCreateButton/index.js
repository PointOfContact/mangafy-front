import React, { useState } from 'react';
import styles from './styles.module.scss';
import SvgAdd2 from 'components/icon/Add2';
import SvgCopy from 'components/icon/Copy';
import cn from 'classnames';
import { EVENTS } from 'helpers/amplitudeEvents';
import GetFeedback from 'components/get-feedback';
import myAmplitude from 'utils/amplitude';
import ModalCreateProject from 'components/modalCreateProject';
import { useRouter } from 'next/router';

const FeedCreateButton = ({ user }) => {
  const router = useRouter();
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateProjectModalVisible, setIsCreateProjectModalVisible] = useState(false);

  const sendEvent = (event_type, post = 'New') => {
    const eventData = user
      ? [
          {
            event_type,
            event_properties: { post },
          },
        ]
      : [
          {
            event_type,
            event_properties: { post },
          },
        ];
    myAmplitude(eventData);
  };

  return (
    <div className={styles.feedCreateButton}>
      <div className={cn(styles.options, areOptionsVisible && styles.options_active)}>
        <button
          onClick={() => {
            if (user) {
              sendEvent(EVENTS.OPEN_CREATE_NEW_POST_MODAL);
              setIsModalVisible(true);
            } else {
              sendEvent(EVENTS.UNAUTHORIZED_CREATE_NEW_POST);
              router.push('/sign-in?page=get-feedback', undefined, { scroll: false });
            }
            setAreOptionsVisible(false);
          }}
          className={cn(styles.option, styles.option_post)}
        >
          Create a post
        </button>
        <button
          onClick={() => {
            if (user) {
              sendEvent(EVENTS.OPEN_CREATE_NEW_PROJECT_MODAL);
              setIsCreateProjectModalVisible(true);
            } else {
              sendEvent(EVENTS.UNAUTHORIZED_CREATE_NEW_POST);
              router.push('/create-story', undefined, { scroll: false });
            }
            setAreOptionsVisible(false);
          }}
          className={cn(styles.option, styles.option_project)}
        >
          <SvgCopy /> Create a project
        </button>
      </div>
      {/* Plus icon */}
      <div
        className={cn(styles.plus, areOptionsVisible && styles.plus_active)}
        onClick={() => setAreOptionsVisible((oldState) => !oldState)}
      >
        <SvgAdd2 />
      </div>
      {/* Create post modal */}
      <GetFeedback
        user={user}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        sendEvent={sendEvent}
      />
      {/* Create project modal */}
      <ModalCreateProject
        createProjectModal={isCreateProjectModalVisible}
        showCreateProjectModal={setIsCreateProjectModalVisible}
        user={user}
      />
    </div>
  );
};

export default FeedCreateButton;
