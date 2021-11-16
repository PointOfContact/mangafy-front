import React, { useState } from 'react';

import { Tooltip } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CopyInput = ({ white, copyUrl, copyLink }) => {
  const [copyText, setCopyText] = useState('Copy to clipboard');
  return (
    <div className={cn(styles.copyContainer, white && styles.whiteContainer)}>
      <div className={styles.copy}>{`https://mangafy.club/${copyUrl}`}</div>
      <Tooltip placement="topLeft" title={copyText}>
        <button
          className={cn(styles.copyButton, white && styles.whiteButton)}
          onClick={() => {
            copyLink();
            setCopyText('Copied');
          }}
          onMouseOut={() => {
            setCopyText('Copy to clipboard');
          }}>
          Copy
        </button>
      </Tooltip>
    </div>
  );
};

CopyInput.propTypes = {
  white: PropTypes.bool,
  copyUrl: PropTypes.string.isRequired,
  copyLink: PropTypes.func.isRequired,
};

CopyInput.defaultProps = {
  white: false,
};

export default CopyInput;
