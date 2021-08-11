import React, { useState } from 'react';

import { Input, notification } from 'antd';
import Form from 'antd/lib/form/Form';
import { ShareButtons } from 'components/share';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import mangaStoryAPI from '../../../mangaStoryAPI';
import styles from './styles.module.scss';

const DraftCheckbox = ({ originUrl, user, mangaStory, setMangaStoryNew, mangaStoryNew }) => {
  const [showInput, setShowInput] = useState(true);

  const onFinish = (email) => {
    mangaStoryAPI.draft.saveUserDataByKey(email, user, setMangaStoryNew, mangaStoryNew);
    mangaStoryAPI.draft.leaveManga(mangaStory, true);
    setShowInput(false);
    notification.success({
      message: 'Success',
      placement: 'bottomLeft',
    });
  };

  return (
    <div className={styles.publishedModal}>
      <h3>Congratulations , share with your network and build your collaboration to success!</h3>
      {!user.payPalEmail && showInput && (
        <div className={styles.containerPayPalEmail}>
          <h4>Paypal email</h4>
          <Form onFinish={(value) => onFinish(value.email)}>
            <Form.Item
              className={styles.email}
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input valid email!',
                },
              ]}>
              <Input placeholder="email" />
            </Form.Item>
            <PrimaryButton htmlType="submit" text="Submit" />
          </Form>
        </div>
      )}
      <div className={styles.shareButtons}>
        <ShareButtons shareUrl={originUrl} text="Share to the world!" />
      </div>
    </div>
  );
};

DraftCheckbox.propTypes = {
  mangaStory: PropTypes.object.isRequired,
  originUrl: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  setMangaStoryNew: PropTypes.func.isRequired,
  mangaStoryNew: PropTypes.object.isRequired,
};

export default DraftCheckbox;
