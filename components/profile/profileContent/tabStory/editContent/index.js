/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { Input } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

const { TextArea } = Input;

const EditContent = ({
  profile,
  storyEditMode,
  ifMyProfile,
  userData,
  bioError,
  setTouchInput,
  setBioError,
  bioText,
  setBioText,
}) => {
  return ifMyProfile ? (
    userData && (userData?.content || storyEditMode) && (
      <>
        <h3 className={cn(styles.tab_title)}>Bio</h3>

        <div className={styles.text}>
          {storyEditMode ? (
            <>
              <GrammarlyEditorPlugin clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 10 }}
                  placeholder="Type here..."
                  value={bioText}
                  onChange={(e) => {
                    setTouchInput(true);
                    setBioError('');
                    setBioText(e.target.value);
                  }}
                  type="text"
                  minLength={10}
                  maxLength={1000}
                  className={cn(styles.textarea_text, bioError && styles.errorTextArea)}
                />
              </GrammarlyEditorPlugin>
              {bioError && <p className={styles.errorBio}>{bioError}</p>}
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
  ifMyProfile: PropTypes.bool.isRequired,
  storyEditMode: PropTypes.bool.isRequired,
  userData: PropTypes.object,
  bioError: PropTypes.any.required,
  setTouchInput: PropTypes.func.isRequired,
  setBioError: PropTypes.func.isRequired,
  bioText: PropTypes.string.isRequired,
  setBioText: PropTypes.func.isRequired,
};

EditContent.defaultProps = {
  userData: {},
};

export default EditContent;
