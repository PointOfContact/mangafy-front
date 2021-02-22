import React, { useEffect, useState } from 'react';

import { Tabs, Popover, Input, Button, Progress } from 'antd';
import client from 'api/client';
import styles from '../styles.module.scss';
import SvgCat from 'components/icon/Cat';
import SvgLang from 'components/icon/Lang';
import SvgTie from 'components/icon/Tie';
import { ShareButtons } from 'components/share';
import SvgMone from 'components/icon/Mone';
import { userTypesEnums } from 'helpers/constant';
import PropTypes from 'prop-types';

const BannerSection = ({originUrl, mangaStory, editMode, onChangePopup, baseData, canEdit}) => {
    
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
    return <div className={styles.bannerWrap}>
    <div className="row">
      <div className={styles.banner}>
        <img src="/img/banner.png" />
        <div>
          <img src="/img/upload.png" />
        </div>
      </div>
      <div className="row">
        <div className={`${styles.bannerGenres} d-flex `}>
          <div className={styles.bannerGenresItem}>
            {mangaStory.genres.slice(0, 1).map((g) => (
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
              <span>{mangaStory.preferredLanguage}</span>
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
              type={editMode & canEdit ? 'dashed' : 'text'}
              onClick={onChangePopup}>
              <SvgMone width="20px" height="20px" />
              <span>
                {mangaStory.compensationModel == 'paid'
                  ? 'Paid Collaboration'
                  : 'Freewill'}
              </span>
            </Button>
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
}

BannerSection.prototype = {
    mangaStory:PropTypes.object.isRequired,
    baseData:PropTypes.object.isRequired,
    editMode:PropTypes.bool.isRequired,
    canEdit:PropTypes.bool.isRequired,
    onChangePopup:PropTypes.func.isRequired,
    onChangePopup:PropTypes.string.isRequired,
}

export default BannerSection