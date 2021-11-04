import React from 'react';

import SvgDelete from 'components/icon/Delete';
import Popconfirm from 'components/popconfirm';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const SettingsPage = ({
  page,
  setVisibleModal,
  setModalTitle,
  setPageItem,
  chapterItem,
  setChapters,
  chapters,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  const confirmDelete = () => {
    mangaStoryAPI.pages.deletePage(
      chapterItem?.index,
      chapters,
      setChapters,
      page,
      setVisibleModal
    );
  };

  return (
    <div className={styles.settingsPageContainer}>
      {/* <div
        onClick={() => {
          setVisibleModal(true);
          setModalTitle('Edit page');
          setPageItem(page);
        }}
        className={styles.editCard}>
        <SvgChange width="11px" height="13px" />
      </div>

      <div onClick={handleClick} className={styles.loadImage}>
        <span
          style={{ cursor: !!page?.value?.imageUrl?.length ? 'pointer' : 'not-allowed' }}
          onClick={() =>
            !!page?.value?.imageUrl?.length &&
            download(client.UPLOAD_URL + page?.value?.imageUrl, page?.value?.name)
          }>
          <SvgExport width="13px" height="11px" />
        </span>
      </div> */}

      <div onClick={handleClick}>
        <Popconfirm
          overlayClassName={styles.popConfirm}
          position={'right'}
          title={`Are you sure to delete this`}
          onConfirm={confirmDelete}
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
  page: PropTypes.object,
  setVisibleModal: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,
  setPageItem: PropTypes.func.isRequired,
  chapterItem: PropTypes.object,
  chapters: PropTypes.array,
  setChapters: PropTypes.func,
};

SettingsPage.defaultProps = {
  page: {},
  chapterItem: {},
  chapters: [],
  setChapters: () => {},
};

export default SettingsPage;
