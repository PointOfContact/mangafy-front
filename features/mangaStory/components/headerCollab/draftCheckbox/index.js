import React, { useState } from 'react';

import { Input, notification } from 'antd';
import Form from 'antd/lib/form/Form';
import { ShareButtons } from 'components/share';
import PrimaryButton from 'components/ui-elements/button';
import CopyInput from 'components/ui-elements/copyInput';
import copy from 'copy-to-clipboard';
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
      <img width={113} height={113} src={'/img/ballons.webp'} alt={'mangafy ballons'} />
      <h2 className={styles.modalTitle}>Your project is live!</h2>
      <h3>Share it whenever your followers are. Posts are the best way to make new supporters.</h3>
      <h4>Tell your followers everywhere 🎉</h4>
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
      <CopyInput white={true} copyUrl={originUrl} copyLink={() => copy(originUrl)} />
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
