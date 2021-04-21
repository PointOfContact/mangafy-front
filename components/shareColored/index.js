import React from 'react';

import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  WhatsappShareButton,
} from 'react-share';

import SvgFacebook from 'components/icon/Facebook';
import SvgTwitter from 'components/icon/Twitter';
import SvgInstagramColored from 'components/icon/InstagramColored';
import SvgShareColored from 'components/icon/ShareColored';

import styles from './styles.module.scss';

export const ShareButtonsColored = ({ shareUrl, text }) => (
  <div className={styles.box}>
    <p className={styles.box__title}>{text}</p>
    <ul className={styles.box__list}>
      <li className={styles.box__list_item}>
        <FacebookShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl} className={styles.box__list_button}>
          <SvgFacebook width="34" height="33" />
        </FacebookShareButton>
      </li>
      <li className={styles.box__list_item}>
        <TwitterShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl} className={styles.box__list_button}>
          <SvgTwitter width="34" height="33" />
        </TwitterShareButton>
      </li>
      <li className={styles.box__list_item}>
        <InstapaperShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl} className={styles.box__list_button}>
          <SvgInstagramColored width="34" height="33" />
        </InstapaperShareButton>
      </li>
      <li className={styles.box__list_item}>
        <WhatsappShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl} className={styles.box__list_button}>
          <SvgShareColored width="34" height="33" />
        </WhatsappShareButton>
      </li>
    </ul>
  </div>
);

ShareButtonsColored.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
};

