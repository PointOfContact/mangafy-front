import React, { useEffect, useState } from 'react';

import { Input, Select, Radio } from 'antd';
import cn from 'classnames';
import HeroUpload from 'components/ui-elements/heroUpload';
import PrimaryInput from 'components/ui-elements/input';
import PrimarySelect from 'components/ui-elements/select';
import TextEditor from 'components/ui-elements/text-editor';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import { EVENTS } from 'helpers/amplitudeEvents';
import { COUNTRIES, projectTypes } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const { Option } = Select;
const { TextArea } = Input;

const EditGenresField = ({
  baseData,
  onChangeSingleField,
  saveMangaStoryData,
  genresEnums,
  sendEvent,
}) => {
  const [countries, setCountries] = useState([]);
  const [validationTitle, setValidationTitle] = useState('');
  const [validationDesc, setValidationDesc] = useState('');
  const [imgId, setImgId] = useState('');
  const [radioValue, setRadioValue] = useState(baseData?.budget);
  const [projectType, setProjectType] = useState(baseData?.projectType);

  const genres = genresEnums.map(({ _id: key, value }) => ({ key, value }));
  const defaultGenres = baseData.genres?.map(({ _id }) => _id);

  const chooseLanguage = (value) => {
    const data = {
      target: {
        name: 'preferredLanguage',
        value,
      },
    };
    sendEvent(EVENTS.EDIT_PROJECT_LANGUAGE, 'language', value);
    onChangeSingleField(data, true);
  };

  const chooseTypes = (value) => {
    const data = {
      target: {
        name: 'projectType',
        value,
      },
    };
    sendEvent(EVENTS.EDIT_PROJECT_TYPE, 'type', value);
    onChangeSingleField(data, true);
  };

  useEffect(() => {
    setCountries(
      COUNTRIES.map((value) => (
        <Option value={value} key={value}>
          {value}
        </Option>
      ))
    );
    setProjectType(
      projectTypes.map((value) => (
        <Option value={value} key={value}>
          {value}
        </Option>
      ))
    );
    setRadioValue(baseData?.budget);
    setImgId(baseData?.image);
  }, []);

  const changeSelectedGenre = (genresIds) => {
    const data = { ...baseData, genresIds };
    sendEvent(EVENTS.EDIT_PROJECT_GENRES, 'genres', genresIds);
    saveMangaStoryData(data, {}, 'genresIds');
  };

  const setMangaPhoto = (e, image) => {
    const data = { ...baseData, image };
    mangaStoryAPI.collab.patchCollab(data);
  };

  const budgetChange = (e) => {
    const { value: budget } = e.target;

    setRadioValue(budget);

    const data = { ...baseData, budget };
    sendEvent(budget ? EVENTS.BUDGET_WHIT : EVENTS.BUDGET_NO);

    saveMangaStoryData(data, () => {}, 'budget');
  };

  return (
    <div className={styles.editTitle}>
      <h2 className={styles.genresTitle}>General</h2>
      <h3>Project Name</h3>
      <PrimaryInput
        placeholder="Project Name"
        name="title"
        value={baseData?.title}
        onChange={(e) => {
          onChangeSingleField(e);
        }}
        onBlur={() => {
          baseData?.title?.trim().length > 1
            ? (saveMangaStoryData(baseData, 'title'),
              sendEvent(EVENTS.EDIT_PROJECT_TITLE, 'title', baseData.title),
              setValidationTitle(''))
            : setValidationTitle('Wait. wait! Add name to your next bestseller!');
        }}
      />
      {validationTitle && <p className={styles.error}>{validationTitle}</p>}
      <h3>Project Language</h3>
      <Select
        showSearch
        defaultValue={baseData?.preferredLanguage}
        onChange={chooseLanguage}
        placeholder={'Project Language'}
        className={styles.language}
        style={{ width: 200 }}>
        {countries}
      </Select>
      <h3>Project Types</h3>
      <Select
        showSearch
        defaultValue={baseData?.projectType}
        placeholder={'Project Types'}
        onChange={chooseTypes}
        className={styles.language}
        style={{ width: 200 }}>
        {projectType}
      </Select>
      <h3>Project Description</h3>
      <TextEditor
        placeholder={
          'Describe what your project is about: \n\nWhat we can improve: \n\nWhy:\n\nThe goal:'
        }
        result={(e) => {
          const target = {
            name: 'story',
            value: e,
          };
          onChangeSingleField({ target });
        }}
        value={baseData?.story}
        onBlur={() => {
          baseData?.story?.trim()
            ? (saveMangaStoryData(baseData, () => {}, 'story'),
              sendEvent(EVENTS.EDIT_PROJECT_STORY, 'story', baseData.story),
              setValidationDesc(''))
            : setValidationDesc('Wait. wait! Add description to your next bestseller!');
        }}
      />
      {validationDesc && <p className={styles.error}>{validationDesc}</p>}
      <div className={styles.budgetContainer}>
        <h3>Budget</h3>
        <Radio.Group onChange={budgetChange} value={radioValue}>
          <Radio className={cn(styles.radio, radioValue === 'No' && styles.active)} value={'No'}>
            No budget
          </Radio>
          <Radio
            className={cn(styles.radio, radioValue === 'With' && styles.active)}
            value={'With'}>
            With budget
          </Radio>
        </Radio.Group>
      </div>
      <h3>Tags</h3>
      <PrimarySelect
        countLimit={true}
        mode="multiple"
        onChange={changeSelectedGenre}
        isLinear={true}
        isFullWidth={true}
        placeholder="Genres"
        defaultValue={defaultGenres}
        options={genres}
        className={styles.option}
      />
      <h3 className={styles.uploadCoverTitle}>Upload project cover</h3>
      <HeroUpload
        className={styles.imgPage}
        mangaUrl={imgId}
        showText={false}
        setImgId={setImgId}
        onChangeHero={setMangaPhoto}
        text="Drag or browse your art to start uploading"
        notUploadVideo={true}
      />
    </div>
  );
};

EditGenresField.propTypes = {
  baseData: PropTypes.object.isRequired,
  genresEnums: PropTypes.array.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  saveMangaStoryData: PropTypes.func.isRequired,
  sendEvent: PropTypes.func.isRequired,
};

export default EditGenresField;
