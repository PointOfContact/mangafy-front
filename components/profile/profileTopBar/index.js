import React, { useEffect, useState } from 'react';

import { Upload, Input, Select, Layout, Row, Col, notification, Popover } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Follow from 'components/follow';
import SvgChat from 'components/icon/Chat';
import SvgDustbin from 'components/icon/Dustbin';
import SvgHand from 'components/icon/Hand';
import SvgPrimaryAdd from 'components/icon/PrimaryAdd';
import Imgix from 'components/imgix';
import ModalInvites from 'components/modals/sendInvites';
import Avatar from 'components/ui-elements/avatar';
import PrimaryButton from 'components/ui-elements/button';
import Share from 'components/ui-elements/share';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes, userTypesEnums } from 'helpers/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import useWindowSize from 'utils/useWindowSize';

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
  const { width } = useWindowSize();

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
            history.push(`/my-profile?tab=messenger&conversation=${res._id}`);
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
              history.push(`/my-profile?tab=messenger&conversation=${conv._id}`);
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
                    width={500}
                    height={500}
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
                    width={500}
                    height={500}
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
                    <Follow
                      count={user?.likedUsers?.length}
                      profile={profile}
                      user={user}
                      likedUsers={user?.likedUsers}
                      setLikedUsers={setLikedUsers}
                    />
                  </>
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
          {userData ? (
            <>
              <div className={styles.hotBtns}>
                <div className={styles.shere}>
                  <Popover
                    overlayClassName={styles.popover}
                    placement={width < 768 ? 'bottom' : 'left'}
                    content={'Share'}
                    trigger="hover">
                    <div className={styles.svgBg}>
                      <Share shareUrl={originUrl} size={39} />
                    </div>
                  </Popover>
                </div>
              </div>
            </>
          ) : (
            <>
              {profile &&
                !!user?.mangaStories?.data?.length &&
                !(
                  user?.mangaStories?.participents?.include(profile._id) ||
                  user?._id === profile?._id
                ) && (
                  <div className={styles.hotBtns}>
                    <div className={styles.shere}>
                      <Popover
                        overlayClassName={styles.popover}
                        placement={width < 768 ? 'bottom' : 'left'}
                        content={'Share'}
                        trigger="hover">
                        <div className={styles.svgBg}>
                          <Share shareUrl={originUrl} size={39} />
                        </div>
                      </Popover>
                    </div>
                    <div className={styles.contacts}>
                      <Popover
                        overlayClassName={styles.popover}
                        placement={width < 768 ? 'bottom' : 'left'}
                        content={'Collab'}
                        trigger="hover">
                        <div onClick={sendInvites} className={styles.svgBg}>
                          <SvgHand width="19px" height="19px" />
                        </div>
                      </Popover>
                    </div>
                    <div className={styles.contacts}>
                      <Popover
                        overlayClassName={styles.popover}
                        placement={width < 768 ? 'bottom' : 'left'}
                        content={'Messenger'}
                        trigger="hover">
                        <div onClick={sendMessage} className={styles.svgBg}>
                          <SvgChat width="19px" height="19px" />
                        </div>
                      </Popover>
                    </div>
                  </div>
                )}
            </>
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
