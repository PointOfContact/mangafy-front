import React, { useState } from 'react';

import { Tooltip } from 'antd';
import cn from 'classnames';
import SvgCopy from 'components/icon/Copy';
import SvgFacebook from 'components/icon/Facebook';
import SvgTelegram from 'components/icon/Telegram';
import SvgTwitter from 'components/icon/Twitter';
import SvgWhatsapp from 'components/icon/Whatsapp';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import styles from './styles.module.scss';
import Facebook from 'components/icon/new/Facebook';
import Twitter from 'components/icon/new/Twitter';
import Telegram from 'components/icon/new/Telegram';
import Whatsapp from 'components/icon/new/Whatsapp';

export const ShareButtons = ({ className, shareUrl, text, onClick, showTitle }) => {
  const [copyText, setCopyText] = useState('Copy to clipboard');
  return (
    <div className={cn(styles.shareButtons, className)}>
      <span className={styles.text}>{text}</span>
      <ul>
        <li onClick={onClick}>
          <FacebookShareButton title="Mangafy-Club" url={shareUrl}>
            <Facebook size={30} />
          </FacebookShareButton>
          {showTitle && <p className={styles.titleIcon}>Facebook</p>}
        </li>
        <li onClick={onClick}>
          <TwitterShareButton title="Mangafy-Club" url={shareUrl}>
            <Twitter size={30} />
          </TwitterShareButton>
          {showTitle && <p className={styles.titleIcon}>Twitter</p>}
        </li>
        <li onClick={onClick}>
          <TelegramShareButton title="Mangafy-Club" url={shareUrl}>
            <Telegram size={30} />
          </TelegramShareButton>
          {showTitle && <p className={styles.titleIcon}>Telegram</p>}
        </li>
        <li onClick={onClick}>
          <WhatsappShareButton title="Mangafy-Club" url={shareUrl}>
            <Whatsapp size={30} />
          </WhatsappShareButton>
          {showTitle && <p className={styles.titleIcon}>Whatsapp</p>}
        </li>
        <li onClick={onClick}>
          <Tooltip placement="topLeft" title={copyText}>
            <span
              className={styles.copy}
              onMouseOut={() => setCopyText('Copy to clipboard')}
              onClick={() => {
                setCopyText('Copied');
                copy(shareUrl);
              }}>
              <SvgCopy width="28px" height="28px" alt="mangaFy copy icon" />
            </span>
          </Tooltip>
          {showTitle && <p className={styles.titleIcon}>Copy</p>}
        </li>
      </ul>
    </div>
  );
};

ShareButtons.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
  showTitle: PropTypes.bool,
};

ShareButtons.defaultProps = {
  text: '',
  onClick: () => {},
  className: '',
  showTitle: false,
};
