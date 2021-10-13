import React from 'react';

import { Modal } from 'antd';
import SvgAllowLeft from 'components/icon/AllowLeft';
import SvgClose from 'components/icon/Close';
import PrimaryInput from 'components/ui-elements/input';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ModalCreateProject = ({ createProjectModal, showCreateProjectModal }) => (
  <Modal
    className={styles.modalCreateProject}
    zIndex={1000000}
    closeIcon={
      <span className={styles.close}>
        <SvgClose />
      </span>
    }
    onCancel={() => {
      showCreateProjectModal(false);
    }}
    visible={createProjectModal}
    footer={null}>
    <h1>Create webcomics project</h1>
    <p>Collaborate, manage projects get donations, and reach new productivity peaks.</p>
    <div className={styles.containerCreateProject}>
      <PrimaryInput placeholder="Project Name" />
      <button>
        Start my webcomics <SvgAllowLeft />{' '}
      </button>
    </div>
  </Modal>
);

ModalCreateProject.propTypes = {
  createProjectModal: PropTypes.bool.isRequired,
  showCreateProjectModal: PropTypes.func.isRequired,
};

export default ModalCreateProject;
