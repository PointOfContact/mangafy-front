import React, { useState } from 'react';

import { Modal, Input, notification } from 'antd';
import client from 'api/client';
import SvgClose from 'components/icon/Close';
import LargeButton from 'components/ui-elements/large-button';
import PrimarySelect from 'components/ui-elements/select';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const { TextArea } = Input;

const ModalStart = ({ changeShowModal, showModal, baseData, selectedTask, user }) => {
  const [joinAs, changeJoinAs] = useState('Writer');
  const [text, changeText] = useState('');

  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>REQUEST TO JOIN</div>
      <div className={styles.desc}>{baseData.title}</div>
    </div>
  );

  const handleChangeText = (e) => {
    changeText(e.target.value);
  };

  const handleCancel = () => {
    changeShowModal(false);
  };

  const createRequest = async () => {
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
            joinAs,
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

      return restClient
        .service('/api/v2/messages')
        .create(
          {
            content: text || 'Hi',
            conversationId: conv?._id || conversation._id,
            joinMangaStoryRequestId: mangaStoryRequest._id,
          },
          {
            headers,
          }
        )
        .then(() => {
          changeText('');
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
    } catch (err) {
      if (err.name === 'Conflict') {
        notification.error({
          message: `You have already sent a request with "${joinAs}"`,
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
      title={ModalTitle}
      footer={null}
      style={{ width: '900px' }}
      visible={showModal}
      closeIcon={<SvgClose height="18px" width="18px" />}
      okText="Send"
      onCancel={handleCancel}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 select_modal">
            <form action="">
              <h2>Join as</h2>
              <PrimarySelect
                showSearch
                className={styles.modalSelect}
                onChange={changeJoinAs}
                options={MyCheckboxes}
                value={joinAs}
              />
              <h2>Your message</h2>
              <TextArea
                placeholder="Please write a personal message to the team leader explaining why you are a good fit"
                value={text}
                onChange={handleChangeText}
                required
                type="text"
                minLength={10}
                maxLength={1000}
                className={styles.modalTexarea}
              />

              <div className="modal_select_btn">
                <LargeButton
                  onClick={() => {
                    createRequest();
                  }}
                  id="modalJoinMyJourneySubmitBtnId"
                  className={styles.hugeButton}
                  isFullWidth={false}
                  text={'send'}
                />
              </div>
            </form>
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
