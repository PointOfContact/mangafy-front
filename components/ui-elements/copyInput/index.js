import React, { useState } from 'react';

import { Tooltip } from 'antd';
import cn from 'classnames';
import PrimaryInput from 'components/ui-elements/input';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CopyInput = ({ white, copyUrl, copyLink }) => {
  const [copyText, setCopyText] = useState('Copy to clipboard');
  return (
    <div className={cn(styles.copyContainer, white && styles.whiteContainer)}>
      <PrimaryInput
        id={'path'}
        className={styles.copyInput}
        placeholder={'https://mangafy.club/'}
        isFullWidth={true}
        isLinear={true}
        value={copyUrl}
        disabled={true}
      />
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
