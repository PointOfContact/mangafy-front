import React, { useState } from 'react';

import { Tabs, Popover, Input, Button, Progress } from 'antd';
import client from 'api/client';
import { Comments } from 'components/comments';
import Footer from 'components/footer';
import Header from 'components/header';
import SvgCat from 'components/icon/Cat';
import ComicBookSvg from 'components/icon/ComicBook';
import DocumentsSvg from 'components/icon/Documents';
import EditSvg from 'components/icon/Edit';
import SvgLang from 'components/icon/Lang';
import SvgMone from 'components/icon/Mone';
import PencilCaseSvg from 'components/icon/PencilCase';
import ShareSvg from 'components/icon/Share';
import SuperHeroSvg from 'components/icon/Superhero';
import GroupSvg from 'components/icon/Group';
import SvgTie from 'components/icon/Tie';
import EditPopup from 'components/popup';
import { ShareButtons } from 'components/share';
import { userTypesEnums } from 'helpers/constant';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { TabPane } = Tabs;
const { TextArea } = Input;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const MangeStory = (props) => {
  const { mangaStory, user, requests, isOwn, originUrl, comments, pid } = props;
  const [amount, setAmount] = useState(5);
  const [editMode, setEditMode] = useState(false);
  const [baseData, setBaseData] = useState(props.mangaStory);
  const [showPopup, setShowPopup] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [storyBoardActiveTab, setStoryBoardActiveTab] = useState(1);
  const [errMessage, setErrMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [canEdit, setCanEdit] = useState(props.isOwn);

  const onAccept = (id, isAccept) => {
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/join-manga-story-requests')
        .patch(
          id,
          {
            status: isAccept ? 'accepted' : 'rejected',
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        )
        .then((response) => {
          Router.reload();
        });
    });
  };

  const onInputChange = async (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  const setStoryEditMode = () => {
    setEditMode(true);
  };

  const beforeUpload = (file) => {
    const reader = new FileReader();
    // encode dataURI
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/uploads')
          .create(
            { uri: reader.result },
            {
              headers: { Authorization: `Bearer ${jwt}` },
              mode: 'no-cors',
            }
          )
          .then((response) => response)
          .then((response) => {
            m.default
              .service('/api/v2/manga-stories')
              .patch(
                baseData._id,
                {
                  image: response.id,
                },
                {
                  headers: { Authorization: `Bearer ${jwt}` },
                  mode: 'no-cors',
                }
              )
              .then((response) => setBaseData(response));
          })
          .catch((err) => {
            console.log(err);
          });
      }, false);
    });
  };

  const saveUserDataByKey = (user, ...keys) => {
    const data = {};
    keys.forEach((item) => (data[item] = baseData[item]));

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

  const clickBack = ()=> {
    const nextTab = +storyBoardActiveTab - 1
    setStoryBoardActiveTab(nextTab)
  }
  const clickNext = ()=> {
    const nextTab = +storyBoardActiveTab + 1
    setStoryBoardActiveTab(nextTab)
  }



  const content = () => (
    <div>
      {' '}
      {baseData.searchingFor.map((item) =>
        userTypesEnums[item] ? (
          <p>
            <Button
              key={item}
              value="searchingFor"
              data-id="searchingFor"
              type={editMode ? 'dashed' : 'text'}
              onClick={onChangePopup}>
              {userTypesEnums[item] && userTypesEnums[item]}
            </Button>
          </p>
        ) : null
      )}
    </div>
  );
  const IsOwnStory = mangaStory.authorInfo._id === user._id;
  return (
    <div className="story_page">
      <Head>
        <title>MangaFY - All graphic novel enthusiast, all genres, one Place </title>
        <meta name="description" content={mangaStory.story}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_back_2">
        <Header path="mangaStory" user={user} />
        <div className={styles.pageWrap}>
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
              { IsOwnStory && <TabPane tab="STORY BOARD" key="1" className="story">
                  <Tabs activeKey={storyBoardActiveTab.toString()} defaultActiveKey={1} className={`${styles.storyBoardTab} storyBoardTabs`} type="line" onChange={(activeKey) => setStoryBoardActiveTab(activeKey)} defaultActiveKey="1" tabPosition= 'left'>
                    <TabPane tab={<span>
                      <GroupSvg fill="#7b65f3"  width="25px"/>
                      </span>} key={1}>
                      Coming soon
                    </TabPane>
                    <TabPane tab={<span>
                      <SuperHeroSvg width="25px"/>
                      </span>} key={2}>
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab={<span>
                      <DocumentsSvg width="25px" />
                    </span>}
                      key={3}>
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab={<span>
                      <ComicBookSvg width="25px"/>
                      </span>} key={4}>
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab={<span>
                      <PencilCaseSvg width="25px"/>
                      </span>} key={5}>
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab={<span>
                      <EditSvg height="25px"/>
                      </span>} key={6}>
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab={<span>
                      <ShareSvg height="25px" />
                      </span>} key={7}>
                      Content of Tab Pane 3
                    </TabPane>
                  </Tabs>
                  <div className={styles.actionButtons}> 
                    {+storyBoardActiveTab > 1 && <Button type="primary" onClick={clickBack}>Back</Button>}
                    {+storyBoardActiveTab < 7 && <Button type="primary" onClick={clickNext}>Next</Button>}
                  </div>
                </TabPane>}
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
            <div className={styles.bannerWrap}>
              <div className="row">
                <div className={styles.banner}>
                  <img src="/img/banner.png" />
                  <div>
                    <img src="/img/upload.png" />
                  </div>
                </div>
                <div className="row">
                  <div className={`${styles.bannerGenres} d-flex `}>
                    <div className={styles.bannerGenresItem}>
                      {mangaStory.genres.slice(0, 1).map((g) => (
                        <Button
                          data-id="preferredLanguage"
                          type={editMode && canEdit ? 'dashed' : 'text'}
                          onClick={onChangePopup}>
                          <SvgCat width="18px" height="24px" />
                          <span>{g.name}</span>
                        </Button>
                      ))}
                    </div>
                    <div className={styles.bannerGenresItem}>
                      <Button
                        data-id="preferredLanguage"
                        type={editMode && canEdit ? 'dashed' : 'text'}
                        onClick={onChangePopup}>
                        <SvgLang width="24px" height="24px" />
                        <span>{mangaStory.preferredLanguage}</span>
                      </Button>
                    </div>
                    <div className={styles.bannerGenresItem}>
                      <Popover placement="top" title="Searching For" content={content}>
                        <Button
                          data-id="searchingFor"
                          type={editMode && canEdit ? 'dashed' : 'text'}
                          onClick={onChangePopup}>
                          <SvgTie width="20px" height="20px" />
                          <span>{baseData.searchingFor[0] || 'Searching For'}</span>
                        </Button>
                      </Popover>
                    </div>
                    <div className={styles.bannerGenresItem}>
                      <Button
                        value="compensationModel"
                        data-id="compensationModel"
                        type={editMode & canEdit ? 'dashed' : 'text'}
                        onClick={onChangePopup}>
                        <SvgMone width="20px" height="20px" />
                        <span>
                          {mangaStory.compensationModel == 'paid'
                            ? 'Paid Collaboration'
                            : 'Freewill'}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={styles.progressWrapper}>
                  <div className={styles.progress}>
                    <p>Your graphic novel in progress</p>
                    <div className={styles.Lamp}>
                      <div>
                        <img src="/img/Group.png" />
                      </div>
                    </div>
                    <div className={styles.progressWrap}>
                      <Progress percent={30} size="small" />
                    </div>
                    <div className={styles.Lamp}>
                      <div>
                        <img src="/img/notebook 1.png" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.socials}>
                    <ShareButtons text="Share collb!" shareUrl={originUrl} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
      {/* <MenuPageFour {...props} /> */}

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
  mangaStory: PropTypes.object,
  user: PropTypes.number,
  requests: PropTypes.array,
  isOwn: PropTypes.bool,
  originUrl: PropTypes.string,
  comments: PropTypes.array,
  pid: PropTypes.string,
};

export default MangeStory;
