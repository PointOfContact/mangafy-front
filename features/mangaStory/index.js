import React, { useEffect, useState } from 'react';

import { Tabs, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import { Chat } from 'components/chat';
import { Comments } from 'components/comments';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import SvgPencilColored from 'components/icon/PencilColored';
import PrimaryButton from 'components/ui-elements/button';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Input from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
// import dynamic from 'next/dynamic';
import Head from 'next/head';
import PropTypes from 'prop-types';
import * as qs from 'query-string';

import BannerSection from './components/bannersSection';
import StoryBoardTabs from './components/storyBoardTabs';
import StoryTab from './components/storyTab';
import styles from './styles.module.scss';

// const StoryBoardTabs = dynamic(() => import('./components/storyBoardTabs'), {
//   loading: () => <Spin />,
// });

const { TabPane } = Tabs;
// const { TextArea } = Input;

const MangeStory = (props) => {
  const { mangaStory, user, requests, isOwn, originUrl, comments, genres } = props;
  const [editMode, setEditMode] = useState(false);
  const [baseData, setBaseData] = useState(mangaStory);
  const [canEdit] = useState(isOwn);
  const [collabActiveTab, setcollabActiveTab] = useState('1');

  useEffect(() => {
    const { tab } = qs.parse(location.search);
    switch (tab) {
      case 'srory':
        setcollabActiveTab('1');
        break;
      case 'story-board':
        setcollabActiveTab('2');
        break;
      case 'comments':
        setcollabActiveTab('3');
        break;
      default:
        setcollabActiveTab('1');
    }
  }, []);

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
    });
  };

  const saveUserDataByKey = (...keys) => {
    const data = {};
    keys.forEach((item) => {
      data[item] = baseData[item];
    });
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/manga-stories')
        .patch(baseData._id, data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setEditMode(false);
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
      <Head>
        <title>MangaFY - All graphic novel enthusiast, all genres, one Place </title>
        <meta name="description" content={mangaStory.story}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ButtonToTop />
      <main className="main_back_2">
        <Header path="mangaStory" user={user} />
        <div className={cn(styles.pageWrap, 'manga-story-page')}>
          <section className="section_landing_for">
            <div className="mangafy_vontainer  container">
              <div className="row">
                <div className="col-sm-12 manga-story manga-story-m">
                  {!editMode ? (
                    <div className={styles.storyTabContent}>
                      <div className={styles.header}>
                        <h2>{baseData.title}</h2>
                      </div>
                      {canEdit && (
                        <SvgPencilColored
                          className={styles.editSVG}
                          onClick={() => setEditMode(true)}
                          width="22px"
                          height="22px"
                        />
                      )}
                    </div>
                  ) : (
                    canEdit && (
                      <>
                        <div className={styles.inputs}>
                          <h2>
                            <Input
                              isLinear={true}
                              isFullWidth={true}
                              name="title"
                              onChange={onChangeSingleField}
                              placeholder=""
                              type="text"
                              value={baseData.title}
                            />
                          </h2>
                        </div>
                        <div className={cn(styles.editProfile, 'buttonsProfile_styles')}>
                          <PrimaryButton
                            className="buttonsProfile_cancel"
                            text="Cancel"
                            isDark
                            isRound
                            disabled={false}
                            onClick={cancelEditMode}
                          />
                          <PrimaryButton
                            className="buttonsProfile_save"
                            text="save"
                            isActive
                            isRound
                            disabled={false}
                            onClick={() => saveUserDataByKey('title')}
                          />
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className={`container mobile_full_content mobile_top_round`}>
            <div className="row">
              <div className="col-lg-7 mangaStoriTopPanel">
                <Tabs
                  activeKey={collabActiveTab}
                  onChange={(activeKey) => setcollabActiveTab(activeKey)}>
                  <TabPane tab="STORY" key="1" className="story">
                    <div className={styles.tabWrap}>
                      {/* <h3 className={styles.tabTitle}>Here is a my story!</h3> */}
                      {/* <StoryTab baseData={baseData} /> */}
                      <p>
                        {!editMode ? (
                          <div>
                            <StoryTab baseData={baseData} user={user} isOwn={isOwn} />
                            {canEdit && (
                              <SvgPencilColored
                                className={styles.editTitleSvg}
                                onClick={() => setEditMode(true)}
                                width="22px"
                                height="22px"
                              />
                            )}
                          </div>
                        ) : (
                          canEdit && (
                            <>
                              <TextArea
                                isFullWidth={true}
                                placeholder="Type here..."
                                value={baseData.introduce}
                                onChange={onChangeSingleField}
                                type="text"
                                className={styles.textarea_text}
                                name="introduce"
                              />
                              <TextArea
                                isFullWidth={true}
                                placeholder="Type here..."
                                value={baseData.story}
                                onChange={onChangeSingleField}
                                type="text"
                                className={styles.textarea_text}
                                name="story"
                              />
                              <div className={cn(styles.editProfile, 'buttonsProfile_styles')}>
                                <PrimaryButton
                                  className="buttonsProfile_cancel"
                                  text="Cancel"
                                  isDark
                                  isRound
                                  disabled={false}
                                  onClick={cancelEditMode}
                                />
                                <PrimaryButton
                                  className="buttonsProfile_save"
                                  text="save"
                                  isActive
                                  isRound
                                  disabled={false}
                                  onClick={() => saveUserDataByKey('story')}
                                />
                              </div>
                            </>
                          )
                        )}
                        <p></p>
                      </p>
                    </div>
                  </TabPane>
                  {isOwn && (
                    <TabPane tab="STORY BOARD" key="2" className="story">
                      <StoryBoardTabs
                        mangaStory={mangaStory}
                        user={user}
                        openNotification={openNotification}
                        originUrl={originUrl}
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
                  <TabPane tab="INVITES" key="4">
                    <div className={styles.tabWrap}>
                      <Chat requests={requests} mangaStory={baseData} user={user} isOwn={isOwn} />
                    </div>
                  </TabPane>
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
      </main>
    </div>
  );
};

MangeStory.propTypes = {
  genres: PropTypes.array.isRequired,
  mangaStory: PropTypes.object.isRequired,
  user: PropTypes.object,
  requests: PropTypes.array.isRequired,
  isOwn: PropTypes.bool.isRequired,
  originUrl: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

MangeStory.defaultProps = {
  user: null,
};

export default MangeStory;
