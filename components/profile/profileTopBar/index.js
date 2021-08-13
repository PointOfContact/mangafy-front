import React, { useEffect, useState } from 'react';

import { Input, Select, Layout, Row, Col, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Follow from 'components/follow';
import SvgDustbin from 'components/icon/Dustbin';
import SvgPrimaryAdd from 'components/icon/PrimaryAdd';
import ModalInvites from 'components/modals/sendInvites';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes, userTypesEnums } from 'helpers/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import ChangeYourAvatar from './changeYourAvatar';
import EditUserDataDuringSignUp from './editUserDataDuringSignUp';
import SetPhotoAvatar from './setPhotoAvatar';
import ShareProfile from './shareProfile';
import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const { Option } = Select;
const { Content } = Layout;

const ProfileTopBar = (props) => {
  const {
    user,
    editMode,
    userData,
    setEditMode,
    setUserData,
    errMessage,
    cancelEditMode,
    saveUserDataByKey,
    originUrl,
    profile,
    setErrMessage,
    ifMyProfile,
    loadingImg,
    genresMyProfileEnums,
    userGenres,
    genres,
    handleChangeGenres,
  } = props;

  const [showModal, changeShowModal] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const router = useRouter();
  const ifOwner = user?._id === router.query.pid;
  const [disabledButton, setDisabledButton] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(ifOwner && !!router.query.editModal);
  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
      placement: 'bottomLeft',
    });
  };

  const history = useRouter();

  const sendInvites = () => {
    if (user) {
      if (user.mangaStories?.data?.length && !(user?._id === profile?._id)) {
        changeShowModal(true);
        isShowModal();
      } else {
        openNotification('error', "You don't have manga story");
      }
    } else {
      history.push(`/sign-in?page=profile/${profile._id}`);
    }
  };

  const createConversation = () => {
    if (user) {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/conversations')
          .create(
            {
              participents: [profile._id],
            },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
          .then((res) => {
            const data = [
              {
                platform: 'WEB',
                event_type: EVENTS.START_CHAT,
                user_id: user._id,
                user_properties: {
                  ...user,
                },
              },
            ];
            amplitude.track(data);
            history.push(`/profile/${user._id}?tab=messenger&conversation=${res._id}`);
          })
          .catch((err) => {
            openNotification('error', err.message);
          });
      });
    } else {
      history.push(`/sign-in?page=profile/${profile._id}`);
    }
  };

  const sendMessage = () => {
    if (user) {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/conversations')
          .find({
            query: {
              $or: [
                { participents: [user._id, profile._id] },
                { participents: [profile._id, user._id] },
              ],
            },
            headers: { Authorization: `Bearer ${jwt}` },
          })
          .then((res) => {
            const conv = res?.data?.find(
              (item) => !item.joinMangaStoryRequestId && !item.mangaStoryId
            );
            if (conv) {
              history.push(`/profile/${user._id}?tab=messenger&conversation=${conv._id}`);
            } else {
              createConversation();
            }
          })
          .catch((err) => {
            openNotification('error', err.message);
          });
      });
    } else {
      history.push(`/sign-in?page=profile/${profile._id}`);
    }
  };

  const handleEvent = () => {
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.ADDED_BIO,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
  };

  const changeBio = () => {
    if (userData.name?.replace(/\s/g, '')) {
      handleEvent();
      saveUserDataByKey('name', 'types');
    } else {
      setErrMessage('Name is required');
    }
  };

  const isShowModal = () => {
    const el = document.body;
    if (showModal) {
      el.classList.add(styles.body_scroll);
    } else {
      el.classList.remove(styles.body_scroll);
    }
  };

  useEffect(() => {
    setLikedUsers(profile?.likedUsers);
  }, [profile?.likedUsers]);

  return (
    <Content className={cn(styles.content)}>
      <Row>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 6 }} xl={{ span: 5 }}>
          <div className={styles.img}>
            <SetPhotoAvatar
              ifMyProfile={ifMyProfile}
              userData={userData}
              loadingImg={loadingImg}
              profile={profile}
            />
            {ifMyProfile && (
              <SvgPrimaryAdd
                className={styles.add}
                id="myProfileUploadBtnId"
                width="40"
                height="40px"
                onClick={() => {
                  setDisabledButton(true);
                  setIsModalVisible(true);
                }}
              />
            )}
            <ChangeYourAvatar
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              disabledButton={disabledButton}
              setDisabledButton={setDisabledButton}
              props={props}
            />
          </div>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }} xl={{ span: 9 }}>
          <div className={styles.info_profile}>
            {!editMode ? (
              <>
                <h4>{ifMyProfile ? userData?.name : profile?.name}</h4>
                <p>{ifMyProfile && userTypesEnums[userData?.type || profile?.type]}</p>

                {ifMyProfile ? (
                  <div className={styles.followAndEditButton}>
                    <PrimaryButton
                      text="Edit"
                      splitterStyle={{ width: '116px', height: '46', fontSize: '15px' }}
                      onClick={() => setEditMode(true)}
                    />
                    <Follow
                      count={user?.likedUsers?.length}
                      profile={profile}
                      user={user}
                      likedUsers={user?.likedUsers}
                      setLikedUsers={setLikedUsers}
                    />
                  </div>
                ) : (
                  <>
                    <Follow
                      count={likedUsers?.length}
                      profile={profile}
                      user={user}
                      likedUsers={likedUsers}
                      setLikedUsers={setLikedUsers}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <h2>
                  <Input
                    required
                    className={cn(
                      styles.changeTitle,
                      !userData.name?.replace(/\s/g, '') && styles.errImp
                    )}
                    type="text"
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    value={userData.name}
                  />
                  {errMessage && !userData.name?.replace(/\s/g, '') ? (
                    <p className={styles.errMessage}>{errMessage}</p>
                  ) : null}
                </h2>
                <div>
                  <Select
                    mode="multiple"
                    className={cn('changeSelect', styles.select)}
                    defaultValue={userTypesEnums[userData.types]}
                    value={userData.types}
                    style={{ width: '100%' }}
                    onChange={(value) => setUserData({ ...userData, types: value })}>
                    {userTypes.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Link href="/contact-us">
                  <a>
                    <div className={styles.deleteAccount}>
                      <SvgDustbin width="20px" height="20px" />
                      <div>Delete account</div>
                    </div>
                  </a>
                </Link>
              </>
            )}
          </div>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 9 }}>
          <div className={styles.languages_btn}>
            {editMode && (
              <div className={cn(styles.buttonsProfile, 'buttonsProfile_styles')}>
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
                  onClick={() => changeBio()}
                />
              </div>
            )}
          </div>
          <ShareProfile
            ifMyProfile={ifMyProfile}
            originUrl={originUrl}
            profile={profile}
            user={user}
            sendInvites={sendInvites}
            sendMessage={sendMessage}
          />
        </Col>
      </Row>
      <ModalInvites
        user={user}
        profile={profile}
        changeShowModal={(e) => {
          changeShowModal(e);
          isShowModal();
        }}
        showModal={showModal}
      />
      <EditUserDataDuringSignUp
        user={user}
        loadingImg={loadingImg}
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
        props={props}
        userData={userData}
        setUserData={setUserData}
        genresMyProfileEnums={genresMyProfileEnums}
        userGenres={userGenres}
        genres={genres}
        handleChangeGenres={handleChangeGenres}
        saveUserDataByKey={saveUserDataByKey}
      />
    </Content>
  );
};

