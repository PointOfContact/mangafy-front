import { notification } from 'antd';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { projectTypes } from 'helpers/constant';
import Button from 'components/ui-new/Button';
import Select from 'components/ui-new/Input/Select';

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
        <Select
          options={projectTypes.map((pt) => ({ key: pt, value: pt }))}
          defaultValue={storyInfo.type || { key: projectTypes[0], value: projectTypes[0] }}
          onChange={(e) => selectChangeHandler(e)}
          rounded
        />
        <div className={styles.buttons}>
          <Button onClick={nextHandler} loading={loading === 'next'} rounded pink>
            Let’s go
          </Button>
          <Button
            className={styles.button_blackLoading}
            onClick={() => goBack()}
            loading={loading === 'prev'}
            rounded
            pink
            outline>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateType;
