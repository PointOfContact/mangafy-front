import React, { useEffect, useState } from 'react';

import { Modal, Input, notification } from 'antd';
import Form from 'antd/lib/form/Form';
import client from 'api/client';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import PrimarySelect from 'components/ui-elements/select';
import { EVENTS } from 'helpers/amplitudeEvents';
import { USER_TYPES } from 'helpers/constant';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const { TextArea } = Input;

const ModalStart = ({ changeShowModal, showModal, baseData, task, updateTasks, user }) => {
  const [lookingFor, changeLookingFor] = useState('Writer');
  const [amount, changeAmount] = useState(40);

  const [rewardType, changeRewardType] = useState('Revenue Split');

  const [text, changeText] = useState('');
  const [form] = Form.useForm();

  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>{task ? 'EDIT A TASK' : 'CREATE A TASK'}</div>
      <div className={styles.desc}>{baseData.title}</div>
    </div>
  );

  useEffect(() => {
    if (task) {
      changeLookingFor(task?.lookingFor || 'Writer');
      changeText(task?.description || '');
      changeRewardType(task?.rewardType || 'Revenue Split');
      changeAmount(task?.maxValue || '40');
      form.setFieldsValue({
        lookingFor: task?.lookingFor || 'Writer',
        text: task?.description || '',
        rewardType: task?.rewardType || 'Revenue Split',
        amount: task?.amount || '40',
      });
    } else {
      changeLookingFor('Writer');
      changeText('');
      changeRewardType('Revenue Split');
      changeAmount('40');
      form.setFieldsValue({
        lookingFor: 'Writer',
        text: '',
        rewardType: 'Revenue Split',
        amount: '40',
      });
    }
  }, [task, form, showModal]);

  const handleChangeText = (e) => {
    changeText(e.target.value);
  };

  const handleCancel = () => {
    changeShowModal(false);
  };

  const createTask = async () => {
    const data =
      rewardType === 'Free'
        ? {
            mangaStoryId: baseData._id,
            lookingFor,
            description: text,
            rewardType,
          }
        : {
            mangaStoryId: baseData._id,
            lookingFor,
            description: text,
            rewardType,
            amount,
          };
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/tasks')
      .create(data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        updateTasks();
        changeLookingFor('Writer');
        changeText('');
        changeRewardType('Revenue Split');
        changeAmount('40');
        changeShowModal(false);
        const eventData = [
          {
            platform: 'WEB',
            event_type: EVENTS.MINI_JOB_CREATED,
            event_properties: { mangaStoryId: baseData._id, taskId: res._id, task },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(eventData);
      })
      .catch((err) =>
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        })
      );
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
          rewardType,
          amount,
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
            event_properties: { mangaStoryId: baseData._id, taskId: task._id, task },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(eventData);
      })
      .catch((err) =>
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        })
      );
  };

  const MyCheckboxes = USER_TYPES.map((item) => ({
    key: item.label,
    value: item.label,
  }));

  const RewardTypes = [
    {
      key: 'Free',
      value: 'Free',
    },
    {
      key: 'PerPage',
      value: 'Per Page',
    },
    {
      key: 'FlatRate',
      value: 'Flat Rate',
    },
    {
      key: 'RevenueSplit',
      value: 'Revenue Split',
    },
  ];

  const sendEvent = (event) => {
    const data = {
      event_type: event,
      event_properties: { mangaStoryId: baseData?._id },
      user_id: user?._id,
      user_properties: {
        ...user,
      },
    };
    myAmplitude(data);
  };

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
      <div className={cn(styles.content, 'row')}>
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
              rewardType,
              amount,
            }}>
            <h2>What roles are you looking to add to your project</h2>
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
                onChange={(e) => {
                  changeLookingFor(e);
                  sendEvent(EVENTS.CHOOSED_TASK_ROLL_TYPE);
                }}
                options={MyCheckboxes}
                value={lookingFor}
              />
            </Form.Item>
            <h2>Offered Commission or Reward Type</h2>
            <Form.Item
              name="rewardType"
              rules={[
                {
                  required: true,
                  message: 'Reward Type is required',
                },
              ]}>
              <PrimarySelect
                showSearch
                className={styles.modalSelect}
                onChange={(e) => {
                  changeRewardType(e);
                  sendEvent(EVENTS.CHOOSED_TASK_COMMISSION_TYPE);
                }}
                options={RewardTypes}
                value={rewardType}
              />
            </Form.Item>
            {rewardType !== 'Free' && (
              <div className={styles.value}>
                <div>
                  <h2>How much are you willing to offer per work</h2>
                  <Form.Item
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: 'Amount is required',
                      },
                    ]}>
                    <PrimaryInput
                      type="number"
                      isFullWidth={true}
                      className={styles.modalInput}
                      onChange={(e) => changeAmount(e.target.value)}
                      onBlur={() => sendEvent(EVENTS.ADDED_TASK_PRICE)}
                      value={amount}
                      prefix="$"
                      suffix="USD"
                    />
                  </Form.Item>
                  <span className={styles.short_info}>
                    You can change the amount, or choose a different type of reward
                  </span>
                </div>
              </div>
            )}
            <div className={styles.line}></div>
            <h2>
              Please write and define as clearly as possible what are you looking for when working
              on the task.
            </h2>
            <Form.Item
              name="text"
              rules={[
                {
                  required: true,
                  message: 'Text is required',
                },
              ]}>
              <TextArea
                autoSize={{ minRows: 3, maxRows: 10 }}
                placeholder=""
                value={text}
                onChange={handleChangeText}
                onBlur={() => sendEvent(EVENTS.ADDED_TASK_DESCRIPTION)}
                className={styles.modalTexarea}
              />
            </Form.Item>

            <div className="modal_select_btn">
              <Form.Item>
                <PrimaryButton
                  htmlType="submit"
                  id="modalJoinMyJourneySubmitBtnId"
                  className={styles.hugeButton}
                  isFullWidth={false}
                  text={task ? 'Edit a task' : 'Create a task'}
                />
              </Form.Item>
            </div>
          </Form>
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
