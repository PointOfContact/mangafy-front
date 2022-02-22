import React from 'react';

import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import { EVENTS } from 'helpers/amplitudeEvents';
import dynamic from 'next/dynamic';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const createChapterItems = (
  chapters,
  chapter,
  setChapterItems,
  currentChapter,
  setCurrentChapter
) => {
  const items = chapters?.map((value, index) => {
    const type = value.cover.slice(-3);
    const ifPdf = type === 'pdf' || type === '{DF';
    const activeChapter = index + 1 === currentChapter;
    return (
      <div
        key={value._id + index}
        className={cn(styles.itemChapters, activeChapter && styles.activeChapter)}
        onClick={() => {
          const dataEvent = [
            {
              event_type: EVENTS.CHOOSE_VIEW_CHAPTER,
              event_properties: { chapter },
            },
          ];
          myAmplitude(dataEvent);
          setCurrentChapter(index + 1);
        }}>
        {ifPdf ? (
          <PDFViewer url={client.UPLOAD_URL + value.cover} />
        ) : (
          <Imgix
            width={100}
            height={100}
            src={client.UPLOAD_URL + value.cover}
            alt="MangaFy chapter image"
          />
        )}
        <p>CH {index + 1}</p>
        <div className={styles.opacity} />
      </div>
    );
  });
  setChapterItems(items);
};

export default createChapterItems;
