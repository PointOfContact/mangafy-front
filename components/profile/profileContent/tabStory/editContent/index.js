/* eslint-disable no-nested-ternary */
import React from 'react';

import { Input } from 'antd';
import cn from 'classnames';
import SvgPurplePencil from 'components/icon/PurplePencil';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const { TextArea } = Input;

const EditContent = ({
  profile,
  storyEditMode,
  setStoryEditMode,
  ifMyProfile,
  userData,
  setUserData,
}) =>
  ifMyProfile ? (
    userData &&
    (userData?.content || storyEditMode) && (
      <>
        <h3 className={cn(styles.tab_title)}>Bio</h3>

        {!storyEditMode && (
          <SvgPurplePencil
            className={styles.editAboutButton}
            onClick={() => setStoryEditMode(true)}
            width="30"
          />
        )}

        <div className={styles.text}>
          {storyEditMode ? (
            <TextArea
              autoSize={{ minRows: 3, maxRows: 10 }}
              placeholder="Type here..."
              value={userData.content}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  content: e.target.value,
                })
              }
              required
              type="text"
              minLength={10}
              maxLength={1000}
              className={styles.textarea_text}
            />
          ) : (
            userData?.content && (
              <p className={cn(styles.data_content, styles.tab_sub_title)}>
                {ifMyProfile && userData?.content}
              </p>
            )
          )}
        </div>
      </>
    )
  ) : (
    <>
      <h3 className={cn(styles.sub_title)}>{profile?.content ? 'Here is a my story!' : 'Bio'}</h3>
      {profile?.content ? (
        <pre className={styles.data_content}>{profile?.content}</pre>
      ) : (
        <h4>Hey 👋 I just created a page here. You can now follow me or say hello!</h4>
      )}
    </>
  );

EditContent.propTypes = {
  profile: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
  ifMyProfile: PropTypes.bool.isRequired,
  storyEditMode: PropTypes.bool.isRequired,
  setStoryEditMode: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default EditContent;
