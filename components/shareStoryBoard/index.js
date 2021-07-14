import React from 'react';

import SvgFacebook from 'components/icon/Facebook';
import SvgInstagramColored from 'components/icon/InstagramColored';
import SvgShareFull from 'components/icon/ShareFull';
import SvgWhatsapp from 'components/icon/Whatsapp';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import { FacebookShareButton, InstapaperShareButton, WhatsappShareButton } from 'react-share';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

export const ShareStoryBoard = ({ shareUrl, user }) => {
  const setAmplitude = () => {
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.PUBLISH_MANGA_CAT,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
  };

  return (
    <div className={styles.shareStoryBoard}>
      <div className={styles.social}>
        <input type="checkbox" id="click" className={styles.click} />
        <label htmlFor="click" className={styles.share_btn}>
          <span className={styles.share}>
            <SvgShareFull width="37px" height="37px" />
          </span>
          <a href="#">
            <span>
              <FacebookShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
                <SvgFacebook width="33px" height="33px" />
              </FacebookShareButton>
            </span>
          </a>
          <a href="#">
            <span>
              <InstapaperShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
                <SvgInstagramColored width="33px" height="33px" />
              </InstapaperShareButton>
            </span>
          </a>
          <a href="#">
            <span>
              <WhatsappShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
                <SvgWhatsapp width="33px" height="33px" />
              </WhatsappShareButton>
            </span>
          </a>
        </label>
      </div>
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
