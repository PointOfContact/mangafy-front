import React, { useEffect, useMemo, useState } from 'react';

import { Comment, List, Form, Input } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import LargeButton from 'components/ui-elements/large-button';
import wrapUrls from 'components/wrapUrls/wrapUrls';
import { EVENTS } from 'helpers/amplitudeEvents';
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

const { TextArea } = Input;

const CommentList = ({ comments }) => {
  const com = comments.map((val) => ({ ...val, content: wrapUrls(val.content) }));

  return (
    <>
      <List
        dataSource={com}
        itemLayout="horizontal"
        renderItem={(commentItem) => {
          const userName = commentItem.authorInfo?.name || commentItem.senderInfo?.name;
          const userAvatar = commentItem.authorInfo?.avatar || commentItem.senderInfo?.avatar;
          return (
            <Comment
              datetime={moment(commentItem.createdAt)?.format('MMMM Do YYYY, h:mm:ss a')}
              {...commentItem}
              author={commentItem.authorInfo && userName}
              avatar={
                userAvatar ? (
                  <Link href={`/profile/${commentItem.senderId}`}>
                    <a>
                      <Imgix
                        width={40}
                        height={40}
                        src={client.UPLOAD_URL + userAvatar}
                        alt={'MangaFy avatar'}
                      />
                    </a>
                  </Link>
                ) : (
                  <Avatar text={userName} size={40} />
                )
              }
              content={<div dangerouslySetInnerHTML={{ __html: commentItem.content }} />}
            />
          );
        }}
      />
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

const Editor = ({ onChange, onSubmit, submitting, value, user, mangaStory, error }) => {
  return (
    <>
      <GrammarlyEditorPlugin clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
        <Form.Item>
          <TextArea
            className={styles.commentInput}
            rows={4}
            onChange={onChange}
            value={value}
            placeholder="Ask a creator"
          />
          <p className={error ? styles.commentError : styles.noError}>{error}</p>
        </Form.Item>
      </GrammarlyEditorPlugin>
      <Form.Item>
        <>
          {!user && (
            <Link href={`/sign-in?page=manga-story/${mangaStory._id}?tab=comments`}>
              <h2 className={styles.loginText}>
                Please <span>login</span> to add comments
              </h2>
            </Link>
          )}
          <LargeButton
            id="AddACommentBtnId"
            htmlType="submit"
            loading={submitting}
            onClick={onSubmit}
            text="Add Comment"
          />
        </>
      </Form.Item>
    </>
  );
};

Editor.propTypes = {
  user: PropTypes.object,
  mangaStory: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.any,
  submitting: PropTypes.bool,
  error: PropTypes.string,
};

Editor.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  value: null,
  submitting: null,
  user: null,
  error: '',
};

export const Comments = ({ commentsData, mangaStory, user, viewPage, chapter, isOwn }) => {
  const [comments, setComments] = useState(commentsData);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setComments(commentsData);
  }, [commentsData]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!user) {
      Router.push(`/sign-in?page=manga-story/${mangaStory._id}?tab=comments`);
    }

    if (!value.trim() || !user) {
      return;
    }

    setSubmitting(true);
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/comments?page=mangaVisew')
        .create(
          {
            content: value,
            mangaStoryId: mangaStory._id,
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          }
        )
        .then((res) => {
          res.senderInfo = { _id: '', name: user.name, avatar: user.avatar };
          res.avatar = client.UPLOAD_URL + user.avatar;
          res.datetime = moment().format('MMMM Do YYYY, h:mm:ss a');
          res.author = user.name;
          const newCommentsData = [{ ...res }, ...comments];
          setComments(newCommentsData);
          setSubmitting(false);
          setErrMessage('');
          setValue('');
          const eventData = [
            {
              event_type: EVENTS.ADDED_COMMENT,
              event_properties: { mangaStoryId: mangaStory._id },
            },
          ];

          if (viewPage) {
            eventData[0].event_type = EVENTS.ADD_VIEW_COMMENT;
            eventData[0].event_properties.chapter = chapter;
          }

          myAmplitude(eventData);
        })
        .catch((err) => {
          setErrMessage(err.message);
          setSubmitting(false);
        });
    });
  };

  return (
    <>
      {/* <h2 className={styles.subTitle}> {!!comments?.length && comments?.length} Comments</h2> */}
      {!isOwn && <h2 className={styles.notOwnCommentsTitle}>Comments</h2>}
      {comments.length > 0 && (
        <div className={cn(styles.comments, 'commentsBlock')}>
          <pre>
            <CommentList comments={comments} />
          </pre>
        </div>
      )}
      <Comment
        className={'manga-story-comments'}
        author={user && user.name}
        avatar={
          user && (
            <>
              {user.avatar ? (
                <Imgix
                  width={52}
                  height={52}
                  src={client.UPLOAD_URL + user.avatar}
                  alt={'MangaFy avatar'}
                />
              ) : (
                <Avatar text={user.name} size={52} />
              )}
            </>
          )
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            mangaStory={mangaStory}
            value={value}
            user={user}
            error={errMessage}
          />
        }
      />
    </>
  );
};

Comments.propTypes = {
  commentsData: PropTypes.array,
  mangaStory: PropTypes.object,
  user: PropTypes.object,
  isOwn: PropTypes.bool,
  viewPage: PropTypes.bool,
  chapter: PropTypes.object,
};

Comments.defaultProps = {
  commentsData: [],
  mangaStory: null,
  user: null,
  isOwn: false,
  viewPage: false,
  chapter: {},
};
