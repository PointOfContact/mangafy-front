import PrimaryButton from 'components/ui-elements/button';
// import { Select } from 'antd';
import PrimarySelect from 'components/ui-elements/select';
import { notification } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { projectTypes } from 'helpers/constant';

const CreateType = ({ storyInfo, goNext, goBack, setStoryInfo, loading }) => {
  const [isValid, setIsValid] = useState(true);

  function selectChangeHandler(value) {
    if (!value) return;
    setIsValid(true);
    setStoryInfo({ ...storyInfo, type: value });
  }

  function nextHandler() {
    if (!storyInfo.type) {
      notification.error({
        message: 'Please select the type of your project',
        placement: 'bottomLeft',
      });
      setIsValid(false);
    } else {
      goNext();
    }
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <div className={cn(styles.title)}>What do you want to create?</div>
        <div className={cn(styles.descr)}>
          Choose the area you want to work in and we’ll help get your started
        </div>
        <PrimarySelect
          className={cn(styles.select, !isValid && styles.select_error)}
          options={projectTypes.map((pt) => ({ key: pt, value: pt }))}
          onChange={(e) => selectChangeHandler(e)}
          value={storyInfo.type}
        />
        <div className={styles.buttons}>
          <PrimaryButton text="Let’s go" onClick={nextHandler} loading={loading === 'next'} />
          <PrimaryButton
            isWhite={true}
            className={styles.button_blackLoading}
            text="Go back"
            onClick={() => goBack()}
            loading={loading === 'prev'}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateType;
