/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';

import { Modal, Input, notification, Form } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import PrimarySelect from 'components/ui-elements/select';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes, rewardTypes, taskTypesArray } from 'helpers/constant';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const { TextArea } = Input;

const placeholderBrief = {
  Editor: '',
  Writer:
    'The Writer is the person responsible for writing the story. They are skilled and responsible for the overall story structure, dialogue, overall beats of the story, and the framework of the story.',
  Penciler:
    'A penciller is a skilled drawer who has a collaborative mindset and is flexible enough to adapt to different styles.',
  Inker:
    'An inker is a graphic artist who finishes the outlines of a graphic image. He or she may also be involved in the creation of the story that is visually represented on the page.',
  Colorist:
    ' The colorist has a very specific kind of job. He or she is a visual interpreter. There’s no room for mistakes, and there’s no room for doubt, because the audience can see everything.',
  Letterer:
    "The letterer's job is to make the text flow smoothly so readers can follow the storyline more easily. Letterers must have excellent grammar skills, but must also be creative.",
  'Cover artist':
    "Great cover artists don't simply represent characters and narratives that the reader will encounter within the comic. They take an active role in the storytelling process by selectively curating what is shown and how it's shown.",
  'Character designer':
    'Character designers visualize and create the appearance of individual characters.',
  'Word creator': '',
  'Key translator':
    "When translating webcomics, there are experts in the translation industry who perfectly understand the source language and its expressions and idioms. It's very important to translate the original as faithfully as possible while staying in the original space and losing as little information as possible.",
  Mentorship:
    'You have characters walking around in your head, you have a world you want to transport your audience to and you want to show them around in. Mentor differently can help',
};

const ModalStart = ({ changeShowModal, showModal, baseData, task, updateTasks, user }) => {
  const [lookingFor, changeLookingFor] = useState(null);
  const [taskType, changeTaskType] = useState(null);
  const [amount, changeAmount] = useState(null);
  const [rewardType, changeRewardType] = useState(null);
  const [placeholder, setPlaceholder] = useState(
    'Please be specific. The more detail you provide, the less time it will take.'
  );
  const [text, changeText] = useState('');
  const [form] = Form.useForm();

  const ModalTitle = (
    <>
      <div className={styles.modalTitle}>{task ? 'Edit a proposal' : 'Create a proposal'}</div>
      <div className={styles.border} />
    </>
  );

  useEffect(() => {
    if (task || showModal) {
      changeLookingFor(task?.lookingFor || null);
      changeText(task?.description || '');
      changeRewardType(task?.rewardType || null);
      changeTaskType(task?.status || null);
      changeAmount(task?.amount || null);
      form.setFieldsValue({
        lookingFor: task?.lookingFor || null,
        text: task?.description || '',
        rewardType: task?.rewardType || null,
        taskType: task?.status,
        amount: task?.amount || null,
      });
    } else {
      changeLookingFor(null);
      changeTaskType(null);
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
    if (!+amount) return;

    const data = {
      mangaStoryId: baseData._id,
      lookingFor,
      description: text,
      rewardType,
    };

    if (rewardType !== 'Free') data.amount = amount;

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
        changeTaskType(null);
        changeShowModal(null);
        changeAmount('');
        changeShowModal(false);
        const eventData = [
          {
            event_type: EVENTS.MINI_JOB_CREATED,
            event_properties: { mangaStoryId: baseData._id, taskId: res._id, task },
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
    if (!+amount) return;

    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');

    const data = {
      lookingFor,
      description: text,
      status: taskType,
      rewardType,
    };

    if (rewardType !== 'Free') data.amount = amount;

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

  const myCheckboxes = userTypes.map((item) => ({
    key: item.value,
    value: item.value,
  }));

  const typesArray = taskTypesArray.map((item) => ({
    key: item.value,
    value: item.value,
  }));

  const sendEvent = (event) => {
    const data = {
      event_type: event,
      event_properties: { mangaStoryId: baseData?._id },
    };
    myAmplitude(data);
  };

  const changeLookingForFun = (e) => {
    changeLookingFor(e);
    const placeholder =
      placeholderBrief[e] ||
      'Please be specific. The more detail you provide, the less time it will take.';
    setPlaceholder(placeholder);
    sendEvent(EVENTS.CHOOSED_TASK_ROLL_TYPE);
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
              taskType,
              rewardType,
              amount,
            }}>
            <h2>What roles is this project likely to require?</h2>
            <Form.Item
              name="lookingFor"
              rules={[
                {
                  required: true,
                  message: "Don't work on webcomics alone, find a partner",
                },
              ]}>
              <PrimarySelect
                showSearch
                className={cn(styles.selectDef, !lookingFor && styles.select)}
                onChange={changeLookingForFun}
                value={lookingFor}
                bordered={false}
                options={myCheckboxes}
                placeholder="Find a teamate to help you reach your goals"
              />
            </Form.Item>
            <h2>What type of collaboration are you looking for?</h2>
            <Form.Item
              name="rewardType"
              rules={[
                {
                  required: true,
                  message: 'Choose reward type to engage more creators',
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
                options={rewardTypes}
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
                        validator: async (_, amount) => {
                          if (amount === null) {
                            return Promise.reject(new Error('All budget are allowed.'));
                          }
                          if (+amount === 0) {
                            return Promise.reject(new Error("This field value shouldn't be 0"));
                          }
                        },
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
                  message: "Try to explain what you're looking for",
                },
              ]}>
              <TextArea
                autoSize={{ minRows: 3, maxRows: 10 }}
                placeholder={placeholder}
                value={text}
                onChange={handleChangeText}
                onBlur={() => sendEvent(EVENTS.ADDED_TASK_DESCRIPTION)}
                className={styles.modalTexArea}
              />
            </Form.Item>
            {task && (
              <>
                <h2>Status</h2>
                <Form.Item
                  name="taskType"
                  rules={[
                    {
                      required: true,
                      message: 'Type is required',
                    },
                  ]}>
                  <PrimarySelect
                    showSearch
                    className={cn(styles.selectDef, !taskType && styles.select)}
                    onChange={(e) => {
                      changeTaskType(e);
                      sendEvent(EVENTS.CHOOSED_TASK_TYPE);
                    }}
                    value={taskType}
                    bordered={false}
                    options={typesArray}
                    placeholder="Task type"
                  />
                </Form.Item>
              </>
            )}
            <div className="modal_select_btn">
              <Form.Item className={styles.buttonContainer}>
                <PrimaryButton
                  id="modalJoinMyJourneySubmitBtnId"
                  className={cn(styles.hugeButton, task && styles.editHugeButton)}
                  isWhite={true}
                  isFullWidth={false}
                  onClick={() => changeShowModal(false)}
                  text="Cancel"
                />
                {task && (
                  <PrimaryButton
                    id="modalJoinMyJourneySubmitBtnId"
                    className={cn(styles.hugeButton, styles.editHugeButton)}
                    isFullWidth={false}
                    text="Completed"
                    htmlType="submit"
                  />
                )}
                {!task && (
                  <PrimaryButton
                    htmlType="submit"
                    id="modalJoinMyJourneySubmitBtnId"
                    className={styles.hugeButton}
                    isFullWidth={false}
                    text="Сreate a task"
                  />
                )}
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
