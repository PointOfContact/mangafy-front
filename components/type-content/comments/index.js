import React, { useState, useEffect } from 'react';

import { Comment, List, Form, Input } from 'antd';
import client from 'api/client';
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

const { TextArea } = Input;

const CommentList = ({ comments }) => {
  const com = comments.map((val) => ({ ...val, content: wrapUrls(val.content) }));

  return (
    <List
      className={styles.list}
      dataSource={com}
      itemLayout="horizontal"
      renderItem={(commentItem) => (
        <Comment
          datetime={moment(commentItem.createdAt).format('lll')}
          {...commentItem}
          author={commentItem?.authorInfo?.name}
          avatar={
            commentItem.authorInfo && (
              <Link href={`/profile/${commentItem.authorInfo?._id}`}>
                <a>
                  {commentItem.authorInfo?.avatar ? (
                    <Imgix
                      width={40}
                      height={40}
                      src={client.UPLOAD_URL + commentItem.authorInfo?.avatar}
                      alt="MangaFy avatar"
                    />
                  ) : (
                    <Avatar text={commentItem?.authorInfo?.name} size={40} />
                  )}
                </a>
              </Link>
            )
          }
          content={<div dangerouslySetInnerHTML={{ __html: commentItem.content }} />}
        />
      )}
    />
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

const Editor = ({ onSubmit, submitting, user, postId }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={(e) => {
        form.resetFields();
        onSubmit(e.comment);
      }}>
      <Form.Item
        name={'comment'}
        rules={[
          {
            required: true,
            validator: async (_, names) => {
              if (names.trim().length < 1) {
                return Promise.reject(new Error('Length must be at least 2 characters long'));
              }
            },
            message: 'Length must be at least 2 characters long',
          },
        ]}>
        <TextArea autoSize={{ minRows: 1, maxRows: 7 }} />
      </Form.Item>
      <Form.Item>
        {!user && (
          <Link href={`/sign-in?postId=${postId}`}>
            <a>
              <h2 className={styles.loginOnText}>
                Please <span>login</span> to add comments
              </h2>
            </a>
          </Link>
        )}
        <LargeButton
          id="AddACommentBtnId"
          htmlType="submit"
          loading={submitting}
          text="Add Comment"
        />
      </Form.Item>
    </Form>
  );
};

Editor.propTypes = {
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  user: PropTypes.object,
  postId: PropTypes.string,
};

Editor.defaultProps = {
  onSubmit: () => {},
  submitting: null,
  user: null,
  postId: '',
};

export const Comments = ({ commentsData, postId, user, setCommentsData }) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const handleSubmit = (value) => {
    if (!user) {
      const eventData = [
        {
          event_type: EVENTS.UNAUTHORIZED_POST_COMMENT,
          event_properties: { postId, comment: value },
        },
      ];
      myAmplitude(eventData);
      Router.push(`/sign-in?postId=${postId}`);
    }

    if (!value.trim() || !user) {
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
          const eventData = [
            {
              event_type: EVENTS.POST_COMMENT,
              event_properties: { postId, comment: value, comentData: res },
            },
          ];
          myAmplitude(eventData);
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
                <Imgix
                  width={52}
                  height={52}
                  src={client.UPLOAD_URL + user.avatar}
                  alt="MangaFy avatar"
                />
              ) : (
                <Avatar text={user.name} size={52} />
              )}
            </>
          )
        }
        content={
          <Editor onSubmit={handleSubmit} submitting={submitting} user={user} postId={postId} />
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
