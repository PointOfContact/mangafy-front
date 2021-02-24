import React, { useState } from 'react';

import { Tabs, Input } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import { Comments } from 'components/comments';
import Footer from 'components/footer';
import Header from 'components/header';
import EditPopup from 'components/popup';
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
  const [showPopup, setShowPopup] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [canEdit, setCanEdit] = useState(props.isOwn);

  const setStoryEditMode = () => {
    setEditMode(true);
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
          setErrMessage(err.message);
        });
    });
  };

  const onChangeSingleField = ({ target }) => {
    const { name, value } = target;
    const data = { ...baseData, [name]: value };
    setBaseData(data);
    setEditMode(true);
  };

  const changeSelectField = (data) => {
    let res = data;
    let checked = false;
    const baseDataCopy = { ...baseData };

    if (data.target) {
      res = data.target.value;
      checked = data.target.checked;
    } else {
      return setBaseData({ ...baseDataCopy, price: data });
    }
    if (checked) {
      if (data.target.name !== 'compensation') {
        baseDataCopy[activeField].push(data.target.value);
      } else {
        baseDataCopy[activeField] = data.target.value;
      }
    } else if (data.target && data.target.name !== 'compensation') {
      baseDataCopy[activeField] = baseDataCopy[activeField].filter(
        (item) => item !== data.target.value
      );
    } else {
      baseDataCopy[activeField] = data.target.value;
    }
    setBaseData({ ...baseDataCopy, [activeField]: baseDataCopy[activeField] });
    setEditMode(true);
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setBaseData(props.mangaStory);
  };

  const onChangePopup = (e) => {
    if (!editMode || !canEdit) return;
    setShowPopup(true);
    setActiveField(e.currentTarget.dataset.id);
  };

  const saveData = () => {
    setShowPopup(false);
  };

  const saveCloseData = () => {
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/manga-stories')
        .patch(baseData._id, baseData, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setEditMode(false);
          setBaseData(res);
          setShowPopup(false);
        })
        .catch((err) => {
          setErrMessage(err.message);
        });
    });
  };

  const onChangeTab = (activeKey) => {
    if (activeKey === '4') {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  };

  return (
    <div className="story_page">
      <Head>
        <title>MangaFY - All graphic novel enthusiast, all genres, one Place </title>
        <meta name="description" content={mangaStory.story}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_back_2">
        <Header path="mangaStory" user={user} />
        <div className={cn(styles.pageWrap, 'manga-story-page')}>
          <section className="section_landing_for">
            <div className="mangafy_vontainer  container">
              <div className="row">
                <div className="col-sm-12 manga-story manga-story-m">
                  {/* {!editMode && canEdit ? (
                  <div className="d-flex justify-content-end">
                    <img
                      className="cursor-pointer"
                      onClick={setStoryEditMode}
                      src="/img/edit_btn.png"
                      width="40"
                    />
                  </div>
                ) : (
                  canEdit && (
                    <div className="buttonsProfile">
                      <Button type="text" onClick={cancelEditMode}>
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => saveUserDataByKey(baseData, 'title', 'introduce', 'story')}>
                        Save
                      </Button>
                    </div>
                  )
                )} */}
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
              {/* <div className="row">
              <div className="col-lg-7 p-3">
                <div className="manga-story-left p-3"> */}
              {/* <div className="profileImg">
                    <img
                      className="img-max-height"
                      src={
                        !baseData.image ? '/img/mangastory.jpg' : client.UPLOAD_URL + baseData.image
                      }
                      alt=""
                    />
                    {editMode && canEdit && (
                      <Upload beforeUpload={beforeUpload}>
                        <div className="imgShape">
                          <PlusOutlined />
                        </div>
                      </Upload>
                    )}
                  </div> */}

              {/* </div>
              </div>
            </div> */}
            </div>
          </section>
          <section className={`${styles.section2} container`}>
            <div className="row">
              <div className="col-lg-7">
                <Tabs defaultActiveKey="1" onChange={onChangeTab}>
                  {isOwn && (
                    <TabPane tab="STORY BOARD" key="1" className="story">
                      <StoryBoardTabs mangaStory={mangaStory} user={user} />
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
                      commentsData={comments}
                      isOwn={isOwn}
                      mangaStory={baseData}
                      user={user}
                    />
                  </TabPane>
                  {/* <TabPane tab="COMMUNITY" key="4">
                  <div className="container community">
                    <div className="row">
                      <div className="col-lg-12"></div>
                    </div>
                  </div>
                  <Chat requests={requests} mangaStory={baseData} user={user} isOwn={isOwn} />
                </TabPane> */}
                </Tabs>
              </div>
            </div>
          </section>
          <section>
            <BannerSection
              originUrl={originUrl}
              canEdit={canEdit}
              baseData={baseData}
              onChangePopup={onChangePopup}
              editMode={editMode}
              genres={genres}
              saveUserDataByKey={saveUserDataByKey}
            />
          </section>
        </div>
        <Footer />
      </main>

      <div className="">
        {showPopup && (
          <EditPopup
            fieldName={activeField}
            baseData={baseData}
            onChange={changeSelectField}
            closePopup={() => setShowPopup(false)}
            save={saveData}
            saveClose={saveCloseData}
          />
        )}
        {errMessage ? <p>{errMessage}</p> : null}
      </div>
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