ProfileTopBar.propTypes = {
  user: PropTypes.object.isRequired,
  beforeUploadBase64: PropTypes.func,
  editMode: PropTypes.bool,
  userData: PropTypes.object,
  setEditMode: PropTypes.func,
  setUserData: PropTypes.func,
  errMessage: PropTypes.string,
  cancelEditMode: PropTypes.func,
  saveUserDataByKey: PropTypes.func,
  originUrl: PropTypes.string,
  profile: PropTypes.object,
  setErrMessage: PropTypes.func,
  ifMyProfile: PropTypes.bool,
  loadingImg: PropTypes.bool,
  genresMyProfileEnums: PropTypes.array,
  userGenres: PropTypes.array,
  genres: PropTypes.array,
  handleChangeGenres: PropTypes.func,
};

ProfileTopBar.defaultProps = {
  cancelEditMode: () => {},
  saveUserDataByKey: () => {},
  beforeUploadBase64: () => {},
  setEditMode: () => {},
  setUserData: () => {},
  editMode: false,
  userData: {},
  errMessage: '',
  originUrl: '',
  profile: {},
  setErrMessage: () => {},
  ifMyProfile: false,
  setLoadingImg: () => {},
  loadingImg: false,
  genresMyProfileEnums: [],
  userGenres: [],
  genres: [],
  handleChangeGenres: () => {},
};

export default ProfileTopBar;
