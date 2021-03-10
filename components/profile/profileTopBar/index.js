import React from 'react';

import { Upload, Input, Select, Layout, Row, Col } from 'antd';
import client from 'api/client';
import { createRequest } from 'api/joinMangaStoryRequestClient';
import cn from 'classnames';
import SvgGreenChecked from 'components/icon/GreenChecked';
import SvgPortfolio from 'components/icon/Portfolio';
import SvgPrimaryAdd from 'components/icon/PrimaryAdd';
import { ShareButtons } from 'components/share';
import PrimaryButton from 'components/ui-elements/button';
import { userTypes, userTypesEnums } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

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

  const onInvite = async () => {
    await createRequest({
      mangaStoryId: user.mangaStories[0]._id,
      isInvite: true,
      joinAs: profile.type,
      senderId: profile._id,
    });
  };

  return (
    <Content className={cn(styles.content)}>
      <Row>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 6 }} xl={{ span: 5 }}>
          <div className={styles.img}>
            {profile ? (
              <img
                src={
                  profile?.avatar
                    ? client.UPLOAD_URL + profile?.avatar
                    : `https://ui-avatars.com/api/?background=7b65f3&name=${profile.name}&rounded=true&color=ffffff`
                }
                alt=""
              />
            ) : (
              <img
                src={
                  user.avatar
                    ? client.UPLOAD_URL + user.avatar
                    : `https://ui-avatars.com/api/?background=7b65f3&name=${user.name}&rounded=true&color=ffffff`
                }
                alt=""
              />
            )}
            {user && !profile && (
              <Upload
                beforeUpload={(f) => {
                  beforeUpload(f, props);
                }}>
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
                        onClick={onInvite}
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
                  onClick={() => saveUserDataByKey('name', 'type')}
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
