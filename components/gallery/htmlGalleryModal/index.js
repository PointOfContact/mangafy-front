import React, { useEffect, useState } from 'react';

import { notification, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import SvgClose from 'components/icon/Close';
import PrimaryInput from 'components/ui-elements/input';
import LargeButton from 'components/ui-elements/large-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import ShortStory from '../shortStory';
import { editGallery, createGallery } from '../utils';
import styles from './style.module.scss';

const HtmlGalleryModal = ({ gallery, setImages, images, handleCancel, isModalVisible, user }) => {
  const [text, changeText] = useState('');
  const [title, changeTitle] = useState('');
  const [form] = Form.useForm();

  const handleChangeText = (e) => {
    changeText(e.target.value);
  };

  const handleChangeTitle = (e) => {
    changeTitle(e.target.value);
  };

  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>
        {gallery ? 'EDIT A SHORT STORY' : 'ADD A SHORT STORY'}
      </div>
    </div>
  );

  const handleCreateGallery = async () => {
    const data = { title, description: text };
    createGallery(
      data,
      (res) => {
        const event = {
          event_type: EVENTS.ADDED_PORTFOLIO_TEXT,
          event_properties: { extention: 'text', type: 'text', info: data },
        };
        myAmplitude(event);

        changeTitle('');
        changeText('');
        const newImages = [
          ...images,
          {
            ...res,
            // eslint-disable-next-line react/display-name
            renderItem: () => <ShortStory title={res?.title} description={res?.description} />,
          },
        ];
        setImages(newImages);
        handleCancel();
      },
      (err) => {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
      }
    );
  };

  const handleEditGallery = async () => {
    const galleryId = gallery._id;
    const data = { title, description: text };
    editGallery(
      galleryId,
      data,
      (res) => {
        const newImages = images.map((item) => {
          if (item._id === res._id) {
            const newItem = {
              ...item,
              description: res.description,
              title: res.title,
              // eslint-disable-next-line react/display-name
              renderItem: () => <ShortStory title={res?.title} description={res?.description} />,
            };
            return newItem;
          }
          return item;
        });
        setImages(newImages);
        handleCancel();
      },
      (err) => {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
      }
    );
  };

  useEffect(() => {
    if (gallery) {
      changeText(gallery?.description || '');
      changeTitle(gallery?.title || '');
      form.setFieldsValue({
        text: gallery?.description || '',
        title: gallery?.title || '',
      });
    }
  }, [gallery, form]);

  return (
    <div>
      <Modal
        forceRender
        title={ModalTitle}
        className={styles.modal}
        bodyStyle={{ height: 'calc(100vh- 60px)', overflow: 'auto' }}
        footer={null}
        width={'95%'}
        zIndex={200000000}
        onCancel={handleCancel}
        closeIcon={<SvgClose />}
        visible={isModalVisible}>
        <div>
          <Form
            name="tasks"
            form={form}
            onFinish={() => {
              gallery ? handleEditGallery() : handleCreateGallery();
            }}
            initialValues={{
              title,
              text,
            }}>
            <h2>Title</h2>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Title is required',
                },
                {
                  pattern: /^[^\s]+(\s+[^\s]+)*$/,
                  message: 'Remove whitespaces',
                },
              ]}>
              <PrimaryInput
                placeholder=""
                value={text}
                onChange={handleChangeTitle}
                className={styles.modalInput}
              />
            </Form.Item>
            <h2>Short Story</h2>
            <Form.Item
              name="text"
              rules={[
                {
                  required: true,
                  message: 'Title is required',
                },
                {
                  pattern: /^[^\s]+(\s+[^\s]+)*$/,
                  message: 'Remove whitespaces',
                },
              ]}>
              <TextArea
                placeholder=""
                value={title}
                onChange={handleChangeText}
                className={styles.modalTexarea}
              />
            </Form.Item>

            <div className="modal_select_btn">
              <Form.Item>
                <LargeButton
                  htmlType="submit"
                  id="modalJoinMyJourneySubmitBtnId"
                  className={styles.hugeButton}
                  isFullWidth={false}
                  text={gallery ? 'Edit' : 'Add'}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

HtmlGalleryModal.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setImages: PropTypes.func.isRequired,
  images: PropTypes.array,
  gallery: PropTypes.object,
  user: PropTypes.object.isRequired,
};

HtmlGalleryModal.defaultProps = {
  gallery: null,
  images: null,
};

export default HtmlGalleryModal;
