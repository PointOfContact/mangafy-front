import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Flash from 'components/icon/new/Flash';

import client from 'api/client';

import FeedCardTaskContent from './components/FeedCardTaskContent';
import FeedCardTaskAuthorAndTime from './components/FeedCardTaskAuthorAndTime';
import FeedCardTaskFooter from './components/FeedCardTaskFooter';
import FeedCardLine from './components/FeedCardLine';

import Close from 'components/icon/new/Close';
import { Modal } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Button from 'components/ui-new/Button';
import Heart from 'components/icon/new/Heart';
import Clock from 'components/icon/new/Clock';
import Dollar from 'components/icon/new/Dollar';

const TaskCard = ({ card }) => {
  // let text = card.subTitle?.length > 200 ? card.subTitle.substr(0, 200) + '...' : card.subTitle;
  let text = card.text?.length > 200 ? card.text.substr(0, 200) + '...' : card.text;
  // const title = card.type;
  const title = card.title;

  const time = card.time;
  // const time = Math.floor((new Date() - new Date(card.createdAt)) / 1000 / 60 / 60);
  let timeMeasure = 'hours';
  // if (time > 23) time = Math.floor(time / 24);
  // timeMeasure = 'days';
  // if (time > 6) time = Math.floor(time / 7);
  // timeMeasure = 'weeks';

  // const author = card.title;
  const author = card.author;
  // const budget = parseBudget(card.categories);
  const budget = card.price || null;
  const avatar = card.logoUrl;

  const [modal, setModal] = useState(false);

  const debouncedMouseEventHandler = useCallback(
    AwesomeDebouncePromise(mouseEventHandler, 200),
    []
  );

  function handleDoubleClick() {
    debouncedMouseEventHandler('doubleClick');
  }

  function handleClick() {
    debouncedMouseEventHandler('click');
  }

  function mouseEventHandler(type) {
    if (type === 'doubleClick') {
      // Like function here
    } else {
      setModal(!modal);
    }
  }

  return (
    <>
      {modal && (
        <Modal
          visible={modal}
          onCancel={() => setModal(false)}
          style={{ top: 50 }}
          wrapClassName={styles.modal}
          closeIcon={<Close className={styles.modal__close} />}
          footer={null}>
          <div className={styles.modal__title}>
            <div className={styles.modal__time}>
              <Clock color="#C3BAFA" />
              {`${time} ${timeMeasure} ago`}
            </div>
            {title}
          </div>
          <div className={styles.modal__content}>
            {/* <img src={image} alt="shot image" /> */}
            {text && <div className={styles.modal__text}>{text}</div>}
          </div>
          <FeedCardLine />
          <div className={styles.modal__footer}>
            <div className={styles.modal__avatar}>
              <img src={avatar || 'img/feedTemp/avatar.png'} alt="user avatar" />
            </div>
            <div className={styles.modal__author}>{author}</div>
            <div className={styles.modal__budget}>
              {budget + ' USD'}
              <Dollar color={'#C3BAFA'} />
            </div>
            <Button sm={1} iconRight={1} rounded={1} icon={<Heart color="#fff" />}>
              Apply
            </Button>
          </div>
        </Modal>
      )}
      <div className={styles.card} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        <FeedCardTaskContent title={title} description={text} />
        <div className={styles.card__content}>
          <FeedCardTaskAuthorAndTime
            author={author}
            avatar={avatar}
            time={time}
            timeMeasure={timeMeasure}
          />
          <FeedCardLine />
          <FeedCardTaskFooter budget={budget} />
        </div>
      </div>
    </>
  );
};

function parseBudget(tags) {
  if (!Array.isArray(tags)) return;
  if (tags.length === 0) return;
  const budget = tags.filter((tag) => tag.includes('$'));
  if (budget.length === 0) return;
  return budget[0].slice(1, -1);
}

export default TaskCard;
