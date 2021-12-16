import React, { useEffect, useState } from 'react';

import { Modal, Input, notification, Form } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import PrimarySelect from 'components/ui-elements/select';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const { TextArea } = Input;

const ModalStart = ({ changeShowModal, showModal, baseData, task, updateTasks, user }) => {
  const [lookingFor, changeLookingFor] = useState(null);
  const [amount, changeAmount] = useState(null);
  const [rewardType, changeRewardType] = useState(null);
  const [text, changeText] = useState('');
  const [form] = Form.useForm();

  const ModalTitle = (
    <>
      <div className={styles.modalTitle}>{task ? 'Edit commission ' : 'Create commission'}</div>
      <div className={styles.border} />
    </>
  );

  useEffect(() => {
    if (task || showModal) {
      changeLookingFor(task?.lookingFor || null);
      changeText(task?.description || '');
      changeRewardType(task?.rewardType || null);
      changeAmount(task?.amount || null);
      form.setFieldsValue({
        lookingFor: task?.lookingFor || null,
        text: task?.description || '',
        rewardType: task?.rewardType || null,
        amount: task?.amount || null,
      });
    } else {
      changeLookingFor(null);
      changeText('');
      changeRewardType(null);
      changeAmount('');
      form.resetFields();
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
        changeLookingFor(null);
        changeText('');
        changeRewardType(null);
        changeAmount('');
        changeShowModal(false);
        const eventData = [
          {
            event_type: EVENTS.MINI_JOB_CREATED,
            event_properties: { mangaStoryId: baseData._id, taskId: res._id, task },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        myAmplitude(eventData);
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
    const data =
      rewardType === 'Free'
        ? {
            lookingFor,
            description: text,
            rewardType,
          }
        : {
            lookingFor,
            description: text,
            rewardType,
            amount,
          };
    api
      .service('/api/v2/tasks')
      .patch(task._id, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(() => {
        updateTasks();
        changeShowModal(false);

        const eventData = [
          {
            event_type: EVENTS.MINI_JOB_EDITED,
            event_properties: { mangaStoryId: baseData._id, taskId: task._id, task },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        myAmplitude(eventData);
      })
      .catch((err) =>
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        })
      );
  };

  const MyCheckboxes = userTypes.map((item) => ({
    key: item.value,
    value: item.value,
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
      forceRender
      className={styles.modal}
      title={ModalTitle}
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
            <h2>What roles is this project likely to require?</h2>
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
                className={cn(styles.selectDef, !lookingFor && styles.select)}
                onChange={(e) => {
                  changeLookingFor(e);
                  sendEvent(EVENTS.CHOOSED_TASK_ROLL_TYPE);
                }}
                value={lookingFor}
                bordered={false}
                options={MyCheckboxes}
                placeholder="Find a teamate to help you reach your goals"
              />
            </Form.Item>
            <h2>What type of collaboration are you looking for?</h2>
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
                bordered={false}
                className={cn(styles.selectDef, !rewardType && styles.select)}
                onChange={(e) => {
                  changeRewardType(e);
                  sendEvent(EVENTS.CHOOSED_TASK_COMMISSION_TYPE);
                }}
                value={rewardType}
                options={RewardTypes}
                placeholder="Choose the type of collaboration"
              />
            </Form.Item>
            {rewardType !== 'Free' && (
              <div className={styles.value}>
                <div>
                  <h2>Budget</h2>
                  <Form.Item
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: 'Budget is required',
                      },
                    ]}>
                    <PrimaryInput
                      type="number"
                      isFullWidth={true}
                      className={styles.modalInput}
                      onChange={(e) => changeAmount(e.target.value)}
                      onBlur={() => sendEvent(EVENTS.ADDED_TASK_PRICE)}
                      value={amount}
                      placeholder="You can change the amount or choose a different reward"
                    />
                  </Form.Item>
                </div>
              </div>
            )}
            <h2>Your brief is on its way</h2>
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
                placeholder="Please be specific. The more detail you provide, the less time it will take."
                value={text}
                onChange={handleChangeText}
                onBlur={() => sendEvent(EVENTS.ADDED_TASK_DESCRIPTION)}
                className={styles.modalTexArea}
              />
            </Form.Item>

            <div className="modal_select_btn">
              <Form.Item className={styles.buttonContainer}>
                {task && (
                  <PrimaryButton
                    id="modalJoinMyJourneySubmitBtnId"
                    className={styles.hugeButton}
                    isFullWidth={false}
                    text="Completed"
                    isWhite={true}
                    onClick={() => changeShowModal(false)}
                  />
                )}
                <PrimaryButton
                  htmlType="submit"
                  id="modalJoinMyJourneySubmitBtnId"
                  className={styles.hugeButton}
                  isFullWidth={false}
                  text="Create a task"
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
