import React, { useState, useEffect } from 'react';

import { Button, Comment, List, Form, Input, Avatar } from 'antd';
import client from 'api/client';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => (
      <Comment
        datetime={props.createdAt}
        {...props}
        author={props.senderInfo[0] && props.senderInfo[0].name}
        avatar={
          <Avatar
            src={
              props.senderInfo[0]
                ? client.UPLOAD_URL + props.senderInfo[0].avatar
                : '../public/img/four-left.svg'
            }
            alt={props.senderInfo.name && props.senderInfo.name}
          />
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
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export const Comments = ({ commentsData = [], mangaStory = false, user = null, isOwn = false }) => {
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
          <Avatar
            src={user ? client.UPLOAD_URL + user.avatar : '../public/img/four-left.svg'}
            alt={user && user.name}
          />
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
