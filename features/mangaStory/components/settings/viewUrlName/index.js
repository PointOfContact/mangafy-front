import React, { useState } from 'react';

import { Tooltip, Radio } from 'antd';
import client from 'api/client';
import SvgCopy from 'components/icon/Copy';
import PrimaryInput from 'components/ui-elements/input';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const ViewUrlName = ({ storyBoard, baseData, onChangeSingleField }) => {
  const [value, setValue] = useState(baseData?.typeUrlView);
  const [copyText, setCopyText] = useState('Copy to clipboard');
  const [viewUrlName, setViewUrlName] = useState(baseData?.viewUrlName);

  const onChange = (e) => {
    onChangeSingleField(e, true);
    setValue(e.target.value);
  };

  const ifCustomSubdomain = value === 'Custom subdomain';

  return (
    <div className={styles.viewLink}>
      <div className={styles.titleContainer}>
        <h2>Generate a personal page for your project</h2>
        <div className={styles.betaButton}>Beta</div>
      </div>
      <p>
        Claim project name and give fans an easy-to remember web adres for your Webcomics project
      </p>

      <Radio.Group
        name={'typeUrlView'}
        onChange={onChange}
        value={value}
        className={styles.radioButton}>
        <Radio value={'Custom subdomain'}>
          Custom subdomain
          {ifCustomSubdomain && (
            <div className={styles.standardDomain}>
              <PrimaryInput
                className={styles.viewUrlName}
                value={viewUrlName}
                onChange={(e) => {
                  setViewUrlName(e.target.value);
                }}
                onBlur={() => {
                  const data = {
                    target: {
                      name: 'viewUrlName',
                      value: viewUrlName,
                    },
                  };
                  onChangeSingleField(data, true);
                }}
              />
              <span>.mangafy.club</span>
            </div>
          )}
        </Radio>

        <Radio value={'Standard domain'}>Standard domain</Radio>
      </Radio.Group>

      <h3 className={styles.getLink}>Get the link or share on social</h3>
      <div className={styles.copyView}>
        <PrimaryInput
          disabled={true}
          className={styles.viewUrl}
          value={
            ifCustomSubdomain
              ? `https://${viewUrlName}.mangafy.club`
              : `${client.API_ENDPOINT}/manga-view/${storyBoard?._id}`
          }
        />
        <Tooltip placement="topLeft" title={copyText}>
          <div
            className={styles.copy}
            onClick={() => {
              setCopyText('Copied');
              copy(
                ifCustomSubdomain
                  ? `https://${viewUrlName}.mangafy.club`
                  : `${client.API_ENDPOINT}/manga-view/${storyBoard?._id}`
              );
            }}
            onMouseOut={() => setCopyText('Copy to clipboard')}>
            <SvgCopy width="18px" height="18px" alt="mangaFy copy icon" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

ViewUrlName.propTypes = {
  storyBoard: PropTypes.object.isRequired,
  baseData: PropTypes.object.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
};

export default ViewUrlName;
