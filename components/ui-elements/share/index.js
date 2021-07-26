import * as React from 'react';

import cn from 'classnames';
import SvgCopy from 'components/icon/Copy';
import SvgFacebook from 'components/icon/Facebook';
import SvgInstagramColored from 'components/icon/InstagramColored';
import SvgShareFull from 'components/icon/ShareFull';
import SvgWhatsapp from 'components/icon/Whatsapp';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import { FacebookShareButton, InstapaperShareButton, WhatsappShareButton } from 'react-share';

import styles from './styles.module.scss';

const Share = ({ shareUrl, storyBoard }) => (
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
          <InstapaperShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
            <SvgInstagramColored
              width={storyBoard ? '33px' : '24px'}
              height={storyBoard ? '33px' : '24px'}
            />
          </InstapaperShareButton>
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
        <span className={storyBoard ? styles.copySB : styles.copy} onClick={() => copy(shareUrl)}>
          <SvgCopy
            width={storyBoard ? '18px' : '13px'}
            height={storyBoard ? '18px' : '13px'}
            alt="mangaFy copy icon"
          />
        </span>
      </a>
    </label>
  </div>
);

Share.propTypes = {
  shareUrl: PropTypes.string,
  storyBoard: PropTypes.bool,
};

Share.defaultProps = {
  shareUrl: '',
  storyBoard: false,
};

export default Share;
