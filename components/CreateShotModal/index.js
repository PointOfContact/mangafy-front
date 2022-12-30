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
import { EVENTS } from 'helpers/amplitudeEvents';
import myAmplitude from 'utils/amplitude';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

import Facebook from 'components/icon/new/Facebook';
import Share from 'components/icon/new/Share';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import copy from 'copy-to-clipboard';
import Twitter from 'components/icon/new/Twitter';
import Telegram from 'components/icon/new/Telegram';

const CreateShotModal = ({
  isVisible,
  setIsVisible,
  shotToEdit,
  setSelectedGallery = () => {},
  onUpload,
}) => {
  const [title, setTitle] = useState(shotToEdit?.title || '');
  const [image, setImage] = useState(shotToEdit?._id.image || shotToEdit?.image || '');
  const [description, setDescription] = useState(shotToEdit?.description || '');
  const [errors, setErrors] = useState({ title: '', description: '', image: '' });
  const [selectedTags, setSelectedTags] = useState(shotToEdit?.tags);
  const [wasPublished, setWasPublished] = useState(false);
  const [shotUrl, setShotUrl] = useState('');

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

  useEffect(() => {
    setTitle(shotToEdit?.title || '');
    setImage(shotToEdit?._id.image || shotToEdit?.image || '');
    setDescription(shotToEdit?.description || '');
    setSelectedTags(shotToEdit?.tags);
  }, [shotToEdit]);

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
      if (!shotToEdit) {
        createShot(title, description, image, selectedTags, (res) =>
          setShotUrl(client.API_ENDPOINT + '/shot/' + res._id)
        )
          .then((res) => {
            setWasPublished(true);
          })
          .catch((err) => {
            notification.error({ message: err.message, placement: 'bottomLeft' });
          });
      } else {
        editShot(
          shotToEdit._id._id || shotToEdit._id,
          title,
          description,
          image,
          selectedTags,
          onUpload
        )
          .then((res) => {
            setIsVisible(false);
          })
          .catch((err) => {
            notification.error({ message: err.message, placement: 'bottomLeft' });
          });
      }
    }
  }

  function validateTitle(title) {
    if (!title) {
      return 'Title is required';
    }
    if (title.length > 100) {
      return 'Title is too long';
    }
    return '';
  }

  function onPublishedClose() {
    if (typeof onUpload === 'function') {
      onUpload();
    }
  }

  return (
    <>
      {!wasPublished ? (
        <Modal
          title="What are your working on?"
          visible={isVisible}
          onCancel={() => {
            setSelectedGallery(null);
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
          <GrammarlyEditorPlugin clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
            <Textarea
              placeholder="Write what went int this shot, and anything else you'd like to mention. It could be your memo, a synopsis, or just a short story. "
              err={errors.descriptionError}
              sm
              full
              onChange={(text) => setDescription(text)}
              defaultValue={description}
            />
          </GrammarlyEditorPlugin>
          <h2>Upload your design (if you have)</h2>
          <HeroUpload setImgId={setImage} mangaUrl={image} />

          <h2>Tags</h2>
          <SelectTags
            onChange={setSelectedTags}
            className={styles.modal__tags}
            defaultSelectedTags={shotToEdit?.tags}
          />

          <div className={styles.modal__buttons}>
            <Button rounded pink md onClick={onSubmit}>
              {shotToEdit ? 'Apply' : 'Publish now'}
            </Button>
            <Button rounded pink outline md onClick={() => setIsVisible(false)}>
              Cancel
            </Button>
          </div>
        </Modal>
      ) : (
        <Modal
          className={styles.shareModal}
          visible={isVisible}
          footer={null}
          closeIcon={<Close color={'#000'} />}
          onCancel={() => {
            onPublishedClose();
            setIsVisible(false);
          }}
          width={450}>
          <div className={styles.shareModal__title}>Successfully Published!</div>
          <div className={styles.shareModal__description}>
            Spread the word about your work on social media
          </div>
          <div className={styles.shareModal__subtitle}>Share on:</div>
          <div className={styles.shareModal__share}>
            <div className={styles.shareModal__shareItem}>
              <FacebookShareButton title="Mangafy-Club" url={shotUrl}>
                <Facebook />
                Facebook
              </FacebookShareButton>
            </div>
            <div className={styles.shareModal__shareItem}>
              <TwitterShareButton title="Mangafy-Club" url={shotUrl}>
                <Twitter /> Twitter
              </TwitterShareButton>
            </div>
            <div className={styles.shareModal__shareItem}>
              <TelegramShareButton title="Mangafy-Club" url={shotUrl}>
                <Telegram /> Telegram
              </TelegramShareButton>
            </div>
            <div
              className={styles.shareModal__shareItem}
              onClick={() => {
                copy(shotUrl);
                notification.success({
                  message: 'Link copied to clipboard',
                  placement: 'bottomLeft',
                });
              }}>
              <Share /> Copy link
            </div>
          </div>
        </Modal>
      )}
    </>
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

function createShot(title, description, image, tags, onUpload) {
  const data = { title };
  if (description) data.description = description;
  if (image) data.image = image;
  if (tags?.length > 0) data.tags = tags;
  return client
    .service('/api/v2/short-stories')
    .create(data, {
      headers: {
        Authorization: 'Bearer ' + client.getCookie('feathers-jwt'),
      },
      mode: 'no-cors',
    })
    .then((res) => {
      if (typeof onUpload === 'function') onUpload(res);
      myAmplitude(EVENTS.CREATE_SHOT);
    });
}

function editShot(shotId, title, description, image, tags, onUpload) {
  const data = { title };
  data.description = description;
  data.image = image;
  data.tags = tags;
  return client
    .service('/api/v2/short-stories')
    .patch(shotId, data, {
      headers: {
        Authorization: 'Bearer ' + client.getCookie('feathers-jwt'),
      },
      mode: 'no-cors',
    })
    .then((res) => {
      if (typeof onUpload === 'function') onUpload(res);
      myAmplitude(EVENTS.EDIT_SHOT);
    });
}
