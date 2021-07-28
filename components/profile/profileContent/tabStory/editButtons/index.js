import React from 'react';

import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const EditButtons = ({ storyEditMode, cancelStoryEditMode, saveUserDataByKey }) =>
  storyEditMode && (
    <div className={cn(styles.change_btn)}>
      <div className={cn(styles.buttonsProfile, 'buttonsProfile_styles')}>
        <PrimaryButton
          className="buttonsProfile_cancel"
          text="Cancel"
          isDark
          isRound
          disabled={false}
          onClick={cancelStoryEditMode}
        />
        <PrimaryButton
          className="buttonsProfile_save"
          text="save"
          isActive
          isRound
          disabled={false}
          onClick={() => saveUserDataByKey('content', 'genresIds')}
        />
      </div>
    </div>
  );

EditButtons.propTypes = {
  storyEditMode: PropTypes.bool.isRequired,
  cancelStoryEditMode: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
};

export default EditButtons;
