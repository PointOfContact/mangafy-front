import React, { useCallback, useEffect, useState } from 'react';

import { Modal, notification } from 'antd';
import client from 'api/client';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import HeroUpload from 'components/ui-elements/heroUpload';
import { EVENTS } from 'helpers/amplitudeEvents';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';
import Close from 'components/icon/new/Close';

import SelectTags from './selectTags';
import styles from './styles.module.scss';
import PrimaryInput from 'components/ui-elements/input';
import Input from 'components/ui-new/Input';
import TextArea from 'components/ui-new/TextArea';
import Button from 'components/ui-new/Button';

const PortfolioForm = ({ isModalVisible, setIsModalVisible, user }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [imageError, setImageError] = useState('');

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [subTitleError, setSubTitleError] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsError, setTagsError] = useState('');

  useEffect(() => {
    validateTags();
  }, [selectedTags]);

  function validateTitle() {
    if (!title) {
      showError('Please input a title');
      return setTitleError('Please input a title');
    }
    if (title.length <= 3) {
      showError('Title length should me more than 3 characters');
      return setTitleError('Title length should me more than 3 characters');
    }
    setTitleError('');
    return true;
  }

  function validateImage() {
    if (!imgUrl) {
      showError('Please upload an image');
      return setImageError('Please upload an image');
    }
    setImageError('');
    return true;
  }

  function validateTags() {
    console.log(selectedTags.length);
    if (selectedTags.length > 4) {
      showError('Please use less than 5 tags');
      return setTagsError('Please use less than 5 tags');
    }
    setImageError('');
    return true;
  }

  function submitHandler() {
    if (!validateTitle()) return;
    if (!validateImage()) return;
    if (!validateTags()) return;
    console.log('submit');
    console.log({ title, subTitle, selectedTags, imgUrl, pid: user._id, postType: 'Profile' });
    // uploadWork();
  }

  function uploadWork(data) {
    const jwt = client.getCookie('feathers-jwt');
    client
      .service(`/api/v2/posts?postType=Profile&pid=${user._id}`)
      .create(data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .catch((err) => {
        showError(err.message);
        return err;
      });
  }

  return (
    <Modal
      closeIcon={
        <span onClick={() => setIsModalVisible(false)}>
          <Close />
        </span>
      }
      visible={isModalVisible}
      onCalsel={() => setIsModalVisible(false)}
      footer={false}>
      <div className={styles.form}>
        <h2 className={styles.form__title}>What are you working on?</h2>

        <h3 className={styles.form__subtitle}>Title</h3>
        <Input
          error={!!titleError}
          placeholder="Give me a name"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={validateTitle}
        />
        <h3 className={styles.form__subtitle}>Shot</h3>
        <TextArea
          placeholder="White what went into this shot, part of the script you working on, or just short story"
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <h3 className={styles.form__subtitle}>Add image here</h3>
        <HeroUpload
          text="Drag or browse your art to start uploading"
          // setImgId={setImgUrl}
          onChangeHero={(smth, fileName) => {
            setImgUrl(fileName);
          }}
          // mangaUrl={imageUrl}
          uploadVideo={true}
          // setUploadLoading={setU ploadLoading}
        />
        <h3>Tags help people find your post</h3>
        <SelectTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <Button onClick={submitHandler} rounded className={styles.form__submit}>
          Publish now
        </Button>
      </div>
    </Modal>
  );
};

export default PortfolioForm;

function showError(message) {
  notification.error({
    message: message,
    placement: 'bottomLeft',
  });
}
