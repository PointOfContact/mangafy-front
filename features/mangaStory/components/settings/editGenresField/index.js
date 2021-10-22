import React, { useEffect, useState } from 'react';

import { Input, Select } from 'antd';
import PrimaryInput from 'components/ui-elements/input';
import PrimarySelect from 'components/ui-elements/select';
import { COUNTRIES, projectTypes } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const { Option } = Select;
const { TextArea } = Input;

const EditGenresField = ({ baseData, onChangeSingleField, saveMangaStoryData, genresEnums }) => {
  const [countries, setCountries] = useState([]);
  const [validationTitle, setValidationTitle] = useState('');
  const [validationDesc, setValidationDesc] = useState('');
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
    onChangeSingleField(data, true);
  };

  const chooseTypes = (value) => {
    const data = {
      target: {
        name: 'projectType',
        value,
      },
    };
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
  }, []);

  const changeSelectedGenre = (genresIds) => {
    const data = { ...baseData, genresIds };
    saveMangaStoryData(data, 'genresIds');
  };

  return (
    <div className={styles.editTitle}>
      <h2 className={styles.genresTitle}>General</h2>
      <h3>Project name</h3>
      <PrimaryInput
        placeholder="Project name"
        name="title"
        value={baseData?.title}
        onChange={(e) => {
          onChangeSingleField(e);
        }}
        onBlur={() => {
          baseData?.title?.trim().length > 1
            ? (saveMangaStoryData(baseData, 'title'), setValidationTitle(''))
            : setValidationTitle('Wait. wait! Add name to your next bestseller!');
        }}
      />
      {validationTitle && <p className={styles.error}>{validationTitle}</p>}
      <h3>Project description</h3>
      <TextArea
        autoSize={true}
        maxLength={5000}
        maxrows={5000}
        rows={4}
        placeholder="Describe the project in detail below, including its goal,
         inspiration, and any other pertinent information about what
        you're hoping to accomplish. 🚀"
        name="story"
        value={baseData?.story}
        onChange={(e) => {
          onChangeSingleField(e);
        }}
        onBlur={() => {
          baseData?.story?.trim()
            ? (saveMangaStoryData(baseData, 'story'), setValidationDesc(''))
            : setValidationDesc('Wait. wait! Add description to your next bestseller!');
        }}
      />
      {validationDesc && <p className={styles.error}>{validationDesc}</p>}
      <h3>Project language</h3>
      <Select
        showSearch
        defaultValue={baseData?.preferredLanguage}
        onChange={chooseLanguage}
        className={styles.language}
        style={{ width: 200 }}>
        {countries}
      </Select>
      <h3>Project Types</h3>
      <Select
        showSearch
        defaultValue={baseData?.projectType}
        placeholder={'Project types'}
        onChange={chooseTypes}
        className={styles.language}
        style={{ width: 200 }}>
        {projectType}
      </Select>
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
    </div>
  );
};

EditGenresField.propTypes = {
  baseData: PropTypes.object.isRequired,
  genresEnums: PropTypes.array.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  saveMangaStoryData: PropTypes.func.isRequired,
};

export default EditGenresField;
