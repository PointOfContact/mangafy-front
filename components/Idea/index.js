import React, { useEffect, useState } from 'react';

import { Input } from 'antd';
import { patchStoryBoard } from 'api/storyBoardClient';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const { TextArea } = Input;

const Idea = ({ storyBoard, setStoryBoard, user }) => {
  const [idea, setIdea] = useState({
    title: storyBoard?.idea?.title.trimStart(),
    text: storyBoard?.idea?.text.trimStart(),
  });

  useEffect(() => {
    setIdea({
      title: storyBoard?.idea?.title?.trimStart(),
      text: storyBoard?.idea?.text?.trimStart(),
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

  const onBlure = (type = 'desc') => {
    if (!idea?.title) {
      return;
    }
    const newIdea = {
      title: idea?.title,
      text: idea?.text,
    };
    const data = {
      event_type: type === 'title' ? EVENTS.CHANGE_BOARD_TITLE : EVENTS.CHANGE_BOARD_DESCRIPTION,
      event_properties: { storyBoardId: storyBoard._id },
      user_id: user._id,
      user_properties: {
        ...user,
      },
    };
    myAmplitude(data);

    patchStoryBoard(
      storyBoard?._id,
      { idea: newIdea },
      () => {},
      () => {}
    );
  };

  return (
    <div className={styles.idea__container}>
      <Input
        placeholder="Name your graphic novel"
        className={styles.idea__title__input}
        value={idea.title}
        onChange={handleTitleChange}
        onBlur={() => onBlure('title')}
        maxLength={100}
      />
      <TextArea
        style={!idea.text ? { width: '400px' } : {}}
        autoSize={{ minRows: 6 }}
        placeholder="Here you will cover things like characters’ names and backgrounds,
         important worldbuilding, locations, languages, and technologies,
         as well as small details you foreshadowed early in your novel."
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
  user: PropTypes.object,
};

Idea.defaultProps = {
  storyBoard: {},
  user: {},
  setStoryBoard: () => {},
};

export default Idea;
