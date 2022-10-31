import React from 'react';

import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import SettingsPage from '../settingsPage';
import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const PageItems = ({
  arrayPage,
  setModalTitle,
  setVisibleModal,
  setPageItem,
  setChapterItem,
  chapterItem,
  chapterIndex,
  setChapters,
  chapters,
  setCurrentImg,
  setIsModalVisible,
  mangaId,
}) =>
  arrayPage?.map((value, index) => {
    const ifPdf = value?.imageUrl?.slice(-3) === 'pdf' || arrayPage?.imageUrl?.slice(-3) === 'PDF';
    const image = client.UPLOAD_URL + value?.imageUrl;

    return (
      <Draggable key={value._id + index} draggableId={value._id + index} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <h4 className={styles.pageIndex}>Page {index + 1}</h4>
            <div className={styles.itemPage}>
              <div
                className={cn(styles.content, !value?.imageUrl && styles.contentDef)}
                onClick={() => {
                  setVisibleModal(true);
                  setModalTitle('Edit page');
                  setPageItem({ value, index });
                  setChapterItem({ value: chapterItem, index: chapterIndex });
                }}
              >
                <h2>{value.title}</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: value.text }}
                  className={cn(styles.description, styles.descriptionDef)}
                />
                <SettingsPage
                  page={{ value, index }}
                  setVisibleModal={setVisibleModal}
                  setModalTitle={setModalTitle}
                  setPageItem={() => setPageItem(value)}
                  chapterItem={{ value: chapterItem, index: chapterIndex }}
                  setChapters={setChapters}
                  chapters={chapters}
                  mangaId={mangaId}
                />
              </div>
              {!!value?.imageUrl && (
                <div
                  className={styles.pageImage}
                  onClick={() =>
                    !!value?.imageUrl && (setIsModalVisible(true), setCurrentImg(image))
                  }
                >
                  {ifPdf ? (
                    <PDFViewer url={image} />
                  ) : (
                    <Imgix
                      className={styles.image}
                      layout="fill"
                      src={image}
                      alt={'MangaFy page image'}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  });

PageItems.propTypes = {
  arrayPage: PropTypes.array.isRequired,
  setModalTitle: PropTypes.func.isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  setPageItem: PropTypes.func.isRequired,
  setChapterItem: PropTypes.func.isRequired,
  chapterItem: PropTypes.object.isRequired,
  chapterIndex: PropTypes.number.isRequired,
  setChapters: PropTypes.func.isRequired,
  chapters: PropTypes.array.isRequired,
  setCurrentImg: PropTypes.func.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  mangaId: PropTypes.string.isRequired,
};

export default PageItems;
