import React, { useEffect, useState } from 'react';

import { Modal, Input } from 'antd';
import client from 'api/client';
import SvgClose from 'components/icon/Close';
import LargeButton from 'components/ui-elements/large-button';
import PrimarySelect from 'components/ui-elements/select';
import { USER_TYPES } from 'helpers/constant';

import styles from './styles.module.scss';

const { TextArea } = Input;

const ModalStart = ({
  changeShowModal,
  showModal,
  baseData,
  task,
  tasks,
  setTasks,
  updateTasks,
}) => {
  const [lookingFor, changeLookingFor] = useState('Writer');
  const [text, changeText] = useState('');

  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>{task ? 'EDIT A TASK' : 'CREATE A TASK'}</div>
      <div className={styles.desc}>{baseData.title}</div>
    </div>
  );

  useEffect(() => {
    changeLookingFor(task?.lookingFor || 'Writer');
    changeText(task?.description || '');
  }, [task]);

  const handleChangeText = (e) => {
    changeText(e.target.value);
  };

  const handleCancel = () => {
    changeShowModal(false);
  };

  const createTask = async () => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/tasks')
      .create(
        {
          mangaStoryId: baseData._id,
          lookingFor,
          description: text,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then((response) => {
        updateTasks();
        changeText('');
        changeShowModal(false);
      })
      .catch((err) => err);
  };

  const editTask = async () => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/tasks')
      .patch(
        task._id,
        {
          lookingFor,
          description: text,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then((response) => {
        updateTasks();
        changeShowModal(false);
      })
      .catch((err) => err);
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
              <h2>Looking for</h2>
              <PrimarySelect
                showSearch
                className={styles.modalSelect}
                onChange={changeLookingFor}
                options={MyCheckboxes}
                value={lookingFor}
              />
              <h2>Task description</h2>
              <TextArea
                placeholder=""
                value={text}
                defaultValue={text}
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
                    task ? editTask() : createTask();
                  }}
                  id="modalJoinMyJourneySubmitBtnId"
                  className={styles.hugeButton}
                  isFullWidth={false}
                  text={task ? 'Edit' : 'Create'}
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
