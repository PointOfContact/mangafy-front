import React, { useState } from 'react';

import { Popover } from 'antd';

import SvgLink from '../icon/Link';

const PopoverCard = (props) => {
  const [visibility, changeVisibility] = useState(false);
  const hide = () => {
    changeVisibility(false);
  };
  const handleVisibleChange = (visible) => {
    changeVisibility(visible);
  };

  return (
    <Popover
      content={
        <ul className="like_like">
          <li>
            <a href={`/project/production/${props.id}?tab=jobs`}>
              Join &nbsp;
              <SvgLink width="8px" height="8px" />
            </a>
          </li>
        </ul>
      }
      trigger="click"
      visible={visibility}
      onVisibleChange={handleVisibleChange}
    />
  );
};

export default PopoverCard;
