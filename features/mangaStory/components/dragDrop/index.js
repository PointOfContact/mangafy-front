import React, { useEffect, useState } from 'react';

import { Popconfirm } from 'antd';
import client from 'api/client';
import { patchStoryBoard } from 'api/storyBoardClient';
import SvgDelete from 'components/icon/Delete';
import Imgix from 'components/imgix';
import PDFViewer from 'components/pdfViewer';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './styles.module.scss';

const DragDrop = ({
  uploadImages,
  storyBoard,
  setStoryBoard,
  openNotification,
  setZoomImageUrl,
  setIsModalVisible,
  ifUploadImg,
  isModalVisible,
}) => {
  const [characters, updateCharacters] = useState(uploadImages);

  useEffect(() => {
    updateCharacters(uploadImages);
  }, [uploadImages]);

  const ifPdf = (index) =>
    storyBoard?.mangaUrls[index]?.slice(-3) === 'pdf' ||
    storyBoard?.mangaUrls[index]?.slice(-3) === 'PDF';

  const confirmDelete = (index) => {
    storyBoard.mangaUrls.splice(index, 1);
    patchStoryBoard(
      storyBoard?._id,
      {
        mangaUrls: [...storyBoard.mangaUrls],
      },
      (response) => {
        setStoryBoard(response);
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
  };

  const setImage = (index, value) => (
    <Imgix
      width={209}
      height={294}
      className={styles.photo}
      src={value.url}
      alt="Manga story cover"
    />
  );

  const getItem = characters.map((value, index) => (
    <Draggable key={value.status + index} draggableId={value.status + index} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.uploadList}>
          <div className={styles.uploadListTitle}>Page {index + 1}</div>
          <div
            className={styles.uploadPhoto}
            onClick={() => {
              if (ifPdf(index)) {
                setZoomImageUrl(
                  <PDFViewer url={client.UPLOAD_URL + storyBoard?.mangaUrls[index]} />
                );
                setIsModalVisible(!isModalVisible);
              } else {
                setZoomImageUrl(value.url);
                setIsModalVisible(!isModalVisible);
              }
            }}>
            {setImage(index, value)}
          </div>
          <Popconfirm
            overlayClassName={styles.popConfirm}
            placement="topLeft"
            disabled={ifUploadImg}
            title={'Are you sure to delete this page?'}
            onConfirm={() => {
              confirmDelete(index);
            }}
            okText="Yes"
            cancelText="No">
            <span className={styles.deleteCard}>
              <SvgDelete width="12px" height="12px" />
            </span>
          </Popconfirm>
        </div>
      )}
    </Draggable>
  ));

  const handleOnDragEnd = (result) => {
    const ifNoChangePosition = result?.source?.index === result?.destination?.index;
    if (!result.destination || ifNoChangePosition) {
      return;
    }

    const items = Array.from(characters);
    // prev index item result.source.index
    const [reorderedItem] = items.splice(result.source.index, 1);
    // next index item result.source.index
    items.splice(result.destination.index, 0, reorderedItem);

    const data = items?.map((i) => i.uid);
    patchStoryBoard(
      storyBoard?._id,
      {
        mangaUrls: data,
      },
      (res) => {
        setStoryBoard(res);
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
    updateCharacters(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters" direction="horizontal">
        {(provided) => (
          <ul className={styles.containerItem} {...provided.droppableProps} ref={provided.innerRef}>
            {getItem}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DragDrop.propTypes = {
  uploadImages: PropTypes.array.isRequired,
  storyBoard: PropTypes.object.isRequired,
  setStoryBoard: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  setZoomImageUrl: PropTypes.func.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  ifUploadImg: PropTypes.bool.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};

export default DragDrop;