import React from 'react';

import { Input } from 'antd';
import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const WriteCollabName = ({ baseData, onChangeSingleField, setEditTitle, saveUserDataByKey }) => {
  const cancelEditTitle = () => {
    setEditTitle(false);
  };
  return (
    <>
      <div className={styles.inputs}>
        <h2>
          <Input
            className={!baseData.title.replace(/\s+/g, '') && styles.error}
            isLinear={true}
            isFullWidth={true}
            name="title"
            onChange={onChangeSingleField}
            placeholder=""
            type="text"
            value={baseData.title}
            required
          />
          {!baseData.title.replace(/\s+/g, '') && <p className={styles.error}>Title is required</p>}
        </h2>
      </div>
      <div className={cn(styles.editProfile, 'buttonsProfile_styles')}>
        <PrimaryButton
          className="buttonsProfile_cancel"
          text="Cancel"
          isDark
          isRound
          disabled={false}
          onClick={cancelEditTitle}
        />
        <PrimaryButton
          className="buttonsProfile_save"
          text="save"
          isActive
          isRound
          disabled={false}
          onClick={() => {
            baseData.title.replace(/\s+/g, '') && saveUserDataByKey(baseData, 'title');
          }}
        />
      </div>
    </>
  );
};

WriteCollabName.propTypes = {
  baseData: PropTypes.object.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  setEditTitle: PropTypes.string.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
};

export default WriteCollabName;
