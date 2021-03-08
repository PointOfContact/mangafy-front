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
import StoryTab from './components/StoryTab';
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
                    <div className={styles.header}>
                      <h2>{baseData.title}</h2>
                      <p>{baseData.introduce}</p>
                    </div>
                  ) : (
                    canEdit && (
                      <div className="inputs">
                        <h2>
                          <Input
                            name="title"
                            onChange={onChangeSingleField}
                            placeholder=""
                            type="text"
                            value={baseData.title}
                          />
                        </h2>
                        <p>
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
              </div>
            </div>
          </section>
          <section className={`container mobile_full_content mobile_top_round`}>
            <div className="row">
              <div className="col-lg-7 mangaStoriTopPanel">
                <Tabs defaultActiveKey="1">
                  {isOwn && (
                    <TabPane tab="STORY BOARD" key="1" className="story">
                      <StoryBoardTabs
                        mangaStory={mangaStory}
                        user={user}
                        openNotification={openNotification}
                        originUrl={originUrl}
                      />
                    </TabPane>
                  )}
                  <TabPane tab="STORY" key="2" className="story">
                    <div className={styles.tabWrap}>
                      {/* <h3 className={styles.tabTitle}>Here is a my story!</h3> */}
                      {/* <StoryTab baseData={baseData} /> */}
                      <p>
                        {!editMode ? (
                          <StoryTab baseData={baseData} />
                        ) : (
                          canEdit && (
                            <TextArea
                              autoSize={{ minRows: 3, maxRows: 1000 }}
                              placeholder="Type here..."
                              value={baseData.story}
                              onChange={onChangeSingleField}
                              type="text"
                              className="textarea_text"
                              name="story"
                            />
                          )
                        )}
                        <p></p>
                      </p>
                    </div>
                  </TabPane>
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
};

MangeStory.defaultProps = {
  user: null,
};

export default MangeStory;
