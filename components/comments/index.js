import React, { useState, useEffect } from 'react';

import { Comment, List, Form, Input } from 'antd';
import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import LargeButton from 'components/ui-elements/large-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <>
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(commentItem) => (
        <Comment
          datetime={commentItem.createdAt}
          {...commentItem}
          author={commentItem.senderInfo[0] && commentItem.senderInfo[0].name}
          avatar={
            commentItem.senderInfo[0] && (
              <>
                {commentItem.senderInfo[0].avatar ? (
                  <Imgix
                    width={40}
                    height={40}
                    src={client.UPLOAD_URL + commentItem.senderInfo[0].avatar}
                  />
                ) : (
                  <Avatar text={commentItem?.senderInfo[0]?.name} size={40} />
                )}
              </>
            )
          }
        />
      )}
    />
  </>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

const Editor = ({ onChange, onSubmit, submitting, value, user, mangaStory }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
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

Editor.propTypes = {
  user: PropTypes.object,
  mangaStory: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.any,
  submitting: PropTypes.bool,
};

Editor.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  value: null,
  submitting: null,
  user: null,
};

export const Comments = ({ commentsData, mangaStory, user, isOwn }) => {
  const [comments, setComments] = useState(commentsData);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!user) {
      Router.push(`/sign-in?page=manga-story/${mangaStory._id}?tab=comments`);
    }

    if (!value || !user) {
      return;
    }

    setSubmitting(true);
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/comments')
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
          res.senderInfo = [{ _id: '', name: user.name, avatar: user.avatar }];
          res.avatar = client.UPLOAD_URL + user.avatar;
          res.datetime = moment().format('MMMM Do YYYY, h:mm:ss a');
          res.author = user.name;
          const commentsData = [{ ...res }, ...comments];
          setComments(commentsData);
          setSubmitting(false);
          setValue('');
          const eventData = [
            {
              platform: 'WEB',
              event_type: EVENTS.ADDED_COMMENT,
              event_properties: { mangaStoryId: mangaStory._id },
              user_id: user._id,
              user_properties: {
                ...user,
              },
            },
          ];
          amplitude.track(eventData);
        })
        .catch((err) => {
          setErrMessage(err.message);
          setSubmitting(false);
        });
    });
  };
  useEffect(() => {
    const orderAs = '$sort[createdAt]';
  }, [comments.length]);
  return (
    <>
      <h2 className={styles.subTitle}> {comments?.length} Comments</h2>
      {comments.length > 0 && (
        <div className="commentsBlock">
          <CommentList comments={comments} />
        </div>
      )}
      <Comment
        className={'manga-story-comments'}
        author={user && user.name}
        avatar={
          user && (
            <>
              {user.avatar ? (
                <Imgix width={52} height={52} src={client.UPLOAD_URL + user.avatar} />
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
          />
        }
      />
      {errMessage && <p>{errMessage}</p>}
    </>
  );
};

Comments.propTypes = {
  commentsData: PropTypes.array,
  mangaStory: PropTypes.object,
  user: PropTypes.object,
  isOwn: PropTypes.bool,
};

Comments.defaultProps = {
  commentsData: [],
  mangaStory: null,
  user: null,
  isOwn: false,
};
