import React from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';

import styles from './styles.module.scss';

const createParticipantItems = (participants, setParticipantItems) => {
  const items = participants?.map(
    (value, index) =>
      index < 6 && (
        <Tooltip key={value._id + index} placement="top" title={value.name} arrowPointAtCenter>
          <div className={styles.participantsItem}>
            <Link href={`/profile/${value._id}`}>
              <a>
                {value.avatar ? (
                  <Imgix
                    width={40}
                    height={40}
                    src={client.UPLOAD_URL + value.avatar}
                    alt={'MangaFy participants image'}
                  />
                ) : (
                  <Avatar className={styles.defaultAvatar} text={value.name} size={69} />
                )}
              </a>
            </Link>
          </div>
        </Tooltip>
      )
  );
  setParticipantItems(items);
};

export default createParticipantItems;
