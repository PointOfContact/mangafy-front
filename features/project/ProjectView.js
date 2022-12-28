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
import { useRouter } from 'next/router';
import notification from 'antd/lib/notification';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';
import FeedCreateButton from 'components/FeedCreateButton';
import { SignInModal } from 'components/modals/SignInModal';
import { viewMangaFun } from 'utils';
import getDeviceId from 'utils/deviceId';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Button from 'components/ui-new/Button';
import { Upload } from 'antd';
import ConfirmModal from 'components/modals/ConfirmModal';
import HeroUpload from 'components/ui-elements/heroUpload';
import cn from 'classnames';
import Close from 'components/icon/new/Close';
import mangaStoryClient from 'api/mangaStoryClient';
import beforeUploadFromAMZ from 'utils/upload';

const ProjectView = ({ ssProject, ssComments, user }) => {
  const router = useRouter();
  const [project, setProject] = useState(ssProject);
  const [comments, setComments] = useState(ssComments);
  const [chapterComments, setChapterComments] = useState({ data: [] });
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [areCommentsOpened, setAreCommentsOpened] = useState(false);
  const [isShareModalOpened, setIsShareModalOpened] = useState(false);
  const [isGoToSettingsModalOpened, setIsGoToSettingsModalOpened] = useState(false);
  const [isSignInModalOpened, setIsSignInModalOpened] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    viewMangaFun(user, project.viewManga, project._id);
    getDeviceId(setDeviceId);
    if (project.image)
      setFileList([
        {
          uid: '-1',
          url: client.UPLOAD_URL + project?.image,
          status: 'done',
        },
      ]);
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

  const subscription = project?.subscribers?.find(
    (sb) => sb.userId === user?._id || sb.userId === deviceId
  );

  function subscribe(email) {
    return subscribeToProject(project._id, user?._id || deviceId, email)
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

  function onCommentClick(chapterId) {
    setCurrentChapterId(chapterId);
    setAreCommentsOpened(true);
  }

  function onCoverUpload(info) {
    const newFileList = [...info.fileList];
    const file = newFileList[0];
    setFileList(newFileList);
  }

  const setMangaPhoto = (image) => {
    const jwt = client.getCookie('feathers-jwt');
    const data = { image };
    client
      .service('/api/v2/manga-stories')
      .patch(project?._id, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        updateProjectInfo();
      })
      .catch((err) => {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
      });
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      notification.error({ message: 'You can only upload JPG/PNG file!', placement: 'bottomLeft' });
    }

    const isLt2M = file.size / 1024 / 1024 < 50;

    if (!isLt2M) {
      notification.error({ message: 'Image must smaller than 50MB!', placement: 'bottomLeft' });
    }

    if (isJpgOrPng && isLt2M) {
      beforeUploadFromAMZ(
        file,
        setMangaPhoto,
        () => {},
        () => {}
      );
    }

    return isJpgOrPng && isLt2M;
  };

  const ifAdmin = user?._id === project?.author;

  return (
    <div className={styles.project}>
      <NextSeo
        title={project?.title}
        description={project?.story}
        canonical={`${client.API_ENDPOINT}/project/${project?._id}`}
        openGraph={{
          url: `${client.API_ENDPOINT}/project/${project?._id}`,
          title: project?.title,
          description: project?.story,
          type: 'article',
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
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
            {ifAdmin && (
              <div className={styles.project__coverOverlay}>
                <div className={styles.project__coverTitle}>Change Cover Image</div>
                <div className={styles.project__coverSubtitle}>Optimal dimensions 3200x410px</div>
                {/* <Link href={'/project/production/' + project?._id + '?tab=settings#cover'}>
                  <a> */}
                <div className={styles.project__coverButtons}>
                  <Upload
                    disabled={false}
                    accept="image/jpg, image/png, image/jpeg"
                    itemRender={(originNode, file, fileList, actions) => {
                      return (
                        <Button
                          className={styles.removeCover}
                          md
                          rounded
                          pink
                          outline
                          onClick={actions.remove}>
                          Remove
                        </Button>
                      );
                    }}
                    maxCount={1}
                    fileList={fileList}
                    onChange={onCoverUpload}
                    beforeUpload={beforeUpload}
                    onRemove={() => {
                      setMangaPhoto('');
                    }}
                    onPreview={() => {}}>
                    <Button md rounded pink>
                      Change image
                    </Button>
                  </Upload>
                </div>
              </div>
            )}
            <Imgix layout="fill" objectFit="cover" src={client.UPLOAD_URL + project?.image} />
          </div>
        )}
        <div className={styles.project__coverUpload}></div>
        <div className={styles.project__content}>
          <ProjectInfo
            className={styles.project__info}
            project={project}
            user={user}
            updateProjectInfo={updateProjectInfo}
            subscribe={subscribe}
            unsubscribe={unsubscribe}
            subscription={subscription}
            isOwner={isOwner}
          />
          <ProjectChapters
            isParticipant={isParticipant}
            isOwner={isOwner}
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
        isPublished={project?.published}
        areCommentsOpened={areCommentsOpened}
        setAreCommentsOpened={setAreCommentsOpened}
        user={user}
        setIsShareModalOpened={setIsShareModalOpened}
        setIsGoToSettingsModalOpened={setIsGoToSettingsModalOpened}
        authors={[project?.authorInfo]}
        comments={currentChapterId ? chapterComments : comments}
        createComment={(text) =>
          createChapterOrProjectComment(text, currentChapterId ? 'chapter' : 'project')
        }
        isParticipant={isParticipant || isOwner}
        setIsLoginModalVisible={setIsSignInModalOpened}
      />

      <ShareModal
        isShareModalOpened={isShareModalOpened}
        setIsShareModalOpened={setIsShareModalOpened}
        shareUrl={client.API_ENDPOINT + '/project/' + project?._id}
      />

      <ConfirmModal
        isOpen={isGoToSettingsModalOpened}
        setIsOpen={setIsGoToSettingsModalOpened}
        question={'Publish your project before sharing it'}
        description='Please, go to the settings and set "Is visible" to "Visible"'
        okText={'Go to settings'}
        onOk={() => {
          router.push('/project/production/' + project?._id + '?tab=settings#visible');
        }}
        cancelText={'Cancel'}
      />
    </div>
  );
};

export default ProjectView;
