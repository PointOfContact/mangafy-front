import React from 'react';

import { CommissionPricing } from 'components/CommissionPricing';
import PropTypes from 'prop-types';

const TabCommissionPricing = (props) => {
  const { user } = props;

  return (
    <div className="content_tab_profile_1">
      <h3>Commision List</h3>
      <p>
        We believe that your talent is worth money, but how much, it's up to you, tell the whole
        world about it =) If you miised service, please let us know, and we will add it!
      </p>
      <CommissionPricing user={user} id={user?._id} />
    </div>
  );
};

TabCommissionPricing.propTypes = {
  user: PropTypes.object.isRequired,
};
export default TabCommissionPricing;
