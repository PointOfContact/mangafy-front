import React from 'react';

import { CommissionPricing } from 'components/commissionPricing';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const TabCommissionPricing = (props) => {
  const { user, profile } = props;

  return (
    <div className="content_tab_profile_1">
      <h3 className={styles.content_tab_profile_1__title}>Commision List</h3>
      {user._id === profile?._id && (
        <p className={styles.content_tab_profile_1__sub_title}>
          We believe that your talent is worth money, but how much, it's up to you, tell the whole
          world about it =) If you miised service, please let us know, and we will add it!
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
