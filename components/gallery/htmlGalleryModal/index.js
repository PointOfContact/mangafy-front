import React, { useEffect, useState } from 'react';

import Form from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import client from 'api/client';
import SvgClose from 'components/icon/Close';
import PrimaryInput from 'components/ui-elements/input';
import LargeButton from 'components/ui-elements/large-button';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

const HtmlGalleryModal = ({ gallery, setImages, user, handleCancel, isModalVisible }) => {
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

  const createGallery = async () => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/short-stories')
      .create(
        {
          title,
          description: text,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then(() => {
        changeText('');
        // setImages();
        handleCancel();
      })
      .catch((err) => err);
  };

  const editGallery = async () => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/short-stories')
      .patch(
        gallery._id,
        {
          description: text,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then(() => {
        setImages();
        handleCancel();

        // const eventData = [
        //   {
        //     platform: 'WEB',
        //     event_type: EVENTS.MINI_JOB_EDITED,
        //     event_properties: { mangaStoryId: baseData._id, taskId: task._id },
        //     user_id: user._id,
        //     user_properties: {
        //       ...user,
        //     },
        //   },
        // ];
        // amplitude.track(eventData);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    if (gallery) {
      changeText(gallery?.description || '');
      changeText(gallery?.title || '');
      form.setFieldsValue({
        text: gallery?.description || '',
        title: gallery?.title || '',
      });
    }
  }, [gallery, form]);

  return (
    <div>
      <Modal
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
              gallery ? editGallery() : createGallery();
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
              ]}>
              <PrimaryInput
                placeholder=""
                value={text}
                onChange={handleChangeTitle}
                className={styles.modalInput}
              />
            </Form.Item>
            <h2>Shot Story</h2>
            <Form.Item
              name="text"
              rules={[
                {
                  required: true,
                  message: 'Text is required',
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
  user: PropTypes.object.isRequired,
  gallery: PropTypes.object,
};

HtmlGalleryModal.defaultProps = {
  gallery: null,
};

export default HtmlGalleryModal;
