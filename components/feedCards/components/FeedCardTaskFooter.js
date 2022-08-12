import React from 'react';
import styles from './styles.module.scss';
import Button from 'components/ui-new/Button';
import Heart from 'components/icon/new/Heart';
import Dollar from 'components/icon/new/Dollar';
import Cherry from 'components/icon/new/Cherry';
import { useRouter } from 'next/router';

const FeedCardTaskFooter = ({ budget, mangaId }) => {
  const router = useRouter();
  return (
    <div className={styles.feedCardTaskFooter}>
      <Button
        sm={1}
        iconRight={1}
        rounded={1}
        icon={<Heart color="#fff" />}
        onClick={(e) => {
          e.stopPropagation();
          router.push('/manga-story/' + mangaId);
        }}>
        Apply
      </Button>
      {budget ? (
        <div className={styles.feedCardTaskFooter__budget}>
          {budget + ' USD'}
          <Dollar color={'#C3BAFA'} className={styles.feedCardTaskFooter__dollar} />
        </div>
      ) : (
        <div className={styles.feedCardTaskFooter__budget}>
          Collab
          <Cherry color={'#C3BAFA'} />
        </div>
      )}
    </div>
  );
};

export default FeedCardTaskFooter;
