import React, { useCallback, useEffect, useState } from 'react';

import TextEditor from 'components/ui-elements/text-editor';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { notification } from 'antd';
import cn from 'classnames';

import styles from './styles.module.scss';
import client from 'api/client';

const Idea = ({ storyBoard, user }) => {
  const [idea, setIdea] = useState(storyBoard?.idea);
  const [savingStatus, setSavingStatus] = useState('loading');

  useEffect(() => {
    setIdea(storyBoard?.idea);
    if (!storyBoard?._id) setSavingStatus('loading');
    else setSavingStatus('saved');
  }, [storyBoard]);

  const savePlotDebounced = useCallback(AwesomeDebouncePromise(savePlot, 600), [storyBoard, user]);

  const handleTextChange = async (plot) => {
    if (storyBoard._id && user._id) {
      setIdea(plot);
      setSavingStatus('saving');
      await savePlotDebounced(plot);
    }
  };

  function savePlot(plot) {
    const type = 'desc';
    const data = {
      event_type: EVENTS.CHANGE_BOARD_DESCRIPTION,
      event_properties: { storyBoardId: storyBoard._id },
    };
    myAmplitude(data);

    const jwt = client.getCookie('feathers-jwt');
    client
      .service('/api/v2/story-boards')
      .patch(
        storyBoard?._id,
        { idea: plot, mangaStoryId: storyBoard.mangaStoryId },
        {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        }
      )
      .then((res) => {
        setSavingStatus('saved');
      })
      .catch((err) => {
        setSavingStatus('ooops, something went wrong');
        notification.error({
          message: 'Failed to save the plot, please try again',
          placement: 'bottomLeft',
        });
      });
  }

  return (
    <div className={styles.idea__container}>
      <div
        className={cn(
          styles.savingStatus,
          savingStatus === 'saved' && styles.savingStatus_green,
          savingStatus === 'saving' && styles.savingStatus_yellow,
          savingStatus === 'ooops, something went wrong' && styles.savingStatus_red
        )}
      >
        {savingStatus}
      </div>
      <TextEditor
        placeholder="The plot is what happens in a story. However, it is not simply a sequence of events. You want a lot of dialogue and large, easily recognizable moments. Come up with a short story idea that would work well visually and start typing..."
        result={handleTextChange}
        value={idea}
        maxLength={10}
        className={styles.textEditor}
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
