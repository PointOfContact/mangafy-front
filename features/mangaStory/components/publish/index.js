/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import SvgCopy from 'components/icon/Copy';
import { ShareButtons } from 'components/share';
import copy from 'copy-to-clipboard';
import { EVENTS } from 'helpers/amplitudeEvents';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const Publish = ({ baseData, storyBoard, chapters }) => {
  const viewUrlName = baseData?.viewUrlName;
  const [copyText, setCopyText] = useState('Copy to clipboard');
  const [ifExistPublishedChapter, setIfExistPublishedChapter] = useState(0);
  const ifCustomSubdomain = baseData?.typeUrlView === 'Custom subdomain';

  const link = `${client.API_ENDPOINT}/project/production/${baseData._id}`;

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

  const clickProtectSell = () => {
    const eventData = [
      {
        event_type: EVENTS.PROTECT_AND_SELL,
        event_properties: { mangaStoryId: baseData._id },
      },
    ];
    myAmplitude(eventData);
  };

  const clickPrintSell = () => {
    const eventData = [
      {
        event_type: EVENTS.PRINT_AND_SELL,
        event_properties: { mangaStoryId: baseData._id },
      },
    ];
    myAmplitude(eventData);
  };

  const clickMerchSell = () => {
    const eventData = [
      {
        event_type: EVENTS.MERCH_MAKER,
        event_properties: { mangaStoryId: baseData._id },
      },
    ];
    myAmplitude(eventData);
  };

  const clickShortComics = () => {
    const eventData = [
      {
        event_type: EVENTS.SHORT_COMICS,
        event_properties: { mangaStoryId: baseData._id },
      },
    ];
    myAmplitude(eventData);
  };

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
          <a href={`/project/production/${baseData?._id}?tab=settings`} target="_self">
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
            <h4>Post on MangaFY</h4>
            <p>The MangaFY feed will show your chapter &gt;&gt;</p>
          </a>
        </Link>
        <Link
          href="https://form.typeform.com/to/UX99IGQe?typeform-source=trello.com"
          onClick={clickProtectSell}>
          <a target="_blank">
            <h4>Protect and Sell</h4>
            <p>Protect and sell your unique webcomics assets &gt;&gt;</p>
          </a>
        </Link>
        <Link href="https://form.typeform.com/to/DsN42GSD?typeform-source=trello.com">
          <a target="_blank" onClick={clickPrintSell}>
            <h4>Print and Sell</h4>
            <p>Print and sell high quality printed &gt;&gt;</p>
          </a>
        </Link>
        <Link href="https://form.typeform.com/to/g0fkj5fs?typeform-source=trello.com">
          <a target="_blank" onClick={clickMerchSell}>
            <h4>Merch Maker</h4>
            <p>Create branded merch for your fans with merch maker &gt;&gt;</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

Publish.propTypes = {
  baseData: PropTypes.object.isRequired,
  storyBoard: PropTypes.object.isRequired,
  chapters: PropTypes.array,
};

Publish.defaultProps = {
  chapters: [],
};

export default Publish;
