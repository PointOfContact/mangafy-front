import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Tabs, Popover, Input, Button, Upload } from 'antd';
import client from 'api/client';
import { Chat } from 'components/chat';
import { Comments } from 'components/comments';
import Footer from 'components/footer';
import Header from 'components/header';
import SvgCat from 'components/icon/Cat';
import SvgLang from 'components/icon/Lang';
import SvgMone from 'components/icon/Mone';
import SvgTie from 'components/icon/Tie';
import MenuPageFour from 'components/mobileVersion/mobileMenuFour';
import ModalStart from 'components/modals/Modal';
import EditPopup from 'components/popup';
import { ShareButtons } from 'components/share';
import { userTypesEnums } from 'helpers/constant';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';

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

  return (
    <div className="story_page">
      <Head>
        <title>MangaFY - All graphic novel enthusiast, all genres, one Place </title>
        <meta name="description" content={mangaStory.story}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_back_2">
        <Header path="mangaStory" user={user} />
        <section className="section_landing_for">
          <div className="mangafy_vontainer  container">
            <div className="row">
              <div className="col-sm-12 manga-story manga-story-m">
                {!editMode && canEdit ? (
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
                )}

                {!editMode ? (
                  <>
                    <h2>{baseData.title}</h2>
                    <p>{baseData.introduce}</p>
                  </>
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
            <div className="row">
              <div className="col-lg-7 p-3">
                <div className="manga-story-left p-3">
                  <div className="profileImg">
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
                  </div>
                  <div className="row ">
                    <div className="col-xs-3">
                      {mangaStory.genres.slice(0, 1).map((g) => (
                        <>
                          <SvgCat width="18px" height="24px" />
                          <span>{g.name}</span>
                        </>
                      ))}
                    </div>
                    <div className="col-xs-3 d-flex align-items-center ">
                      <Button
                        data-id="preferredLanguage"
                        type={editMode && canEdit ? 'dashed' : 'text'}
                        onClick={onChangePopup}>
                        <SvgLang width="24px" height="24px" />
                        <span>{mangaStory.preferredLanguage}</span>
                      </Button>
                    </div>
                    <div className="col-xs-2 d-flex align-items-center ">
                      <Popover placement="top" title="Searching For" content={content}>
                        <Button
                          data-id="searchingFor"
                          type={editMode && canEdit ? 'dashed' : 'text'}
                          onClick={onChangePopup}>
                          <SvgTie width="20px" height="20px" />
                          {baseData.searchingFor[0] || 'Searching For'}
                        </Button>
                      </Popover>
                    </div>
                    <div className="col-xs-4 d-flex align-items-center ">
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
              </div>
              <div className="col-lg-5 p-3">
                <div className="manga-story-right">
                  <div className="avatar_div">
                    <img
                      className="avatar"
                      src={
                        mangaStory.authorInfo && mangaStory.authorInfo.avatar
                          ? client.UPLOAD_URL + mangaStory.authorInfo.avatar
                          : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
                      }
                      alt=""
                    />
                  </div>
                  <div className="p-3">
                    <p>
                      <p>
                        Hey My Name {mangaStory.authorInfo && mangaStory.authorInfo.name}, and i'm
                        open for collaboration
                      </p>
                      <p>
                        I am a looking to collaborate with{' '}
                        {baseData.searchingFor
                          .filter((item) => userTypesEnums[item])
                          .map((item) => userTypesEnums[item])
                          .join(', ')}
                      </p>
                      <p>
                        Compensation model:{' '}
                        {mangaStory.compensationModel == 'paid'
                          ? 'Paid Collaboration $'
                          : 'Freewill'}
                      </p>
                    </p>
                    <div>
                      <ModalStart pid={pid} isOwn={isOwn} user={user} />
                    </div>
                    {/* <button className="but-manga-story"><ModalStart /></button> */}
                    <p>
                      With the help of the creators' patrons (fans/donors), MangaFY is able to
                      financially support manga artists
                    </p>
                    <ShareButtons shareUrl={originUrl} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container manga-story-section-2">
          <div className="row">
            <div className="col-lg-7">
              <Tabs defaultActiveKey="1" onChange={onChangeTab}>
                <TabPane tab="STORY" key="1" className="story">
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
                <TabPane tab="COMMUNITY" key="4">
                  <div className="container community">
                    <div className="row">
                      <div className="col-lg-12"></div>
                    </div>
                  </div>
                  <Chat requests={requests} mangaStory={baseData} user={user} isOwn={isOwn} />
                </TabPane>
              </Tabs>
            </div>
            <div className="col-lg-5">
              <div className="row modal_boxmanga">
                <div className="col-lg-6">
                  <ModalStart pid={pid} isOwn={isOwn} user={user} />
                </div>
                <div className="col-lg-6">
                  <button className="but-manga-story mt-3 mb-3">Back this project</button>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="story_name">
                    <Link href={`/profile/${mangaStory.authorInfo._id}`}>
                      <div className="firsterDiv">
                        <img
                          className="avatar"
                          src={
                            mangaStory.authorInfo && mangaStory.authorInfo.avatar
                              ? client.UPLOAD_URL + mangaStory.authorInfo.avatar
                              : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
                          }
                          alt=""
                        />
                        <h5>
                          {mangaStory.authorInfo && mangaStory.authorInfo.name}
                          <br />
                          {mangaStory.authorInfo && mangaStory.authorInfo.type}
                        </h5>
                      </div>
                    </Link>
                    <div className="last_div_story">
                      <h4>About me</h4>
                      <p>{mangaStory.authorInfo && mangaStory.authorInfo.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="row">
            <div className="col-lg-7"></div>
            <div className="col-lg-5"></div>
          </div>
        </section>
        <Footer />
      </main>
      <MenuPageFour {...props} />

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
