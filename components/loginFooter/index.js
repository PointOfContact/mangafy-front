import React from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const LoginFooter = ({ acaunt }) => (
  <>
    <footer className={styles.login_footer}>
      {!acaunt && (
        <>
          <p>No account yet?</p>
          <Link href="/sign-up">
            <a className="margin-horizontal-5">Start your journey</a>
          </Link>
        </>
      )}
      <p>
        To make MangaFY work we log user data. Click &quot;Sign in to accept MangaFY&apos;s
        <Link href="/terms">
          <a className="margin-horizontal-5"> Term and service </a>
        </Link>
        &
        <Link href="/privacy-policy">
          <a className="margin-horizontal-5"> Privacy Policy </a>
        </Link>
      </p>
    </footer>
  </>
);

LoginFooter.propTypes = {
  acaunt: PropTypes.bool,
};

LoginFooter.defaultProps = {
  acaunt: false,
};

export default LoginFooter;
