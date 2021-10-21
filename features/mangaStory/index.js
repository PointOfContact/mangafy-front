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
import { NextSeo } from 'next-seo';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import BannerSection from './components/bannersSection/index';
import EditMode from './components/editMode';
import HeaderCollab from './components/headerCollab';
import Settings from './components/settings';
import StoryBoardTabs from './components/storyBoardTabs';
import styles from './styles.module.scss';

const { TabPane } = Tabs;

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
  const [editTitle, setEditTitle] = useState(false);
  const [baseData, setBaseData] = useState(mangaStory);
  const [userData, setUserData] = useState(user);
  const [showPayPalContent, setShowPayPalContent] = useState(baseData?.payPalPublished);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [canEdit] = useState(isOwn);
  const [collabActiveTab, setCollabActiveTab] = useState('1');
  const router = useRouter();
  const [storyBoard, setStoryBoard] = useState({
    idea: {
      title: '',
      text: '',
    },
    pages: [],
    heroes: [],
    author: [],
    layouts: [],
  });

  useEffect(() => {
    const tab = router.query.create === 'true' ? 'settings' : 'story';
    switch (tab) {
      case 'story-board':
        setCollabActiveTab('2');
        break;
      case 'comments':
        setCollabActiveTab('3');
        break;
      case 'invites':
        user
          ? setCollabActiveTab('4')
          : Router.push(`/sign-in?page=manga-story/${mangaStory._id}?tab=invites`);
        break;
      case 'settings':
        setCollabActiveTab('5');
        break;
      default:
        setCollabActiveTab('1');
    }
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
          setEditTitle(false);
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
      <main className="main_back_2">
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
            editTitle={editTitle}
            collabActiveTab={collabActiveTab}
            stage={stage}
            canEdit={canEdit}
            setEditTitle={setEditTitle}
            saveMangaStoryData={saveMangaStoryData}
          />
          <section className={cn(`container mobile_full_content mobile_top_round`, styles.section)}>
            <div className="row">
              <div className={cn('col-lg-7 mangaStoriTopPanel', styles.story_page)}>
                <Tabs
                  activeKey={collabActiveTab}
                  onChange={(activeKey) => setCollabActiveTab(activeKey)}>
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
                    <TabPane tab="CREATE" key="2" className="story">
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
                            storyBoard={storyBoard}
                            setBaseData={setBaseData}
                            openNotification={openNotification}
                            originUrl={originUrl}
                            userData={userData}
                            setUserData={setUserData}
                            showPayPalContent={showPayPalContent}
                            setShowPayPalContent={setShowPayPalContent}
                          />
                        </div>
                      </TabPane>
                    )}
                </Tabs>
              </div>
            </div>
          </section>
          <section>
            <BannerSection
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
            />
          </section>
        </div>
        {!userData && <Footer />}
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
