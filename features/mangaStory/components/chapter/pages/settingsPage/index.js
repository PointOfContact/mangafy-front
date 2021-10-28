import React from 'react';

import client from 'api/client';
import SvgChange from 'components/icon/Change';
import SvgDelete from 'components/icon/Delete';
import SvgExport from 'components/icon/Export';
import Popconfirm from 'components/popconfirm';
import PropTypes from 'prop-types';
import download from 'utils/downloadImages';

import styles from './styles.module.scss';

const SettingsPage = ({ pages }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.settingsPageContainer}>
      <div onClick={() => {}} className={styles.editCard}>
        <SvgChange width="11px" height="13px" />
      </div>

      <div onClick={handleClick} className={styles.loadImage}>
        <span
          onClick={() =>
            !!pages?.imageUrl?.length && download(client.UPLOAD_URL + pages?.imageUrl, pages?.name)
          }>
          <SvgExport width="13px" height="11px" />
        </span>
      </div>

      <div onClick={handleClick}>
        <Popconfirm
          overlayClassName={styles.popConfirm}
          position={'right'}
          title={`Are you sure to delete this`}
          onConfirm={() => {}}
          item={
            <span className={styles.deleteCard}>
              <SvgDelete width="12px" height="13px" />
            </span>
          }
        />
      </div>
    </div>
  );
};

SettingsPage.propTypes = {
  pages: PropTypes.array,
};

SettingsPage.defaultProps = {
  pages: [],
};

export default SettingsPage;
