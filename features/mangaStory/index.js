import React, { useCallback, useEffect, useState } from 'react';

import { Tabs, notification } from 'antd';
import client from 'api/client';
import { findStoryBoard } from 'api/storyBoardClient';
import cn from 'classnames';
import { Chat } from 'components/chat';
import { Comments } from 'components/comments';
import DeleteProjectModal from 'components/deleteProjectModal';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { EVENTS } from 'helpers/amplitudeEvents';
import { NextSeo } from 'next-seo';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import EditMode from './components/editMode';
import HeaderCollab from './components/headerCollab';
import Settings from './components/settings';
import StoryBoardTabs from './components/storyBoardTabs';
import styles from './styles.module.scss';

const { TabPane } = Tabs;
const tabsArray = ['', 'story', 'create', 'comments', 'team_chat', 'settings'];

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
  const router = useRouter();
  const pathPage = router.query.page || 'plot';
  const [currentPage, setCurrentPage] = useState(pathPage);
  const [collabActiveTab, setCollabActiveTab] = useState('1');
  const { manga } = router.query;
  const ifCreatedManga = manga === 'create';

  const routerBasePath = `/manga-story/${baseData?._id}?tab=`;
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
    const { tab } = router.query;

    switch (tab) {
      case 'story':
        setCollabActiveTab('1');
        break;
      case 'create':
        setCollabActiveTab('2');
        break;
      case 'comments':
        setCollabActiveTab('3');
        break;
      case 'team_chat':
        user
          ? setCollabActiveTab('4')
          : Router.push(`/sign-in?page=manga-story/${mangaStory._id}?tab=team_chat`);
        break;
      case 'settings':
        setCollabActiveTab('5');
        break;
      default:
        break;
    }

    const data = {
      event_type: EVENTS.OPENED_MANGA_STORY,
      event_properties: {
        mangaStory: baseData,
        mangaStoryId: baseData._id,
      },
      user_id: user?._id,
      user_properties: {
        ...user,
      },
    };

    myAmplitude(data);
  }, []);

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

  const saveMangaStoryData = (newBaseData, ...keys) => {
    const data = {};
    keys.forEach((item) => {
      data[item] = newBaseData[item];
    });

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
          openNotification('error', err.message);
        });
    });
  };

  const onChangeSingleField = ({ target }, changeCollabData = false) => {
    const { name, value } = target;
    const data = { ...baseData, [name]: value };
    setBaseData(data);
    setEditMode(true);
    changeCollabData && saveMangaStoryData(data, name);
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

  const tabChange = (activeKey) => {
    const ifCreate = activeKey === '2' ? `&page=${currentPage}` : '';
    const path = `${routerBasePath}${tabsArray[activeKey]}${ifCreate}`;
    Router.push(path, undefined, { shallow: true });

    setCollabActiveTab(activeKey);
  };

  return (
    <div className="story_page">
      <NextSeo
        title={baseData?.title}
        description={baseData?.description + baseData?.story}
        canonical={`${client.API_ENDPOINT}/manga-story/${baseData?._id}`}
        openGraph={{
          url: `${client.API_ENDPOINT}/manga-story/${baseData?._id}`,
          title: baseData?.title,
          description: baseData?.description + baseData?.story,
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
      <ButtonToTop />
      <main className="main_back_2" style={{ background: '#fafafa' }}>
        <Header path="mangaStory" user={userData} />
        <div className={cn(styles.pageWrap, 'manga-story-page')}>
          <HeaderCollab
            isOwn={isOwn}
            user={user}
            mangaStory={mangaStory}
            openNotification={openNotification}
            originUrl={originUrl}
            baseData={baseData}
            setBaseData={setBaseData}
            onChangeSingleField={onChangeSingleField}
            // editTitle={editTitle}
            collabActiveTab={collabActiveTab}
            stage={stage}
            canEdit={canEdit}
            // setEditTitle={setEditTitle}
            saveMangaStoryData={saveMangaStoryData}
          />
          <section className={cn(`container mobile_full_content mobile_top_round`, styles.section)}>
            <div className="row">
              <div className={cn('col-lg-7 mangaStoriTopPanel', styles.story_page)}>
                <Tabs activeKey={collabActiveTab} onChange={tabChange}>
                  <TabPane tab="STORY" key="1" className="story">
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
                  </TabPane>
                  {(isOwn || hasStoryBoardPermision) && (
                    <TabPane
                      tab={
                        <p className={cn(styles.create, ifCreatedManga && styles.create_animation)}>
                          CREATE
                        </p>
                      }
                      key="2"
                      className="story">
                      <StoryBoardTabs
                        setStage={setStage}
                        user={userData}
                        openNotification={openNotification}
                        originUrl={originUrl}
                        participentsInfo={baseData.participentsInfo}
                        baseData={baseData}
                        setBaseData={setBaseData}
                        storyBoard={storyBoard}
                        getStoryBoard={getStoryBoard}
                        setStoryBoard={setStoryBoard}
                        setCurrentPage={setCurrentPage}
                      />
                    </TabPane>
                  )}
                  <TabPane tab="COMMENTS" key="3">
                    <div className={styles.tabWrap}>
                      <Comments
                        commentsData={comments}
                        isOwn={isOwn}
                        mangaStory={baseData}
                        user={userData}
                      />
                    </div>
                  </TabPane>
                  {userData &&
                    (baseData?.participentsInfo?.find((item) => item._id === userData?._id) ||
                      baseData?.author === userData?._id) && (
                      <TabPane tab="TEAM CHAT" key="4">
                        <div className={styles.tabWrap}>
                          <Chat
                            mangaStory={baseData}
                            user={userData}
                            isOwn={isOwn}
                            collabActiveTab={collabActiveTab}
                          />
                        </div>
                      </TabPane>
                    )}
                  {userData &&
                    isOwn &&
                    (baseData?.participentsInfo?.find((item) => item._id === userData?._id) ||
                      baseData?.author === userData?._id) && (
                      <TabPane tab="SETTINGS" key="5">
                        <div className={styles.tabWrap}>
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
                          />
                        </div>
                      </TabPane>
                    )}
                </Tabs>
              </div>
            </div>
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
        {!userData && <Footer />}
        {!userData && <FooterPolicy />}
        <FooterLogin user={userData} />
      </main>
      <FooterPolicy />
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
