import React, { useState } from 'react';

import DeleteProjectModal from 'components/deleteProjectModal';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from '../../styles.module.scss';
import EditStoryTab from '../editStoryTab';
import StoryTab from '../storyTab';

const EditMode = ({
  user,
  mangaStory,
  editMode,
  baseData,
  isOwn,
  setBaseData,
  setEditMode,
  canEdit,
  isParticipent,
  onChangeSingleField,
  cancelEditMode,
  saveUserDataByKey,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={styles.tabWrap}>
      {/* <StoryTab baseData={baseData} /> */}
      <p>
        {!editMode ? (
          <div>
            <StoryTab
              setBaseData={setBaseData}
              baseData={baseData}
              user={user}
              isOwn={isOwn}
              isParticipent={isParticipent}
            />
            {canEdit && (
              <div className={styles.editDeleteButtons}>
                <PrimaryButton
                  isWhite={true}
                  className={styles.editTitleSvg}
                  text={'Edit Project'}
                  onClick={() => setEditMode(true)}
                />
                <PrimaryButton
                  isWhite={true}
                  className={styles.deleteTitleSvg}
                  text={'Delete Project'}
                  onClick={() => setIsModalVisible(true)}
                />
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
        <DeleteProjectModal
          user={user}
          mangaStory={mangaStory}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </p>
    </div>
  );
};

EditMode.propTypes = {
  mangaStory: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  isParticipent: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  baseData: PropTypes.object.isRequired,
  setBaseData: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  cancelEditMode: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
};

export default EditMode;
