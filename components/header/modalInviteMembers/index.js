import React, { useEffect, useState } from 'react';

import { Modal, Form, notification } from 'antd';
import client from 'api/client';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ModalInviteMembers = ({ showModal, setShowModal }) => {
  const [form] = Form.useForm();
  const [copyUrl, setCopy] = useState('https://mangafy.com');
  useEffect(() => {
    form.resetFields();
  }, [showModal, form]);

  const sendInvite = async (e) => {
    const newEmails = e.emails.filter((item) => item.length > 4);
    if (newEmails.length) {
      const data = { emails: newEmails };
      const jwt = client.getCookie('feathers-jwt');
      const { default: api } = await import('api/restClient');
      api
        .service('/api/v2/invite-members')
        .create(data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then(() => {
          notification.success({
            message: 'All participants were notified by email.',
          });
          setShowModal(false);
        })
        .catch((err) =>
          notification.error({
            message: err.message,
          })
        );
    } else {
      notification.error({
        message: 'Incorrect EMail Address',
      });
    }
  };
  const copyLink = async () => {
    if (copyUrl.includes('inviteId')) {
      copy(copyUrl);
    } else {
      const data = { copy: true };
      const jwt = client.getCookie('feathers-jwt');
      const { default: api } = await import('api/restClient');
      api
        .service('/api/v2/invite-members')
        .create(data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setCopy(`https://mangafy.club/sign-up?inviteId=${res._id}`);
          copy(`https://mangafy.club/sign-up?inviteId=${res._id}`);
          notification.success({
            message: 'Link copied',
          });
        })
        .catch((err) =>
          notification.error({
            message: err.message,
          })
        );
    }
  };
  return (
    <Modal
      className={styles.modal}
      title="Invite to MangaFy"
      centered
      visible={showModal}
      width={500}
      closeIcon={
        <span className={styles.close} onClick={() => setShowModal(false)}>
          <SvgClose height="18px" width="18px" />
        </span>
      }
      footer={[]}>
      <div className={styles.inputContainer}>
        <p>Email addresses:</p>
        <Form
          name="dynamic_form_item"
          form={form}
          initialValues={{ emails: [''] }}
          onFinish={sendInvite}>
          <Form.List name="emails">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          type: 'email',
                          message: 'Email is not a valid email!',
                        },
                      ]}
                      noStyle>
                      <PrimaryInput
                        validateStatus="error"
                        className={styles.input}
                        placeholder={'name example@com'}
                        isFullWidth={true}
                        isLinear={true}
                        onChange={() => {
                          if (fields.length - 1 === index) {
                            add('', fields.length);
                          }
                        }}
                      />
                    </Form.Item>
                    {!!index && (
                      <div className={styles.deleteInputContainer}>
                        <span className={styles.deleteInput} onClick={() => remove(index)}>
                          <SvgClose height="18px" width="18px" />
                        </span>
                      </div>
                    )}
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>
          <Form.Item>
            <PrimaryButton
              onClick={() => {
                form.getFieldsValue('emails');
              }}
              htmlType="submit"
              className={styles.send}
              text={'Send Invitations'}
            />
          </Form.Item>
        </Form>
        <div className={styles.copyContainer}>
          <PrimaryInput
            id={'path'}
            className={styles.copyInput}
            placeholder={'https://mangafy.club/'}
            isFullWidth={true}
            isLinear={true}
            value={copyUrl}
            disabled={true}
          />
          <button
            className={styles.copyButton}
            onClick={() => {
              copyLink();
            }}>
            Copy
          </button>
        </div>
      </div>
    </Modal>
  );
};

ModalInviteMembers.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

ModalInviteMembers.defaultProps = {
  showModal: false,
  setShowModal: () => {},
};

export default ModalInviteMembers;
