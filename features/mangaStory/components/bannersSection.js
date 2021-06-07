import React from 'react';

import { Popover, Button, Progress, Upload } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgCat from 'components/icon/Cat';
import SvgLang from 'components/icon/Lang';
import SvgMone from 'components/icon/Mone';
import SvgPencilColored from 'components/icon/PencilColored';
import SvgTie from 'components/icon/Tie';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import ButtonToggle from 'components/ui-elements/button-toggle';
import PrimarySelect from 'components/ui-elements/select';
import { OPTIONS } from 'features/createStory/lenguage/constant';
import { userTypes } from 'helpers/constant';
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
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'application/pdf';

    if (!isJpgOrPng) {
      openNotification('error', 'You can only upload JPG, JPEG, PDF or PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      openNotification('error', 'Image must be smaller than 10MB!');
    }

    if (isJpgOrPng && isLt2M) {
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
    }
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
          id={'paidOrFree'}
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

  const searchingForContent = () => (
    <div>
      {baseData.searchingFor.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
  const genresContent = () => (
    <div>
      {baseData.genres.map((item) => (
        <p key={item._id}>{item.name}</p>
      ))}
    </div>
  );
  return (
    <div className={styles.bannerWrap}>
      <div className={cn(styles.bannerWrapContent, 'row')}>
        {canEdit ? (
          <Upload className={styles.upload} beforeUpload={beforeUpload} fileList={[]}>
            <div className={styles.banner}>
              <Imgix
                className={styles.bannerCover}
                width={944}
                height={150}
                layout="fixed"
                src={
                  !baseData.image
                    ? 'https://mangafy.club/img/banner.webp'
                    : client.UPLOAD_URL + baseData.image
                }
                alt=""
              />
              <div className={styles.upload}>
                <Imgix
                  width={335}
                  height={83}
                  layout="fixed"
                  src={'https://mangafy.club/img/upload.webp'}
                  alt=""
                />
              </div>
            </div>
          </Upload>
        ) : (
          <div className={styles.banner}>
            <Imgix
              width={944}
              height={150}
              layout="fixed"
              src={
                !baseData.image
                  ? 'https://mangafy.club/img/banner.webp'
                  : client.UPLOAD_URL + baseData.image
              }
              alt=""
            />
          </div>
        )}
        <div className="row">
          <div className={styles.edit_setings}>
            <div className={`${styles.bannerGenres} d-flex `}>
              <div className={styles.bannerGenresItem}>
                {baseData.genres?.slice(0, 1).map((g) => (
                  <Popover key={g} placement="top" title="Genres" content={genresContent}>
                    <Button id={`${g.name}-genresBtnId`} data-id="preferredLanguage" type="text">
                      <SvgCat width="18px" height="24px" />
                      <span>{g.name}</span>
                    </Button>
                  </Popover>
                ))}
              </div>

              <div className={styles.bannerGenresItem}>
                <Button id="preferredLanguageBtnId" data-id="preferredLanguage" type="text">
                  <SvgLang width="24px" height="24px" />
                  <span>{baseData.preferredLanguage}</span>
                </Button>
              </div>
              <div className={styles.bannerGenresItem}>
                <Popover placement="top" title="Searching For" content={searchingForContent}>
                  <Button id="searchingForBtnId" data-id="searchingFor" type="text">
                    <SvgTie width="20px" height="20px" />
                    <span>{baseData.searchingFor[0] || 'Searching For'}</span>
                  </Button>
                </Popover>
              </div>
              <div className={styles.bannerGenresItem}>
                <Button
                  id="compensationModelBtnId"
                  value="compensationModel"
                  data-id="compensationModel"
                  type="text">
                  <SvgMone width="20px" height="20px" />
                  {baseData.compensationModel === 'paid' ? 'Paid Collaboration' : 'Freewill'}
                </Button>
              </div>
            </div>
            {canEdit && (
              <div className={styles.edit}>
                <Popover
                  id="EditMangaStoryBtnId"
                  content={editContent}
                  trigger="click"
                  placement="bottomRight">
                  <span>Edit</span>
                  <span>
                    <SvgPencilColored width="22px" height="22px" />
                  </span>
                </Popover>
              </div>
            )}
          </div>
        </div>
        <div className={styles.progressWrapper}>
          <div className={styles.progress}>
            <p>Your graphic novel in progress</p>
            <div className={styles.Lamp}>
              <div>
                <Imgix
                  width={20}
                  height={29}
                  layout="fixed"
                  src={'https://mangafy.club/img/Group.webp'}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.progressWrap}>
              <Progress percent={baseData.progressPercentage} size="small" />
            </div>
            <div className={styles.Lamp}>
              <div>
                <Imgix
                  width={30}
                  height={30}
                  layout="fixed"
                  src={'https://mangafy.club/img/notebook1.webp'}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            <ShareButtons id="MangaStoryShareBtnId" text="Share collb!" shareUrl={originUrl} />
          </div>
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
