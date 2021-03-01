import React from 'react';

import SelectFilter from 'components/ui-elements/select-filter';
import { allCollaborations } from 'helpers/constant';
import PropTypes from 'prop-types';

import SvgSearch from '../icon/Search';
import styles from './styles.module.scss';

const SearchForCollaborations = ({ onChange, placeholder, initialValue, type }) => (
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
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
};

SearchForCollaborations.defaultProps = {
  placeholder: '',
  initialValue: '',
};

export default SearchForCollaborations;
