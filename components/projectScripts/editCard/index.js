import React from 'react';

import SvgChange from 'components/icon/Change';
import SvgDelete from 'components/icon/Delete';
import Popconfirm from 'components/popconfirm';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const EditCard = ({ confirm, modalIndex, showModalScript }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.editScriptContainer}>
      <div
        onClick={(e) => {
          handleClick(e);
          showModalScript(true);
        }}
        className={styles.editScript}>
        <SvgChange />
      </div>
      <div onClick={handleClick}>
        <Popconfirm
          overlayClassName={styles.popConfirm}
          placement="top"
          title="Are you sure to delete this script"
          onConfirm={() => {
            confirm(modalIndex);
          }}
          item={
            <span className={styles.deletePageMobile}>
              <SvgDelete />
            </span>
          }
        />
      </div>
      {/* <div onClick={handleClick} className={styles.messageScript}>
        //replace this svg
        <SvgChange />
      </div> */}
    </div>
  );
};

EditCard.propTypes = {
  confirm: PropTypes.func.isRequired,
  modalIndex: PropTypes.number.isRequired,
  showModalScript: PropTypes.func.isRequired,
};

export default EditCard;
