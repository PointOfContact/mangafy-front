import React, { useEffect, useState } from 'react';

import { Modal, Form, Select } from 'antd';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import PropTypes from 'prop-types';

import HeroUpload from './heroUpload';
import styles from './styles.module.scss';

const { Option } = Select;

const ModalComponent = ({
  changeShowModal,
  showModal,
  hero,
  user,
  ifIsEdit,
  setEdit,
  heroItems,
  confirmDelete,
  onChangeHeroLogic,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImgId] = useState('');
  const [titles, setTitles] = useState({});
  const [chooseCharacter, setChooseCharacter] = useState(hero?.characterArray);
  const [idCardHero, setIdCardHero] = useState('');
  const [options, setOptions] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setOptions(
      heroItems?.map(({ props }) => (
        <Option key={props.hero._id} value={props.hero._id} label={props.hero.name}>
          {props.hero.name}
        </Option>
      ))
    );
  }, [chooseCharacter]);

  const changeSelectedHero = (value) => {
    setChooseCharacter(value);
  };

  const setGlobalTitle = (type) => {
    if (type === 'component') {
      setTitles({
        title: ifIsEdit ? 'Edit item' : 'Create item',
        inputTitle: 'Item definition',
        inputDesc: 'Item description',
        firstInput: 'Start with your character name...',
        uploadTitle: 'Upload your item',
        inputLink: 'Link to character',
        inputLinkDesc: ifIsEdit
          ? 'Each accessories has their owner or two'
          : 'Each accessories has their owner',
        description: "It's where you're supposed to describe your item in greater detail.",
        button: 'Add component',
      });
    } else {
      setTitles({
        title: ifIsEdit ? 'Edit background' : 'Create background',
        inputTitle: 'Background definition',
        inputDesc: 'Background description',
        firstInput: 'Start with your character name...',
        uploadTitle: 'Upload background',
        inputLink: '',
        inputLinkDesc: '',
        description:
          'The area or scenery behind the main object of contemplation, especially when perceived as a framework for it.',
        button: 'Add background',
      });
    }
  };

  useEffect(() => {
    setGlobalTitle(hero?.type);
  }, [showModal]);

  useEffect(() => {
    setName(hero?.name || '');
    setDescription(hero?.description || '');
    setImgId(hero?.imageUrl || '');
    setChooseCharacter(hero?.characterArray || []);
    setIdCardHero(hero?._id);
    form.setFieldsValue({
      name: hero?.name,
      description: hero?.description,
      imageUrl: hero?.imageUrl,
      chooseCharacter: hero?.characterArray,
    });
  }, [hero, form]);

  const handleCancel = () => {
    changeShowModal(false);
    setEdit(false);
    form.resetFields();
  };

  const onChangeHero = (e, imgId = '', newCreated = false) => {
    const newHero = {
      ...hero,
      name,
      description,
      imageUrl: imgId,
      characterArray: chooseCharacter,
    };
    onChangeHeroLogic(newHero, hero, newCreated, setIdCardHero, idCardHero);
  };

  return (
    <Modal
      forceRender
      className={styles.modal}
      footer={null}
      title={<h1 className={styles.title}>{titles.title}</h1>}
      visible={showModal}
      closeIcon={
        <span className={styles.close}>
          <SvgClose height="18px" width="18px" />
        </span>
      }
      okText="Send"
      destroyOnClose
      onCancel={handleCancel}>
      <div className={styles.border} />
      <div className={cn('container', styles.container)}>
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
                  chooseCharacter,
                }}>
                <h3>{titles.inputTitle}</h3>
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
                    onMouseOut={() => name.trim().length > 0 && onChangeHero({})}
                  />
                </Form.Item>
                {hero?.type === 'component' && (
                  <>
                    <h3>{titles.inputLink}</h3>
                    <Form.Item name="chooseCharacter">
                      <Select
                        countLimit={true}
                        mode="multiple"
                        onChange={changeSelectedHero}
                        isLinear={true}
                        showSearch
                        isFullWidth={true}
                        placeholder={titles.inputLinkDesc}
                        defaultValue={chooseCharacter}
                        onBlur={() => onChangeHero({})}
                        className={styles.option}>
                        {options}
                      </Select>
                    </Form.Item>
                  </>
                )}
                <h3>{titles.inputDesc}</h3>
                <Form.Item name="description">
                  <TextArea
                    placeholder={titles.description}
                    className={styles.modalTexArea}
                    isFullWidth={true}
                    isLinear={true}
                    autoSize={{ minRows: 1, maxRows: 8 }}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => onChangeHero({})}
                  />
                </Form.Item>
                <h3>{titles.uploadTitle}</h3>
                <div className={cn('modal_select_btn', styles.submitButton)}>
                  <HeroUpload
                    text={'Drag or browse your art to start uploading'}
                    disabled={!name.trim()}
                    ifIsEdit={ifIsEdit}
                    hero={hero}
                    onChangeHero={onChangeHero}
                    mangaUrl={imageUrl}
                    setImgId={setImgId}
                    typeCard={hero?.type}
                  />
                </div>
                <h3>Action</h3>
                <div className={styles.containerButton}>
                  <PrimaryButton
                    onClick={() => {
                      changeShowModal(false);
                      onChangeHero({}, imageUrl, true);
                    }}
                    text="Duplicate"
                  />
                  <PrimaryButton isWhite={true} onClick={() => confirmDelete(hero)} text="Delete" />
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
  hero: PropTypes.object,
  mangaUrl: PropTypes.string,
  user: PropTypes.object,
  ifIsEdit: PropTypes.bool,
  setEdit: PropTypes.func,
  heroItems: PropTypes.array,
  confirmDelete: PropTypes.func,
  onChangeHeroLogic: PropTypes.func.isRequired,
};

ModalComponent.defaultProps = {
  hero: {},
  user: {},
  mangaUrl: null,
  ifIsEdit: false,
  setEdit: () => {},
  heroItems: [],
  confirmDelete: () => {},
};

export default ModalComponent;
