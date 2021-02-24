import React from 'react';

import { Popover, Button, Progress } from 'antd';
import SvgCat from 'components/icon/Cat';
import SvgLang from 'components/icon/Lang';
import SvgMone from 'components/icon/Mone';
import SvgPencilColored from 'components/icon/PencilColored';
import SvgTie from 'components/icon/Tie';
import { ShareButtons } from 'components/share';
import ButtonToggle from 'components/ui-elements/button-toggle';
import PrimarySelect from 'components/ui-elements/select';
import { OPTIONS } from 'features/createStory/lenguage/constant';
import { userTypes, userTypesEnums } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const languages = OPTIONS.map((item) => ({ key: item, value: item }));

const BannerSection = ({
  originUrl,
  editMode,
  onChangePopup,
  baseData,
  canEdit,
  saveUserDataByKey,
  genres: genresEnums,
}) => {
  const genres = genresEnums.map(({ _id: key, value }) => ({ key, value }));
  const defaultGenres = baseData.genres?.map(({ _id }) => _id);

  const filteredOptions = baseData.preferredLanguage
    ? languages.filter((o) => !baseData.preferredLanguage.includes(o.value))
    : languages;

  const changeSelectedLenguage = (preferredLanguage) => {
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

  const editContent = (
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
        onChange={changeSelectedLenguage}
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
          onChange={(e) => {
            changeCollaborationIsPaid(e.target.checked);
          }}
          className={styles.togle}
          isChecked={baseData.compensationModel === 'paid'}
          offText="Free Collaboration"
          onText="Paid Collaboration"
        />
      </div>
    </div>
  );

  const content = () => (
    <div>
      {' '}
      {baseData.searchingFor.map((item) =>
        userTypesEnums[item] ? (
          <p>
            <Button
              key={item}
              value="searchingFor"
              data-id="searchingFor"
              type={editMode ? 'dashed' : 'text'}
              onClick={onChangePopup}>
              {userTypesEnums[item] && userTypesEnums[item]}
            </Button>
          </p>
        ) : null
      )}
    </div>
  );
  return (
    <div className={styles.bannerWrap}>
      <div className="row">
        <div className={styles.banner}>
          <img src="/img/banner.png" />
          <div>
            <img src="/img/upload.png" />
          </div>
        </div>
        <div className="row">
          <div className={styles.edit_setings}>
            <div className={`${styles.bannerGenres} d-flex `}>
              <div className={styles.bannerGenresItem}>
                {baseData.genres?.slice(0, 1).map((g) => (
                  <Button
                    key={g}
                    data-id="preferredLanguage"
                    type={editMode && canEdit ? 'dashed' : 'text'}
                    onClick={onChangePopup}>
                    <SvgCat width="18px" height="24px" />
                    <span>{g.name}</span>
                  </Button>
                ))}
              </div>
              <div className={styles.bannerGenresItem}>
                <Button
                  data-id="preferredLanguage"
                  type={editMode && canEdit ? 'dashed' : 'text'}
                  onClick={onChangePopup}>
                  <SvgLang width="24px" height="24px" />
                  <span>{baseData.preferredLanguage}</span>
                </Button>
              </div>
              <div className={styles.bannerGenresItem}>
                <Popover placement="top" title="Searching For" content={content}>
                  <Button
                    data-id="searchingFor"
                    type={editMode && canEdit ? 'dashed' : 'text'}
                    onClick={onChangePopup}>
                    <SvgTie width="20px" height="20px" />
                    <span>{baseData.searchingFor[0] || 'Searching For'}</span>
                  </Button>
                </Popover>
              </div>
              <div className={styles.bannerGenresItem}>
                <Button
                  value="compensationModel"
                  data-id="compensationModel"
                  type={editMode && canEdit ? 'dashed' : 'text'}
                  onClick={onChangePopup}>
                  <SvgMone width="20px" height="20px" />
                  {baseData.compensationModel === 'paid' ? 'Paid Collaboration' : 'Freewill'}
                </Button>
              </div>
            </div>
            <div className={styles.edit}>
              <Popover content={editContent} trigger="click" placement="bottomRight">
                <span>Edit</span>
                <span>
                  <SvgPencilColored width="22px" height="22px" />
                </span>
              </Popover>
            </div>
          </div>
        </div>
        <div className={styles.progressWrapper}>
          <div className={styles.progress}>
            <p>Your graphic novel in progress</p>
            <div className={styles.Lamp}>
              <div>
                <img src="/img/Group.png" />
              </div>
            </div>
            <div className={styles.progressWrap}>
              <Progress percent={30} size="small" />
            </div>
            <div className={styles.Lamp}>
              <div>
                <img src="/img/notebook 1.png" />
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            <ShareButtons text="Share collb!" shareUrl={originUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

BannerSection.propTypes = {
  originUrl: PropTypes.string.isRequired,
  baseData: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  onChangePopup: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
};

export default BannerSection;
