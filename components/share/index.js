import React from 'react';

import SvgFacebook from 'components/icon/Facebook';
import SvgTwitter from 'components/icon/Twitter';
import SvgWhatsapp from 'components/icon/Whatsapp';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import styles from './styles.module.scss';

export const ShareButtons = ({ shareUrl, text }) => (
  <div className={styles.shareButtons}>
    <span className={styles.text}>{text}</span>
    <ul>
      <li>
        <FacebookShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
          <SvgFacebook width="32px" height="32px" />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
          <SvgTwitter width="32px" height="32px" />
        </TwitterShareButton>
      </li>
      <li>
        <TelegramShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
      </li>
      <li>
        <WhatsappShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
          <SvgWhatsapp width="32px" height="32px" />
        </WhatsappShareButton>
      </li>
    </ul>
  </div>
);

ShareButtons.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
};
