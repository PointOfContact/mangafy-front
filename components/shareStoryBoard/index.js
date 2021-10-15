import React from 'react';

import Share from 'components/ui-elements/share';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

export const ShareStoryBoard = ({ shareUrl, user }) => {
  const setAmplitude = () => {
    const data = [
      {
        event_type: EVENTS.PUBLISH_MANGA_CAT,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    myAmplitude(data);
  };

  return (
    <div className={styles.shareStoryBoard}>
      <Share shareUrl={shareUrl} storyBoard={true} />
      <h4 className={styles.title}>Self publishing platform</h4>
      <div className={styles.logos}>
        <div>
          <a
            onClick={setAmplitude}
            href="https://mangacat.io?utm_source=mangafy.club"
            target="_blank"
            rel="noreferrer">
            <img src="/img/MangaCatButton.png" alt="MangaFy cat button" />
          </a>
          <p>
            <span>Terms : </span>
            <a href="https://mangacat.io/terms" target="_blank" rel="noreferrer">
              https://mangacat.io/terms
            </a>
          </p>
        </div>
        {/* Button link: https://mangacat.io
         Terms: https://mangacat.io/terms */}
        {/* 
      <a href="https://tapas.io/" target="_blank" rel="noreferrer">
        <img src="/img/tapacs.svg" alt="MangaFy tapacs" />
      </a>
      <a href="https://www.webtoons.com" target="_blank" rel="noreferrer">
        <img className="webtoon" src="/img/webtoon.svg" alt="MangaFy webtoon" />
      </a>
      <a href="https://www.comico.jp/" target="_blank" rel="noreferrer">
        <img src="/img/comico.svg" alt="MangaFy comico" />
      </a> */}
      </div>
      <div className={styles.logos_mobile}>
        <div>
          <a
            onClick={setAmplitude}
            href="https://mangacat.io?utm_source=mangafy.club"
            target="_blank"
            rel="noreferrer">
            <img src="/img/MangaCatButton.png" alt="MangaFy cat button" />
          </a>
          <p>
            <span>Terms : </span>
            <a href="https://mangacat.io/terms" target="_blank" rel="noreferrer">
              https://mangacat.io/terms
            </a>
          </p>
        </div>
      </div>
      {/* 
      <a href="https://tapas.io/" target="_blank" rel="noreferrer">
        <button id="TapasId" type="button">
          Tapas
        </button>
      </a>
      <a href="https://www.webtoons.com" target="_blank" rel="noreferrer">
        <button id="WebtoonId" type="button">
          Webtoon
        </button>
      </a>
      <a href="https://www.comico.jp/" target="_blank" rel="noreferrer">
        <button id="ComicosId" type="button">
          Comicos
        </button>
      </a>
     */}
    </div>
  );
};

ShareStoryBoard.propTypes = {
  shareUrl: PropTypes.string,
  user: PropTypes.object.isRequired,
};

ShareStoryBoard.defaultProps = {
  shareUrl: '',
};
