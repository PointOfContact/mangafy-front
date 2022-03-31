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
import myAmplitude from 'utils/amplitude';

import ChangeYourAvatar from './changeYourAvatar';
import EditUserDataDuringSignUp from './editUserDataDuringSignUp';
import SetPhotoAvatar from './setPhotoAvatar';
import ShareProfile from './shareProfile';
import styles from './styles.module.scss';

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
    showModalEdit,
    setShowModalEdit,
  } = props;

  const [showModal, changeShowModal] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const [userTypesOptions, setUserTypes] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
      placement: 'bottomLeft',
    });
  };

  const history = useRouter();

  useEffect(() => {
    setUserTypes(
      userTypes?.map((item) => (
        <Option key={item.key} value={item.key}>
          {item.value}
        </Option>
      ))
    );
  }, []);

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
                event_type: EVENTS.MESSAGED_ACCOUNT,
              },
            ];
            myAmplitude(data);
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
        event_type: EVENTS.ADDED_BIO,
      },
    ];
    myAmplitude(data);
  };

  const changeBio = () => {
    if (!userData.name?.replace(/\s/g, '')) {
      setErrMessage('Name is required');
      return;
    }
    if (!(userData.types.length && userData.types[0])) {
      return;
    }
    handleEvent();
    saveUserDataByKey('name', 'types');
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

  const colorTypes = ['#FEC447', '#7B65F3', '#91D3CB', '#ea5daf'];

  const getTypes = (array) =>
    array?.types?.slice(0, 4).map((value, i) => (
      <div className={styles.userTypes} key={value} style={{ backgroundColor: colorTypes[i] }}>
        {userTypesEnums[value]}
      </div>
    ));

  const types = ifMyProfile
    ? !!userData?.types?.length && getTypes(userData)
    : !!profile?.types?.length && getTypes(profile);

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
              user={user}
            />
          </div>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 12 }}>
          <div className={styles.info_profile}>
            {!editMode ? (
              <>
                <h4>{ifMyProfile ? userData?.name : profile?.name}</h4>
                <div className={styles.typesContainer}>{types}</div>

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
                    className={cn(
                      'changeSelect',
                      styles.select,
                      !(userData?.types?.length && userData?.types[0]) && styles.errSelect
                    )}
                    defaultValue={userTypesEnums[userData?.types[0]]}
                    value={userData.types}
                    dropdownMatchSelectWidth={false}
                    style={{ width: '100%' }}
                    onChange={(value) => setUserData({ ...userData, types: value })}>
                    {userTypesOptions}
                  </Select>
                  {!(userData?.types?.length && userData?.types[0]) ? (
                    <p className={styles.errMessage}>User type cannot be empty</p>
                  ) : null}
                </div>
                <Link
                  href="/contact-us"
                  onClick={() => {
                    const event = {
                      event_type: EVENTS.DELETE_ACCOUNT,
                    };
                    myAmplitude(event);
                  }}>
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
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }} xl={{ span: 6 }}>
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
          {!editMode && (
            <ShareProfile
              ifMyProfile={ifMyProfile}
              originUrl={originUrl}
              profile={profile}
              user={user}
              sendInvites={sendInvites}
              sendMessage={sendMessage}
            />
          )}
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
  showModalEdit: PropTypes.bool,
  setShowModalEdit: PropTypes.func,
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
  showModalEdit: false,
  setShowModalEdit: () => {},
};

export default ProfileTopBar;
