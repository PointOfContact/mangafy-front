import React, { useState } from 'react';

import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import { ShareButtons } from 'components/share';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import mangaStoryAPI from '../../mangaStoryAPI';
import styles from './styles.module.scss';

const DraftCheckbox = ({
  originUrl,
  user,
  mangaStory,
  setShowPayPalToggle,
  setBaseData,
  baseData,
}) => {
  const [showInput, setShowInput] = useState(true);

  const onFinish = (email) => {
    mangaStoryAPI.draft.saveUserDataByKey(email, user, setBaseData, baseData);
    mangaStoryAPI.draft.leaveManga(mangaStory, true, setShowPayPalToggle);
    setShowInput(false);
  };

  return (
    <div className={styles.publishedModal}>
      <h3>Congratulations , share with your network and build your collaboration to success!</h3>
      {!user.payPalEmail && showInput && (
        <div className={styles.containerPaypalEmail}>
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
  user: PropTypes.string.isRequired,
  setShowPayPalToggle: PropTypes.string.isRequired,
  setBaseData: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
};

export default DraftCheckbox;
