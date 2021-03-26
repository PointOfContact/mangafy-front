import React, { useEffect, useState } from 'react';

import { Modal, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import { createHero, patchHero } from 'api/storyBoardClient';
import SvgClose from 'components/icon/Close';
import PrimaryInput from 'components/ui-elements/input';
import LargeButton from 'components/ui-elements/large-button';
import PropTypes from 'prop-types';
// import { createHero, patchHero, deleteHero, uploadFile } from 'api/storyBoardClient';

import styles from './styles.module.scss';

const { TextArea } = Input;

const ModalHero = ({ changeShowModal, showModal, hero, getStoryBoard }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [form] = Form.useForm();
  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>
        {hero?.newCreated ? `CREATE A` : `EDIT`} {hero.type === 'personage' ? 'hero' : 'component'}
      </div>
    </div>
  );

  useEffect(() => {
    setName(hero?.name || '');
    setDescription(hero?.description || '');
    form.setFieldsValue({ name: hero?.name, description: hero?.description });
  }, [hero, form]);

  const handleCancel = () => {
    changeShowModal(false);
  };

  const onChangeHero = () => {
    const newHero = {
      ...hero,
      name,
      description,
    };
    if (!newHero?.name) {
      return;
    }
    if (newHero.newCreated) {
      delete newHero.newCreated;
      createHero(
        newHero,
        () => {
          delete newHero.storyBoard;
          getStoryBoard();
          changeShowModal(false);
        },
        () => {}
      );
    } else {
      delete newHero?._id;
      patchHero(
        hero?._id,
        newHero,
        () => {
          getStoryBoard();
          changeShowModal(false);
        },
        () => {}
      );
    }
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
      destroyOnClose
      onCancel={handleCancel}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 select_modal">
            <Form
              name="tasks"
              form={form}
              preserve={false}
              onFinish={onChangeHero}
              initialValues={{
                name,
                description,
              }}>
              <h2>Name</h2>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Name is required',
                  },
                ]}>
                <PrimaryInput isFullWidth={true} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <h2>description</h2>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Description is required',
                  },
                ]}>
                <TextArea
                  className={styles.modalTexarea}
                  autoSize={{ minRows: 3, maxRows: 3 }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>

              <div className="modal_select_btn">
                <Form.Item>
                  <LargeButton
                    htmlType="submit"
                    id="modalJoinMyJourneySubmitBtnId"
                    className={styles.hugeButton}
                    isFullWidth={false}
                    text={hero?.newCreated ? 'Create' : 'Edit'}
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

ModalHero.propTypes = {
  changeShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  getStoryBoard: PropTypes.func.isRequired,
  hero: PropTypes.object,
};

ModalHero.defaultProps = {
  hero: {},
};

export default ModalHero;
