import React, { useEffect, useState } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tabs, notification, Modal, Popover } from 'antd';
import client from 'api/client';
import { findStoryBoard } from 'api/storyBoardClient';
import cn from 'classnames';
import { Chat } from 'components/chat';
import { Comments } from 'components/comments';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import SvgPencilColored from 'components/icon/PencilColored';
import { ShareButtons } from 'components/share';
import PrimaryButton from 'components/ui-elements/button';
import ButtonToggle from 'components/ui-elements/button-toggle';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Input from 'components/ui-elements/input';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';

import BannerSection from './components/bannersSection/index';
import EditStoryTab from './components/editStoryTab';
import StoryBoardTabs from './components/storyBoardTabs';
import StoryTab from './components/storyTab/index';
import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

// const StoryBoardTabs = dynamic(() => import('./components/storyBoardTabs'), {
//   loading: () => <Spin />,
// });
const { confirm } = Modal;
const { info } = Modal;

const { TabPane } = Tabs;
// const { TextArea } = Input;

const MangeStory = (props) => {
  const {
    mangaStory,
    user,
    isOwn,
    originUrl,
    comments,
    genres,
    isParticipent,
    hasStoryBoardPermision,
  } = props;
  const [stage, setStage] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [baseData, setBaseData] = useState(mangaStory);
  const [canEdit] = useState(isOwn);
  const [collabActiveTab, setcollabActiveTab] = useState('1');

  useEffect(() => {
    const { tab } = qs.parse(location.search);
    switch (tab) {
      case 'story':
        setcollabActiveTab('1');
        break;
      case 'story-board':
        setcollabActiveTab('2');
        break;
      case 'comments':
        setcollabActiveTab('3');
        break;
      case 'invites':
        user
          ? setcollabActiveTab('4')
          : Router.push(`/sign-in?page=manga-story/${mangaStory._id}?tab=invites`);
        break;
      default:
        setcollabActiveTab('1');
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
  const cancelEditTitle = () => {
    setEditTitle(false);
  };

  const onPublish = () => {
    if (baseData.published) {
      onGoToPrivate();
    } else {
      onGoToPublic();
    }
  };

  const onGoToPublic = () => {
    findStoryBoard(
      user._id,
      mangaStory._id,
      (res) => {
        const boad = res.data[0];
        if (boad?.idea?.title && boad?.idea?.text) {
          patchStory({
            published: true,
          }).then(() =>
            info({
              title: (
                <h3 className={styles.modalTitle}>
                  AWESOME! You opened your graphic novel project!
                </h3>
              ),
              icon: '',
              width: '100%',
              style: { top: 120, maxWidth: '1000px' },
              content: (
                <div className={styles.publishedModal}>
                  <p>
                    Congratulations , share with your network and build your collaboration to
                    success!
                  </p>
                  <div className={styles.shareButtons}>
                    <ShareButtons shareUrl={originUrl} text="Share to the world!" />
                  </div>
                </div>
              ),
              onOk() {},
            })
          );
        } else {
          confirm({
            title: 'Update story board',
            icon: <ExclamationCircleOutlined />,
            style: { top: 120 },
            content:
              'Before switching to live mode, you must complete at last one step. Update this information in stroy board tab',
            onOk() {
              setcollabActiveTab('2');
            },
            onCancel() {},
          });
        }
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
  };

  const patchStory = (data) => {
    const jwt = client.getCookie('feathers-jwt');
    return import('api/restClient').then((m) =>
      m.default
        .service('/api/v2/manga-stories')
        .patch(baseData._id, data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setBaseData(res);
          const event_type = data.published ? EVENTS.GO_TO_PUBLIC : EVENTS.GO_TO_PRIVATE;

          const eventData = [
            {
              platform: 'WEB',
              event_type,
              event_properties: { mangaStoryId: baseData._id },
              user_id: user._id,
              user_properties: {
                ...user,
              },
            },
          ];
          amplitude.track(eventData);
        })
        .catch((err) => {
          openNotification('error', err.message);
        })
    );
  };

  const onGoToPrivate = () => {
    confirm({
      confirmLoading: true,
      title: 'Oh, going private? No problem',
      style: { top: 120 },
      icon: <ExclamationCircleOutlined />,
      content:
        'Your project is moving to private mode. But no worries, if you want to collaborate or add members in various roles, you can always switch up to public. Good Luck!',
      onOk() {
        patchStory({
          published: false,
        });
      },
      onCancel() {},
    });
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
                  {isOwn && (
                    <>
                      <div className={styles.publishContent}>
                        <Popover
                          placement="bottomRight"
                          overlayStyle={{ maxWidth: '400px', zIndex: '100' }}
                          title={''}
                          content={
                            'Note: published projects will only show general information about your project (inc. what you look for, and what you aim to work on without disclosing anything else). In draft mode, you go off-grid and need to invite collaborations manually, while the member you invite sees nothing.'
                          }
                          trigger="hover">
                          <div className={styles.publishSwitch}>
                            <ButtonToggle
                              id={'Draft'}
                              isChecked={baseData.published}
                              size={50}
                              offText="Draft"
                              onText="Published"
                              onChange={onPublish}
                            />
                          </div>
                        </Popover>
                      </div>
                    </>
                  )}

                  {!editTitle ? (
                    <div className={styles.storyTabContent}>
                      <div className={styles.header}>
                        {collabActiveTab === '2' ? (
                          <>
                            {stage?.tab !== '6' ? (
                              <h2>
                                STORY BIBLE <span>STAGE {stage?.tab}</span> - {stage?.title}
                              </h2>
                            ) : (
                              <h2>{stage?.title}</h2>
                            )}
                            <p>{stage?.description}</p>
                          </>
                        ) : (
                          <h2>{baseData.title}</h2>
                        )}
                      </div>
                      {canEdit && collabActiveTab !== '2' && (
                        <SvgPencilColored
                          className={styles.editSVG}
                          onClick={() => setEditTitle(true)}
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
                              className={!baseData.title.replace(/\s+/g, '') && styles.error}
                              isLinear={true}
                              isFullWidth={true}
                              name="title"
                              onChange={onChangeSingleField}
                              placeholder=""
                              type="text"
                              value={baseData.title}
                              required
                            />
                            {!baseData.title.replace(/\s+/g, '') && (
                              <p className={styles.error}>Title is required</p>
                            )}
                          </h2>
                        </div>
                        <div className={cn(styles.editProfile, 'buttonsProfile_styles')}>
                          <PrimaryButton
                            className="buttonsProfile_cancel"
                            text="Cancel"
                            isDark
                            isRound
                            disabled={false}
                            onClick={cancelEditTitle}
                          />
                          <PrimaryButton
                            className="buttonsProfile_save"
                            text="save"
                            isActive
                            isRound
                            disabled={false}
                            onClick={() => {
                              baseData.title.replace(/\s+/g, '') &&
                                saveUserDataByKey(baseData, 'title');
                            }}
                          />
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className={cn(`container mobile_full_content mobile_top_round`, styles.section)}>
            <div className="row">
              <div className={cn('col-lg-7 mangaStoriTopPanel', styles.story_page)}>
                <Tabs
                  activeKey={collabActiveTab}
                  onChange={(activeKey) => setcollabActiveTab(activeKey)}>
                  <TabPane tab="STORY" key="1" className="story">
                    <div className={styles.tabWrap}>
                      {/* <StoryTab baseData={baseData} /> */}
                      <p>
                        {!editMode ? (
                          <div>
                            <StoryTab
                              setBaseData={setBaseData}
                              baseData={baseData}
                              user={user}
                              isOwn={isOwn}
                              isParticipent={isParticipent}
                            />
                            {canEdit && (
                              <div className={styles.editDeleteButtons}>
                                <PrimaryButton
                                  className={styles.editTitleSvg}
                                  text={'Edit Project'}
                                  onClick={() => setEditMode(true)}
                                />
                                <Link href="/contact-us">
                                  <PrimaryButton
                                    className={styles.deleteTitleSvg}
                                    text={'Delete Project'}
                                  />
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : (
                          canEdit && (
                            <EditStoryTab
                              baseData={baseData}
                              onChangeSingleField={onChangeSingleField}
                              cancelEditMode={cancelEditMode}
                              saveUserDataByKey={saveUserDataByKey}
                            />
                          )
                        )}
                        <p></p>
                      </p>
                    </div>
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
      </main>
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
  isParticipent: PropTypes.bool.isRequired,
};

MangeStory.defaultProps = {
  user: null,
};

export default MangeStory;
