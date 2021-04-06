import React, { useState, useEffect } from 'react';

import { Button, Comment, List, Form, Input } from 'antd';
import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import { EVENTS } from 'helpers/amplitudeEvents';
import moment from 'moment';
import PropTypes from 'prop-types';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
const { TextArea } = Input;

const CommentList = ({ comments }) => (
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
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        id="AddACommentBtnId"
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

Editor.propTypes = {
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
};

export const Comments = ({ commentsData, postId, user }) => {
  const [comments, setComments] = useState(commentsData);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
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
            mangaStoryId: postId,
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
              event_type: EVENTS.MINI_JOB_REMOVED,
              event_properties: { postId },
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
          user ? (
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          ) : (
            <p>Pls. Login</p>
          )
        }
      />
      {errMessage && <p>{errMessage}</p>}
    </>
  );
};

Comments.propTypes = {
  commentsData: PropTypes.array,
  postId: PropTypes.string,
  user: PropTypes.object,
};

Comments.defaultProps = {
  commentsData: [],
  postId: null,
  user: null,
};
