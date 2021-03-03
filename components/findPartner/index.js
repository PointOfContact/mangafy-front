import React from 'react';

import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';

import styles from './styles.module.scss';

const FindPartner = () => (
  <div className={styles.find_partner}>
    <Link href="/profiles">
      <span>
        <PrimaryButton text="Find a partner" />
      </span>
    </Link>
  </div>
);

export default FindPartner;
