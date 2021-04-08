import React, { useState, useEffect } from 'react';

import { Button, Comment, List, Form, Input } from 'antd';
import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    className={styles.list}
    dataSource={comments.reverse()}
    itemLayout="horizontal"
    renderItem={(commentItem) => (
      <Comment
        datetime={moment(commentItem.createdAt).format('lll')}
        {...commentItem}
        author={commentItem?.authorInfo?.name}
        avatar={
          commentItem.authorInfo && (
            <>
              {commentItem.authorInfo?.avatar ? (
                <Imgix
                  width={40}
                  height={40}
                  src={client.UPLOAD_URL + commentItem.authorInfo?.avatar}
                />
              ) : (
                <Avatar text={commentItem?.authorInfo?.name} size={40} />
              )}
            </>
          )
        }
      />
    )}
  />
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea autoSize={{ minRows: 1, maxRows: 7 }} onChange={onChange} value={value} />
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

export const Comments = ({ commentsData, postId, user, setCommentsData }) => {
  const [comments, setComments] = useState([]);
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
        .service('/api/v2/post-comments')
        .create(
          {
            content: value,
            postId,
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          }
        )
        .then((res) => {
          res.authorInfo = { _id: user._id, name: user.name, avatar: user.avatar };
          res.datetime = moment().format('MMMM Do YYYY, h:mm:ss a');
          const newCommentsData = [...comments, { ...res }];
          setCommentsData(newCommentsData);
          setSubmitting(false);
          setValue('');
          // const eventData = [
          //   {
          //     platform: 'WEB',
          //     event_type: EVENTS.POST_COMMENT,
          //     event_properties: { postId },
          //     user_id: user._id,
          //     user_properties: {
          //       ...user,
          //     },
          //   },
          // ];
          // amplitude.track(eventData);
        })
        .catch((err) => {
          setErrMessage(err.message);
          setSubmitting(false);
        });
    });
  };

  useEffect(() => {
    setComments(commentsData);
  }, [commentsData]);

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
  setCommentsData: PropTypes.func,
  commentsData: PropTypes.array,
  postId: PropTypes.string,
  user: PropTypes.object,
};

Comments.defaultProps = {
  setCommentsData: () => {},
  commentsData: [],
  postId: null,
  user: null,
};
