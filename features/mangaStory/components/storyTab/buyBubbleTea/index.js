import React from 'react';

import { Checkbox, Input, Radio } from 'antd';
import PrimaryButton from 'components/ui-elements/button';

import styles from './styles.module.scss';

const { TextArea } = Input;

const BuyBubbleTea = () => {
  const [valueRadio, setValueRadio] = React.useState(1);
  const [valueDescription, setValueDescription] = React.useState('');
  const [valueCheckbox, setValueCheckbox] = React.useState('');

  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value);
    setValueRadio(e.target.value);
  };

  const onChangeDescription = (e) => {
    console.log('textArea checked', e.target.value);
    setValueDescription(e.target.value);
  };

  const onChangeCheckbox = (e) => {
    console.log('checkbox', e.target.value);
    setValueCheckbox(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buyBubbleTea}>
        <div className={styles.buyBubbleTeaContent}>
          <h2>Buy us a bubble tea</h2>
          <span>It freed us to be more creative</span>
          <div className={styles.supportNumber}>
            <img src="/img/bubbleTea.png" alt="mangaFy bubble tea" />X
            <Radio.Group onChange={onChangeRadio} value={valueRadio}>
              <Radio value={1}>1</Radio>
              <Radio value={3}>3</Radio>
              <Radio value={5}>5</Radio>
            </Radio.Group>
          </div>
          <div className={styles.description}>
            <TextArea
              value={valueDescription}
              onChange={onChangeDescription}
              placeholder="Say something nice... (optional)"
            />
          </div>
          <div className={styles.messagePrivate}>
            <Checkbox onChange={onChangeCheckbox}>Make this message private</Checkbox>
          </div>
          <PrimaryButton text={`Support ($${valueRadio})`} />
        </div>
      </div>
    </div>
  );
};

export default BuyBubbleTea;
