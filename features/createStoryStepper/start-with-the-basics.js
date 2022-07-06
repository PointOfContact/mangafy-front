import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import { notification } from 'antd';

const StartWithTheBasics = ({ storyInfo, goNext, goBack, setStoryInfo }) => {
  const [loading, setLoading] = useState(null);
  const [isInputValid, setIsInputValid] = useState(true);
  const [isTextareaValid, setIsTextareaValid] = useState(true);
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  function textareaAutoresize() {
    textareaRef.current.style.height = 'inherit';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }

  function textareaChangeHandler() {
    if (!textareaRef.current) return;
    setIsTextareaValid(true);
    setStoryInfo({ ...storyInfo, seriesDescription: textareaRef.current.value.trim() });
  }

  function inputChangeHandler() {
    if (!inputRef.current) return;
    setIsInputValid(true);
    setStoryInfo({ ...storyInfo, seriesTitle: inputRef.current.value.trim() });
  }

  function nextHandler() {
    if (!storyInfo.seriesTitle) {
      setIsInputValid(false);
      return notification.error({
        message: 'Please enter a title of your series',
        placement: 'bottomLeft',
      });
    }
    if (!storyInfo.seriesDescription) {
      setIsTextareaValid(false);
      return notification.error({
        message: 'Please enter a description of your project',
        placement: 'bottomLeft',
      });
    }
    setLoading('next');
    goNext();
  }

  useEffect(() => {
    textareaAutoresize();
  }, []);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <h4 className={cn(styles.title)}>Start with the basics</h4>
        <p className={cn(styles.descr)}>
          Give your project a clear title and subtitle that will help people understand it quickly.
          The titles and subtitles will appear on your project and pre-launch pages.
        </p>
        <div className={cn(styles.basicsForm)}>
          <input
            ref={inputRef}
            onChange={inputChangeHandler}
            type="text"
            className={cn(styles.input, !isInputValid && styles.input_error)}
            placeholder="Series Title"
            defaultValue={storyInfo.seriesTitle}
          />
          <textarea
            ref={textareaRef}
            className={cn(styles.input, styles.textarea, !isTextareaValid && styles.input_error)}
            placeholder="State what your project is, and what makes it unique. Avoid using all caps or exclamation points. Be honest and transparent"
            onChange={() => {
              textareaAutoresize();
              textareaChangeHandler();
            }}
            defaultValue={storyInfo.seriesDescription}></textarea>
          <div className={styles.buttons}>
            <PrimaryButton text="Let's go" onClick={nextHandler} loading={loading === 'next'} />
            <PrimaryButton
              isWhite={true}
              className={styles.button_blackLoading}
              text="Go back"
              onClick={() => {
                setLoading('prev');
                goBack();
              }}
              loading={loading === 'prev'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartWithTheBasics;
