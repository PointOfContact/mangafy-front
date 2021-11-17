import React, { useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import SvgCopy from 'components/icon/Copy';
import { ShareButtons } from 'components/share';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Publish = ({ baseData }) => {
  const viewUrlName = baseData?.viewUrlName;
  const [copyText, setCopyText] = useState('Copy to clipboard');
  const ifCustomSubdomain = baseData?.typeUrlView === 'Custom subdomain';

  const link = ifCustomSubdomain
    ? `https://${!!viewUrlName ? viewUrlName : '?'}.mangafy.club`
    : `${client.API_ENDPOINT}/manga-view/${baseData?._id}`;

  return (
    <div className={styles.containerPublish}>
      <div className={styles.linksContainer}>
        <h3 className={styles.getLink}>Get the link or share on social</h3>
        <div className={styles.copyView}>
          <div className={styles.viewUrl}>{link}</div>
          <Tooltip placement="topLeft" title={copyText}>
            <div
              className={styles.copy}
              onClick={() => {
                setCopyText('Copied');
                copy(link);
              }}
              onMouseOut={() => setCopyText('Copy to clipboard')}>
              <SvgCopy width="18px" height="18px" alt="mangaFy copy icon" />
            </div>
          </Tooltip>
        </div>
        <div className={styles.shareContainer}>
          <ShareButtons className={styles.share} shareUrl={link} showTitle={true} />
          <Link href={`/manga-story/60a3daa40f853d4773a06021?tab=settings&active=domain`}>
            <a>Customize link</a>
          </Link>
        </div>
      </div>
      <div className={styles.guide}>
        <Link href="https://www.webtoons.com/">
          <a>
            <h4>Webtoon</h4>
            <p>
              Upload your work for <br /> monetization
            </p>
          </a>
        </Link>
        <Link href="https://tapas.io/">
          <a>
            <h4>Tapas</h4>
            <p>
              Upload your work for <br /> monetization
            </p>
          </a>
        </Link>
        <Link href="https://mangacat.io/">
          <a>
            <h4>Manga Cat</h4>
            <p>
              Upload your work for <br /> monetization
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
};

Publish.propTypes = {
  baseData: PropTypes.object.isRequired,
};

export default Publish;
