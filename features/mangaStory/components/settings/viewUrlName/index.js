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
import { Edit } from 'components/icon';

const ViewUrlName = ({ baseData, onChangeSingleField, sendEvent, storyBoard }) => {
  const [value, setValue] = useState(baseData?.typeUrlView);
  const [copyText, setCopyText] = useState('Copy to clipboard');
  const [isTouched, setIsTouched] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [viewUrlName, setViewUrlName] = useState();
  const [editSubdomain, setEditSubdomain] = useState(true);
  const validViewUrlName = viewUrlName?.length < 2 || !viewUrlName?.match(/^[a-z]+$/);
  const router = useRouter();
  const ref = React.createRef();

  useEffect(() => {
    !!router.query.active &&
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    setViewUrlName(baseData?.viewUrlName);
    getDeviceId(setDeviceId);
  }, []);

  const onChange = (e) => {
    const targetValue = e.target.value;
    onChangeSingleField(e, true, (err) => {
      setErrorMessage(err);
    }) &&
      sendEvent(EVENTS.EDIT_PROJECT_DOMAIN, 'customDomain', `https://${viewUrlName}.mangafy.club`);
    setValue(targetValue);
  };

  const error = errorMessage ? (
    <p className={styles.error}>{errorMessage}</p>
  ) : (
    !!validViewUrlName &&
    isTouched && (
      <p className={styles.error}>
        {errorMessage}
        {viewUrlName?.length < 2
          ? 'Use your creativity. Minimum 2 characters'
          : 'Subdomain is invalid. Only symbols and uppercase characters are allowed.'}
      </p>
    )
  );

  const onBlur = () => {
    setIsTouched(true);
    const data = {
      target: {
        name: 'viewUrlName',
        value: viewUrlName,
      },
    };
    setEditSubdomain(true);
    !validViewUrlName &&
      onChangeSingleField(data, true, (err) => {
        setErrorMessage(err);
      }) &&
      sendEvent(EVENTS.EDIT_PROJECT_DOMAIN, 'customDomain', `https://${viewUrlName}.mangafy.club`);
  };

  const ifCustomSubdomain = value === 'Custom subdomain';
  const copyUrl = `${viewUrlName || ''}.mangafy.club/project/production/${baseData._id}`;
  const url = `${viewUrlName || ''}.mangafy.club`;

  return (
    <div ref={ref} className={styles.viewLink}>
      <div className={styles.titleContainer}>
        <h2>My webcomics page link</h2>
        <div className={styles.betaButton}>Beta</div>
      </div>
      <p>
        Claim project name and give fans an easy-to remember web adres for your Webcomics project
      </p>
      {editSubdomain ? (
        <div className={styles.copyView}>
          <div className={styles.viewUrl}>{url}</div>
          <div className={styles.copy}>
            {!!viewUrlName && (
              <Tooltip placement="topLeft" title={copyText}>
                <div
                  // className={styles.copy}
                  onClick={() => {
                    setCopyText('Copied');
                    copy(copyUrl);
                  }}
                  onMouseOut={() => setCopyText('Copy to clipboard')}>
                  <SvgCopy width="18px" height="18px" alt="mangaFy copy icon" />
                </div>
              </Tooltip>
            )}
          </div>
          <Tooltip placement="topLeft" title={'Edit'}>
            <Edit width={20} height={20} onClick={() => setEditSubdomain(false)} />
          </Tooltip>
        </div>
      ) : (
        <div className={styles.standardDomain}>
          <PrimaryInput
            className={styles.viewUrlName}
            placeholder="Your domain"
            value={viewUrlName}
            onChange={(e) => {
              setErrorMessage('');
              setViewUrlName(e.target.value);
            }}
            onBlur={onBlur}
          />
          <span>.mangafy.club</span>
        </div>
      )}
      {error}
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
