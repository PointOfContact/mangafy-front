import React from 'react';

import { Checkbox, Input, Radio } from 'antd';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const { TextArea } = Input;

const BuyBubbleTea = ({ payPalEmail, createAmplitude, chapter, mangaStoryId, user }) => {
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

  const setAmplitude = () => {
    if (createAmplitude) {
      const eventData = [
        {
          event_type: EVENTS.CREATE_VIEW_BUBBLE_TEA,
          event_properties: { chapterId: chapter._id, mangaStoryId },
          user_id: user._id,
          user_properties: {
            ...user,
          },
        },
      ];
      myAmplitude(eventData);
    }
  };

  return (
    <div className={styles.containerBubble}>
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
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${payPalEmail}&item_name=Friends+of+the+Park&item_number=Fall+Cleanup+Campaign&amount=${valueRadio}&currency_code=USD`}>
            <PrimaryButton text={`Support ($${valueRadio})`} onClick={setAmplitude} />
          </a>
        </div>
      </div>
    </div>
  );
};

BuyBubbleTea.propTypes = {
  payPalEmail: PropTypes.string.isRequired,
  createAmplitude: PropTypes.bool,
  chapter: PropTypes.object,
  mangaStoryId: PropTypes.string,
  user: PropTypes.object,
};

BuyBubbleTea.defaultProps = {
  createAmplitude: false,
  chapter: {},
  mangaStoryId: '',
  user: {},
};

export default BuyBubbleTea;
