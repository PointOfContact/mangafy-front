import React from 'react';

import ButtonToggle from 'components/ui-elements/button-toggle';
import PrimarySelect from 'components/ui-elements/select';
import { userTypes } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const EditContent = ({ saveUserDataByKey, genresEnums, baseData, languages }) => {
  const genres = genresEnums.map(({ _id: key, value }) => ({ key, value }));
  const defaultGenres = baseData.genres?.map(({ _id }) => _id);

  const filteredOptions = baseData.preferredLanguage
    ? languages.filter((o) => !baseData.preferredLanguage.includes(o.value))
    : languages;

  const changeSelectedLanguage = (preferredLanguage) => {
    const data = { ...baseData, preferredLanguage };
    saveUserDataByKey(data, 'preferredLanguage');
  };

  const changeSelectedGenre = (genresIds) => {
    const data = { ...baseData, genresIds };
    saveUserDataByKey(data, 'genresIds');
  };

  const changeSelectedUserType = (searchingFor) => {
    const data = { ...baseData, searchingFor };
    saveUserDataByKey(data, 'searchingFor');
  };

  const changeCollaborationIsPaid = (checked) => {
    const data = { ...baseData, compensationModel: checked ? 'paid' : 'collaboration' };
    saveUserDataByKey(data, 'compensationModel');
  };

  return (
    <div className={styles.editContent}>
      <PrimarySelect
        mode="multiple"
        onChange={changeSelectedGenre}
        isLinear={true}
        isFullWidth={true}
        placeholder="Ganrys"
        defaultValue={defaultGenres}
        options={genres}
        className={styles.edit_select}
      />
      <PrimarySelect
        showSearch
        onChange={changeSelectedLanguage}
        isLinear={true}
        isFullWidth={true}
        placeholder="Lenguage"
        value={baseData.preferredLanguage || undefined}
        options={filteredOptions}
        className={styles.edit_select}
      />
      <PrimarySelect
        mode="multiple"
        onChange={changeSelectedUserType}
        isLinear={true}
        isFullWidth={true}
        placeholder="Profession"
        defaultValue={baseData.searchingFor || []}
        options={userTypes}
        className={styles.edit_select}
      />
      <div>
        <ButtonToggle
          id={'paidOrFree'}
          onChange={(e) => {
            changeCollaborationIsPaid(e.target.checked);
          }}
          className={styles.toggle}
          isChecked={baseData.compensationModel === 'paid'}
          offText="Free Collaboration"
          onText="Paid Collaboration"
        />
      </div>
    </div>
  );
};

EditContent.propTypes = {
  saveUserDataByKey: PropTypes.func.isRequired,
  genresEnums: PropTypes.array.isRequired,
  baseData: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
};
export default EditContent;
