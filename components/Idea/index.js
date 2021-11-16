import React, { useEffect, useState } from 'react';

import { patchStoryBoard } from 'api/storyBoardClient';
import TextEditor from 'components/ui-elements/text-editor';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const Idea = ({ storyBoard, user }) => {
  const [idea, setIdea] = useState(storyBoard?.idea);

  useEffect(() => {
    setIdea(storyBoard?.idea);
  }, [storyBoard]);

  const handleTextChange = (e) => {
    setIdea(e);
  };

  const onBlur = (type = 'desc') => {
    if (!idea.trim().length) return;

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
      { idea },
      () => {},
      () => {}
    );
  };

  return (
    <div className={styles.idea__container}>
      <TextEditor
        placeholder="Here you will cover things like characters’ names and backgrounds,
         important worldbuilding, locations, languages, and technologies,
         as well as small details you foreshadowed early in your novel."
        result={handleTextChange}
        value={idea}
        disabled={idea.length >= 1000}
        maxLength={10}
        onBlur={onBlur}
      />
    </div>
  );
};

Idea.propTypes = {
  storyBoard: PropTypes.object,
  user: PropTypes.object,
};

Idea.defaultProps = {
  storyBoard: {},
  user: {},
};

export default Idea;
