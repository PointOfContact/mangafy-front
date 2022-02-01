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

const GetFeedback = ({
  user,
  setIsModalVisible,
  isModalVisible,
  isPage,
  sendEvent,
  edit,
  postId,
  img,
  currentSubTitle,
  categories,
}) => {
  const [imageUrl, setImgId] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [viewUrl, setViewUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [validation, setValidation] = useState('');
  const router = useRouter(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    const { postType } = router.query;

    if (postType === 'Manga' && !edit) {
      setIsModalVisible(true);
    } else if (postType === 'Task' && !edit) {
      setIsModalVisible(true);
    }
  }, []);

  useEffect(() => {
    const { postType, pid, title, image, text, money, lookingFor } = router.query;

    if (!isModalVisible) {
      setSelectedTags([]);
      setSubTitle('');
      setValidation('');
      setValidation('');
      setImgId('');
    } else if (postType === 'Manga' && !edit) {
      setIsModalVisible(true);
      setImgId(image);
      setSubTitle(title);
      setViewUrl(`/manga-view/${pid}`);
    } else if (postType === 'Task' && !edit) {
      setIsModalVisible(true);
      setSubTitle(`Looking For - ${lookingFor}, ${text}`);
      !!money && setSelectedTags([`#${money}$`]);
      setViewUrl(`manga-story/${pid}?tab=story`);
    } else {
      setImgId(img);
      setSelectedTags(categories);
      setSubTitle(currentSubTitle);
    }
  }, [isModalVisible]);

  const onSubmit = useCallback(async (event) => {
    const { postType } = router.query;
    const data = [
      {
        event_type: edit ? EVENTS.EDIT_POST : EVENTS.ADD_FEEDBACK,
        event_properties: { response_id: event.response_id },
      },
    ];
    if (postType === 'Manga') {
      data[0].event_type = EVENTS.POST_MANGA;
    } else if (postType === 'Task') {
      data[0].event_type = EVENTS.POST_TASK;
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

    const query = router?.query?.postType
      ? `?postType=${router?.query?.postType}&pid=${router?.query?.pid}`
      : '';

    const jwt = client.getCookie('feathers-jwt');

    if (edit) {
      import('api/restClient').then((m) => {
        m.default
          .service(`/api/v2/posts${query}`)
          .patch(postId, data, {
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
    } else {
      import('api/restClient').then((m) => {
        m.default
          .service(`/api/v2/posts${query}`)
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
    }
  };

  const doingRequest = () =>
    !!subTitle.trim()
      ? requestPost()
      : setValidation('Think of your post title as a super short (but compelling!) ');

  return (
    <div onClick={(e) => e.stopPropagation()}>
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
          <h1 className={styles.titleNewPost}>{edit ? 'Edit Post' : 'Create Post'}</h1>
          <div className={styles.border}></div>
        </div>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <h2>Upload image or video</h2>
          <HeroUpload
            text="Drag or browse your art to start uploading"
            setImgId={setImgId}
            mangaUrl={imageUrl}
            className={styles.feedbackUpload}
            uploadVideo={true}
            setUploadLoading={setUploadLoading}
          />
          <h2>Add to your post</h2>
          <TextArea
            placeholder="Write a caption..."
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className={styles.modalTextarea}
          />
          {validation && <p className={styles.error}>{validation}</p>}
          <h2>Global tags</h2>
          <SelectTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          <PrimaryButton
            className={styles.createPost}
            loading={uploadLoading}
            text={edit ? 'Save' : 'Create Post'}
            onClick={(e) => {
              Router.push('/feed', undefined, { scroll: false });
              onSubmit(e);
              doingRequest();
              !!subTitle.trim() && setIsModalVisible(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

GetFeedback.propTypes = {
  isPage: PropTypes.object,
  user: PropTypes.object.isRequired,
  setIsModalVisible: PropTypes.func,
  sendEvent: PropTypes.func,
  isModalVisible: PropTypes.bool,
  edit: PropTypes.bool,
  postId: PropTypes.string,
  img: PropTypes.string,
  currentSubTitle: PropTypes.string,
  categories: PropTypes.array,
};

GetFeedback.defaultProps = {
  isPage: {},
  setIsModalVisible: () => {},
  isModalVisible: false,
  sendEvent: () => {},
  edit: false,
  postId: '',
  img: '',
  currentSubTitle: '',
  categories: [],
};

export default GetFeedback;
