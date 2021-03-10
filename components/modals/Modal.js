import React, { useState } from 'react';

import { Modal, Select } from 'antd';
import client from 'api/client';
import HugeButton from 'components/ui-elements/huge-button';
import { CHECKBOXES } from 'helpers/constant';

import styles from './styles.module.scss';

const { Option } = Select;
const ModalStart = ({ changeShowModal, showModal, baseData }) => {
  const [joinAs, changeJoinAs] = useState('');
  const [text, changeText] = useState('');
  // state = { visible: false, joinAs: 'Writer' };
  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>REQUEST TO JOIN</div>
      <div className={styles.desc}>{baseData.title}</div>
    </div>
  );
  const handleChange = (e) => {
    changeJoinAs(e.target.options[e.target.selectedIndex].text);
  };

  const handleChangeText = (e) => {
    changeText(e.target.value);
  };

  const handleCancel = (e) => {
    changeShowModal(false);
  };

  const createRequest = (_) => {
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/join-manga-story-requests')
        .create(
          {
            mangaStoryId: baseData._id,
            joinAs,
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
        .then((response) => {
          changeShowModal(false);
        })
        .catch((err) => err);
    });
  };

  return (
    <Modal
      className={styles.modal}
      title={ModalTitle}
      footer={null}
      style={{ width: '900px' }}
      visible={showModal}
      okText="Send"
      onCancel={handleCancel}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 select_modal">
            <form action="">
              <h2>Select</h2>
              <Select
                className={styles.modalSelect}
                defaultValue="Writer"
                style={{ width: '100%' }}
                onChange={(e) => {
                  handleChange(e);
                }}>
                {CHECKBOXES.map((type) => (
                  <Option key={type.label} value={type.label}>
                    {type.label}
                  </Option>
                ))}
              </Select>
              <h2>Your message</h2>
              <textarea
                className={styles.modalTexarea}
                onChange={(e) => {
                  handleChangeText(e);
                }}
                name=""
                id=""
                placeholder="Please write a personal message to the team leader explaining why you are a good fit"></textarea>
              <div className="modal_select_btn">
                <HugeButton
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
export default ModalStart;
