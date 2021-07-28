import React from 'react';

import SvgCopy from 'components/icon/Copy';
import SvgFacebook from 'components/icon/Facebook';
import SvgTwitter from 'components/icon/Twitter';
import SvgWhatsapp from 'components/icon/Whatsapp';
import copy from 'copy-to-clipboard';
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
      <li>
        <span className={styles.copy} onClick={() => copy(shareUrl)}>
          <SvgCopy width="18px" height="18px" alt="mangaFy copy icon" />
        </span>
      </li>
    </ul>
  </div>
);

ShareButtons.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
};

ShareButtons.defaultProps = {
  text: '',
};
