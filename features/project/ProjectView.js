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
import {
  createChapterComment,
  createComment,
  subscribeToProject,
  unSubscribeOfProject,
} from 'helpers/shared';
import notification from 'antd/lib/notification';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';
import FeedCreateButton from 'components/FeedCreateButton';
import { SignInModal } from 'components/modals/SignInModal';
import { viewMangaFun } from 'utils';

const ProjectView = ({ ssProject, ssComments, user }) => {
  const [project, setProject] = useState(ssProject);
  const [comments, setComments] = useState(ssComments);
  const [chapterComments, setChapterComments] = useState({ data: [] });
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [areCommentsOpened, setAreCommentsOpened] = useState(false);
  const [isShareModalOpened, setIsShareModalOpened] = useState(false);
  const [isSignInModalOpened, setIsSignInModalOpened] = useState(false);

  useEffect(() => {
    viewMangaFun(user, project.viewManga, project._id);
  }, []);

  useEffect(() => {
    if (currentChapterId) {
      updateChapterCommentsInfo();
    } else {
      updateCommentsInfo();
    }
  }, [currentChapterId]);

  useEffect(() => {
    if (!areCommentsOpened) {
      setCurrentChapterId(null);
    }
  }, [areCommentsOpened]);

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
    return unSubscribeOfProject(subscription?._id, project?._id)
      .then((res) => {
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

  function updateChapterCommentsInfo() {
    const jwt = client.getCookie('feathers-jwt');
    client
      .service('/api/v2/comment-chapter')
      .find({
        query: {
          chapterId: currentChapterId,
          $sort: { createdAt: -1 },
          $limit: 1000,
        },
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then((res) => {
        setChapterComments(res);
      })
      .catch((err) => console.log(err));
  }

  function createChapterOrProjectComment(text, commentType) {
    if (!user) {
      setIsSignInModalOpened(true);
      return;
    }
    if (commentType === 'chapter') {
      createChapterComment(text, currentChapterId, user?._id)
        .then((res) => {
          updateChapterCommentsInfo();
        })
        .catch((err) => console.log(err));
    }
    if (commentType === 'project') {
      createComment(text, project?._id)
        .then((res) => {
          updateCommentsInfo();
        })
        .catch((err) => console.log(err));
    }
  }

  // function createProjectComment(text) {
  //   if (!user) {
  //     setIsSignInModalOpened(true);
  //     // notification.error({
  //     //   message: 'You need to be logged in to comment',
  //     //   placement: 'bottomLeft',
  //     // });
  //     return;
  //   }
  //   createComment(text, project?._id)
  //     .then((res) => {
  //       updateCommentsInfo();
  //     })
  //     .catch((err) => console.log(err));
  // }

  // function createCommentChapter(text) {
  //   if (!user) {
  //     setIsSignInModalOpened(true);
  //     // notification.error({
  //     //   message: 'You need to be logged in to comment',
  //     //   placement: 'bottomLeft',
  //     // });
  //     return;
  //   }
  //   createChapterComment(text, currentChapterId, user?._id)
  //     .then((res) => {
  //       updateChapterCommentsInfo();
  //     })
  //     .catch((err) => console.log(err));
  // }

  function onCommentClick(chapterId) {
    setCurrentChapterId(chapterId);
    setAreCommentsOpened(true);
  }

  return (
    <div className={styles.project}>
      <SignInModal
        title={'Sign in to like or comment'}
        page={'/project/' + project?._id}
        visible={isSignInModalOpened}
        setVisible={setIsSignInModalOpened}
      />
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
            onCommentClick={onCommentClick}
            setIsSignInModalOpened={setIsSignInModalOpened}
          />
          <div className={styles.project__comments}>
            <MangaComments
              manga={project?.storyBoards.data[0]}
              comments={comments.data}
              createComment={(text) => createChapterOrProjectComment(text, 'project')}
            />
          </div>
        </div>
      </div>

      <MangaSideMenu
        manga={project?.storyBoards.data[0]}
        areCommentsOpened={areCommentsOpened}
        setAreCommentsOpened={setAreCommentsOpened}
        user={user}
        setIsShareModalOpened={setIsShareModalOpened}
        authors={[project?.authorInfo]}
        comments={currentChapterId ? chapterComments : comments}
        createComment={(text) =>
          createChapterOrProjectComment(text, currentChapterId ? 'chapter' : 'project')
        }
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
