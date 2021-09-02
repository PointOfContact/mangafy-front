import React, { useEffect, useState } from 'react';

import client from 'api/client';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const FooterLogin = React.memo(({ user, cookieVisibility }) => {
  const [cookieBubble, setCookieBubble] = useState(false);
  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    client.getCookie('CookieBubble') === 'true'
      ? //in-browser there is cooke
        setCookieBubble(true)
      : //the in-browser cookie does not exist and this collab page
        setCookieBubble(!client.getCookie('CookieBubble') && cookieVisibility);
  }, []);

  return (
    showDialog &&
    cookieBubble &&
    !user && (
      <div className={styles.containerFooterLogin}>
        <div className={styles.footerLogin}>
          <p className={styles.fullDesc}>
            Join our vivid creator community, Get Inspired, Produce your graphic novel
          </p>
          <div className={styles.containerButton}>
            <Link href="/sign-in">
              <a>
                <PrimaryButton isWhite={true} text={'LOG IN'} />
              </a>
            </Link>
            <Link href="/sign-up">
              <a>
                <PrimaryButton text={'JOIN'} />
              </a>
            </Link>
          </div>
          <span className={styles.closeContainer} onClick={() => setShowDialog(false)}>
            <SvgClose height="13px" width="13px" />
          </span>
        </div>
      </div>
    )
  );
});

FooterLogin.propTypes = {
  user: PropTypes.object.isRequired,
  cookieVisibility: PropTypes.bool,
};

FooterLogin.defaultProps = {
  cookieVisibility: true,
};

export default FooterLogin;
