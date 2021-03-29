import React, { useState } from 'react';

import { Upload, Input, Select, Layout, Row, Col, notification } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import client from 'api/client';
import cn from 'classnames';
import SvgGreenChecked from 'components/icon/GreenChecked';
import SvgPortfolio from 'components/icon/Portfolio';
import SvgPrimaryAdd from 'components/icon/PrimaryAdd';
import ModalInvites from 'components/modals/sendInvites';
import { ShareButtons } from 'components/share';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes, userTypesEnums } from 'helpers/constant';
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
  } = props;

  const [showModal, changeShowModal] = useState(false);

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
    });
  };
  const history = useRouter();
  const sendInvites = () => {
    if (user) {
      if (user.mangaStories.length) {
        changeShowModal(true);
        isShowModal();
      } else {
        openNotification('error', "You don't have manga story");
      }
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
    handleEvent();
    saveUserDataByKey('name', 'type');
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

  return (
    <Content className={cn(styles.content)}>
      <Row>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 6 }} xl={{ span: 5 }}>
          <div className={styles.img}>
            {profile ? (
              <Avatar
                src={
                  profile?.avatar
                    ? client.UPLOAD_URL + profile?.avatar
                    : `https://ui-avatars.com/api/?background=9A87FE&name=${profile.name}&rounded=true&color=ffffff`
                }
                alt=""
              />
            ) : (
              <Avatar
                src={
                  userData
                    ? client.UPLOAD_URL + userData.avatar
                    : `https://ui-avatars.com/api/?background=9A87FE&name=${user.name}&rounded=true&color=ffffff`
                }
                alt=""
              />
            )}
            {user && !profile && (
              <Upload accept="image/jpg, image/png, image/jpeg " beforeUpload={handleBeforeUpload}>
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
                  <PrimaryButton
                    text="Edit"
                    splitterStyle={{ width: '120px', fontSize: '15px' }}
                    onClick={() => setEditMode(true)}
                  />
                ) : (
                  profile &&
                  !!user?.mangaStories?.length && (
                    <span className={styles.contacts}>
                      <PrimaryButton
                        onClick={sendInvites}
                        text="Invite to collaborate"
                        splitterStyle={{ fontSize: '15px' }}
                        disabled={user?.mangaStories?.participents?.include(profile._id)}
                      />
                    </span>
                  )
                )}
              </>
            ) : (
              <>
                <h2>
                  <Input
                    className={styles.changeTitle}
                    type="text"
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    value={userData.name}
                  />
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
                {errMessage ? <p className={styles.errMessage}>{errMessage}</p> : null}
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
};

export default ProfileTopBar;
