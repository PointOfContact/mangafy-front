import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { notification } from 'antd';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';
import Input from 'components/ui-new/Input';
import Textarea from 'components/ui-new/Textarea';
import Button from 'components/ui-new/Button';

const StartWithTheBasics = ({ storyInfo, goNext, goBack, setStoryInfo }) => {
  const [loading, setLoading] = useState(null);

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  function textareaChangeHandler(text) {
    setTitleError('');
    setDescriptionError('');
    setStoryInfo({ ...storyInfo, seriesDescription: text.trim() });
  }

  function inputChangeHandler(text) {
    setTitleError('');
    setDescriptionError('');
    setStoryInfo({ ...storyInfo, seriesTitle: text.trim() });
  }

  function nextHandler() {
    setTitleError('');
    setDescriptionError('');
    if (!storyInfo.seriesTitle) {
      return setTitleError('Please enter a title of your series');
    }
    if (!storyInfo.seriesDescription) {
      return setDescriptionError('Please enter a description of your project');
    }
    setLoading('next');
    goNext();
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <h4 className={cn(styles.title)}>Start with the basics</h4>
        <p className={cn(styles.descr)}>
          Give your project a clear title and subtitle that will help people understand it quickly.
          The titles and subtitles will appear on your project and pre-launch pages.
        </p>
        <div className={cn(styles.basicsForm)}>
          <Input
            err={titleError}
            onChange={inputChangeHandler}
            className={styles.input}
            placeholder="Series Title"
            defaultValue={storyInfo.seriesTitle}
            rounded
            pink
          />
          <GrammarlyEditorPlugin clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
            <Textarea
              err={descriptionError}
              pink
              rounded
              onChange={textareaChangeHandler}
              placeholder="State what your project is, and what makes it unique. Avoid using all caps or exclamation points. Be honest and transparent"
              defaultValue={storyInfo.seriesDescription}
            />
          </GrammarlyEditorPlugin>
          <div className={styles.buttons}>
            <Button rounded pink onClick={nextHandler} loading={loading === 'next'}>
              Let's go
            </Button>
            <Button
              rounded
              pink
              outline
              onClick={() => {
                setLoading('prev');
                goBack();
              }}
              loading={loading === 'prev'}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartWithTheBasics;
