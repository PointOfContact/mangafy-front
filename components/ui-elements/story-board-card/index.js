import * as React from 'react';

import restClient from 'api/restClient';
import cn from 'classnames';
import { WhiteChecked } from 'components/icon';
import PropTypes from 'prop-types';

// Styles
import PrimaryButton from '../button';
import styles from './styles.module.scss';

const ChooseLayoutCard = ({
  title,
  description,
  className,
  onClick,
  isFullWidth,
  isActive,
  src,
  downloadSrc,
  ...rest
}) => {
  const downloadImage = () => {
    window.open(`${restClient.API_ENDPOINT}/api/v2/uploads/${downloadSrc}`, '_blank');
  };

  return (
    <div
      {...rest}
      className={cn(
        styles.story_card,
        className,
        isActive && styles.active,
        isFullWidth && styles.full_width
      )}
      onClick={onClick}>
      {isActive && <WhiteChecked className={styles.checked} width="31px" height="31px" />}
      <div className={styles.img}>
        <img src={`${restClient.API_ENDPOINT}/api/v2/uploads/${src}`} alt="MangaFy uploads" />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
      {isActive && (
        <PrimaryButton text="Download" className={styles.download} onClick={downloadImage} />
      )}
    </div>
  );
};

ChooseLayoutCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isFullWidth: PropTypes.bool,
  isActive: PropTypes.bool,
  src: PropTypes.string.isRequired,
  downloadSrc: PropTypes.string.isRequired,
};

ChooseLayoutCard.defaultProps = {
  className: '',
  text: '',
  isFullWidth: false,
  isActive: false,
  onClick: () => {},
};

export default ChooseLayoutCard;
