import React, { useEffect, useState } from 'react';

import { Modal, Input } from 'antd';
import Form from 'antd/lib/form/Form';
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

const ModalStart = ({ changeShowModal, showModal, baseData, task, updateTasks, user }) => {
  const [lookingFor, changeLookingFor] = useState('Writer');
  const [text, changeText] = useState('');
  const [form] = Form.useForm();

  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>{task ? 'EDIT A TASK' : 'CREATE A TASK'}</div>
      <div className={styles.desc}>{baseData.title}</div>
    </div>
  );

  useEffect(() => {
    changeLookingFor(task?.lookingFor);
    changeText(task?.description);
    form.setFieldsValue({
      lookingFor: task?.lookingFor || 'Writer',
      text: task?.description || '',
    });
  }, [task, form]);

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
      .then(() => {
        updateTasks();
        changeText('');
        changeShowModal(false);
        const eventData = [
          {
            platform: 'WEB',
            event_type: EVENTS.MINI_JOB_CREATED,
            event_properties: { mangaStoryId: baseData._id, taskId: task._id },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(eventData);
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
      .then(() => {
        updateTasks();
        changeShowModal(false);

        const eventData = [
          {
            platform: 'WEB',
            event_type: EVENTS.MINI_JOB_EDITED,
            event_properties: { mangaStoryId: baseData._id, taskId: task._id },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(eventData);
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
            <Form
              name="tasks"
              form={form}
              onFinish={() => {
                task ? editTask() : createTask();
              }}
              initialValues={{
                lookingFor,
                text,
              }}>
              <h2>Looking for</h2>
              <Form.Item
                name="lookingFor"
                rules={[
                  {
                    required: true,
                    message: 'Genre is required',
                  },
                ]}>
                <PrimarySelect
                  showSearch
                  className={styles.modalSelect}
                  onChange={changeLookingFor}
                  options={MyCheckboxes}
                  value={lookingFor}
                />
              </Form.Item>
              <h2>Task description</h2>
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
                  value={text}
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
                    text={task ? 'Edit' : 'Create'}
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalStart.propTypes = {
  changeShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  baseData: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  task: PropTypes.object,
  updateTasks: PropTypes.func,
};

ModalStart.defaultProps = {
  task: {},
  updateTasks: () => {},
};

export default ModalStart;
