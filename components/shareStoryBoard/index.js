import React from 'react';

import SvgFacebook from 'components/icon/Facebook';
import SvgInstagramColored from 'components/icon/InstagramColored';
import SvgShareFull from 'components/icon/ShareFull';
import SvgWhatsapp from 'components/icon/Whatsapp';
import PropTypes from 'prop-types';
import { FacebookShareButton, InstapaperShareButton, WhatsappShareButton } from 'react-share';

import styles from './styles.module.scss';

export const ShareStoryBoard = ({ shareUrl }) => (
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
    <h4 className={styles.title}>Self publishing platforms</h4>
    <div className={styles.logos}>
      <img src="/img/tapacs.svg" alt="" />
      <img className="webtoon" src="/img/webtoon.svg" alt="" />
      <img src="/img/comico.svg" alt="" />
    </div>
    <div className={styles.logos_mobile}>
      <button id="TapasId" type="button">
        Tapas
      </button>
      <button id="WebtoonId" type="button">
        Webtoon
      </button>
      <button id="ComicosId" type="button">
        Comicos
      </button>
    </div>
    <div className={styles.link}>
      <h4>Link</h4>
      <p>Features of a Webtoon-style comic</p>
    </div>
  </div>
);

ShareStoryBoard.propTypes = {
  shareUrl: PropTypes.string,
};

ShareStoryBoard.defaultProps = {
  shareUrl: '',
};
