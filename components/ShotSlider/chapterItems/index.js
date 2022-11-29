import client from 'api/client';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import Imgix from 'components/imgix';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import styles from '../styles.module.scss';
import { Avatar } from 'antd';
import cn from 'classnames';
import Link from 'next/link';
import { buildShotURL } from 'helpers/shared';
import Lock from 'components/icon/new/Lock';
import PropTypes from 'prop-types';

const ChapterItems = ({ manga, activeChapterIndex, user, publishedChapters, activeChapterRef }) => {
  return publishedChapters.map((ch, i) => {
    const ifPayed = user?.chargebee?.data?.some((val) => val.itemId === ch._id);
    return !!ch?.planId && !ifPayed ? (
      <a
        ref={i + 1 === activeChapterIndex ? activeChapterRef : null}
        className={cn(
          styles.slider__item,
          i + 1 === activeChapterIndex && styles.slider__item_active,
          styles.ifBsMoney
        )}>
        <div className={styles.imageContainer}>
          <Imgix width={96} height={96} objectFit="cover" src={client.UPLOAD_URL + ch?.cover} />
          <Lock className={styles.blur__lock} />
        </div>
        <div className={styles.slider__itemTitle}>Chapter {ch.order}</div>
      </a>
    ) : (
      <Link key={i} href={'/project/view/' + manga?.storyBoardId + '?ongoing=' + (i + 1)}>
        <a
          ref={i + 1 === activeChapterIndex ? activeChapterRef : null}
          className={cn(
            styles.slider__item,
            i + 1 === activeChapterIndex && styles.slider__item_active
          )}>
          <Imgix width={96} height={96} objectFit="cover" src={client.UPLOAD_URL + ch?.cover} />
          <div className={styles.slider__itemTitle}>Chapter {ch.order}</div>
        </a>
      </Link>
    );
  });
};

ChapterItems.propTypes = {
  manga: PropTypes.object.isRequired,
  activeChapterIndex: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  publishedChapters: PropTypes.array.isRequired,
};

export default ChapterItems;
