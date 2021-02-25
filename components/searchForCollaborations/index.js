import React from 'react';

import cn from 'classnames';
import Link from 'next/link';

import BottomArrow from '../icon/BottomArrow';
import Close from '../icon/Close';
import SvgSearch from '../icon/Search';
import styles from './styles.module.scss';

import SelectFilter from 'components/ui-elements/select-filter';

import PropTypes from 'prop-types';

import { allCollaborations } from 'helpers/constant';

const SearchForCollaborations = ({ type, onChange, onSubmit, isLogin, disabled = false }) => (
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
              placeholder="Search for collaborations"
            />
            <button type="submit" className={styles.box__search_submit}>
              <SvgSearch width="22" height="22" />
            </button>
          </form>
          <div className={styles.box__nav}>
            <SelectFilter
              className={styles.box__nav_select}
              id="type"
              name="type"
              onChange={onChange}
              placeholder="All collaboration"
              value={type || undefined}
              options={allCollaborations}
            />
            <SelectFilter
              className={styles.box__nav_select}
              id="type"
              name="type"
              onChange={onChange}
              placeholder="All Fields"
              value={type || undefined}
              options={allCollaborations}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

SearchForCollaborations.propTypes = {
  type: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

SearchForCollaborations.defaultProps = {
  type: null,
  disabled: false,
};

export default SearchForCollaborations;
