import React from 'react';

import { Upload, Input, Select, Layout, Row, Col } from 'antd';
import client from 'api/client';
import cn from 'classnames';
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
  } = props;

  return (
    <Content className={cn(styles.content)}>
      <Row>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 6 }}>
          <div className={styles.img}>
            <img
              src={
                user.avatar
                  ? client.UPLOAD_URL + user.avatar
                  : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
              }
              alt=""
            />
            <Upload
              beforeUpload={(f) => {
                beforeUpload(f, props);
              }}>
              <SvgPrimaryAdd
                className={styles.add}
                id="myProfileUploadBtnId"
                width="40px"
                height="40px"
              />
            </Upload>
          </div>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
          <div className={styles.info_profile}>
            {!editMode ? (
              <>
                <h4>{userData.name}</h4>
                <p>{userTypesEnums[userData.type]}</p>
                <PrimaryButton
                  text="Settings"
                  splitterStyle={{ width: '120px', fontSize: '15px' }}
                  onClick={() => setEditMode(true)}
                />
              </>
            ) : (
              <>
                <h2>
                  <Input
                    type="text"
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    value={userData.name}
                  />
                </h2>
                <div>
                  <Select
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
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 10 }}>
          <div className={styles.languages_btn}>
            {editMode && (
              <div className={styles.buttonsProfile}>
                <PrimaryButton
                  text="Cancel"
                  isDark
                  isRound
                  disabled={false}
                  onClick={cancelEditMode}
                />
                <PrimaryButton
                  text="save"
                  isActive
                  isRound
                  disabled={false}
                  onClick={() => saveUserDataByKey('name', 'type')}
                />
              </div>
            )}
          </div>
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
  beforeUpload: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  setEditMode: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  errMessage: PropTypes.string.isRequired,
  cancelEditMode: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
  originUrl: PropTypes.string.isRequired,
};

export default ProfileTopBar;
