/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';

import ShowImgModal from 'components/modals/showImg';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import PageItems from './pageItems';
import styles from './styles.module.scss';

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

  const middleNumber = (destination, source) => {
    const index = +destination;
    const destinationOrder = arrayPage[index]?.order;

    let nextOrPrevItem;

    if (destinationOrder > source) {
      nextOrPrevItem = arrayPage[index + 1]?.order || arrayPage[arrayPage.length - 1].order + 1;
      return destinationOrder + (nextOrPrevItem - destinationOrder) / 2;
    }
    nextOrPrevItem = arrayPage[index - 1]?.order || arrayPage[0].order - 1;
    return destinationOrder - (destinationOrder - nextOrPrevItem) / 2;
  };

  const handleOnDragEnd = (result) => {
    const ifNoChangePosition = result?.source?.index === result?.destination?.index;
    if (!result.destination || ifNoChangePosition) {
      return;
    }
    result?.source?.index;
    const source = arrayPage[result?.source?.index];

    // replace page order
    source.order = middleNumber(result?.destination?.index, source?.order);

    // save page order
    patchPage({ value: source, index: result?.source?.index }, { order: source.order });

    // replace pages positions
    const [reorderedItem] = arrayPage.splice(result.source.index, 1);
    arrayPage.splice(result.destination.index, 0, reorderedItem);
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
              <PageItems
                arrayPage={arrayPage}
                setModalTitle={setModalTitle}
                setVisibleModal={setVisibleModal}
                setPageItem={setPageItem}
                setChapterItem={setChapterItem}
                chapterItem={chapterItem}
                chapterIndex={chapterIndex}
                setChapters={setChapters}
                chapters={chapters}
                setCurrentImg={setCurrentImg}
                setIsModalVisible={setIsModalVisible}
              />
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
