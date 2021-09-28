import React, { useState } from 'react';

import DeleteProjectModal from 'components/deleteProjectModal';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const DeleteProjectField = ({ userData, baseData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <div className={styles.deleteProject}>
        <h2 className={styles.dangerZone}>Danger Zone</h2>
        <h3 className={styles.deleteProjectTitle}>Delete project</h3>
        <p>Deleting your project will:</p>
        <p>Delete your project, along with your authentication associations.</p>
        <p>
          Delete any and all content you have, such as articles, comments, your reading list or chat
          messages.
        </p>
        <PrimaryButton
          className={styles.deleteProjectButton}
          text="Delete project"
          onClick={() => setIsModalVisible(true)}
        />
        <a href="mailto:yo@mangafy.club">
          Feel free to contact <span> yo@mangafy.</span> club with any questions.
        </a>
      </div>
      <DeleteProjectModal
        user={userData}
        mangaStory={baseData}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

DeleteProjectField.propTypes = {
  userData: PropTypes.object.isRequired,
  baseData: PropTypes.object.isRequired,
};

export default DeleteProjectField;
