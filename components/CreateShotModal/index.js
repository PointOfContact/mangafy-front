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
import SelectTags from 'components/selectTags';

const CreateShotModal = ({ isVisible, setIsVisible, shotToEdit }) => {
  const [title, setTitle] = useState(shotToEdit?.title || '');
  const [image, setImage] = useState(shotToEdit?._id.image || shotToEdit?.image || '');
  const [description, setDescription] = useState(shotToEdit?.description || '');
  const [errors, setErrors] = useState({ title: '', description: '', image: '' });
  const [selectedTags, setSelectedTags] = useState(shotToEdit?.tags);

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
    if (
      validation.titleError ||
      validation.imageAndDescriptionError ||
      validation.descriptionError
    ) {
      for (const error in validation) {
        validation[error] &&
          notification.error({ message: validation[error], placement: 'bottomLeft' });
      }
    } else {
      createShot(title, description, image, selectedTags)
        .then((res) => {
          if (onUpload) {
            onUpload(res);
          }
          setIsVisible(false);
        })
        .catch((err) => {
          notification.error({ message: err.message, placement: 'bottomLeft' });
        });
    }
  }

  if (!isVisible) return <></>;
  return (
    <Modal
      title="What are your working on?"
      visible={isVisible}
      onCancel={() => {
        setIsVisible(false);
      }}
      wrapClassName={styles.modal}
      closeIcon={<Close className={styles.modal__close} />}
      footer={null}>
      <h2>Shot</h2>
      <Input
        err={errors.titleError}
        placeholder="Give me a name"
        sm
        full
        rounded
        onChange={(text) => setTitle(text)}
        defaultValue={title}
      />

      <h2>More details</h2>
      <Textarea
        placeholder="Write what went int this shot, and anything else you'd like to mention. It could be your memo, a synopsis, or just a short story. "
        err={errors.descriptionError}
        sm
        full
        onChange={(text) => setDescription(text)}
        defaultValue={description}
      />

      <h2>Upload your design (if you have)</h2>
      <HeroUpload setImgId={setImage} />

      <h2>Tags</h2>
      <SelectTags
        onChange={setSelectedTags}
        className={styles.modal__tags}
        defaultSelectedTags={shotToEdit?.tags}
      />

      <div className={styles.modal__buttons}>
        <Button rounded pink md onClick={onSubmit}>
          Publish now
        </Button>
        <Button rounded pink outline md onClick={() => setIsVisible(false)}>
          Cancel
        </Button>
      </div>
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

function createShot(title, description, image, tags) {
  const data = { title };
  if (description) data.description = description;
  if (image) data.image = image;
  if (tags.length > 0) data.tags = tags;
  return client.service('/api/v2/short-stories').create(data, {
    headers: {
      Authorization: 'Bearer ' + client.getCookie('feathers-jwt'),
    },
    mode: 'no-cors',
  });
}
