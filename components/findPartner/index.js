import React, { useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import SvgAdd2 from 'components/icon/Add2';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const FindPartner = ({ participentsInfo }) => {
  const [items] = useState(
    participentsInfo?.map(({ avatar, name, _id }) => (
      <Link className={styles.participentsCont} key={name} href={`/profile/${_id}`}>
        <a>
          <Tooltip placement="topLeft" title={name} arrowPointAtCenter>
            {avatar ? (
              <Imgix
                width={35}
                height={35}
                src={client.UPLOAD_URL + avatar}
                alt="Picture of the user"
              />
            ) : (
              <Avatar text={name} size={35} />
            )}
          </Tooltip>
        </a>
      </Link>
    ))
  );

  return (
    <div className={styles.find_partner}>
      <Link href="/profiles">
        <a>
          <PrimaryButton
            className={styles.findPartnerBtn}
            text="Find a partner"
            isPlump={true}
            items={items}
            suffix={<SvgAdd2 width="25px" height="25px" />}
          />
        </a>
      </Link>
    </div>
  );
};

FindPartner.propTypes = {
  participentsInfo: PropTypes.array,
};

FindPartner.defaultProps = {
  participentsInfo: [],
};

export default FindPartner;
