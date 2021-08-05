import React, { useEffect, useState } from 'react';

import { Tabs, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import { Chat } from 'components/chat';
import { Comments } from 'components/comments';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';

import BannerSection from './components/bannersSection/index';
import HeaderCollab from './components/headerCollab';
import StoryBoardTabs from './components/storyBoardTabs';
import TabPaneStory from './components/tabPaneStory/index';
import styles from './styles.module.scss';

// const StoryBoardTabs = dynamic(() => import('./components/storyBoardTabs'), {
//   loading: () => <Spin />,
// });

const { TabPane } = Tabs;
// const { TextArea } = Input;

const MangaStory = (props) => {
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
  const [showPayPalToggle, setShowPayPalToggle] = useState(mangaStory.payPalPublished);
  const [canEdit] = useState(isOwn);
  const [collabActiveTab, setCollabActiveTab] = useState('1');

  useEffect(() => {
    const { tab } = qs.parse(location.search);
    switch (tab) {
      case 'story':
        setCollabActiveTab('1');
        break;
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

  const saveUserDataByKey = (newBaseData, ...keys) => {
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

  const onChangeSingleField = ({ target }) => {
    const { name, value } = target;
    const data = { ...baseData, [name]: value };
    setBaseData(data);
    setEditMode(true);
  };

  const cancelEditMode = () => {
    setEditMode(false);
  };

  return (
    <div className="story_page">
      <NextSeo
        title={mangaStory?.title}
        description={`${mangaStory?.description} ${baseData.story}`}
        canonical={`http://mangafy.club/manga-story/${mangaStory._id}`}
        openGraph={{
          url: `http://mangafy.club/manga-story/${mangaStory._id}`,
          title: mangaStory?.title,
          description: `${mangaStory?.description} ${baseData.story}`,
          type: 'article',
          images: [
            {
              url:
                client.UPLOAD_URL + mangaStory?.image ||
                'https://mangafy.club/img/collab_baner.webp',
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
        <Header path="mangaStory" user={user} />
        <div className={cn(styles.pageWrap, 'manga-story-page')}>
          <HeaderCollab
            isOwn={isOwn}
            user={user}
            mangaStory={mangaStory}
            openNotification={openNotification}
            originUrl={originUrl}
            setCollabActiveTab={setCollabActiveTab}
            baseData={baseData}
            setBaseData={setBaseData}
            onChangeSingleField={onChangeSingleField}
            editTitle={editTitle}
            collabActiveTab={collabActiveTab}
            stage={stage}
            canEdit={canEdit}
            setEditTitle={setEditTitle}
            saveUserDataByKey={saveUserDataByKey}
            setShowPayPalToggle={setShowPayPalToggle}
          />
          <section className={cn(`container mobile_full_content mobile_top_round`, styles.section)}>
            <div className="row">
              <div className={cn('col-lg-7 mangaStoriTopPanel', styles.story_page)}>
                <Tabs
                  activeKey={collabActiveTab}
                  onChange={(activeKey) => setCollabActiveTab(activeKey)}>
                  <TabPane tab="STORY" key="1" className="story">
                    <TabPaneStory
                      mangaStory={mangaStory}
                      setBaseData={setBaseData}
                      baseData={baseData}
                      isOwn={isOwn}
                      user={user}
                      isParticipant={isParticipant}
                      editMode={editMode}
                      canEdit={canEdit}
                      setEditMode={setEditMode}
                      onChangeSingleField={onChangeSingleField}
                      cancelEditMode={cancelEditMode}
                      saveUserDataByKey={saveUserDataByKey}
                      showPayPalToggle={showPayPalToggle}
                    />
                  </TabPane>

                  {(isOwn || hasStoryBoardPermision) && (
                    <TabPane tab="STORY BOARD" key="2" className="story">
                      <StoryBoardTabs
                        setStage={setStage}
                        mangaStory={mangaStory}
                        user={user}
                        openNotification={openNotification}
                        originUrl={originUrl}
                        participentsInfo={baseData.participentsInfo}
                        baseData={baseData}
                        setBaseData={setBaseData}
                      />
                    </TabPane>
                  )}
                  <TabPane tab="COMMENTS" key="3">
                    <div className={styles.tabWrap}>
                      <Comments
                        commentsData={comments}
                        isOwn={isOwn}
                        mangaStory={baseData}
                        user={user}
                      />
                    </div>
                  </TabPane>
                  {user &&
                    (baseData?.participentsInfo?.find((item) => item._id === user._id) ||
                      baseData?.author === user._id) && (
                      <TabPane tab="TEAM CHAT" key="4">
                        <div className={styles.tabWrap}>
                          <Chat
                            mangaStory={baseData}
                            user={user}
                            isOwn={isOwn}
                            collabActiveTab={collabActiveTab}
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
              saveUserDataByKey={saveUserDataByKey}
              setBaseData={setBaseData}
              openNotification={openNotification}
            />
          </section>
        </div>
        <Footer />
        <FooterPolicy />
        <FooterLogin user={user} />
      </main>
    </div>
  );
};

MangaStory.propTypes = {
  genres: PropTypes.array.isRequired,
  mangaStory: PropTypes.object.isRequired,
  user: PropTypes.object,
  isOwn: PropTypes.bool.isRequired,
  originUrl: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  hasStoryBoardPermision: PropTypes.bool.isRequired,
  isParticipant: PropTypes.bool,
};

MangaStory.defaultProps = {
  user: null,
  isParticipant: false,
};

export default MangaStory;
