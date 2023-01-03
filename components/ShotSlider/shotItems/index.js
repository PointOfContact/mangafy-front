import client from 'api/client';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import Imgix from 'components/imgix';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import styles from '../styles.module.scss';
import { Avatar } from 'antd';
import cn from 'classnames';
import Link from 'next/link';
import { buildShotURL } from 'helpers/shared';
import Lock from 'components/icon/new/Lock';
import PropTypes from 'prop-types';

const ShotItems = ({ allShots, user, activeShotRef, shot, ifPayedShot }) => {
  return allShots?.map((sh) => {
    const ifPayed = user?.chargebee?.data?.some((val) => val.itemId === sh._id || ifPayedShot);

    return !!sh?.planId && !ifPayed ? (
      <a
        ref={sh._id === shot._id ? activeShotRef : null}
        className={cn(
          styles.slider__item,
          sh._id === shot._id && styles.slider__item_active,
          styles.ifBsMoney
        )}
        key={sh._id}>
        {sh?.image ? (
          <div className={styles.imageContainer}>
            <Imgix width={96} height={96} objectFit="cover" src={client.UPLOAD_URL + sh?.image} />
            <Lock className={styles.blur__lock} />
          </div>
        ) : (
          <Avatar size={96} style={{ background: '#7B65F3', color: '#fff' }}>
            {sh?.title?.length > 8 ? sh?.title?.slice(0, 8) + '...' : sh?.title}
          </Avatar>
        )}
        {/* {sh?.title && <div className={styles.slider__itemTitle}>{sh?.title}</div>} */}
      </a>
    ) : (
      <Link key={sh._id} href={sh.isOld ? buildShotURL(sh._id, sh.authorId) : '/shot/' + sh._id}>
        <a
          ref={sh._id === shot._id ? activeShotRef : null}
          className={cn(styles.slider__item, sh._id === shot._id && styles.slider__item_active)}
          key={sh._id}>
          {sh?.image ? (
            <Imgix width={96} height={96} objectFit="cover" src={client.UPLOAD_URL + sh?.image} />
          ) : (
            <Avatar size={96} style={{ background: '#7B65F3', color: '#fff' }}>
              {sh?.title?.length > 8 ? sh?.title?.slice(0, 8) + '...' : sh?.title}
            </Avatar>
          )}
          {/* {sh?.title && <div className={styles.slider__itemTitle}>{sh?.title}</div>} */}
        </a>
      </Link>
    );
  });
};

ShotItems.propTypes = {
  shot: PropTypes.object.isRequired,
  allShots: PropTypes.array.isRequired,
  activeShotRef: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default ShotItems;
