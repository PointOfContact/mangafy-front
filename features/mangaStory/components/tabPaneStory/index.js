import React from 'react';

import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import EditStoryTab from '../editStoryTab';
import StoryTab from './storyTab';
import BuyBubbleTea from './storyTab/buyBubbleTea';
import styles from './styles.module.scss';

const TabPaneStory = ({
  mangaStory,
  setBaseData,
  baseData,
  isOwn,
  user,
  isParticipant,
  editMode,
  canEdit,
  setEditMode,
  onChangeSingleField,
  cancelEditMode,
  saveUserDataByKey,
  showPayPalToggle,
}) => (
  <div className={styles.tabWrap}>
    {/* <StoryTab baseData={baseData} /> */}
    <p>
      {!editMode ? (
        <div>
          <StoryTab
            mangaStory={mangaStory}
            setBaseData={setBaseData}
            baseData={baseData}
            user={user}
            isOwn={isOwn}
            isParticipant={isParticipant}
            showPayPalToggle={showPayPalToggle}
          />
          {!isOwn && (
            <div className={styles.ifNotOwnContainer}>
              {showPayPalToggle && <BuyBubbleTea payPalEmail={baseData?.authorInfo?.payPalEmail} />}
            </div>
          )}
          {canEdit && (
            <div className={styles.containerEdit}>
              <div className={styles.editDeleteButtons}>
                <PrimaryButton
                  isWhite={true}
                  className={styles.editTitleSvg}
                  text={'Edit Project'}
                  onClick={() => setEditMode(true)}
                />
                <Link href="/contact-us">
                  <PrimaryButton
                    isWhite={true}
                    className={styles.deleteTitleSvg}
                    text={'Delete Project'}
                  />
                </Link>
              </div>
              {showPayPalToggle && <BuyBubbleTea payPalEmail={baseData?.authorInfo?.payPalEmail} />}
            </div>
          )}
        </div>
      ) : (
        canEdit && (
          <EditStoryTab
            baseData={baseData}
            onChangeSingleField={onChangeSingleField}
            cancelEditMode={cancelEditMode}
            saveUserDataByKey={saveUserDataByKey}
          />
        )
      )}
      <p></p>
    </p>
  </div>
);

TabPaneStory.propTypes = {
  mangaStory: PropTypes.object.isRequired,
  setBaseData: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  isParticipant: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  cancelEditMode: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
  showPayPalToggle: PropTypes.bool.isRequired,
};

TabPaneStory.defaultProps = {
  user: null,
};

export default TabPaneStory;
