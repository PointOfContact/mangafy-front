import React, { useEffect, useState } from 'react';

import { Modal, Input, notification, Form } from 'antd';
import { createRequest } from 'api/joinMangaStoryRequestClient';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimarySelect from 'components/ui-elements/select';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

const { TextArea } = Input;

const SendInvites = ({ changeShowModal, showModal, user, profile }) => {
  const [joinAs, changeJoinAs] = useState('Writer');
  const [text, changeText] = useState('');
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [optionsTasks, setOptionsTasks] = useState([]);
  const [optionsMangaStories, setOptionsMangaStories] = useState([]);
  const [story, setStory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user) return;
    setOptionsMangaStories(
      user.mangaStories?.data?.map((item) => ({
        key: item._id,
        value: `${item.title} ${!item.published && '(Draft project*)'}`,
        disabled: !item.published,
      }))
    );
  }, [user]);

  useEffect(() => {
    setStory(optionsMangaStories[0] && optionsMangaStories[0].key);
  }, [optionsMangaStories]);

  useEffect(() => {
    if (story) {
      const { tasks } = user?.mangaStories?.data?.find((item) => item._id === story);
      setOptionsTasks([
        { key: undefined, value: 'not selected' },
        ...tasks?.map((item) => ({ key: item._id, value: item.description })),
      ]);
      setTask(tasks?.[0]?._id);
    }
  }, [story, user?.mangaStories]);

  const handleSetStory = (id) => {
    const { tasks } = user.mangaStories?.data?.find((item) => item._id === id);
    setOptionsTasks(tasks?.map((item) => ({ key: item._id, value: item.description })));
    setTask(tasks?.[0]?._id);
    form.setFieldsValue({ task: tasks?.[0]?._id });
    setStory(id);
  };
  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>Send Invite</div>
    </div>
  );
  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
      placement: 'bottomLeft',
    });
  };

  const onInvite = async () => {
    try {
      setLoading(true);
      await createRequest({
        mangaStoryId: story,
        isInvite: true,
        joinAs,
        senderId: profile._id,
        userId: user._id,
        text,
        taskId: task,
        setLoading,
      });
      setLoading(false);
      const eventData = [
        {
          event_type: EVENTS.INVITE_SOMEONE,
          event_properties: {
            mangaStoryId: story,
            profileId: profile._id,
            userId: user._id,
            text,
            joinAs,
            taskId: task,
          },
        },
      ];
      myAmplitude(eventData);
      changeShowModal(false);
    } catch (error) {
      openNotification('error', 'Failed to invite');
      setLoading(false);
    }
  };

  const handleChangeText = (e) => {
    changeText(e.target.value);
  };

  const handleCancel = () => {
    changeShowModal(false);
  };

  const MyCheckboxes = userTypes.map((item) => ({
    key: item.value,
    value: item.value,
  }));

  return (
    <Modal
      forceRender
      className={styles.modal}
      title={ModalTitle}
      footer={null}
      style={{ width: '900px' }}
      visible={showModal}
      closeIcon={<SvgClose height="18px" width="18px" />}
      okText="Send"
      onCancel={handleCancel}>
      <div className="container send_invite">
        <div className="row">
          <div className="col-lg-12 select_modal">
            <Form
              name="send_invait"
              onFinish={onInvite}
              form={form}
              initialValues={{
                joinAs,
                story,
                task,
                text,
              }}>
              <h2>Join as</h2>
              <Form.Item
                hasFeedback
                name="joinAs"
                rules={[
                  {
                    required: true,
                    message: 'Genre is required',
                  },
                ]}>
                <PrimarySelect
                  showSearch
                  className={styles.modalSelect}
                  onChange={changeJoinAs}
                  options={MyCheckboxes}
                  value={joinAs}
                />
              </Form.Item>
              <h2>Your graphic novel</h2>
              <Form.Item
                hasFeedback
                name="story"
                rules={[
                  {
                    required: true,
                    message: 'Story is required',
                  },
                ]}>
                <PrimarySelect
                  showSearch
                  className={styles.modalSelect}
                  onChange={handleSetStory}
                  options={optionsMangaStories}
                  value={story}
                />
              </Form.Item>
              {story && optionsTasks && (
                <>
                  <h2>Tasks</h2>
                  <Form.Item hasFeedback name="task" rules={[]}>
                    <PrimarySelect
                      showSearch
                      className={styles.modalSelect}
                      onChange={setTask}
                      options={optionsTasks}
                      value={task}
                    />
                  </Form.Item>
                </>
              )}
              <h2>Your message</h2>
              <GrammarlyEditorPlugin clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
                <Form.Item
                  hasFeedback
                  name="text"
                  rules={[
                    {
                      required: true,
                      message: 'Text is required',
                    },
                  ]}>
                  <TextArea
                    placeholder="Please write a personal message to the team leader explaining why you are a good fit"
                    value={text}
                    onChange={handleChangeText}
                    type="text"
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    className={styles.modalTexarea}
                  />
                </Form.Item>
              </GrammarlyEditorPlugin>
              <div className="modal_select_btn">
                <Form.Item>
                  <PrimaryButton
                    loading={loading}
                    htmlType="submit"
                    id="modalJoinMyJourneySubmitBtnId"
                    className={styles.hugeButton}
                    isFullWidth={false}
                    text={'Send Invite'}
                  />
                </Form.Item>
              </div>
            </Form>
            <div>
              Draft project – if you are about to send a collaboration invite in draft mode, note
              that user will not be able to see a summary of your project until they accept the
              invite.
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

SendInvites.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
  changeShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

SendInvites.defaultProps = {
  profile: null,
};

export default SendInvites;
