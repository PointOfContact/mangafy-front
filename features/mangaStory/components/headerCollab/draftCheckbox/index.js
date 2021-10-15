import React from 'react';

import { ShareButtons } from 'components/share';
import CopyInput from 'components/ui-elements/copyInput';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DraftCheckbox = ({ originUrl }) => (
  <div className={styles.publishedModal}>
    <img width={113} height={113} src={'/img/ballons.webp'} alt={'mangafy ballons'} />
    <h2 className={styles.modalTitle}>Your project is live!</h2>
    <h3>Share it whenever your followers are. Posts are the best way to make new supporters.</h3>
    <h4>Tell your followers everywhere 🎉</h4>
    <div className={styles.shareButtons}>
      <ShareButtons shareUrl={originUrl} text="Share to the world!" />
    </div>
    <CopyInput white={true} copyUrl={originUrl} copyLink={() => copy(originUrl)} />
  </div>
);

DraftCheckbox.propTypes = {
  originUrl: PropTypes.string.isRequired,
};

export default DraftCheckbox;
