import React from 'react';

import cn from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

import BottomArrow from '../icon/BottomArrow';
import Close from '../icon/Close';
import SvgSearch from '../icon/Search';
import styles from './styles.module.scss';

const SearchForCollaborations = ({ onChange, placeholder, initialValue }) => (
  <>
    <div className={styles.box}>
      <div className={'container'}>
        <div className={styles.box__wrapper}>
          <form className={styles.box__search}>
            <i className={styles.box__search_icon}>
              <SvgSearch width="30" height="30" />
            </i>
            <input
              className={styles.box__search_field}
              type="search"
              name="search"
              placeholder={placeholder}
              onChange={onChange}
              initialValue={initialValue}
            />
          </form>
          <div className={styles.box__nav}>
            <button className={cn(styles.box__nav_button)}>
              <span className={styles.box__nav_button__text}>All collaboration</span>
              <i className={styles.box__nav_button__icon}>
                <BottomArrow width="17" height="10" />
              </i>
            </button>
            <button className={cn(styles.box__nav_button, styles.box__nav_button__active)}>
              <span className={styles.box__nav_button__text}>All Fields</span>
              <i className={styles.box__nav_button__icon}>
                <BottomArrow width="17" height="10" />
              </i>
            </button>
            <div className={styles.box__nav_menu}>
              <button className={styles.box__nav_menu__close}>
                <Close width="12" height="12" />
              </button>
              <ul className={styles.box__nav_menu__list}>
                <li className={styles.box__nav_menu__list_item}>
                  <Link href="#">
                    <button className={styles.box__nav_menu__list_link}>Writer</button>
                  </Link>
                </li>
                <li className={styles.box__nav_menu__list_item}>
                  <Link href="#">
                    <button className={styles.box__nav_menu__list_link}>Illustrator</button>
                  </Link>
                </li>
                <li className={styles.box__nav_menu__list_item}>
                  <Link href="#">
                    <button className={styles.box__nav_menu__list_link} disabled>
                      Editor
                    </button>
                  </Link>
                </li>
                <li className={styles.box__nav_menu__list_item}>
                  <Link href="#">
                    <button className={styles.box__nav_menu__list_link} disabled>
                      Mentor
                    </button>
                  </Link>
                </li>
                <li className={styles.box__nav_menu__list_item}>
                  <Link href="#">
                    <button className={styles.box__nav_menu__list_link}>Publisher</button>
                  </Link>
                </li>
                <li className={styles.box__nav_menu__list_item}>
                  <Link href="#">
                    <button className={styles.box__nav_menu__list_link} disabled>
                      Reviewer
                    </button>
                  </Link>
                </li>
                <li className={styles.box__nav_menu__list_item}>
                  <Link href="#">
                    <button className={styles.box__nav_menu__list_link} disabled>
                      Translator
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

SearchForCollaborations.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
};

SearchForCollaborations.defaultProps = {
  placeholder: '',
  initialValue: '',
};

export default SearchForCollaborations;
