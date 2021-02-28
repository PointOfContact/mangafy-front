import React, { useState, useEffect } from 'react';
// Components
import ChooseLayoutCard from 'components/ui-elements/story-board-card';
// Api
import restClient from 'api/restClient';
import { findLayouts, patchStoryBoard } from 'api/storyBoardClient';
// Styles
import styles from './styles.module.scss';

export const ChooseLayout = ({storyBoard}) => {
  const [layouts, setLayouts] = useState([]);

  useEffect(()=> {
    findLayouts((res) => {
      const newItems = res?.data?.map((layout) => ({
        ...layout,
        selected: storyBoard?.layoutId === layout?._id,
      }));
      setLayouts(newItems);
    }, (err) => {});
  }, []);

  const changeSelectedBoard = (id) => {
    const storys = layouts;
    const newItems = storys.map((board) => ({
      ...board,
      selected: false,
    }));
    newItems[id].selected = true;
    patchStoryBoard(storyBoard._id, {layoutId: newItems[id]._id}, (res) => {
      setLayouts(newItems);
    }, (err) => {});
  };

  return (
    <div className={styles.story_board}>
      <h4 className={styles.title}>Choose layout</h4>
      <div className={styles.cards}>
        {layouts.map((board, index) => (
          <ChooseLayoutCard
            key={index}
            title={board.title}
            description={board.description}
            src={board.presentationUrl}
            isActive={board.selected}
            onClick={() => changeSelectedBoard(index)}
          />
        ))}
      </div>
    </div>
  );
};

// ShareButtons.propTypes = {
//   shareUrl: PropTypes.string.isRequired,
//   text: PropTypes.string,
// };
