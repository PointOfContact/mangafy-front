/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';

import { Modal, Form, Select } from 'antd';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import Popconfirm from 'components/popconfirm';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import { EVENTS } from 'helpers/amplitudeEvents';
import { heroQuality, heroTypes } from 'helpers/constant';
import PropTypes from 'prop-types';

import HeroUpload from '../../ui-elements/heroUpload';
import styles from './styles.module.scss';
import { Grammarly, GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

const { Option } = Select;

const ModalHeroes = ({
  changeShowModalHeroes,
  showModal,
  hero,
  sendEvent,
  confirmDelete,
  onChangeHeroLogic,
  ifIsEdit,
  setEdit,
  componentNames,
  clickDelete,
  mangaStoryId,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [appearance, setAppearance] = useState('');
  const [searchQualityIcon, setSearchQualityIcon] = useState(false);
  const [searchTypesIcon, setSearchTypesIcon] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
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

  const onChangeHero = (e, imgId, newCreated = false) => {
    const selectData = (data) => (typeof data === 'string' ? [data] : data);

    const newHero = {
      ...hero,
      name: e.name || name,
      description: e.description || description,
      appearance: e.appearance || appearance,
      heroType: selectData(e.heroType),
      quality: selectData(e.quality),
      imageUrl: imgId,
      mangaStoryId,
    };
    onChangeHeroLogic(newHero, hero, newCreated, setIdCardHero, idCardHero);
  };

  const createOptions = (array) =>
    array?.map((value) => (
      <Option key={value} value={value}>
        {value}
      </Option>
    ));

  const heroTypesArray = createOptions(heroTypes);

  const heroQualityArray = createOptions(heroQuality);

  const onFinish = (e) => {
    setName(e.name);
    setDescription(e.description);
    setHeroType(e.heroType);
    setQuality(e.quality);
    setAppearance(e.appearance);
    onChangeHero(e, imageUrl);
    changeShowModalHeroes(false);
  };

  const popConfirm =
    hero?.type === 'personage'
      ? !!componentNames?.length
        ? `This character already appears and is a part of one of the сhapters. Are you sure you want to delete it?`
        : 'Are you sure to delete this personage'
      : `Are you sure to delete this ${hero?.type}`;

  return (
    <Modal
      forceRender
      autoF
      className={styles.modal}
      footer={null}
      form={form}
      title={
        <h1 className={styles.modalTitle}>{ifIsEdit ? 'Edit Character' : 'Create Character'}</h1>
      }
      visible={showModal}
      closeIcon={
        <span className={styles.close}>
          <SvgClose height="18px" width="18px" />
        </span>
      }
      okText="Send"
      destroyOnClose
      onCancel={() => {
        setEdit(false);
        changeShowModalHeroes(false);
      }}
    >
      <div className={cn('container', styles.container)}>
        <div className={cn(styles.inputContainer)}>
          <div className="row">
            <div className={styles.border} />
            <div className={cn('col-lg-12', 'select_modal', styles.selectModal)}>
              <Form form={form} name="tasks" preserve={false} onFinish={onFinish}>
                <h3 className={styles.title}>Character name</h3>

                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      validator: async (_, names) => {
                        if (names === '') {
                          return Promise.reject(
                            new Error('Hey, bud. You forgot to add your name in the field above...')
                          );
                        }
                        if (names.trim().length < 3) {
                          return Promise.reject(
                            new Error('Length must be at least 3 characters long')
                          );
                        }
                      },
                    },
                  ]}
                >
                  <PrimaryInput
                    className={styles.nameInput}
                    inputRef={inputRef}
                    placeholder={'Start with your character name...'}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    isFullWidth={true}
                    isLinear={true}
                  />
                </Form.Item>

                <h3 className={styles.title}>Character development</h3>
                <div className={styles.chooseTypes}>
                  <Form.Item name="quality">
                    <Select
                      className={cn(
                        styles.option,
                        styles.typesSelect,
                        quality?.length > 0 && styles.childLength
                      )}
                      bordered={false}
                      placeholder="By the role they play in a narrative"
                      style={{ width: '100%' }}
                      defaultValue={quality}
                      onFocus={() => setSearchQualityIcon(true)}
                    >
                      {heroQualityArray}
                    </Select>
                  </Form.Item>
                  <span>
                    {searchQualityIcon ? (
                      <span className={styles.searchIcon}>&#9906;</span>
                    ) : (
                      <span className={styles.arrowIcon}>&#10095;</span>
                    )}
                  </span>
                </div>
                <h3 className={styles.title}>Character types</h3>
                <div className={styles.chooseTypes}>
                  <Form.Item name="heroType">
                    <Select
                      className={cn(
                        styles.option,
                        styles.typesSelect,
                        heroType?.length > 0 && styles.childLength
                      )}
                      showSearch
                      bordered={false}
                      placeholder="By examining how they change  over the course"
                      onFocus={() => setSearchTypesIcon(true)}
                      defaultValue={heroType}
                    >
                      {heroTypesArray}
                    </Select>
                  </Form.Item>
                  <span>
                    {searchTypesIcon ? (
                      <span className={styles.searchIcon}>&#9906;</span>
                    ) : (
                      <span className={styles.arrowIcon}>&#10095;</span>
                    )}
                  </span>
                </div>
                <h3 className={styles.title}>Personality and Backstory</h3>
                <Grammarly clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
                  <GrammarlyEditorPlugin>
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: 'Description is required',
                        },
                      ]}
                    >
                      <TextArea
                        placeholder={
                          'Personality is a description of how character acts, behaves, or reacts.'
                        }
                        className={styles.modalTexArea}
                        isFullWidth={true}
                        isLinear={true}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        autoSize={{ minRows: 1, maxRows: 4 }}
                      />
                    </Form.Item>
                  </GrammarlyEditorPlugin>
                  <h3 className={styles.title}>Appearance and Powers</h3>
                  <GrammarlyEditorPlugin>
                    <Form.Item
                      name="appearance"
                      rules={[
                        {
                          required: true,
                          message: 'Appearance is required',
                        },
                      ]}
                    >
                      <TextArea
                        placeholder={
                          'Another thing to take notice of is the type of person they are,  their appearance and powers.'
                        }
                        className={styles.modalTexArea}
                        isFullWidth={true}
                        onChange={(e) => {
                          setAppearance(e.target.value);
                        }}
                        isLinear={true}
                        autoSize={{ minRows: 1, maxRows: 4 }}
                      />
                    </Form.Item>
                  </GrammarlyEditorPlugin>
                </Grammarly>

                <div className={styles.attachmentContainer}>
                  <h3 className={cn(styles.title, styles.attachmentTitle)}>
                    Upload your character
                  </h3>
                  {imageUrl && (
                    <span
                      onClick={() => {
                        onChangeHero({}, '');
                        setImgId('');
                      }}
                    >
                      Delete
                    </span>
                  )}
                </div>
                <Form.Item name="imageUrl" className={styles.uploadMobile}>
                  <HeroUpload
                    text="Drag or browse your art to start uploading"
                    hero={hero}
                    // onChangeHero={onChangeHero}
                    onChangeHero={() => {}}
                    setImgLoad={setImgLoad}
                    className={styles.upload}
                    mangaUrl={imageUrl}
                    setImgId={setImgId}
                    sendEvent={sendEvent}
                  />
                </Form.Item>
                <h4 className={styles.title}>Actions</h4>
                <div className={styles.containerButton}>
                  <PrimaryButton loading={imgLoad} text="Save" htmlType="submit" />
                  <PrimaryButton
                    onClick={() => {
                      changeShowModalHeroes(false);
                      onChangeHero({}, imageUrl, true);
                      sendEvent(EVENTS.DUPLICATE_BOARD_CHARACTER, {
                        hero,
                      });
                    }}
                    loading={imgLoad}
                    text="Duplicate"
                    htmlType="submit"
                  />
                  <Popconfirm
                    overlayClassName={styles.popConfirm}
                    placement={'top'}
                    title={popConfirm}
                    okText="Delete"
                    cancelText="Cancel"
                    onConfirm={() => confirmDelete(hero)}
                    onClick={() => {
                      clickDelete(hero);
                      sendEvent(EVENTS.DELETE_BOARD_CHARACTER, {
                        hero,
                      });
                    }}
                    item={
                      <PrimaryButton htmlType="submit" isWhite={true} text="Delete Character" />
                    }
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalHeroes.propTypes = {
  changeShowModalHeroes: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  hero: PropTypes.object,
  mangaUrl: PropTypes.string,
  confirmDelete: PropTypes.func.isRequired,
  onChangeHeroLogic: PropTypes.func.isRequired,
  ifIsEdit: PropTypes.bool,
  setEdit: PropTypes.func,
  componentNames: PropTypes.array,
  clickDelete: PropTypes.func,
  sendEvent: PropTypes.func.isRequired,
  mangaStoryId: PropTypes.string,
};

ModalHeroes.defaultProps = {
  hero: {},
  mangaUrl: null,
  ifIsEdit: false,
  setEdit: () => {},
  componentNames: [],
  clickDelete: () => {},
  mangaStoryId: '',
};

export default ModalHeroes;
