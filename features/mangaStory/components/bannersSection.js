import React from 'react';

import { Popover, Button, Progress, Upload } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgCat from 'components/icon/Cat';
import SvgLang from 'components/icon/Lang';
import SvgMone from 'components/icon/Mone';
import SvgPencilColored from 'components/icon/PencilColored';
import SvgTie from 'components/icon/Tie';
import SvgCloudArrow from 'components/icon/CloudArrow';
import { ShareButtonsColored } from 'components/shareColored';
import ButtonToggle from 'components/ui-elements/button-toggle';
import PrimarySelect from 'components/ui-elements/select';
import { OPTIONS } from 'features/createStory/lenguage/constant';
import { userTypes, userTypesEnums } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const languages = OPTIONS.map((item) => ({ key: item, value: item }));

const BannerSection = ({
  originUrl,
  baseData,
  canEdit,
  saveUserDataByKey,
  setBaseData,
  openNotification,
  genres: genresEnums,
}) => {
  const genres = genresEnums.map(({ _id: key, value }) => ({ key, value }));
  const defaultGenres = baseData.genres?.map(({ _id }) => _id);

  const filteredOptions = baseData.preferredLanguage
    ? languages.filter((o) => !baseData.preferredLanguage.includes(o.value))
    : languages;

  const beforeUpload = (file) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener(
      'load',
      async () => {
        try {
          const jwt = client.getCookie('feathers-jwt');
          const { default: api } = await import('api/restClient');
          const options = {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          };
          const { id: image } = await api
            .service('/api/v2/uploads')
            .create({ uri: reader.result }, options);
          const data = await api.service('/api/v2/manga-stories').patch(
            baseData._id,
            {
              image,
            },
            options
          );
          setBaseData(data);
        } catch (err) {
          openNotification('error', err.message);
        }
      },
      false
    );
  };

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
            <Button key={item} value="searchingFor" data-id="searchingFor" type="text">
              {userTypesEnums[item] && userTypesEnums[item]}
            </Button>
          </p>
        ) : null
      )}
    </div>
  );
  return (
    <div className={styles.box__banner}>
      {canEdit ? (
        <div className={styles.box__banner_upload}>
          <Upload className={styles.box__banner_upload__wrap} beforeUpload={beforeUpload} fileList={[]}>
            {/* <img className={styles.box__banner_upload__img} src={!baseData.image ? '/img/banner.png' : client.UPLOAD_URL + baseData.image} /> */}
            <img className={styles.box__banner_upload__img} src='/img/banner.png' alt=""/>
            <div className={styles.box__banner_upload__content}>
              <i className={styles.box__banner_upload__icon}>
                <SvgCloudArrow width="81" height="59" fill="#fff" />
              </i>
              <div className={styles.box__banner_upload__text}>
                <p><b>Upload your cover</b></p>
                <p>MangaFY can accept PNG and JPEG Uploader files as big as 10MB, but no bigger.</p>
              </div>
            </div>
          </Upload>
        </div>
      ) : (
        <div className={styles.box__banner_upload}>
          {/* <img className={styles.box__banner_upload__img} src={!baseData.image ? '/img/banner.png' : client.UPLOAD_URL + baseData.image} /> */}
          <img className={styles.box__banner_upload__img} src='/img/banner.png' alt=""/>
        </div>
      )}
      <div className={styles.box__banner_block}>
        <div className={styles.box__banner_block__nav}>
          {baseData.genres?.slice(0, 1).map((g) => (
            <div className={styles.box__banner_block__nav_item}>
              <Button key={g} data-id="preferredLanguage" className={styles.box__banner_block__nav_button} type="text">
                <SvgCat width="18px" height="24px" />
                <span>{g.name}</span>
              </Button>
            </div>
          ))}
          <div className={styles.box__banner_block__nav_item}>
            <Button data-id="preferredLanguage" className={styles.box__banner_block__nav_button} type="text">
              <SvgLang width="24px" height="24px" />
              <span>{baseData.preferredLanguage}</span>
            </Button>
          </div>
          <div className={styles.box__banner_block__nav_item}>
            <Popover placement="top" title="Searching For" content={content}>
              <Button data-id="searchingFor" className={styles.box__banner_block__nav_button} type="text">
                <SvgTie width="20px" height="20px" />
                <span>{baseData.searchingFor[0] || 'Searching For'}</span>
              </Button>
            </Popover>
          </div>
          <div className={styles.box__banner_block__nav_item}>
            <Button value="compensationModel" data-id="compensationModel" className={styles.box__banner_block__nav_button} type="text">
              <SvgMone width="20px" height="20px" />
              {baseData.compensationModel === 'paid' ? 'Paid Collaboration' : 'Freewill'}
            </Button>
          </div>
        </div>
        {canEdit && (
          <div className={styles.box__banner_block__edit}>
            <Popover content={editContent} trigger="click" placement="bottomRight" className={styles.box__banner_block__edit_button}>
              <span>Edit</span>
              <i>
                <SvgPencilColored width="22px" height="22px" />
              </i>
            </Popover>
          </div>
        )}
      </div>
      <div className={styles.box__banner_bottom}>
        <div className={styles.box__banner_progress}>
          <p className={styles.box__banner_progress__text}>Your graphic novel in progress</p>
          <div className={styles.box__banner_progress__content}>
            <i className={styles.box__banner_progress__icon}>
              <img src="/img/Group.png" />
            </i>
            <div className={styles.box__banner_progress__range}>
              <Progress percent={30} size="small" className={"banner_progress"} />
            </div>
            <i className={styles.box__banner_progress__icon}>
              <img src="/img/notebook 1.png" />
            </i>
          </div>
        </div>
        <div className={styles.box__banner_socials}>
          <ShareButtonsColored text="Share collab!" shareUrl={originUrl} />
        </div>
      </div>
    </div>
  );
};

BannerSection.propTypes = {
  originUrl: PropTypes.string.isRequired,
  baseData: PropTypes.object.isRequired,
  canEdit: PropTypes.bool.isRequired,
  genres: PropTypes.array.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
  setBaseData: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
};

export default BannerSection;
