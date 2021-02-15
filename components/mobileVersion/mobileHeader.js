import React, { useEffect, useState } from 'react';

import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';

import SvgUser from '../icon/User';

const MobileHeader = ({ _menuToggle, menuStatus, user }) => {
  const [background, setBackground] = useState('none');
  useEffect(() => {
    document.addEventListener('scroll', _handleScroll, false);
    return () => document.removeEventListener('scroll', _handleScroll);
  }, []);

  const _handleScroll = (e) => {
    if (window.scrollY > 20) {
      setBackground('white');
    } else {
      setBackground('none');
    }
  };

  return (
    <>
      <div className="menubar" style={{ background }}>
        <div id="hambmenu" className={menuStatus} onClick={_menuToggle}>
          <MenuOutlined style={{ fill: 'black' }} />
        </div>
        {background === 'none' && (
          <div className="title">
            <img src="/img/logoFirst.png" width="84" height="83" alt="" />
          </div>
        )}
        <div className="my_profile_svg">
          <Link href={user && user._id ? '/my-profile' : '/sign-in'} className="my-profile">
            <SvgUser width="36px" height="36px" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
