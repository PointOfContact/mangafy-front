import React, { useState } from 'react';

import ChooseLayoutCard from 'components/ui-elements/story-board-card';

import styles from './styles.module.scss';

export const ChooseLayout = () => {
  const [layouts, setLayouts] = useState([
    {
      title: 'Title',
      description:
        'MangaFY can accept PDF Uploader files as big as 100MB, but no bigger.100MB should be enough space to handle even 220-page books that are rich with images.If your PDF is larger than 100MB, it probably has far more image information in each digital image than is necessary. ',
      src: 'https://i.pinimg.com/736x/b1/51/d7/b151d719cef4301bb687e1385c89e956.jpg',
      selected: false,
    },
    {
      title: 'Title',
      description:
        'MangaFY can accept PDF Uploader files as big as 100MB, but no bigger.100MB should be enough space to handle even 220-page books that are rich with images.If your PDF is larger than 100MB, it probably has far more image information in each digital image than is necessary. ',
      src: 'https://i.pinimg.com/736x/b1/51/d7/b151d719cef4301bb687e1385c89e956.jpg',
      selected: true,
    },
    {
      title: 'Title',
      description:
        'MangaFY can accept PDF Uploader files as big as 100MB, but no bigger.100MB should be enough space to handle even 220-page books that are rich with images.If your PDF is larger than 100MB, it probably has far more image information in each digital image than is necessary. ',
      src: 'https://i.pinimg.com/736x/b1/51/d7/b151d719cef4301bb687e1385c89e956.jpg',
      selected: false,
    },
    {
      title: 'Title',
      description:
        'MangaFY can accept PDF Uploader files as big as 100MB, but no bigger.100MB should be enough space to handle even 220-page books that are rich with images.If your PDF is larger than 100MB, it probably has far more image information in each digital image than is necessary. ',
      src: 'https://i.pinimg.com/736x/b1/51/d7/b151d719cef4301bb687e1385c89e956.jpg',
      selected: false,
    },
    {
      title: 'Title',
      description:
        'MangaFY can accept PDF Uploader files as big as 100MB, but no bigger.100MB should be enough space to handle even 220-page books that are rich with images.If your PDF is larger than 100MB, it probably has far more image information in each digital image than is necessary. ',
      src: 'https://i.pinimg.com/736x/b1/51/d7/b151d719cef4301bb687e1385c89e956.jpg',
      selected: false,
    },
  ]);

  const changeSelectedBoard = (id) => {
    const storys = layouts;
    const newItems = storys.map((board) => ({
      ...board,
      selected: false,
    }));
    newItems[id].selected = true;
    setLayouts(newItems);
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
            src={board.src}
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
