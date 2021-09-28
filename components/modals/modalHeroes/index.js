import React, { useEffect, useRef, useState } from 'react';

import { Modal, Form, notification, Select } from 'antd';
import { createHero, patchHero } from 'api/storyBoardClient';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import { EVENTS } from 'helpers/amplitudeEvents';
import { heroQuality, heroTypes } from 'helpers/constant';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import EditBackground from '../createEditHero/backgroundUpload';
import styles from './styles.module.scss';

const { Option } = Select;

const ModalHeroes = ({
  changeShowModalHeroes,
  showModal,
  hero,
  getStoryBoard,
  user,
  confirmDelete,
  storyBoard,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [appearance, setAppearance] = useState('');
  const [heroType, setHeroType] = useState([]);
  const [quality, setQuality] = useState([]);
  const [imageUrl, setImgId] = useState('');
  const [idCardHero, setIdCardHero] = useState('');
  const [form] = Form.useForm();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!showModal) {
      form.resetFields();
      return;
    }
    setName(hero?.name || '');
    setDescription(hero?.description || '');
    setImgId(hero?.imageUrl || '');
    setAppearance(hero?.appearance || '');
    setHeroType(hero?.heroType || []);
    setQuality(hero?.quality || []);
    setIdCardHero(hero?._id);
    form.setFieldsValue({
      name: hero?.name,
      heroType: hero?.heroType,
      quality: hero?.quality,
      description: hero?.description,
      appearance: hero?.appearance,
      imageUrl: hero?.imageUrl,
    });
    if (!hero?._id) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 0);
    }
  }, [showModal]);

  const onChangeHero = (imgId, newCreated = false) => {
    const newHero = {
      ...hero,
      name,
      description,
      appearance,
      heroType,
      quality,
      imageUrl: imgId,
    };

    if (!newHero?.name || newHero?.name.length < 2) {
      return;
    }

    if (newHero?.newCreated || newCreated) {
      delete newHero?.newCreated;
      delete hero?.newCreated;
      if (newCreated) {
        delete newHero?._id;
        newHero.storyBoard = storyBoard?._id;
      }
      createHero(
        newHero,
        (res) => {
          let eventType;
          switch (hero.type) {
            case 'personage':
              eventType = EVENTS.CREATE_BOARD_CHARACTER;
              break;
            case 'component':
              eventType = EVENTS.CREATE_BOARD_TOOL;
              break;
            default:
              eventType = EVENTS.CREATE_BOARD_BACKGROUND;
              break;
          }
          const data = {
            event_type: eventType,
            event_properties: { hero },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          };
          myAmplitude(data);
          setIdCardHero(res?._id);
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
      delete newHero?.storyBoard;
      patchHero(
        idCardHero,
        newHero,
        () => {
          getStoryBoard();
        },
        (err) => {
          notification.error({
            message: err.message,
          });
        }
      );
    }
  };

  const createOptions = (array) =>
    array?.map((value) => (
      <Option key={value} value={value}>
        {value}
      </Option>
    ));

  const heroTypesArray = createOptions(heroTypes);

  const heroQualityArray = createOptions(heroQuality);

  const handleChangeTypes = (value) => {
    setHeroType(value);
  };

  const handleChangeQuality = (value) => {
    setQuality(value);
  };

  const setNameValue = () =>
    name?.trim()?.length < 1 &&
    form.setFieldsValue({
      name: hero?.name,
    });

  return (
    <Modal
      forceRender
      autoF
      className={styles.modal}
      footer={null}
      form={form}
      width={854.34}
      visible={showModal}
      closeIcon={
        <span className={styles.close}>
          <SvgClose height="18px" width="18px" />
        </span>
      }
      okText="Send"
      destroyOnClose
      onCancel={() => changeShowModalHeroes(false)}>
      <div className={cn('container', styles.container)}>
        <div className={cn(styles.inputContainer)}>
          <div className="row">
            <div className={styles.border} />
            <div className={cn('col-lg-12', 'select_modal', styles.selectModal)}>
              <Form form={form} name="tasks" preserve={false}>
                <h3 className={styles.title}>Character name</h3>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Name is required',
                    },
                  ]}>
                  <PrimaryInput
                    className={styles.nameInput}
                    inputRef={inputRef}
                    placeholder={'Add your character name'}
                    isFullWidth={true}
                    isLinear={true}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => {
                      setNameValue();
                      onChangeHero();
                    }}
                  />
                </Form.Item>
                <h3 className={styles.title}>Types</h3>
                <Form.Item name="heroType">
                  <Select
                    disabled={!idCardHero}
                    className={cn(styles.option, heroType?.length > 2 && styles.childLength)}
                    bordered={false}
                    mode="multiple"
                    placeholder="Types"
                    style={{ width: '100%' }}
                    onChange={handleChangeTypes}
                    onBlur={() => onChangeHero()}>
                    {heroTypesArray}
                  </Select>
                </Form.Item>
                <h3 className={styles.title}>Quality</h3>
                <Form.Item name="quality">
                  <Select
                    disabled={!idCardHero}
                    className={cn(styles.option, quality?.length > 1 && styles.childLength)}
                    bordered={false}
                    mode="multiple"
                    placeholder="Quality"
                    style={{ width: '100%' }}
                    onChange={handleChangeQuality}
                    onBlur={() => onChangeHero()}>
                    {heroQualityArray}
                  </Select>
                </Form.Item>
                <h3 className={styles.title}>Personality and Backstory</h3>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Description is required',
                    },
                  ]}>
                  <TextArea
                    disabled={!idCardHero}
                    placeholder={
                      "Tell your story, what are you creating? A comic book Manga or maybe a whole novella, wh're very interested!"
                    }
                    className={styles.modalTexArea}
                    isFullWidth={true}
                    isLinear={true}
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => onChangeHero()}
                  />
                </Form.Item>
                <h3 className={styles.title}>Appearance and Powers</h3>
                <Form.Item
                  name="appearance"
                  rules={[
                    {
                      required: true,
                      message: 'Appearance is required',
                    },
                  ]}>
                  <TextArea
                    disabled={!idCardHero}
                    placeholder={
                      "Tell your story, what are you creating? A comic book Manga or maybe a whole novella, wh're very interested!"
                    }
                    className={styles.modalTexArea}
                    isFullWidth={true}
                    isLinear={true}
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    onChange={(e) => setAppearance(e.target.value)}
                    onBlur={() => onChangeHero()}
                  />
                </Form.Item>
                <div className={styles.attachmentContainer}>
                  <h3 className={cn(styles.title, styles.attachmentTitle)}>Attachments</h3>
                  {imageUrl && (
                    <span
                      onClick={() => {
                        onChangeHero('');
                        setImgId('');
                      }}>
                      Delete
                    </span>
                  )}
                </div>
                <Form.Item name="imageUrl" className={styles.uploadMobile}>
                  <EditBackground
                    disabled={!idCardHero}
                    hero={hero}
                    imageUrl={imageUrl}
                    setImgId={setImgId}
                    onChangeHero={onChangeHero}
                  />
                </Form.Item>
              </Form>
              <h4 className={styles.title}>Actions</h4>
              <div className={styles.containerButton}>
                <PrimaryButton onClick={() => onChangeHero(imageUrl, true)} text="Duplicate" />
                <PrimaryButton isActive={true} onClick={() => confirmDelete(hero)} text="Archive" />
              </div>
            </div>
          </div>
          {/* <div className={styles.uploadFile}>
            <EditBackground
              disabled={!idCardHero}
              hero={hero}
              imageUrl={imageUrl}
              setImgId={setImgId}
              onChangeHero={onChangeHero}
            />
          </div> */}
        </div>
      </div>
    </Modal>
  );
};

ModalHeroes.propTypes = {
  changeShowModalHeroes: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  getStoryBoard: PropTypes.func.isRequired,
  hero: PropTypes.object,
  mangaUrl: PropTypes.string,
  user: PropTypes.object,
  confirmDelete: PropTypes.func.isRequired,
  storyBoard: PropTypes.object,
};

ModalHeroes.defaultProps = {
  hero: {},
  user: {},
  mangaUrl: null,
  storyBoard: {},
};

export default ModalHeroes;
