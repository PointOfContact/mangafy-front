import React, { useState } from 'react';

import { Modal, Input } from 'antd';
import client from 'api/client';
import SvgClose from 'components/icon/Close';
import LargeButton from 'components/ui-elements/large-button';
import PrimarySelect from 'components/ui-elements/select';
import { EVENTS } from 'helpers/amplitudeEvents';
import { USER_TYPES } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

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

  const createRequest = () => {
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/join-manga-story-requests')
        .create(
          {
            mangaStoryId: baseData._id,
            joinAs,
            taskId: selectedTask._id,
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        )
        .then((response) =>
          m.default.service('/api/v2/conversations').create(
            {
              joinMangaStoryRequestId: response._id,
            },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
        )
        .then((response) =>
          m.default.service('/api/v2/messages').create(
            {
              content: text || 'Hi',
              conversationId: response._id,
            },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
        )
        .then(() => {
          changeShowModal(false);
          const eventData = [
            {
              platform: 'WEB',
              event_type: EVENTS.REQUEST_TO_JOIN,
              event_properties: { mangaStoryId: baseData._id, taskId: selectedTask._id },
              user_id: user._id,
              user_properties: {
                ...user,
              },
            },
          ];
          amplitude.track(eventData);
        })
        .catch((err) => err);
    });
  };

  const MyCheckboxes = USER_TYPES.map((item) => ({
    key: item.label,
    value: item.label,
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
  selectedTask: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  changeShowModal: PropTypes.func.isRequired,
};

export default ModalStart;
