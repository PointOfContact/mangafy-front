import React, { useEffect, useState } from 'react';

import { Modal, Form, Input, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimarySelect from 'components/ui-elements/select';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const { TextArea } = Input;

const ModalStart = ({ changeShowModal, showModal, baseData, selectedTask, user }) => {
  const [joinAs, changeJoinAs] = useState('Writer');
  const [form] = Form.useForm();

  const handleCancel = () => {
    changeShowModal(false);
  };

  useEffect(() => {
    form.resetFields();
  }, [showModal]);

  const sendMessage = (message, conv, conversation, mangaStoryRequest, headers, restClient) => {
    restClient
      .service('/api/v2/messages')
      .create(
        {
          content: message || 'Hi',
          conversationId: conv?._id || conversation._id,
          joinMangaStoryRequestId: mangaStoryRequest._id,
        },
        {
          headers,
        }
      )
      .then(() => {
        changeShowModal(false);
        const eventData = [
          {
            event_type: EVENTS.REQUEST_TO_JOIN,
            event_properties: {
              authorId: baseData.author,
              authorInfo: baseData.authorInfo,
              mangaStoryId: baseData._id,
              mangaStory: baseData,
              taskId: selectedTask?._id,
            },
          },
        ];
        myAmplitude(eventData);
      });
  };

  const createRequest = async (plan, yourself, join_as) => {
    try {
      const jwt = client.getCookie('feathers-jwt');
      const headers = {
        Authorization: `Bearer ${jwt}`,
      };
      const { default: restClient } = await import('api/restClient');
      const mangaStoryRequest = await restClient
        .service('/api/v2/join-manga-story-requests')
        .create(
          {
            mangaStoryId: baseData._id,
            joinAs: join_as,
            taskId: selectedTask?._id,
          },
          {
            headers,
          }
        );

      const isConv = await restClient.service('/api/v2/conversations').find({
        query: {
          $sort: {
            createdAt: -1,
          },
          $or: [
            { participents: [user._id, baseData.author] },
            { participents: [baseData.author, user._id] },
          ],
        },
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const conv = isConv?.data?.find(
        (item) => !item.joinMangaStoryRequestId && !item.mangaStoryId
      );

      let conversation;

      if (!conv?._id) {
        conversation = await restClient.service('/api/v2/conversations').create(
          {
            participents: [baseData.author],
          },
          {
            headers,
          }
        );
      }
      sendMessage(plan, conv, conversation, mangaStoryRequest, headers, restClient);
      sendMessage(yourself, conv, conversation, mangaStoryRequest, headers, restClient);
      return;
    } catch (err) {
      if (err.name === 'Conflict') {
        notification.error({
          message: `You have already sent a request with "${join_as}"`,
          placement: 'bottomLeft',
        });
      } else {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
      }
    }
  };

  const MyCheckboxes = userTypes.map((item) => ({
    key: item.value,
    value: item.value,
  }));

  return (
    <Modal
      className={styles.modal}
      title={<div className={styles.modalTitle}>Claim this project</div>}
      footer={null}
      style={{ width: '900px' }}
      visible={showModal}
      closeIcon={
        <span
          className={styles.closeIcon}
          onClick={(e) => {
            e.stopPropagation();
            changeShowModal(false);
          }}>
          <SvgClose />
        </span>
      }
      okText="Send"
      onCancel={handleCancel}>
      <div className={styles.border} />
      <div className={cn('container', styles.container)}>
        <div className="row">
          <div className="col-lg-12 select_modal">
            <Form
              form={form}
              className={styles.taskForm}
              name="taskRequest"
              onFinish={(e) => {
                changeJoinAs(e.joinAs);
                createRequest(e.plan, e.yourseld, e.joinAs);
              }}>
              <h2>Iroduce yourseld *</h2>
              <Form.Item
                name="yourseld"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ]}>
                <TextArea
                  placeholder="Please introduce yourself and share why you think you are the best choice for this project."
                  type="text"
                  minLength={10}
                  maxLength={1000}
                  className={styles.modalTexarea}
                />
              </Form.Item>
              <h2>Your plan *</h2>
              <Form.Item
                name="plan"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ]}>
                <TextArea
                  placeholder="This project will take longer than 1 month, please share your full plan including milestones and incremental progress you will be able to submit"
                  type="text"
                  minLength={10}
                  maxLength={1000}
                  className={styles.modalTexarea}
                />
              </Form.Item>

              <h2>Join as *</h2>
              <Form.Item name="joinAs">
                <PrimarySelect
                  showSearch
                  className={styles.modalSelect}
                  options={MyCheckboxes}
                  value={joinAs}
                />
              </Form.Item>
              <h2>Action</h2>
              <div className={cn('modal_select_btn', styles.containerButton)}>
                <PrimaryButton
                  onClick={() => changeShowModal(false)}
                  isWhite={true}
                  id="modalJoinMyJourneySubmitBtnId"
                  className={styles.hugeButton}
                  isFullWidth={false}
                  text="Cancel"
                />
                <PrimaryButton
                  id="modalJoinMyJourneySubmitBtnId"
                  className={styles.hugeButton}
                  isFullWidth={false}
                  text="Submit"
                  htmlType="submit"
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalStart.propTypes = {
  baseData: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  selectedTask: PropTypes.object,
  user: PropTypes.object.isRequired,
  changeShowModal: PropTypes.func.isRequired,
};

ModalStart.defaultProps = {
  selectedTask: null,
};

export default ModalStart;
