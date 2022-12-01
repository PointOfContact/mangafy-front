import React, { useCallback, useEffect, useState } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import { findStoryBoard } from 'api/storyBoardClient';
import cn from 'classnames';
import { Chat } from 'components/chat';
import { Comments } from 'components/comments';
import DeleteProjectModal from 'components/deleteProjectModal';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import { deleteTagsFromString, viewManga } from 'components/gallery/utils';
import HeaderNew from 'components/headerNew';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { EVENTS } from 'helpers/amplitudeEvents';
import { NextSeo } from 'next-seo';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import EditMode from './components/editMode';
import HeaderCollab from './components/headerCollab';
import Settings from './components/settings';
import styles from './styles.module.scss';
import ProjectSidebar from 'components/ProjectSidebar';

import Hero from 'components/Hero';
import Idea from 'components/Idea';
import Chapter from './components/chapter';
import DragDrop from './components/dragDrop';
import Preview from './components/preview';
import Publish from './components/publish';
import ProjectMobileMenu from 'components/ProjectMobileMenu';
import Edit from 'components/icon/new/Edit';
import Edit2 from 'components/icon/new/Edit2';
import Planet from 'components/icon/new/Planet';
import Button from 'components/ui-new/Button';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import ArrowDown from 'components/icon/new/ArrowDown';
import getDeviceId from 'utils/deviceId';
import { viewMangaFun } from 'utils';

const tabs = {
  DETAILS: 'details',
  PLOT: 'plot',
  ASSETS: 'assets',
  EPISODES: 'episodes',
  COMMENTS: 'comments',
  MESSAGES: 'messages',
  SETTINGS: 'settings',
  PUBLISH: 'publish',
};

