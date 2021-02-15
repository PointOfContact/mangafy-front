import * as React from 'react';

import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Card = ({
  btnText,
  className,
  onClick,
  splitterStyle,
  items,
  disabled,
  description,
  ...rest
}) => (
  <div className={cn(styles.card, className)} {...rest} style={splitterStyle || {}}>
    <div
      className={cn(styles.description)}
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
    <PrimaryButton
      onClick={onClick}
      disabled={disabled}
      text={btnText}
      splitterStyle={{
        fontSize: '15px',
      }}
    />
    {items?.length ? (
      <div className={styles.main}>
        {items.map((item, index) => (
          <div key={index} className={styles.card_img}>
            {item}
          </div>
        ))}
      </div>
    ) : (
      ''
    )}
  </div>
);

Card.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  splitterStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  description: PropTypes.string,
};

Card.defaultProps = {
  className: {},
  disabled: false,
  splitterStyle: {},
  items: [],
  btnText: '',
  onClick: () => {},
  description: '',
};

export default Card;
