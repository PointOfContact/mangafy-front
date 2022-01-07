/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import SvgCopy from 'components/icon/Copy';
import { ShareButtons } from 'components/share';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Publish = ({ baseData, storyBoard, chapters }) => {
  const viewUrlName = baseData?.viewUrlName;
  const [copyText, setCopyText] = useState('Copy to clipboard');
  const [ifExistPublishedChapter, setIfExistPublishedChapter] = useState(0);
  const ifCustomSubdomain = baseData?.typeUrlView === 'Custom subdomain';

  const link = ifCustomSubdomain
    ? `https://${!!viewUrlName ? viewUrlName : '?'}.mangafy.club`
    : `${client.API_ENDPOINT}/manga-view/${storyBoard?._id}`;

  const publishImage = () => {
    if (baseData?.image) {
      return `&image=${baseData?.image}`;
    }

    for (const element of chapters) {
      if (element.published) {
        if (element.chapterImg) {
          return `&image=${element.chapterImg}`;
        }
        for (const value of element.pages) {
          if (value.imageUrl) {
            return `&image=${value.imageUrl}`;
          }
        }
      }
    }

    return '';
  };

  useEffect(() => {
    setIfExistPublishedChapter(chapters?.filter((val) => val.published).length);
  }, [chapters]);

  return (
    <div className={styles.containerPublish}>
      {!ifExistPublishedChapter ? (
        <div className={styles.publishedMessage}>
          You should have at least one published chapter
        </div>
      ) : (
        ''
      )}
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
          <a href={`/manga-story/${baseData?._id}?tab=settings&active=domain`} target="_self">
            Customize link
          </a>
        </div>
      </div>
      <div className={styles.guide}>
        <Link
          href={`/feed?postType=Manga&pid=${storyBoard?._id}&title=${
            baseData?.title
          }${publishImage()}`}>
          <a className={!ifExistPublishedChapter && styles.postManga} target="_blank">
            <h4>MangaFY</h4>
            <p>Publish on MangaFY!</p>
          </a>
        </Link>
        <Link href="https://www.webtoons.com/">
          <a>
            <h4>Webtoon</h4>
            <p>Upload to webtoon</p>
          </a>
        </Link>
        <Link href="https://tapas.io/">
          <a>
            <h4>Tapas</h4>
            <p>Publish on Tapas</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

Publish.propTypes = {
  baseData: PropTypes.object.isRequired,
  storyBoard: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
};

export default Publish;
