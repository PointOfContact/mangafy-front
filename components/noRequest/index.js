import * as React from 'react';

import Imgix from 'components/imgix';
import LargeButton from 'components/ui-elements/large-button';
import Link from 'next/link';

import styles from './styles.module.scss';

const NoRequest = () => (
  <div className={styles.noRequest}>
    <Imgix
      layout="intrinsic"
      width={240}
      height={202}
      src="https://mangafy.club/img/join-ico.webp"
      alt="MangaFy join icon"
    />
    <h2>No Messages, yet.</h2>
    <p>No messages in your inbox, yet! Start collaborate with people around you.</p>
    <div>
      <Link href="/profiles">
        <a>
          <LargeButton text="Find enthusiasts" />
        </a>
      </Link>
    </div>
  </div>
);

export default NoRequest;
