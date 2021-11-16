import React from 'react';

import Popconfirm from 'components/popconfirm';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const DeleteProjectField = ({ userData, baseData, sendEvent, confirmDelete }) => (
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
      <Popconfirm
        overlayClassName={styles.popConfirm}
        position={'right'}
        title={`Delete project? You're are about to delete "${baseData?.title}" Deleting a project is permanent, and deleted project cannot be recovered.`}
        cancelText="Cancel"
        okText="Yes, delete it"
        onConfirm={() => confirmDelete(userData?._id, baseData?._id)}
        item={
          <PrimaryButton
            className={styles.deleteProjectButton}
            text="Delete project"
            onClick={() => {
              sendEvent(EVENTS.DELETE_PROJECT, 'method', 'delete');
            }}
          />
        }
      />
      <a href="mailto:yo@mangafy.club">
        Feel free to contact <span> yo@mangafy.club</span> with any questions.
      </a>
    </div>
  </>
);

DeleteProjectField.propTypes = {
  userData: PropTypes.object.isRequired,
  baseData: PropTypes.object.isRequired,
  sendEvent: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

export default DeleteProjectField;
