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

  const savePlotDebounced = useCallback(AwesomeDebouncePromise(savePlot, 600), []);

  const handleTextChange = async (plot) => {
    // console.log('Text changed');
    if (!storyBoard?._id) return;
    setSavingStatus('saving');
    setIdea(plot);
    await savePlotDebounced(plot);
  };

  function savePlot(plot) {
    // console.log('... Saving plot: ' + plot);
    const type = 'desc';
    const data = {
      event_type: EVENTS.CHANGE_BOARD_DESCRIPTION,
      event_properties: { storyBoardId: storyBoard._id },
    };
    myAmplitude(data);

    const jwt = client.getCookie('feathers-jwt');
    const promise = client
      .service('/api/v2/story-boards')
      .patch(
        storyBoard?._id,
        { idea: plot },
        {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        }
      )
      .then((res) => {
        setSavingStatus('saved');
        // notification.success({
        //   message: 'Your plot was succesfully saved',
        //   placement: 'bottomLeft',
        // });
      })
      .catch((err) => {
        setSavingStatus('error');
        console.log('!!! Error while saving plot:');
        console.log(err);
        notification.error({
          message: 'Failed to save the plot, please try again',
          placement: 'bottomLeft',
        });
      });
  }

  return (
    <div className={styles.idea__container}>
      <div className={styles.idea__header}>
        <h2 className={styles.title}>Plot</h2>
        <div
          className={cn(
            styles.savingStatus,
            savingStatus === 'saved' && styles.savingStatus_green,
            savingStatus === 'saving' && styles.savingStatus_yellow,
            savingStatus === 'error' && styles.savingStatus_red
          )}>
          {savingStatus}
        </div>
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
