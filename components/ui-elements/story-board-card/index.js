import * as React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';
import { WhiteChecked } from 'components/icon';
// Api
import restClient from 'api/restClient';
// Styles
import styles from './styles.module.scss';

const ChooseLayoutCard = ({
  title,
  description,
  className,
  onClick,
  isFullWidth,
  isActive,
  src,
  ...rest
}) => (
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
      <img src={`${restClient.API_ENDPOINT}/api/v2/uploads/${src}`} />
    </div>
    <h4 className={styles.title}>{title}</h4>
    <p className={styles.description}>{description}</p>
  </div>
);

ChooseLayoutCard.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isFullWidth: PropTypes.bool,
  isActive: PropTypes.bool,
  src: PropTypes.string.isRequired,
};

ChooseLayoutCard.defaultProps = {
  className: {},
  text: '',
  isFullWidth: false,
  isActive: false,
  onClick: () => {},
};

export default ChooseLayoutCard;
