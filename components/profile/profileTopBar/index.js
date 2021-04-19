import React, { useEffect, useState } from 'react';

import { Upload, Input, Select, Layout, Row, Col, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgAddUser from 'components/icon/AddUser';
import SvgCheck from 'components/icon/Check';
import SvgDustbin from 'components/icon/Dustbin';
import SvgGreenChecked from 'components/icon/GreenChecked';
import SvgPortfolio from 'components/icon/Portfolio';
import SvgPrimaryAdd from 'components/icon/PrimaryAdd';
import SvgUserDrawing from 'components/icon/UserDrawing';
import Imgix from 'components/imgix';
import ModalInvites from 'components/modals/sendInvites';
import { ShareButtons } from 'components/share';
import Avatar from 'components/ui-elements/avatar';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes, userTypesEnums } from 'helpers/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const { Option } = Select;
const { Content } = Layout;

const ProfileTopBar = (props) => {
  const {
    user,
    beforeUpload,
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
  } = props;

  const [showModal, changeShowModal] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
    });
  };
  const history = useRouter();
  const sendInvites = () => {
    if (user) {
      if (user.mangaStories?.data?.length) {
        changeShowModal(true);
        isShowModal();
      } else {
        openNotification('error', "You don't have manga story");
      }
    } else {
      history.push(`/sign-in?page=profile/${profile._id}`);
    }
  };

  const followUser = (userId) => {
    const data = { userId };
    const jwt = client.getCookie('feathers-jwt');
    return import('api/restClient').then((m) =>
      m.default.service(`/api/v2/likes`).create(data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
    );
  };

  const onFollowUser = (profileId) => {
    if (user) {
      followUser(profileId)
        .then(() => {
          setLikedUsers([...likedUsers, user._id]);
        })
        .catch((err) => {
          setErrMessage(err.message);
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
      saveUserDataByKey('name', 'type');
    } else {
      setErrMessage('Name is required');
    }
  };

  const handleBeforeUpload = (f) => {
    handleEvent();
    beforeUpload(f, props, updater);
  };

  const updater = (res) => {
    setUserData(res);
    setUserData({
      ...userData,
      avatar: res.avatar,
    });
  };

  const isShowModal = () => {
    const el = document.body;
    if (showModal) {
      el.classList.add(styles.body_scrool);
    } else {
      el.classList.remove(styles.body_scrool);
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
            {profile ? (
              <>
                {profile.avatar ? (
                  <Imgix
                    width={52}
                    height={52}
                    className="avatar"
                    src={client.UPLOAD_URL + profile.avatar}
                  />
                ) : (
                  <Avatar text={profile.name} fontSize={90} />
                )}
              </>
            ) : (
              <>
                {userData?.avatar ? (
                  <Imgix
                    width={52}
                    height={52}
                    className="avatar"
                    src={client.UPLOAD_URL + userData.avatar}
                  />
                ) : (
                  <Avatar text={userData?.name} fontSize={90} />
                )}
              </>
            )}
            {user && !profile && (
              <Upload
                fileList={[]}
                accept="image/jpg, image/png, image/jpeg"
                beforeUpload={handleBeforeUpload}>
                <SvgPrimaryAdd
                  className={styles.add}
                  id="myProfileUploadBtnId"
                  width="40"
                  height="40px"
                />
              </Upload>
            )}
          </div>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }} xl={{ span: 9 }}>
          <div className={styles.info_profile}>
            {!editMode ? (
              <>
                <h4>{userData?.name || profile?.name}</h4>
                <p>{userTypesEnums[userData?.type || profile?.type]}</p>

                {userData ? (
                  <>
                    <PrimaryButton
                      text="Edit"
                      splitterStyle={{ width: '120px', fontSize: '15px' }}
                      onClick={() => setEditMode(true)}
                    />
                    <span className={styles.followe_content}>
                      <span className={styles.count}>{user?.likedUsers?.length} followers</span>
                    </span>
                    <Link href="/contact-us">
                      <a>
                        <div className={styles.deleteAccount}>
                          <SvgDustbin width="20px" height="20px" />
                          <div>Delete account</div>
                        </div>
                      </a>
                    </Link>
                  </>
                ) : (
                  <>
                    {profile && !!user?.mangaStories?.data?.length && (
                      <span className={styles.contacts}>
                        <PrimaryButton
                          onClick={sendInvites}
                          text="Invite to collaborate"
                          splitterStyle={{ fontSize: '15px' }}
                          disabled={user?.mangaStories?.participents?.include(profile._id)}
                        />
                      </span>
                    )}
                    {profile && (
                      <span className={styles.followe_content}>
                        <span className={styles.count}>{likedUsers.length} followers</span>
                        {likedUsers.includes(user?._id) ? (
                          <span className={styles.icons}>
                            <SvgCheck width="16px" height="16px" />
                            <SvgUserDrawing width="22px" height="22px" />
                          </span>
                        ) : (
                          <span onClick={() => onFollowUser(profile._id)} className={styles.btn}>
                            <SvgAddUser width="22px" height="22px" />
                            Follow
                          </span>
                        )}
                      </span>
                    )}
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
                    className="changeSelect"
                    defaultValue={userTypesEnums[userData.type]}
                    style={{ width: '100%' }}
                    onChange={(value) => setUserData({ ...userData, type: value })}>
                    {userTypes.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </div>
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
          {profile && (
            <div className={styles.portfolio}>
              <SvgPortfolio width="34px" height="34px" />
              <span>
                <SvgGreenChecked width="22px" height="22px" />
              </span>
            </div>
          )}
          <div className={styles.shareButtonsProfile}>
            <ShareButtons shareUrl={originUrl} text="Share profile" />
          </div>
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
    </Content>
  );
};

ProfileTopBar.propTypes = {
  user: PropTypes.object.isRequired,
  beforeUpload: PropTypes.func,
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
};

ProfileTopBar.defaultProps = {
  cancelEditMode: () => {},
  saveUserDataByKey: () => {},
  beforeUpload: () => {},
  setEditMode: () => {},
  setUserData: () => {},
  editMode: null,
  userData: null,
  errMessage: '',
  originUrl: '',
  profile: null,
  setErrMessage: () => {},
};

export default ProfileTopBar;
