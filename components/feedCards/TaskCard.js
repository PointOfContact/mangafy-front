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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import ModalStart from 'components/modals/joinToTeam';
import Imgix from 'components/imgix';
import OpenTaskModal from './openTaskModal';

const TaskCard = ({ card, user, setShowLoginModal }) => {
  const router = useRouter();
  let text = card.description;
  const title = card.lookingFor;
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false);

  let time = new Date(card.createdAt).toLocaleDateString();

  const author = card.authorInfo?.name;
  const budget = card.amount || null;
  const avatar = card.authorInfo?.avatar;

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
      router.push(`/project/production/${card.mangaStoryId}?tab=details&task=${card._id}`);
    } else {
      setModal(!modal);
    }
  }

  return (
    <>
      <OpenTaskModal
        modal={modal}
        setModal={setModal}
        time={time}
        title={title}
        card={card}
        text={text}
        avatar={avatar}
        author={author}
        budget={budget}
        setShowModal={setShowModal}
      />
      <div className={styles.card} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {text && (
          <FeedCardTaskContent
            title={title}
            description={text.length > 200 ? text?.slice(0, 200) + ' ...' : text}
          />
        )}
        <div className={styles.card__content}>
          <FeedCardTaskAuthorAndTime
            authorId={card.authorInfo?._id}
            author={author}
            avatar={avatar}
            time={time}
          />
          <FeedCardLine />
          <FeedCardTaskFooter
            budget={budget}
            mangaId={card.mangaStoryId}
            onApply={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          />
        </div>
      </div>
      {user?._id !== card?.authorInfo?._id && (
        <ModalStart
          changeShowModal={setShowModal}
          showModal={showModal}
          baseData={card.mangastories}
          selectedTask={card}
          user={user}
        />
      )}
    </>
  );
};

function parseBudget(tags) {
  if (!Array.isArray(tags)) return;
  if (tags.length === 0) return;
  const budget = tags.filter((tag) => tag.includes('$'));
  if (budget.length === 0) return;
  return budget[0]?.slice(1, -1);
}

export default TaskCard;
