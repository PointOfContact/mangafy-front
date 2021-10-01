import React, { useState } from 'react';

import { Tooltip } from 'antd';
import cn from 'classnames';
import SvgCopy from 'components/icon/Copy';
import SvgFacebook from 'components/icon/Facebook';
import SvgShareFull from 'components/icon/ShareFull';
import SvgWhatsapp from 'components/icon/Whatsapp';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';

import styles from './styles.module.scss';

const Share = ({ shareUrl, storyBoard }) => {
  const [copyText, setCopyText] = useState('Copy to clipboard');
  return (
    <div className={storyBoard ? styles.socialSB : styles.social}>
      <input type="checkbox" id="click" className={styles.click} />
      <label htmlFor="click" className={cn(storyBoard && styles.shareBnSB, styles.share_btn)}>
        <span className={styles.share}>
          <SvgShareFull width="19px" height="19px" />
        </span>
        <a href="#">
          <span>
            <FacebookShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
              <SvgFacebook
                width={storyBoard ? '33px' : '24px'}
                height={storyBoard ? '33px' : '24px'}
              />
            </FacebookShareButton>
          </span>
        </a>
        <a href="#">
          <span>
            <WhatsappShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
              <SvgWhatsapp
                width={storyBoard ? '33px' : '24px'}
                height={storyBoard ? '33px' : '24px'}
              />
            </WhatsappShareButton>
          </span>
        </a>
        <a href="#">
          <Tooltip placement="topLeft" title={copyText}>
            <span
              className={storyBoard ? styles.copySB : styles.copy}
              onMouseOut={() => setCopyText('Copy to clipboard')}
              onClick={() => {
                setCopyText('Copied');
                copy(shareUrl);
              }}>
              <SvgCopy
                width={storyBoard ? '18px' : '13px'}
                height={storyBoard ? '18px' : '13px'}
                alt="mangaFy copy icon"
              />
            </span>
          </Tooltip>
        </a>
      </label>
    </div>
  );
};

Share.propTypes = {
  shareUrl: PropTypes.string,
  storyBoard: PropTypes.bool,
};

Share.defaultProps = {
  shareUrl: '',
  storyBoard: false,
};

export default Share;
