import React, { useEffect, useState } from 'react';

import { Input } from 'antd';
import { patchStoryBoard } from 'api/storyBoardClient';
import PropTypes from 'prop-types';

// Antd design
// Styles
import styles from './styles.module.scss';

const { TextArea } = Input;

const Idea = ({ storyBoard }) => {
  const [idea, setIdea] = useState(storyBoard);

  useEffect(() => {
    setIdea({
      title: storyBoard?.idea?.title?.trim(),
      text: storyBoard?.idea?.text?.trim(),
    });
  }, [storyBoard]);

  const handleTitleChange = (e) => {
    setIdea({
      ...idea,
      title: e.target.value,
    });
  };

  const handleTextChange = (e) => {
    setIdea({
      ...idea,
      text: e.target.value,
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
};

Idea.defaultProps = {
  storyBoard: {},
};

export default Idea;
