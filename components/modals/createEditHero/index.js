import React, { useEffect, useState } from 'react';

import { Modal, notification, Form } from 'antd';
import { createHero, patchHero } from 'api/storyBoardClient';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import EditBackground from './backgroundUpload';
import styles from './styles.module.scss';

const ModalComponent = ({ changeShowModal, showModal, hero, getStoryBoard, user, ifIsEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImgId] = useState('');
  const [submitButton, setSubmitButton] = useState(false);
  const [titles, setTitles] = useState({});
  const [form] = Form.useForm();

  const setGlobalTitle = (type) => {
    if (type === 'component') {
      setTitles({
        write: 'Now add the components:',
        firstInput: 'Write your characters treats',
        description: 'Add a short bio synopsis to your character',
        button: 'Add component',
      });
    } else {
      setTitles({
        write: 'Now add the background:',
        firstInput: "Your character's setting",
        description: 'Define an overview narrative and vision',
        button: 'Add background',
      });
    }
  };

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

  useEffect(() => {
    setGlobalTitle(hero?.type);
  }, [showModal]);

  const handleCancel = () => {
    changeShowModal(false);
  };

  const onChangeHero = (e, imgId = '') => {
    const newHero = {
      ...hero,
      name,
      description,
      imageUrl: imgId,
    };

    if (!newHero?.name) {
      return;
    }

    if (newHero.newCreated) {
      delete newHero.newCreated;
      createHero(
        newHero,
        () => {
          let eventType;
          switch (hero.type) {
            case 'component':
              eventType = EVENTS.CREATE_BOARD_TOOL;
              break;
            default:
              eventType = EVENTS.CREATE_BOARD_BACKGROUND;
              break;
          }
          const data = {
            event_type: eventType,
            event_properties: { newHero },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          };
          myAmplitude(data);
          delete newHero.storyBoard;
          getStoryBoard();
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

  return (
    <Modal
      forceRender
      className={styles.modal}
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
      onCancel={() => {
        setSubmitButton(false);
        handleCancel();
      }}>
      <div className={cn('container', styles.container)}>
        <div className={styles.board} />
        <div className={styles.inputContainer}>
          <div className="row">
            <div className={cn('col-lg-12', 'select_modal', styles.selectModal)}>
              <Form
                name="tasks"
                form={form}
                preserve={false}
                initialValues={{
                  name,
                  description,
                  imageUrl: '',
                }}
                onFinish={() => {
                  name.trim().length > 0 && onChangeHero({}, imageUrl);
                  changeShowModal(false);
                }}>
                <h3>{titles.write}</h3>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      validator: async (_, names) => {
                        if (!names || names.trim().length < 2) {
                          return Promise.reject(new Error('This field max length 2 letter'));
                        }
                      },
                    },
                  ]}>
                  <PrimaryInput
                    placeholder={titles.firstInput}
                    isFullWidth={true}
                    isLinear={true}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item name="description">
                  <TextArea
                    placeholder={titles.description}
                    className={styles.modalTexArea}
                    isFullWidth={true}
                    isLinear={true}
                    autoSize={{ minRows: 1, maxRows: 8 }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Item>

                <div className={cn('modal_select_btn', styles.submitButton)}>
                  <EditBackground
                    disabled={!name.trim()}
                    ifIsEdit={ifIsEdit}
                    hero={hero}
                    onChangeHero={onChangeHero}
                    imageUrl={imageUrl}
                    setSubmitButton={setSubmitButton}
                    setImgId={setImgId}
                    typeCard={hero?.type}
                    requestAuto={false}
                  />
                  <Form.Item>
                    <PrimaryButton
                      loading={submitButton}
                      htmlType="submit"
                      className={styles.send}
                      text={hero?.newCreated ? titles.button : 'Save changes'}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalComponent.propTypes = {
  changeShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  getStoryBoard: PropTypes.func.isRequired,
  hero: PropTypes.object,
  mangaUrl: PropTypes.string,
  user: PropTypes.object,
  ifIsEdit: PropTypes.bool,
};

ModalComponent.defaultProps = {
  hero: {},
  user: {},
  mangaUrl: null,
  ifIsEdit: () => {},
};

export default ModalComponent;
