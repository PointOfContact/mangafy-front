import * as React from 'react';

import SvgFacebook from 'components/icon/Facebook';
import SvgInstagramColored from 'components/icon/InstagramColored';
import SvgShareFull from 'components/icon/ShareFull';
import SvgWhatsapp from 'components/icon/Whatsapp';
import PropTypes from 'prop-types';
import { FacebookShareButton, InstapaperShareButton, WhatsappShareButton } from 'react-share';

import styles from './styles.module.scss';

const Share = ({ shareUrl }) => (
  <div className={styles.social}>
    <input type="checkbox" id="clickk" className={styles.click} />
    <label htmlFor="clickk" className={styles.share_btn}>
      <span className={styles.share}>
        <SvgShareFull width="19px" height="19px" />
      </span>
      <a href="#">
        <span>
          <FacebookShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
            <SvgFacebook width="21px" height="21px" />
          </FacebookShareButton>
        </span>
      </a>
      <a href="#">
        <span>
          <InstapaperShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
            <SvgInstagramColored width="21px" height="21px" />
          </InstapaperShareButton>
        </span>
      </a>
      <a href="#">
        <span>
          <WhatsappShareButton quote={'Mangafy-Club'} title="Mangafy-Club" url={shareUrl}>
            <SvgWhatsapp width="21px" height="21px" />
          </WhatsappShareButton>
        </span>
      </a>
    </label>
  </div>
);

Share.propTypes = {
  shareUrl: PropTypes.string,
};

Share.defaultProps = {
  shareUrl: '',
};

export default Share;
