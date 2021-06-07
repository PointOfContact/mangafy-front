import * as React from 'react';

import cn from 'classnames';
import SvgBlackBehance from 'components/icon/BlackBehance';
import SvgBlackDeviantart from 'components/icon/BlackDeviantart';
import SvgBlackDribbble from 'components/icon/BlackDribbble';
import SvgBlackFacebook from 'components/icon/BlackFacebook';
import SvgBlackInstagram from 'components/icon/BlackInstagram';
import SvgBlackPatreon from 'components/icon/BlackPatreon';
import SvgBlackTapas from 'components/icon/BlackTapas';
import SvgBlackTiktok from 'components/icon/BlackTiktok';
import SvgBlackTwitter from 'components/icon/BlackTwitter';
import SvgBlackWebtoon from 'components/icon/BlackWebtoon';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const AddButton = ({ className, onClick, name, height, width, ...rest }) => {
  const getIcon = () => {
    switch (name) {
      case 'facebook':
        return <SvgBlackFacebook width={width} height={height} />;
      case 'twitter':
        return <SvgBlackTwitter width={width} height={height} />;
      case 'instagram':
        return <SvgBlackInstagram width={width} height={height} />;
      case 'dribbble':
        return <SvgBlackDribbble width={width} height={height} />;
      case 'deviantart':
        return <SvgBlackDeviantart width={width} height={height} />;
      case 'behance':
        return <SvgBlackBehance width={width} height={height} />;
      case 'patreon':
        return <SvgBlackPatreon width={width} height={height} />;
      case 'webtoons':
        return <SvgBlackWebtoon width={width} height={height} />;
      case 'tiktok':
        return <SvgBlackTiktok width={width} height={height} />;
      case 'tapas':
        return <SvgBlackTapas width={width} height={height} />;
      default:
        break;
    }
  };
  return (
    <div {...rest} className={cn(styles.social_button, className)} onClick={onClick}>
      {getIcon()}
    </div>
  );
};

AddButton.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

AddButton.defaultProps = {
  className: '',
  isDark: false,
  isActive: false,
  disabled: false,
  isFullWidth: false,
  onClick: () => {},
  width: '25px',
  height: '25px',
};

export default AddButton;
