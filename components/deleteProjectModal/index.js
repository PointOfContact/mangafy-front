import React from 'react';

import Modal from 'antd/lib/modal/Modal';
import SvgClose from 'components/icon/Close';
import PropTypes from 'prop-types';

import DeleteProject from './deleteProject';
import styles from './styles.module.scss';

const DeleteProjectModal = ({ user, mangaStory, isModalVisible, setIsModalVisible }) => (
  <Modal
    className={styles.modalFeedbacks}
    zIndex={1000000}
    closeIcon={
      <span
        className={styles.closeIcon}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalVisible(false);
        }}
      >
        <SvgClose />
      </span>
    }
    visible={isModalVisible}
    footer={null}
  >
    <DeleteProject
      userId={user?._id}
      mangaStoryId={mangaStory?._id}
      setIsModalVisible={setIsModalVisible}
    />
  </Modal>
);

DeleteProjectModal.propTypes = {
  user: PropTypes.object.isRequired,
  mangaStory: PropTypes.object.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default DeleteProjectModal;
