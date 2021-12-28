import React, { useEffect, useState } from 'react';

import { Tooltip, Radio } from 'antd';
import cn from 'classnames';
import SvgCopy from 'components/icon/Copy';
import PrimaryInput from 'components/ui-elements/input';
import copy from 'copy-to-clipboard';
import { EVENTS } from 'helpers/amplitudeEvents';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import getDeviceId from 'utils/deviceId';

import styles from '../styles.module.scss';

const ViewUrlName = ({ baseData, onChangeSingleField, sendEvent, storyBoard }) => {
  const [value, setValue] = useState(baseData?.typeUrlView);
  const [copyText, setCopyText] = useState('Copy to clipboard');
  const [isTouched, setIsTouched] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [viewUrlName, setViewUrlName] = useState(baseData?.viewUrlName);
  const validViewUrlName = viewUrlName?.length < 2 || !viewUrlName?.match(/^[a-z]+$/);
  const router = useRouter();
  const ref = React.createRef();

  useEffect(() => {
    !!router.query.active &&
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    getDeviceId(setDeviceId);
  }, []);

  const onChange = (e) => {
    onChangeSingleField(e, true) &&
      sendEvent(EVENTS.EDIT_PROJECT_DOMAIN, 'customDomain', `https://${viewUrlName}.mangafy.club`);
    setValue(e.target.value);
  };

  const error = validViewUrlName && isTouched && (
    <p className={styles.error}>
      {viewUrlName.length < 2
        ? 'This field minimum length should be min 2 character'
        : 'Subdomain is invalid. Only characters are allowed.'}
    </p>
  );

  const ifCustomSubdomain = value === 'Custom subdomain';

  return (
    <div ref={ref} className={styles.viewLink}>
      <div className={styles.titleContainer}>
        <h2>Generate a personal page for your project</h2>
        <div className={styles.betaButton}>Beta</div>
      </div>
      <p>
        Claim project name and give fans an easy-to remember web address for your Webcomics project
      </p>

      {ifCustomSubdomain && <p className={styles.customSubdomainTitle}> Custom subdomain </p>}

      <Radio.Group
        name={'typeUrlView'}
        onChange={onChange}
        value={value || 'Standard domain'}
        className={cn(styles.radioButton, !ifCustomSubdomain && styles.custom)}>
        <Radio value={'Custom subdomain'}>
          {!ifCustomSubdomain && 'Custom subdomain'}
          {ifCustomSubdomain && (
            <>
              <div className={styles.standardDomain}>
                <PrimaryInput
                  className={styles.viewUrlName}
                  placeholder="subdomain"
                  value={viewUrlName}
                  onChange={(e) => {
                    setIsTouched(true);
                    setViewUrlName(e.target.value);
                  }}
                  onBlur={() => {
                    const data = {
                      target: {
                        name: 'viewUrlName',
                        value: viewUrlName,
                      },
                    };
                    !validViewUrlName &&
                      onChangeSingleField(data, true) &&
                      sendEvent(
                        EVENTS.EDIT_PROJECT_DOMAIN,
                        'customDomain',
                        `https://${viewUrlName}.mangafy.club`
                      );
                  }}
                />
                <span>.mangafy.club</span>
              </div>
            </>
          )}
        </Radio>
        {error}
        <Radio
          value={'Standard domain'}
          onChange={() => {
            sendEvent(EVENTS.EDIT_PROJECT_DOMAIN, 'domain', 'standard');
            setIsTouched(false);
          }}>
          Standard domain
        </Radio>
      </Radio.Group>

      <h3 className={styles.getLink}>Get the link or share on social</h3>
      <div className={styles.copyView}>
        <div className={styles.viewUrl}>
          {ifCustomSubdomain
            ? `https://${!!viewUrlName ? viewUrlName : '?'}.mangafy.club`
            : `https://mangafy.club/manga-view/${storyBoard?._id}`}
        </div>

        <Tooltip placement="topLeft" title={copyText}>
          <div
            className={styles.copy}
            onClick={() => {
              setCopyText('Copied');
              copy(
                ifCustomSubdomain
                  ? `https://${!!viewUrlName ? viewUrlName : '?'}.mangafy.club`
                  : `https://mangafy.club/manga-view/${storyBoard?._id}`
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
  baseData: PropTypes.object.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  sendEvent: PropTypes.func.isRequired,
  storyBoard: PropTypes.object.isRequired,
};

export default ViewUrlName;
