import React from 'react';

import PropTypes from 'prop-types';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import styles from './styles.module.scss';

export const ShareButtons = ({ shareUrl, text }) => (
  <div className={styles.shareButtons}>
    <span className={styles.text}>{text}</span>
    <ul>
      <li>
        <FacebookShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </li>
      <li>
        <TelegramShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
      </li>
      <li>
        <WhatsappShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </li>
    </ul>
  </div>
);

ShareButtons.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
};

