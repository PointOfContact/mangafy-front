/* eslint-disable no-nested-ternary */
import React from 'react';

import client from 'api/client';
import SvgChange from 'components/icon/Change';
import SvgDelete from 'components/icon/Delete';
import SvgExport from 'components/icon/Export';
import Popconfirm from 'components/popconfirm';
import PropTypes from 'prop-types';
import download from 'utils/downloadImages';

import styles from './styles.module.scss';

const EditCard = ({ confirmDelete, editCard, hero, setEdit, componentNames, clickDelete }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  const popConfirm =
    hero?.type === 'personage'
      ? !!componentNames?.length
        ? `This character already appears and is a part of one of the сhapters. Are you sure you want to delete it?`
        : 'Are you sure to delete this personage'
      : `Are you sure to delete this ${hero?.type}`;

  return (
    <div className={styles.changeCard}>
      <div onClick={(handleClick, editCard, setEdit(true))} className={styles.editCard}>
        <SvgChange width="9px" height="11px" />
      </div>

      <div
        onClick={handleClick}
        className={styles.loadImage}
        title={!!hero?.imageUrl?.length ? '' : 'image not available'}
        style={{ cursor: !!hero?.imageUrl?.length ? 'pointer' : 'not-allowed' }}>
        <span
          onClick={() =>
            !!hero?.imageUrl?.length && download(client.UPLOAD_URL + hero?.imageUrl, hero?.name)
          }>
          <SvgExport width="11px" height="9px" />
        </span>
      </div>

      <div onClick={handleClick}>
        <Popconfirm
          overlayClassName={styles.popConfirm}
          position={hero?.type === 'background' ? 'right' : 'bottom'}
          title={popConfirm}
          onConfirm={confirmDelete}
          onClick={clickDelete}
          okText="Delete"
          cancelText="Cancel"
          item={
            <span className={styles.deleteCard}>
              <SvgDelete width="10px" height="11px" />
            </span>
          }
        />
      </div>
    </div>
  );
};

EditCard.propTypes = {
  confirmDelete: PropTypes.func,
  editCard: PropTypes.func,
  hero: PropTypes.object,
  setEdit: PropTypes.func,
  componentNames: PropTypes.array,
  clickDelete: PropTypes.func,
};

EditCard.defaultProps = {
  confirmDelete: () => {},
  editCard: () => {},
  hero: {},
  setEdit: () => {},
  componentNames: [],
  clickDelete: () => {},
};

export default EditCard;