const MangeStory = (props) => {
  const {
    mangaStory,
    user,
    isOwn,
    originUrl,
    comments,
    genres,
    isParticipant,
    hasStoryBoardPermision,
  } = props;
  const [stage, setStage] = useState({});
  const [editMode, setEditMode] = useState(false);
  // const [editTitle, setEditTitle] = useState(false);
  const [baseData, setBaseData] = useState(mangaStory);
  const [userData, setUserData] = useState(user);
  const [showPayPalContent, setShowPayPalContent] = useState(baseData?.payPalPublished);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [canEdit] = useState(isOwn);
  const [chapters, setChapters] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    setSidebarCollapsed(true);
  }, [isMobile]);
  const router = useRouter();

  const hashPath = router.asPath.split('#')[1];
  useEffect(() => {
    if (hashPath) {
      router.push('#' + hashPath);
    }
  }, [router.asPath]);

  const routerBasePath = `/project/production/${baseData?._id}?tab=`;
  const [storyBoard, setStoryBoard] = useState({
    idea: {
      title: '',
      text: '',
    },
    pages: [],
    heroes: [],
    author: [],
    layouts: [],
    chapters: [],
  });

  useEffect(() => {
    setChapters(storyBoard?.chapters);
  }, [storyBoard]);

  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(router.query.tab || tabs.DETAILS);
  }, [router.query?.tab]);

  const onResize = () => {
    if (window.innerWidth < 1000) setIsMobile(true);
    else setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    const data = {
      event_type: EVENTS.OPENED_MANGA_STORY,
      event_properties: {
        mangaStory: baseData,
        mangaStoryId: baseData._id,
      },
    };
    setActiveTab(router.query.tab || tabs.DETAILS);
    viewMangaFun(user, baseData.viewManga, baseData._id);
    myAmplitude(data);
    if (window.innerWidth < 568) setIsMobile(true);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // useEffect(() => {
  //   router.push(
  //     `/project/production/${mangaStory._id}?tab=${activeTab}` +
  //       (router.query?.task ? `&task=${router.query.task}` : '')
  //   );
  // }, [activeTab]);

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
      placement: 'bottomLeft',
    });
  };

  const getStoryBoard = useCallback(() => {
    if (!userData) return;
    findStoryBoard(
      userData._id,
      mangaStory._id,
      (res) => {
        setStoryBoard(res?.data[0]);
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
  }, [userData, mangaStory?._id]);

  useEffect(() => {
    getStoryBoard();
  }, [user, getStoryBoard]);

  const saveMangaStoryData = (newBaseData, reject = () => {}, ...keys) => {
    const data = {};
    keys.forEach((item) => {
      data[item] = newBaseData[item];
    });

    data.mangaStoryId = baseData._id;

    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/manga-stories')
        .patch(newBaseData._id, data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setEditMode(false);
          // setEditTitle(false);
          setBaseData(res);
        })
        .catch((err) => {
          // reject(err.message);
          console.log(err);
          // openNotification('error', err.message);
        });
    });
  };

  const onChangeSingleField = ({ target }, reject = () => {}) => {
    const { name, value } = target;
    const data = { ...baseData, [name]: value };
    setBaseData(data);
    // setEditMode(true);
    saveMangaStoryData(data, reject, name);
  };

  const cancelEditMode = () => {
    setEditMode(false);
  };

  const confirmDelete = (userId, mangaId) => {
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/manga-stories')
        .remove(mangaId, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then(() => {})
        .catch((err) => {
          if (err.code === 404) {
            Router.push(`/profile/${userId}`);
          } else {
            notification.error({
              message: err.message,
              placement: 'bottomLeft',
            });
          }
        });
    });
  };

  const description = (desc, story) => {
    story = deleteTagsFromString(story);
    let decResult = '';
    if (desc) {
      if (story) {
        decResult = desc + story;
      }
      decResult = desc;
    } else if (story) {
      decResult = story;
    }
    return decResult;
  };

  const slot = isOwn && {
    left: (
      <div className={styles.workspaceLink}>
        <Link href={'/profile/' + user?._id}>
          <a className={styles.workspaceLink_link}>{'My workspace'}</a>
        </Link>
        <span>{' / '}</span>
        <span>{baseData.title}</span>
      </div>
    ),
  };

  const ProjectHeader = () => {
    return (
      <>
        <div className={styles.workspaceLink}>
          <Link href={'/profile/' + user._id + '/projects'}>
            <a className={styles.workspaceLink_link}>My projects</a>
          </Link>
          <span>&nbsp;/&nbsp;</span>
          <span>{baseData.title}</span>
          <span>&nbsp;/&nbsp;</span>
          <span>{activeTab}</span>
        </div>
        <h2 className={styles.sectionTitle}>
          {activeTab}
          {activeTab === tabs.DETAILS && !editMode && (
            <span
              onClick={() => {
                setEditMode(true);
              }}>
              <Edit2 color="#777" />
            </span>
          )}
        </h2>
      </>
    );
  };

  return (
    <div className={'story_page'}>
      <NextSeo
        title={baseData?.title}
        description={description(baseData?.description, baseData?.story)}
        canonical={`${client.API_ENDPOINT}/project/production/${baseData?._id}`}
        openGraph={{
          url: `${client.API_ENDPOINT}/project/production/${baseData?._id}`,
          title: baseData?.title,
          description: description(baseData?.description, baseData?.story),
          type: 'article',
          images: [
            {
              url: !!mangaStory?.image
                ? client.UPLOAD_URL + mangaStory?.image
                : `${client.API_ENDPOINT}/img/collab_baner.webp`,
              width: 800,
              height: 600,
              alt: 'Manga Story Image',
            },
          ],
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      {(isOwn || isParticipant) &&
        (isMobile ? (
          <ProjectMobileMenu
            routerBasePath={routerBasePath}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <ProjectSidebar
            routerBasePath={routerBasePath}
            onCollapsedChange={(coll) => setSidebarCollapsed(coll)}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      <ButtonToTop user={user} />
      <main
        className={cn('main_back_2', styles.main, !sidebarCollapsed && styles.sidebarCollapsed)}
        style={{ background: '#fafafa' }}>
        {!(isOwn || isParticipant) && <HeaderNew user={userData} />}
        <div
          className={cn(styles.pageWrap, !isMobile && styles.pageWrap_desktop, 'manga-story-page')}>
          {isOwn ? (
            <ProjectHeader />
          ) : (
            <HeaderCollab
              isOwn={isOwn}
              user={user}
              mangaStory={mangaStory}
              openNotification={openNotification}
              originUrl={originUrl}
              baseData={baseData}
              setBaseData={setBaseData}
              onChangeSingleField={onChangeSingleField}
              stage={stage}
              canEdit={canEdit}
              saveMangaStoryData={saveMangaStoryData}
            />
          )}

          <section className={cn(`container mobile_full_content`, styles.section)}>
            {activeTab === tabs.DETAILS && (
              <EditMode
                user={userData}
                editMode={editMode}
                baseData={baseData}
                isOwn={isOwn}
                setBaseData={setBaseData}
                setEditMode={setEditMode}
                canEdit={canEdit}
                isParticipant={isParticipant}
                onChangeSingleField={onChangeSingleField}
                cancelEditMode={cancelEditMode}
                saveMangaStoryData={saveMangaStoryData}
                userData={userData}
                showPayPalContent={showPayPalContent}
              />
            )}
            {activeTab === tabs.PLOT && <Idea storyBoard={storyBoard} user={user} />}
            {activeTab === tabs.ASSETS && (
              <Hero
                storyBoard={storyBoard}
                setStoryBoard={setStoryBoard}
                getStoryBoard={getStoryBoard}
                user={user}
              />
            )}
            {activeTab === tabs.EPISODES && (
              <Chapter
                storyBoard={storyBoard}
                setStoryBoard={setStoryBoard}
                chapters={chapters}
                setChapters={setChapters}
                user={user}
                baseData={baseData}
              />
            )}
            {activeTab === tabs.PUBLISH && (
              <Publish baseData={baseData} storyBoard={storyBoard} chapters={chapters} />
            )}
            {activeTab === tabs.COMMENTS && (
              <Comments
                commentsData={comments}
                isOwn={isOwn}
                mangaStory={baseData}
                user={userData}
              />
            )}
            {activeTab === tabs.MESSAGES && (
              <Chat mangaStory={baseData} user={userData} isOwn={isOwn} />
            )}
            {activeTab === tabs.SETTINGS && (
              <Settings
                baseData={baseData}
                genres={genres}
                onChangeSingleField={onChangeSingleField}
                saveMangaStoryData={saveMangaStoryData}
                getStoryBoard={getStoryBoard}
                setBaseData={setBaseData}
                openNotification={openNotification}
                originUrl={originUrl}
                userData={userData}
                setUserData={setUserData}
                showPayPalContent={showPayPalContent}
                setShowPayPalContent={setShowPayPalContent}
                confirmDelete={confirmDelete}
                storyBoard={storyBoard}
                chapters={chapters}
                setChapters={setChapters}
              />
            )}
            {/* {!isOwn && (
              <Comments
                commentsData={comments}
                isOwn={isOwn}
                mangaStory={baseData}
                user={userData}
              />
            )} */}
          </section>
          <section>
            {/* <BannerSection
              originUrl={originUrl}
              canEdit={canEdit}
              baseData={baseData}
              editMode={editMode}
              genres={genres}
              saveMangaStoryData={saveMangaStoryData}
              setBaseData={setBaseData}
              openNotification={openNotification}
              isOwn={isOwn}
              user={userData}
            /> */}
          </section>
        </div>
        {!userData && <Footer user={user} />}
        {!userData && <FooterPolicy />}
        <FooterLogin user={userData} />
      </main>
      <DeleteProjectModal
        user={userData}
        mangaStory={baseData}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

MangeStory.propTypes = {
  genres: PropTypes.array.isRequired,
  mangaStory: PropTypes.object.isRequired,
  user: PropTypes.object,
  isOwn: PropTypes.bool.isRequired,
  originUrl: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  hasStoryBoardPermision: PropTypes.bool.isRequired,
  isParticipant: PropTypes.bool,
};

MangeStory.defaultProps = {
  user: null,
  isParticipant: false,
};

export default MangeStory;
