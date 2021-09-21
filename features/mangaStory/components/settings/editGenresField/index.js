import React from 'react';

import { Input, Select } from 'antd';
import PrimaryInput from 'components/ui-elements/input';
import { COUNTRIES } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const { Option } = Select;
const { TextArea } = Input;

const EditGenresField = ({ baseData, onChangeSingleField, saveMangaStoryData }) => {
  const chooseLanguage = (value) => {
    const data = {
      target: {
        name: 'preferredLanguage',
        value,
      },
    };
    onChangeSingleField(data, true);
  };

  const countries = COUNTRIES.map((value) => <Option key={value}>{value}</Option>);

  return (
    <div className={styles.editTitle}>
      <h2>Genres</h2>
      <h3>Project Name</h3>
      <PrimaryInput
        placeholder="Title"
        name="title"
        value={baseData?.title}
        onChange={(e) => {
          onChangeSingleField(e);
        }}
        onBlur={() => baseData?.title && saveMangaStoryData(baseData, 'title')}
      />
      {!baseData?.title && (
        <p className={styles.error}>Wait. wait! Add name to your next bestseller!</p>
      )}
      <h3>Project description</h3>
      <TextArea
        autoSize={true}
        maxLength={100000}
        maxrows={5000}
        rows={4}
        placeholder="Description"
        name="story"
        value={baseData?.story}
        onChange={(e) => {
          onChangeSingleField(e);
        }}
        onBlur={() => baseData?.description && saveMangaStoryData(baseData, 'story')}
      />
      {!baseData?.description && (
        <p className={styles.error}>Wait. wait! Add description to your next bestseller!</p>
      )}
      <h3>Project language</h3>
      <Select
        defaultValue={baseData?.preferredLanguage}
        onChange={chooseLanguage}
        className={styles.language}
        style={{ width: 200 }}>
        {countries}
      </Select>
    </div>
  );
};

EditGenresField.propTypes = {
  baseData: PropTypes.object.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  saveMangaStoryData: PropTypes.func.isRequired,
};

export default EditGenresField;
