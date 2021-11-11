import React, { useState } from 'react';

import { Upload, Spin } from 'antd';
import client from 'api/client';
import Imgix from 'components/imgix';
import { OPTIONS } from 'features/createStory/lenguage/constant';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';
import beforeUploadFromAMZ from 'utils/upload';

import styles from './styles.module.scss';

const languages = OPTIONS.map((item) => ({ key: item, value: item }));

const BannerSection = ({
  originUrl,
  baseData,
  canEdit,
  saveMangaStoryData,
  setBaseData,
  openNotification,
  genres: genresEnums,
  isOwn,
  user,
}) => {
  const [loading, setLoading] = useState(false);

  const shareProjectEvent = () => {
    const event = {
      event_type: EVENTS.SHARED_PROJECT,
      event_properties: { projectID: baseData._id },
      user_id: user?._id,
      user_properties: {
        ...user,
      },
    };
    myAmplitude(event);
  };

  const setImageMangaStor = async (image) => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');

    const options = {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    };

    const data = await api.service('/api/v2/manga-stories').patch(
      baseData._id,
      {
        image,
      },
      options
    );

    setBaseData(data);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'application/pdf';

    if (!isJpgOrPng) {
      openNotification('error', 'You can only upload JPG, JPEG, PDF or PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 50;
    if (!isLt2M) {
      openNotification('error', 'Image must be smaller than 50MB!');
    }

    if (isJpgOrPng && isLt2M) beforeUploadFromAMZ(file, setImageMangaStor, setLoading);
  };

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
      {canEdit ? (
        <Upload
          className={styles.uploadContainer}
          disabled={loading}
          beforeUpload={beforeUpload}
          fileList={[]}>
          <div className={!baseData.image ? styles.bannerDefault : styles.banner}>
            {loading ? (
              <Spin className={styles.spin} size="large" tip="Loading..."></Spin>
            ) : (
              <div className={!baseData.image ? styles.uploadDefault : styles.upload}>
                <Imgix
                  width={335}
                  height={83}
                  layout="fixed"
                  src={'https://mangafy.club/img/upload.webp'}
                  alt="MangaFy upload"
                />
              </div>
            )}

            <div className={!baseData.image ? styles.bannerPhotoDefault : styles.bannerPhoto}>
              <Imgix
                className={styles.bannerCover}
                width={309}
                height={170}
                layout="fixed"
                src={
                  !baseData.image
                    ? 'https://mangafy.club/img/collab_baner.webp'
                    : client.UPLOAD_URL + baseData.image
                }
                alt="MangaFy collab banner"
              />
            </div>
          </div>
        </Upload>
      ) : (
        <div className={!baseData.image ? styles.bannerDefault : styles.banner}>
          {baseData.image ? (
            <div className={styles.bannerPhoto}>
              <Imgix
                className={styles.bannerCover}
                layout="fill"
                src={client.UPLOAD_URL + baseData.image}
                alt="MangaFy collab banner"
              />
            </div>
          ) : (
            <div className={styles.bannerPhotoDefault}>
              <Imgix
                className={styles.bannerCover}
                width={309}
                height={170}
                layout="fixed"
                src={'https://mangafy.club/img/collab_baner.webp'}
                alt="MangaFy collab banner"
              />
            </div>
          )}
        </div>
      )}
      {/* <div className={cn(styles.bannerWrapContent, 'row')}>
        <div className="row">
          <div className={styles.edit_settings}>
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
            <div className={styles.progress}>
              <div>
                {isOwn ? <p>Your graphic novel in progress</p> : <p>Graphic novel in progress</p>}
                <div className={styles.lamp}>
                  <div>
                    <Imgix
                      width={20}
                      height={29}
                      layout="fixed"
                      src={'https://mangafy.club/img/Group.webp'}
                      alt="MangaFy Group"
                    />
                  </div>
                </div>
                <div className={styles.progressWrap}>
                  <Progress
                    strokeColor={'#7B65F3'}
                    percent={baseData.progressPercentage}
                    size="small"
                  />
                </div>
                <div className={styles.lamp}>
                  <div>
                    <Imgix
                      width={30}
                      height={30}
                      layout="fixed"
                      src={'https://mangafy.club/img/notebook1.webp'}
                      alt="MangaFy notebook"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.socialContainer}>
                <div className={styles.shareTitle}>
                  <p>Love what I’m is doing?</p>
                  <p>Share with your friends 🎉</p>
                </div>
                <ShareButtons shareUrl={originUrl} onClick={shareProjectEvent} />
              </div>
              {canEdit && (
                <div className={styles.edit}>
                  <Popover
                    id="EditMangaStoryBtnId"
                    content={
                      <EditContent
                        saveMangaStoryData={saveMangaStoryData}
                        baseData={baseData}
                        languages={languages}
                        genresEnums={genresEnums}
                      />
                    }
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
        </div>
      </div> */}
    </div>
  );
};

BannerSection.propTypes = {
  originUrl: PropTypes.string.isRequired,
  baseData: PropTypes.object.isRequired,
  canEdit: PropTypes.bool.isRequired,
  genres: PropTypes.array.isRequired,
  saveMangaStoryData: PropTypes.func.isRequired,
  setBaseData: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

BannerSection.defaultProps = {
  user: {},
};

export default BannerSection;
