import React, { useEffect, useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import ShowImgModal from 'components/modals/showImg';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import SettingsPage from './settingsPage';
import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const Pages = ({
  pages,
  setVisibleModal,
  setModalTitle,
  setPageItem,
  setChapterItem,
  chapterItem,
  chapterIndex,
  setChapters,
  chapters,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [arrayPage, setArrayPage] = useState(pages);
  const ifTypePdf = currentImg?.slice(-3) === 'pdf' || currentImg?.slice(-3) === 'PDF';

  useEffect(() => {
    setArrayPage(pages);
  }, [pages]);

  const pagesArray = arrayPage?.map((value, index) => {
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
                }}>
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
                />
              </div>
              {!!value?.imageUrl && (
                <div
                  className={styles.pageImage}
                  onClick={() =>
                    !!value?.imageUrl && (setIsModalVisible(true), setCurrentImg(image))
                  }>
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

  const patchPage = (pageItem, data) => {
    mangaStoryAPI.pages.patchPage(
      chapterIndex,
      pageItem,
      chapters,
      setChapters,
      setVisibleModal,
      data
    );
  };

  const handleOnDragEnd = (result) => {
    const ifNoChangePosition = result?.source?.index === result?.destination?.index;
    if (!result.destination || ifNoChangePosition) {
      return;
    }
    const target = arrayPage[result.destination.index];
    const item = arrayPage[result.source.index];

    // replace page order
    const targetOrder = target.order;
    target.order = item.order;
    item.order = targetOrder;

    // replace pages positions
    const [reorderedItem] = arrayPage.splice(result.source.index, 1);
    arrayPage.splice(result.destination.index, 0, reorderedItem);

    // save changes
    patchPage({ value: item, index: result.destination.index }, { order: item.order });
    patchPage({ value: target, index: result.source.index }, { order: target.order });

    setArrayPage([...arrayPage]);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="page" direction="horizontal">
          {(provided) => (
            <ul
              className={styles.containerPage}
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {pagesArray}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <ShowImgModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        img={currentImg}
        imageType={ifTypePdf}
      />
    </>
  );
};

Pages.propTypes = {
  pages: PropTypes.array,
  setVisibleModal: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,
  setPageItem: PropTypes.func.isRequired,
  setChapterItem: PropTypes.func,
  chapterItem: PropTypes.object,
  setChapters: PropTypes.func,
  chapterIndex: PropTypes.number,
  chapters: PropTypes.array,
};

Pages.defaultProps = {
  pages: [],
  setChapterItem: () => {},
  chapterItem: {},
  setChapters: () => {},
  chapterIndex: 0,
  chapters: [],
};

export default Pages;
