import React from 'react';

import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const EditButtons = ({
  storyEditMode,
  cancelStoryEditMode,
  saveUserDataByKey,
  setBioError,
  userData,
  setTouchInput,
  setUserData,
  bioText,
}) => {
  const getError = (bioText) => {
    const ifOnlySpace = bioText.trim().length;
    if (!ifOnlySpace) {
      if (!bioText?.length) {
        return;
      }
      return "You can't save only spaces";
    }
  };

  const saveBioData = () => {
    const bioError = getError(bioText);
    if (bioError) {
      setBioError(bioError);
    } else {
      setUserData({
        ...userData,
        content: bioText,
      });
      setBioError('');
      setTouchInput(false);
      saveUserDataByKey('content', 'genresIds');
    }
  };

  return (
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
            onClick={saveBioData}
          />
        </div>
      </div>
    )
  );
};

EditButtons.propTypes = {
  storyEditMode: PropTypes.bool.isRequired,
  cancelStoryEditMode: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
  ifBioLengthSmall: PropTypes.any,
  userData: PropTypes.object,
  setUserData: PropTypes.func.isRequired,
  bioText: PropTypes.string.isRequired,
};

EditButtons.defaultProps = {
  userData: {},
  ifBioLengthSmall: '',
};

export default EditButtons;
