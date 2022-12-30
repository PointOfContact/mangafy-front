import React from 'react';

import PropTypes from 'prop-types';

import BuyBubbleTea from '../../../../components/ui-elements/buyBubbleTea';
import EditStoryTab from '../editStoryTab';
import StoryTab from './storyTab';
import styles from './styles.module.scss';

const EditMode = ({
  user,
  editMode,
  baseData,
  isOwn,
  setBaseData,
  canEdit,
  isParticipant,
  onChangeSingleField,
  cancelEditMode,
  saveMangaStoryData,
  showPayPalContent,
  userData,
}) => (
  <div className={styles.tabWrap}>
    <p>
      {/* {!editMode ? ( */}
      <div>
        <StoryTab
          setBaseData={setBaseData}
          baseData={baseData}
          user={user}
          isOwn={isOwn}
          isParticipant={isParticipant}
          showPayPalContent={showPayPalContent}
          userData={userData}
        />
        <div>
          <div className={styles.containerEdit}>
            {showPayPalContent && <BuyBubbleTea payPalEmail={baseData?.authorInfo?.payPalEmail} />}
          </div>
        </div>
      </div>
      {/* ) : (
        canEdit && (
          <EditStoryTab
            baseData={baseData}
            onChangeSingleField={onChangeSingleField}
            cancelEditMode={cancelEditMode}
            saveMangaStoryData={saveMangaStoryData}
          />
        )
      )} */}
      <p></p>
    </p>
  </div>
);

EditMode.propTypes = {
  user: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  isParticipant: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  baseData: PropTypes.object.isRequired,
  setBaseData: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  cancelEditMode: PropTypes.func.isRequired,
  saveMangaStoryData: PropTypes.func.isRequired,
  showPayPalToggle: PropTypes.bool,
  showPayPalContent: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

EditMode.defaultProps = {
  showPayPalToggle: false,
};

export default EditMode;
