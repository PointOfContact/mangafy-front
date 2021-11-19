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
      <h2 className={styles.title}>Plot</h2>
      <TextEditor
        placeholder="The plot is what happens in a story. However, it is not simply a sequence of events. You want a lot of dialogue and large, easily recognizable moments. Come up with a short story idea that would work well visually and start typing..."
        result={handleTextChange}
        value={idea}
        disabled={idea?.length >= 1000}
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
