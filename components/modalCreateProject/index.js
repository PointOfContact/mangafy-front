import React, { useEffect, useState } from 'react';

import { Button, Modal, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgAllowLeft from 'components/icon/AllowLeft';
import SvgClose from 'components/icon/Close';
import PrimaryInput from 'components/ui-elements/input';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ModalCreateProject = ({ createProjectModal, showCreateProjectModal }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    setChange(false);
    setTitle('');
  }, [createProjectModal]);

  const createMangaStory = () => {
    const data = { title };
    const jwt = client.getCookie('feathers-jwt');
    setLoading(true);
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/manga-stories')
        .create(data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          showCreateProjectModal(false);
          setLoading(false);
          window.open(`/manga-story/${res._id}?create=true`, '_self');
        })
        .catch((err) => {
          setLoading(false);
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
          return err;
        });
    });
  };

  const errorMessage = (className) =>
    title?.trim()?.length < 2 &&
    change && (
      <p className={cn(styles.error, className)}>
        You need a unique title that fits your webcomic and makes a wow effect{' '}
      </p>
    );

  return (
    <Modal
      className={styles.modalCreateProject}
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
      <h1 className={styles.title}>Create webcomics project</h1>
      <p className={styles.description}>
        Collaborate, manage projects get donations, and reach new productivity peaks.
      </p>
      <div className={styles.containerCreateProject}>
        <PrimaryInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onMouseOut={() => setChange(true)}
          placeholder="Project Name"
        />
        {errorMessage(styles.errorMobile)}
        <Button loading={loading} onClick={() => title?.trim()?.length > 1 && createMangaStory()}>
          Start my webcomics <SvgAllowLeft />
        </Button>
      </div>
      {errorMessage()}
    </Modal>
  );
};

ModalCreateProject.propTypes = {
  createProjectModal: PropTypes.bool.isRequired,
  showCreateProjectModal: PropTypes.func.isRequired,
};

export default ModalCreateProject;
