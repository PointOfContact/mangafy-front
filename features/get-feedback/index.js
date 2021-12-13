import React, { useCallback, useEffect, useState } from 'react';

import { Modal, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import client from 'api/client';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import HeroUpload from 'components/ui-elements/heroUpload';
import { EVENTS } from 'helpers/amplitudeEvents';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import SelectTags from './selectTags';
import styles from './styles.module.scss';

const GetFeedback = ({ user, setIsModalVisible, isModalVisible, isPage, sendEvent }) => {
  const [imageUrl, setImgId] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [viewUrl, setViewUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [validation, setValidation] = useState('');
  const router = useRouter(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    const { pid, title, image } = router.query;
    if (!!pid) {
      setIsModalVisible(true);
      setImgId(image);
      setSubTitle(title);
      setViewUrl(`/manga-view/${pid}`);
    }
  }, []);

  useEffect(() => {
    const { pid } = router.query;
    if (!pid) {
      setSelectedTags([]);
      setSubTitle('');
      setValidation('');
      setValidation('');
      setImgId('');
    }
  }, [isModalVisible]);

  const onSubmit = useCallback(async (event) => {
    const { title } = router.query;
    const data = [
      {
        event_type: EVENTS.ADD_FEEDBACK,
        event_properties: { response_id: event.response_id },
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];

    if (title) {
      data[0].event_type = EVENTS.POST_MANGA;
      data[0].user_properties.manga_title = title;
    }
    myAmplitude(data);
  });

  const requestPost = () => {
    const data = {
      imageUrl,
      subTitle,
      categories: selectedTags,
    };

    if (viewUrl) {
      data.viewUrl = viewUrl;
    }

    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/posts')
        .create(data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then((res) => {
          sendEvent(EVENTS.CREATE_NEW_POST, res);
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
          return err;
        });
    });
  };

  const doingRequest = () =>
    !!subTitle.trim()
      ? requestPost()
      : setValidation('Think of your post title as a super short (but compelling!) ');

  return (
    <Modal
      className={styles.modalFeedbacks}
      closeIcon={
        <span className={styles.closeIcon} onClick={() => setIsModalVisible(false)}>
          <SvgClose />
        </span>
      }
      visible={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      footer={null}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleNewPost}>New Post</h1>
        <div className={styles.border}></div>
      </div>
      <div className={styles.container}>
        <h2>Upload image or video</h2>
        <HeroUpload
          text="Drag or browse your art to start uploading"
          setImgId={setImgId}
          mangaUrl={imageUrl}
          className={styles.feedbackUpload}
          uploadVideo={true}
          setUploadLoading={setUploadLoading}
        />
        <h2>Post content here</h2>
        <TextArea
          placeholder="Write a caption..."
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className={styles.modalTextarea}
        />
        {validation && <p className={styles.error}>{validation}</p>}
        <h2>Tags</h2>
        <SelectTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <PrimaryButton
          className={styles.createPost}
          loading={uploadLoading}
          text="Post"
          onClick={(e) => {
            Router.push('/feed');
            onSubmit(e);
            doingRequest();
            !!subTitle.trim() && setIsModalVisible(false);
          }}
        />
      </div>
    </Modal>
  );
};

GetFeedback.propTypes = {
  isPage: PropTypes.object,
  user: PropTypes.object.isRequired,
  setIsModalVisible: PropTypes.func,
  sendEvent: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool,
};

GetFeedback.defaultProps = {
  isPage: {},
  setIsModalVisible: () => {},
  isModalVisible: false,
};

export default GetFeedback;
