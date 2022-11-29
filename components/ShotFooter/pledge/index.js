import Imgix from 'components/imgix';
import React from 'react';
import styles from './styles.module.scss';
import client from 'api/client';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Pledge = ({ item, image, user }) => {
  const ifPayed = user?.chargebee?.data?.some((val) => val.itemId === item._id);

  return (
    <div className={styles.chapterAvatar}>
      <Imgix
        width={60}
        height={60}
        objectFit="cover"
        src={client.UPLOAD_URL + image}
        alt="Mangafy image"
      />
      {!!item.planId && <div className={cn(styles.pledge, ifPayed && styles.disabled)}>Pledge</div>}
    </div>
  );
};

Pledge.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  image: PropTypes.string,
};

Pledge.defaultProps = {
  image: '',
};

export default Pledge;
