/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';

import { Modal, Form, Select } from 'antd';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import Popconfirm from 'components/popconfirm';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import { heroQuality, heroTypes } from 'helpers/constant';
import PropTypes from 'prop-types';

import HeroUpload from '../../ui-elements/heroUpload';
import styles from './styles.module.scss';

const { Option } = Select;

const ModalHeroes = ({
  changeShowModalHeroes,
  showModal,
  hero,
  user,
  confirmDelete,
  onChangeHeroLogic,
  ifIsEdit,
  setEdit,
  componentNames,
  clickDelete,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [appearance, setAppearance] = useState('');
  const [searchQualityIcon, setSearchQualityIcon] = useState(false);
  const [searchTypesIcon, setSearchTypesIcon] = useState(false);
  const [heroType, setHeroType] = useState([]);
  const [quality, setQuality] = useState([]);
  const [imageUrl, setImgId] = useState('');
  const [validation, setValidation] = useState('');
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
    setValidation('');
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
    const newHero = {
      ...hero,
      name,
      description,
      appearance,
      heroType,
      quality,
      imageUrl: imgId,
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

  const handleChangeTypes = (value) => {
    setHeroType([value]);
  };

  const handleChangeQuality = (value) => {
    setQuality(value);
  };

  const setNameValue = () =>
    name?.trim()?.length < 1 &&
    form.setFieldsValue({
      name: hero?.name,
    });

  const onMouseOut = () => {
    onChangeHero();
    setValidation('');
  };

  const popConfirm =
    hero?.type === 'personage'
      ? !!componentNames?.length
        ? `Hey , what are you doing? This character already has links to page/component in your story (${componentNames}). If you delete it, those links will break! Are you sure?`
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
      }}>
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
                    placeholder={'Start with your character name...'}
                    isFullWidth={true}
                    isLinear={true}
                    onChange={(e) => setName(e.target.value)}
                    onMouseOut={() => {
                      setNameValue();
                      name?.trim()?.length === 1
                        ? setValidation('This field max length 2 letter')
                        : onMouseOut();
                    }}
                  />
                </Form.Item>
                {validation && <p className={styles.error}>{validation}</p>}
                <h3 className={styles.title}>Character development</h3>
                <div className={styles.chooseTypes}>
                  <Form.Item name="quality">
                    <Select
                      disabled={!idCardHero}
                      className={cn(styles.option, quality?.length > 1 && styles.childLength)}
                      bordered={false}
                      mode="multiple"
                      placeholder="By the role they play in a narrative"
                      style={{ width: '100%' }}
                      onChange={handleChangeQuality}
                      defaultValue={quality}
                      onFocus={() => setSearchQualityIcon(true)}
                      onBlur={() => {
                        setSearchQualityIcon(false);
                        onChangeHero();
                      }}>
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
                      disabled={!idCardHero}
                      className={cn(
                        styles.option,
                        heroType?.length > 2 && styles.childLength,
                        styles.typesSelect
                      )}
                      showSearch
                      bordered={false}
                      placeholder="By examining how they change  over the course"
                      onFocus={() => setSearchTypesIcon(true)}
                      onChange={handleChangeTypes}
                      defaultValue={heroType}
                      onBlur={() => {
                        setSearchTypesIcon(false);
                        onChangeHero();
                      }}>
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
                      'Personality is a description of how character acts, behaves, or reacts.'
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
                      'Another thing to take notice of is the type of person they are,  their appearance and powers.'
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
                  <h3 className={cn(styles.title, styles.attachmentTitle)}>
                    Upload your character
                  </h3>
                  {imageUrl && (
                    <span
                      onClick={() => {
                        onChangeHero({}, '');
                        setImgId('');
                      }}>
                      Delete
                    </span>
                  )}
                </div>
                <Form.Item name="imageUrl" className={styles.uploadMobile}>
                  <HeroUpload
                    text="Drag or browse your art to start uploading"
                    disabled={!idCardHero}
                    hero={hero}
                    onChangeHero={onChangeHero}
                    className={styles.upload}
                    mangaUrl={imageUrl}
                    setImgId={setImgId}
                  />
                </Form.Item>
              </Form>
              <h4 className={styles.title}>Actions</h4>
              <div className={styles.containerButton}>
                <PrimaryButton
                  onClick={() => {
                    changeShowModalHeroes(false);
                    onChangeHero({}, imageUrl, true);
                  }}
                  text="Duplicate"
                />

                <Popconfirm
                  overlayClassName={styles.popConfirm}
                  placement={'top'}
                  title={popConfirm}
                  onConfirm={() => confirmDelete(hero)}
                  onClick={() => clickDelete(hero)}
                  item={<PrimaryButton isWhite={true} text="Delete Character" />}
                />
              </div>
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
  user: PropTypes.object,
  confirmDelete: PropTypes.func.isRequired,
  onChangeHeroLogic: PropTypes.func.isRequired,
  ifIsEdit: PropTypes.bool,
  setEdit: PropTypes.func,
  componentNames: PropTypes.array,
  clickDelete: PropTypes.func,
};

ModalHeroes.defaultProps = {
  hero: {},
  user: {},
  mangaUrl: null,
  ifIsEdit: false,
  setEdit: () => {},
  componentNames: [],
  clickDelete: () => {},
};

export default ModalHeroes;
