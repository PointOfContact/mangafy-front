import React from 'react';

import { CommissionPricing } from 'components/commissionPricing';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const TabCommissionPricing = (props) => {
  const { user, profile } = props;

  return (
    <div className={styles.content_tab_profile_3}>
      <h3 className={styles.content_tab_profile_3__title}>Commision list</h3>
      {user && user._id === profile?._id && (
        <p className={styles.content_tab_profile_3__sub_title}>
          You can manage your commission list by adding a description and price
        </p>
      )}
      <CommissionPricing user={user} id={profile?._id} />
    </div>
  );
};

TabCommissionPricing.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object.isRequired,
};

TabCommissionPricing.defaultProps = {
  user: null,
};
export default TabCommissionPricing;
