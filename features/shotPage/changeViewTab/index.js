import cn from 'classnames';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgReadBookIcon from 'components/icon/ReadBookIcon';
import SvgRightArrow from 'components/icon/RightArrow';
import React from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OpenedBook from 'components/icon/new/OpenedBook';
import Page from 'components/icon/new/Page';

const ChangeViewTab = ({ conutPage, chapter, refBook, readStyle, setConutPage, setReadStyle }) => {
  const router = useRouter();
  const mangaUrlsLength = chapter?.mangaUrls.length;
  const onClickLeftArrow = async (e) => {
    e.stopPropagation();
    if (readStyle) {
      return refBook.current.pageFlip().flipPrev();
    }
    if (conutPage !== 1) {
      document.body.style.position = 'fixed';
      router.push(`#page${conutPage - 1}`);
      setConutPage(conutPage - 1);
    }
  };

  const onClickRightArrow = async (e) => {
    e.stopPropagation();
    if (readStyle) {
      return refBook.current.pageFlip().flipNext();
    }
    const plusNumber = conutPage !== mangaUrlsLength;
    if (plusNumber) {
      document.body.style.position = 'fixed';
      router.push(`#page${conutPage + 1}`);
      setConutPage(conutPage + 1);
    }
  };

  const chooseViewType = (boolean) => {
    setReadStyle(boolean);
    setConutPage(1);
  };

  const countPage = readStyle
    ? mangaUrlsLength % 2
      ? mangaUrlsLength + 1
      : mangaUrlsLength
    : mangaUrlsLength;

  return (
    <div className={styles.chooseReadType}>
      <div className={styles.arrowsContainer}>
        <SvgLeftArrow onClick={onClickLeftArrow} width={24} height={24} />
        <p>{`${conutPage} of ${countPage}`}</p>
        <SvgRightArrow onClick={onClickRightArrow} width={24} height={24} />
      </div>
      <div onClick={() => chooseViewType(false)}>
        <Page color="#aaa" className={cn(styles.listIcon, !readStyle && styles.listIcon_active)} />
      </div>
      <div onClick={() => chooseViewType(true)}>
        <OpenedBook
          color="#aaa"
          className={cn(styles.readIcon, readStyle && styles.readIcon_active)}
        />
      </div>
    </div>
  );
};

ChangeViewTab.propTypes = {
  conutPage: PropTypes.number.isRequired,
  chapter: PropTypes.object.isRequired,
  refBook: PropTypes.object,
  readStyle: PropTypes.bool.isRequired,
  setConutPage: PropTypes.func.isRequired,
  setReadStyle: PropTypes.func.isRequired,
};

ChangeViewTab.defaultProps = {
  refBook: null,
};

export default ChangeViewTab;
