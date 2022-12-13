import React, { useEffect, useState } from 'react';

import { Modal, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgAllowLeft from 'components/icon/AllowLeft';
import SvgClose from 'components/icon/Close';
import PrimaryInput from 'components/ui-elements/input';
import { EVENTS } from 'helpers/amplitudeEvents';
import router from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';
import Input from 'components/ui-new/Input';
import Button from 'components/ui-new/Button';
import Close from 'components/icon/new/Close';

const ModalCreateProject = ({ createProjectModal, showCreateProjectModal, user }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setChange(false);
    setTitle('');
  }, [createProjectModal]);

  // useEffect(() => {
  //   const error = validateTitle(title);
  //   setError(error);
  // }),
  //   [title];

  const createMangaStory = () => {
    const error = validateTitle(title);
    setError(error);
    if (error) {
      return;
    }
    const data = { title };
    const jwt = client.getCookie('feathers-jwt');
    setLoading(true);
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/manga-stories')
        .create(data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then(async (res) => {
          const dataEvent = [
            {
              event_type: EVENTS.CREATE_MANGA_STORY,
              event_properties: { mangaStory: res, mangaStoryId: res._id },
            },
          ];
          showCreateProjectModal(false);
          setLoading(false);
          await myAmplitude(dataEvent);
          if (router.router.pathname === '/project/production/[pid]') {
            window.open(`/project/production/${res._id}?tab=settings&manga=create`, '_self');
          } else {
            router.push(`/project/production/${res._id}?tab=settings&manga=create`, undefined, {
              shallow: false,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.message === 'jwt malformed') {
            router.push('/sign-in?page=feed?start=true');
          } else {
            notification.error({
              message: err.message,
              placement: 'bottomLeft',
            });
          }
          showCreateProjectModal(false);
          return err;
        });
    });
  };

  return (
    <Modal
      className={styles.modalCreateProject}
      closeIcon={<Close bold className={styles.close} />}
      onCancel={() => {
        showCreateProjectModal(false);
      }}
      visible={createProjectModal}
      footer={null}>
      <h1 className={styles.title}>Bring your creative project to life.</h1>
      <p className={styles.description}>
        You can get your work on your fan&apos;s walls with a MangaFY <br /> project, whether you
        work alone or with a team.
      </p>
      <div className={styles.inputTitle}>Project name</div>
      <div className={styles.containerCreateProject}>
        {/* <PrimaryInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onMouseOut={() => setChange(true)}
          placeholder="Project Name"
        /> */}
        <Input
          err={error}
          md
          rounded
          pink
          placeholder={'Project name'}
          value={title}
          onChange={(text) => setTitle(text)}
          className={styles.input}
        />
        {/* <Button
          className={styles.button}
          loading={loading}
          onClick={() => title?.trim()?.length > 1 && createMangaStory()}>
          <div className={styles.buttonContent}>
            Start a project
            <SvgAllowLeft />
          </div>
        </Button> */}
        <Button
          rounded
          pink
          className={styles.button}
          loading={loading}
          onClick={() => createMangaStory()}>
          Start a project
        </Button>
      </div>
    </Modal>
  );
};

ModalCreateProject.propTypes = {
  createProjectModal: PropTypes.bool.isRequired,
  showCreateProjectModal: PropTypes.func.isRequired,
  user: PropTypes.object,
};

ModalCreateProject.defaultProps = {
  user: {},
};

export default ModalCreateProject;

function validateTitle(title) {
  if (title.length < 4) {
    return 'Title must be at least 4 characters';
  }
}
