import React, { useEffect, useState } from 'react';

import { Input } from 'antd';
import { patchStoryBoard } from 'api/storyBoardClient';
import PropTypes from 'prop-types';

// Antd design
// Styles
import styles from './styles.module.scss';

const { TextArea } = Input;

const Idea = ({ storyBoard, setStoryBoard }) => {
  const [idea, setIdea] = useState(storyBoard);

  useEffect(() => {
    setIdea({
      title: storyBoard?.idea?.title,
      text: storyBoard?.idea?.text,
    });
  }, [storyBoard]);

  const handleTitleChange = (e) => {
    setStoryBoard({
      ...storyBoard,
      idea: {
        ...idea,
        title: e.target.value,
      },
    });
  };

  const handleTextChange = (e) => {
    setStoryBoard({
      ...storyBoard,
      idea: {
        ...idea,
        text: e.target.value,
      },
    });
  };

  const onBlure = () => {
    if (!idea?.title) {
      return;
    }
    const newIdea = {
      title: idea?.title,
      text: idea?.text,
    };
    patchStoryBoard(
      storyBoard?._id,
      { idea: newIdea },
      () => {},
      (err) => {}
    );
  };

  return (
    <div className={styles.idea__container}>
      <Input
        placeholder="Name your graphic novel"
        className={styles.idea__title__input}
        value={idea.title}
        onChange={handleTitleChange}
        onBlur={onBlure}
        maxLength={100}
      />
      <TextArea
        autoSize={{ minRows: 3, maxRows: 10 }}
        placeholder="It's time to start typing your plot"
        value={idea.text}
        onChange={handleTextChange}
        onBlur={onBlure}
        required
        type="text"
        maxLength={1000}
        className={styles.idea__textarea}
      />
    </div>
  );
};

Idea.propTypes = {
  storyBoard: PropTypes.object,
  setStoryBoard: PropTypes.func,
};

Idea.defaultProps = {
  storyBoard: {},
  setStoryBoard: () => {},
};

export default Idea;
