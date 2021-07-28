/* eslint-disable no-nested-ternary */
import React from 'react';

import { Popover } from 'antd';
import SvgChat from 'components/icon/Chat';
import SvgHand from 'components/icon/Hand';
import Share from 'components/ui-elements/share';
import PropTypes from 'prop-types';
import useWindowSize from 'utils/useWindowSize';

import styles from '../styles.module.scss';

const ShareProfile = ({ ifMyProfile, originUrl, profile, user, sendInvites, sendMessage }) => {
  const { width } = useWindowSize();

  return ifMyProfile ? (
    <>
      <div className={styles.hotBtns}>
        <div className={styles.share}>
          <Popover
            overlayClassName={styles.popover}
            placement={width < 768 ? 'bottom' : 'left'}
            content={'Share'}
            trigger="hover">
            <div className={styles.svgBg}>
              <Share shareUrl={originUrl} />
            </div>
          </Popover>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={styles.hotBtns}>
        <div className={styles.share}>
          <Popover
            overlayClassName={styles.popover}
            placement={width < 768 ? 'bottom' : 'left'}
            content={'Share'}
            trigger="hover">
            <div className={styles.svgBg}>
              <Share shareUrl={originUrl} />
            </div>
          </Popover>
        </div>
        {profile &&
          !!user?.mangaStories?.data?.length &&
          !(
            user?.mangaStories?.participents?.include(profile._id) || user?._id === profile?._id
          ) && (
            <>
              <div className={styles.contacts}>
                <Popover
                  overlayClassName={styles.popover}
                  placement={width < 768 ? 'bottom' : 'left'}
                  content={'Collab'}
                  trigger="hover">
                  <div onClick={sendInvites} className={styles.svgBg}>
                    <SvgHand width="19px" height="19px" />
                  </div>
                </Popover>
              </div>
              <div className={styles.contacts}>
                <Popover
                  overlayClassName={styles.popover}
                  placement={width < 768 ? 'bottom' : 'left'}
                  content={'Messenger'}
                  trigger="hover">
                  <div onClick={sendMessage} className={styles.svgBg}>
                    <SvgChat width="19px" height="19px" />
                  </div>
                </Popover>
              </div>
            </>
          )}
      </div>
    </>
  );
};

ShareProfile.propTypes = {
  ifMyProfile: PropTypes.bool.isRequired,
  originUrl: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  sendInvites: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default ShareProfile;
