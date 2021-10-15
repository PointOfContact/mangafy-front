/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { Input } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const { TextArea } = Input;

const EditContent = ({ profile, storyEditMode, ifMyProfile, userData, setUserData }) => {
  const [touchInput, setTouchInput] = useState(false);
  const ifBioLengthSmall = touchInput && userData?.content?.length < 3;

  return ifMyProfile ? (
    userData && (userData?.content || storyEditMode) && (
      <>
        <h3 className={cn(styles.tab_title)}>Bio</h3>

        <div className={styles.text}>
          {storyEditMode ? (
            <>
              <TextArea
                autoSize={{ minRows: 3, maxRows: 10 }}
                placeholder="Type here..."
                value={userData.content}
                onChange={(e) => {
                  setTouchInput(true);
                  setUserData({
                    ...userData,
                    content: e.target.value,
                  });
                }}
                required
                type="text"
                minLength={10}
                maxLength={1000}
                className={styles.textarea_text}
              />
              {ifBioLengthSmall && (
                <p className={styles.errorBio}>This field data should be minimum 3 character</p>
              )}
            </>
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
};

EditContent.propTypes = {
  profile: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
  ifMyProfile: PropTypes.bool.isRequired,
  storyEditMode: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default EditContent;
