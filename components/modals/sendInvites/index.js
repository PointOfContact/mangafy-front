import React, { useEffect, useState } from 'react';

import { Modal, Input, notification } from 'antd';
import Form from 'antd/lib/form/Form';
import { createRequest } from 'api/joinMangaStoryRequestClient';
import SvgClose from 'components/icon/Close';
import LargeButton from 'components/ui-elements/large-button';
import PrimarySelect from 'components/ui-elements/select';
import { USER_TYPES } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { TextArea } = Input;

const SendInvites = ({ changeShowModal, showModal, user, profile }) => {
  const [joinAs, changeJoinAs] = useState('Writer');
  const [text, changeText] = useState('');
  const [task, setTask] = useState('');
  const [optionsTasks, setOptionsTasks] = useState('');
  const [optionsMangaStories, setOptionsMangaStories] = useState('');
  const [story, setStory] = useState(null);

  useEffect(() => {
    setOptionsMangaStories(
      user.mangaStories?.map((item) => ({ key: item._id, value: item.title }))
    );
  }, [user]);

  useEffect(() => {
    setStory(optionsMangaStories[0] && optionsMangaStories[0].key);
  }, [optionsMangaStories]);

  useEffect(() => {
    if (story) {
      const { tasks } = user?.mangaStories?.find((item) => item._id === story);
      setOptionsTasks(tasks?.map((item) => ({ key: item._id, value: item.description })));
      setTask(tasks?.[0]?._id);
    }
  }, [story]);

  const handleSetStory = (id) => {
    const { tasks } = user.mangaStories.find((item) => item._id === id);
    setOptionsTasks(tasks?.map((item) => ({ key: item._id, value: item.description })));
    setTask(tasks?.[0]?._id);
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
    });
  };

  const onInvite = async () => {
    try {
      await createRequest({
        mangaStoryId: user.mangaStories[0]._id,
        isInvite: true,
        joinAs,
        senderId: profile._id,
        text,
        task,
      });
      changeShowModal(false);
    } catch (error) {
      openNotification('error', 'Failed to invite');
    }
  };

  const handleChangeText = (e) => {
    changeText(e.target.value);
  };

  const handleCancel = () => {
    changeShowModal(false);
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
      <div className="container send_invite">
        <div className="row">
          <div className="col-lg-12 select_modal">
            <Form
              name="send_invait"
              onFinish={onInvite}
              initialValues={{
                joinAs,
                story,
                task,
                text,
              }}>
              <h2>Join as</h2>
              <Form.Item
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
              <h2>Manga Stories</h2>
              <Form.Item
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
                  <Form.Item
                    name="task"
                    rules={[
                      {
                        required: true,
                        message: 'Task is required',
                      },
                    ]}>
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
              <Form.Item
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
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  className={styles.modalTexarea}
                />
              </Form.Item>

              <div className="modal_select_btn">
                <Form.Item>
                  <LargeButton
                    // onClick={onInvite}
                    htmlType="submit"
                    id="modalJoinMyJourneySubmitBtnId"
                    className={styles.hugeButton}
                    isFullWidth={false}
                    text={'send'}
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
export default SendInvites;

SendInvites.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  changeShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};
