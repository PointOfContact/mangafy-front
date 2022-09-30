import client from 'api/client';
import HeaderNew from 'components/headerNew';
import Imgix from 'components/imgix';
import ProjectChapters from 'components/projectComponents/ProjectChapters';
import ProjectInfo from 'components/projectComponents/ProjectInfo';
import MangaComments from 'components/shotComments/MangaComments';
import MangaSideMenu from 'components/ShotSideMenu/MangaSideMenu';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { ShareButtons } from 'components/share';
import ShareModal from 'components/modals/shareModal';
import { subscribeToProject, unSubscribeOfProject } from 'helpers/shared';
import notification from 'antd/lib/notification';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';

const ProjectView = ({ ssProject, ssComments, user }) => {
  const [project, setProject] = useState(ssProject);
  const [comments, setComments] = useState(ssComments);

  const [areCommentsOpened, setAreCommentsOpened] = useState(false);
  const [isShareModalOpened, setIsShareModalOpened] = useState(false);

  const isParticipant = project?.participents?.includes(user?._id);
  const isOwner = project?.author === user?._id;

  const subscription = project?.subscribers?.find((sb) => sb.userId === user?._id);

  function subscribe(email) {
    if (!user) {
      notification.error({
        message: 'You need to be logged in to subscribe to projects',
        placement: 'bottomLeft',
      });
      return;
    }

    return subscribeToProject(project._id, user._id, email)
      .then((res) => {
        updateProjectInfo();
        notification.success({
          message: 'You have successfully subscribed to this project',
          placement: 'bottomLeft',
        });
        myAmplitude([
          {
            event_type: EVENTS.SUBSCRIBE_TO_PROJECT,
            event_properties: {
              project_id: project?._id,
              subscribed_user: user?._id,
            },
          },
        ]);
      })
      .catch((err) => console.log(err));
  }

  function unsubscribe() {
    return unSubscribeOfProject(subscription?._id)
      .then((res) => {
        console.log(res);
        notification.warning({
          message: 'You have unsubscribed from this project',
          placement: 'bottomLeft',
        });
        updateProjectInfo();
      })
      .catch((err) => {
        console.log(err);
        notification.warning({
          message: 'You have successfully unsubscribed from this project',
          placement: 'bottomLeft',
        });
        updateProjectInfo();
      });
  }

  function updateProjectInfo() {
    client
      .service('/api/v2/manga-stories')
      .get(project?._id)
      .then((res) => {
        setProject(res);
      })
      .catch((err) => console.log(err));
  }

  function updateCommentsInfo() {
    client
      .service('/api/v2/comments')
      .find({
        query: {
          mangaStoryId: project?._id,
          $sort: { createdAt: -1 },
          $limit: 1000,
        },
      })
      .then((res) => {
        setComments(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project}>
      <HeaderNew user={user} />
      <div className={styles.project__container}>
        {project?.image && (
          <div className={styles.project__cover}>
            <Imgix layout="fill" objectFit="cover" src={client.UPLOAD_URL + project?.image} />
          </div>
        )}
        <div className={styles.project__content}>
          <ProjectInfo
            className={styles.project__info}
            project={project}
            user={user}
            updateProjectInfo={updateProjectInfo}
            subscribe={subscribe}
            unsubscribe={unsubscribe}
            subscription={subscription}
          />
          <ProjectChapters
            className={styles.project__chapters}
            project={project}
            updateProjectInfo={updateProjectInfo}
            user={user}
          />
          <div className={styles.project__comments}>
            <MangaComments
              manga={project?.storyBoards.data[0]}
              user={user}
              onUpload={updateCommentsInfo}
              comments={comments.data}
            />
          </div>
        </div>
      </div>

      <MangaSideMenu
        manga={project?.storyBoards.data[0]}
        areCommentsOpened={areCommentsOpened}
        setAreCommentsOpened={setAreCommentsOpened}
        user={user}
        updateMangaInfo={updateProjectInfo}
        setIsShareModalOpened={setIsShareModalOpened}
        authors={[project?.authorInfo]}
        comments={comments}
        updateComments={updateCommentsInfo}
        isParticipant={isParticipant || isOwner}
      />

      <ShareModal
        isShareModalOpened={isShareModalOpened}
        setIsShareModalOpened={setIsShareModalOpened}
        shareUrl={client.API_ENDPOINT + '/project/' + project?._id}
      />
    </div>
  );
};

export default ProjectView;
