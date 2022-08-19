import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Close from 'components/icon/new/Close';
import styles from './styles.module.scss';
import Input from 'components/ui-new/Input';
import HeroUpload from 'components/ui-elements/heroUpload';
import Textarea from 'components/ui-new/Textarea';
import Button from 'components/ui-new/Button';
import { notification } from 'antd';
import client from 'api/client';

const CreateShotModal = ({ isVisible, setIsVisible }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '', image: '' });

  useEffect(() => {
    setErrors((oldErrors) => ({
      ...oldErrors,
      titleError: '',
    }));
  }, [title]);

  useEffect(() => {
    setErrors((oldErrors) => ({
      ...oldErrors,
      descriptionError: '',
    }));
  }, [description]);

  useEffect(() => {
    setErrors((oldErrors) => ({
      ...oldErrors,
      imageError: '',
    }));
  }, [image]);

  function validate() {
    const titleError = validateTitle(title);
    const imageAndDescriptionError = validateImageAndDescription(image, description);
    const descriptionError = description && !image && validateDescription(description);
    return { titleError, descriptionError, imageAndDescriptionError };
  }

  function onSubmit() {
    const validation = validate();
    setErrors(validation);
    if (validation) {
      for (const error in validation) {
        validation[error] &&
          notification.error({ message: validation[error], placement: 'bottomLeft' });
      }
    } else {
      createShot(title, description, image)
        .then((res) => {
          console.log(res);
          setIsVisible(false);
        })
        .catch((err) => {
          notification.error;
        });
    }
  }

  if (!isVisible) return <></>;
  return (
    <Modal
      title="Create a new shot"
      visible={isVisible}
      onCancel={() => {
        setIsVisible(false);
      }}
      wrapClassName={styles.modal}
      closeIcon={<Close className={styles.modal__close} />}
      footer={null}>
      <h2>Title</h2>
      <Input
        err={errors.titleError}
        placeholder="Write a title"
        sm
        full
        onChange={(text) => setTitle(text)}
      />
      <h2>Add an image</h2>
      <HeroUpload setImgId={setImage} />
      <h2>And / or a description</h2>
      <Textarea
        placeholder="Write a description to your shot"
        err={errors.descriptionError}
        sm
        full
        onChange={(text) => setDescription(text)}
      />
      <Button smooth full onClick={onSubmit}>
        Create shot
      </Button>
    </Modal>
  );
};

export default CreateShotModal;

function validateTitle(title) {
  if (title.length < 3) {
    return 'Title must be at least 3 characters long';
  }
  return '';
}

function validateDescription(description) {
  if (description.length < 5) {
    return 'Description must be at least 5 characters long';
  }
  return '';
}

function validateImageAndDescription(image, description) {
  if (!image && !description) {
    return 'Please upload an image or/and write a description';
  }
  return '';
}

function createShot(title, description, image) {
  const data = { title };
  if (description) data.description = description;
  if (image) data.image = image;
  return client.service('/api/v2/short-stories').create(data, {
    headers: {
      Authorization: 'Bearer ' + client.getCookie('feathers-jwt'),
    },
  });
}
