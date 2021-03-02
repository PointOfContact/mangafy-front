import React, { useState } from 'react';

import { Tabs, Input, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import { Comments } from 'components/comments';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Head from 'next/head';
import PropTypes from 'prop-types';

import BannerSection from './components/bannersSection';
import StoryBoardTabs from './components/storyBoardTabs';
import styles from './styles.module.scss';

const { TabPane } = Tabs;
const { TextArea } = Input;

const MangeStory = (props) => {
  const { mangaStory, user, isOwn, originUrl, comments, genres } = props;
  const [editMode, setEditMode] = useState(false);
  const [baseData, setBaseData] = useState(mangaStory);
  const [canEdit] = useState(isOwn);

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
    });
  };

  const saveUserDataByKey = (inComingData, ...keys) => {
    const data = {};
    keys.forEach((item) => {
      data[item] = inComingData[item];
    });
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/manga-stories')
        .patch(inComingData._id, data, {
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

  return (
    <>
      <Head>
        <title>MangaFY - All graphic novel enthusiast, all genres, one Place </title>
        <meta name="description" content={mangaStory.story}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header path="mangaStory" user={user} />
          <main className={styles.box}>
            <div className={cn(styles.box__container, "container")}>
              <div className={styles.box__wrapper}>
                <div className={styles.box__head}>
                  {!editMode ? (
                    <div className={styles.box__head_content}>
                      <h2 className={styles.box__head_title}>{baseData.title}</h2>
                      <p className={styles.box__head_description}>{baseData.introduce}</p>
                    </div>
                    ) : (
                    canEdit && (
                      <div className={styles.box__head_fields}>
                        <h2 className={styles.box__head_title}>
                          <Input
                            name="title"
                            onChange={onChangeSingleField}
                            placeholder=""
                            type="text"
                            value={baseData.title}
                          />
                        </h2>
                        <p className={styles.box__head_description}>
                          <Input
                            name="introduce"
                            onChange={onChangeSingleField}
                            type="text"
                            value={baseData.introduce}
                          />
                        </p>
                      </div>
                    )
                  )}
                </div>
                <div className={styles.box__tabs}>
                  <Tabs defaultActiveKey="1" className="manga-story-tabs">
                    {isOwn && (
                      <TabPane tab="STORY BOARD" key="1" className="story">
                        <StoryBoardTabs
                          mangaStory={mangaStory}
                          user={user}
                          openNotification={openNotification}
                        />
                      </TabPane>
                    )}
                    <TabPane tab="STORY" key="2" className="story">
                      <h3>Here is a my story!</h3>
                      <p>
                        {!editMode
                          ? baseData.story
                          : canEdit && (
                              <TextArea
                                autoSize={{ minRows: 3, maxRows: 1000 }}
                                placeholder="Type here..."
                                value={baseData.story}
                                onChange={onChangeSingleField}
                                type="text"
                                className="textarea_text"
                                name="story"
                              />
                            )}
                        <p></p>
                      </p>
                    </TabPane>
                    <TabPane tab="COMMENTS" key="3">
                      <Comments
                        className="belkin"
                        commentsData={comments}
                        isOwn={isOwn}
                        mangaStory={baseData}
                        user={user}
                      />
                    </TabPane>
                  </Tabs>
                </div>
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
              </div>
            </div>
          </main>
        </div>
        <Footer />
        <FooterPolicy />
      </div>
    </>
    );
};

MangeStory.propTypes = {
  genres: PropTypes.array.isRequired,
  mangaStory: PropTypes.object.isRequired,
  user: PropTypes.object,
  isOwn: PropTypes.bool.isRequired,
  originUrl: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

MangeStory.defaultProps = {
  user: null,
};

export default MangeStory;
