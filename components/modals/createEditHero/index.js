import React, { useEffect, useState } from 'react';

import { Modal, notification } from 'antd';
import Form from 'antd/lib/form/Form';
import { createHero, patchHero } from 'api/storyBoardClient';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/order

import EditBackground from './backgroundUpload';
import styles from './styles.module.scss';

const ModalHero = ({ changeShowModal, showModal, hero, getStoryBoard }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImgId] = useState('');
  const [form] = Form.useForm();

  // default value personage
  const title = {
    modal: 'Character creation just got easier!',
    write: 'Create a hero, tell us about him:',
    firstInput: 'NAME YOUR CHARACTER',
    button: 'Create',
  };

  const setDialogTitles = (write, modal, firstInput, button) => {
    title.write = write;
    title.modal = modal;
    title.firstInput = firstInput;
    title.button = button;
  };

  const setGlobalTitle = (type) => {
    if (type === 'personage') {
      return 'CREATE YOUR CHARACTERS';
    }
    if (type === 'component') {
      setDialogTitles(
        'Now add the components:',
        'Add components even easier!',
        'Components name',
        'Add component'
      );
      return 'Add new component';
    }
    setDialogTitles(
      'Now add the background:',
      'Add background even easier!',
      'Description name',
      'Add background'
    );
    return 'Add background';
  };

  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>
        {hero?.newCreated ? setGlobalTitle(hero.type) : `Components name`}
      </div>
    </div>
  );

  useEffect(() => {
    setName(hero?.name || '');
    setDescription(hero?.description || '');
    setImgId(hero?.imageUrl || '');
    form.setFieldsValue({
      name: hero?.name,
      description: hero?.description,
      imageUrl: hero?.imageUrl,
    });
  }, [hero, form]);

  const handleCancel = () => {
    changeShowModal(false);
  };

  const onChangeHero = () => {
    const newHero = {
      ...hero,
      name,
      description,
      imageUrl,
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
        (err) => {
          notification.error({
            message: err.message,
          });
        }
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
        (err) => {
          notification.error({
            message: err.message,
          });
        }
      );
    }
  };

  const ifIsEdit = ModalTitle.props?.children?.props?.children === 'Components name';

  return (
    <Modal
      className={styles.modal}
      title={ModalTitle}
      footer={null}
      width={854.34}
      visible={showModal}
      closeIcon={
        <span className={styles.close}>
          <SvgClose height="18px" width="18px" />
        </span>
      }
      okText="Send"
      destroyOnClose
      onCancel={handleCancel}>
      <div className={cn('container', styles.container)}>
        {ifIsEdit ? (
          ''
        ) : (
          <div className={styles.description}>
            <h2>{title.modal}</h2>
          </div>
        )}
        <div className={cn(ifIsEdit ? styles.editStyle : '', styles.inputContainer)}>
          <div className="row">
            <div className={cn('col-lg-12', 'select_modal', styles.selectModal)}>
              <Form
                name="tasks"
                form={form}
                preserve={false}
                onFinish={onChangeHero}
                initialValues={{
                  name,
                  description,
                  imageUrl: '',
                }}>
                {ifIsEdit ? '' : <h3>{title.write}</h3>}
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: false,
                      message: 'Name is required',
                    },
                  ]}>
                  <PrimaryInput
                    placeholder={title.firstInput}
                    isFullWidth={true}
                    isLinear={true}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Description is required',
                    },
                  ]}>
                  <TextArea
                    placeholder={
                      ifIsEdit
                        ? 'A short description of your component'
                        : 'add a bio to your character'
                    }
                    className={styles.modalTexarea}
                    isFullWidth={true}
                    isLinear={true}
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Item>

                <div className={cn('modal_select_btn', styles.submitButton)}>
                  <EditBackground
                    ifIsEdit={ifIsEdit}
                    hero={hero}
                    imageUrl={imageUrl}
                    setImgId={setImgId}
                  />
                  <Form.Item>
                    <PrimaryButton
                      htmlType="submit"
                      className={styles.send}
                      text={hero?.newCreated ? title.button : 'Save changes'}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <div className={styles.uploadFile}>
            <EditBackground
              ifIsEdit={ifIsEdit}
              hero={hero}
              imageUrl={imageUrl}
              setImgId={setImgId}
            />
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
  mangaUrl: PropTypes.string,
};

ModalHero.defaultProps = {
  hero: {},
  mangaUrl: null,
};

export default ModalHero;
