import React, { useEffect, useRef, useState } from 'react';

import { BackTop, Input, Pagination } from 'antd';
import client from 'api/client';
import SvgParams from 'components/icon/Params';
import SvgSearch from 'components/icon/Search';
import SvgTopArrow from 'components/icon/TopArrow';
import SvgWhiteFacebook from 'components/icon/WhiteFacebook';
import SvgWhiteTwitter from 'components/icon/WhiteTwitter';
import MenuLinks from 'components/mobileVersion/menuLinks';
import MobileHeader from 'components/mobileVersion/mobileHeader';
import ProfilesCard from 'components/profilesCard';
import Link from 'next/link';
import PropTypes from 'prop-types';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
const ProfilesMobile = (props) => {
  const [isOpen, changeIsOpen] = useState(false);
  const refs = useRef();
  const { users, total, current, user, onInputChange = () => {}, onChange = () => {} } = props;
  const menuStatus = isOpen ? 'isopen' : '';

  useEffect(() => {
    document.addEventListener('click', _handleDocumentClick);
    return () => {
      document.removeEventListener('click', _handleDocumentClick);
    };
  }, [isOpen]);
  const _handleDocumentClick = (e) => {
    if (!refs.root.contains(e.target) && isOpen === true) {
      changeIsOpen(false);
    }
  };

  const _menuToggle = (e) => {
    e.stopPropagation();
    changeIsOpen(!isOpen);
  };

  return (
    <div className="mobile_version" ref={refs}>
      <MobileHeader user={user} menuStatus={menuStatus} _menuToggle={_menuToggle} />
      <MenuLinks menuStatus={menuStatus} />
      <div className="section_mob_page_3 mandatory-element">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mobile_page_3">
                <h1>Collect them All!</h1>
                <h4>All graphic novel enthusiasts, from all genres, in one place - MangaFY</h4>
                <Link href="/profiles">
                  <button id="profileMobileJoinBtnId">Join to MangaFY</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mandatory-element-list">
        <section className="search_collab_mobile">
          <div className="container mangafy_container search_field">
            <div className="row" style={{ flexWrap: 'nowrap' }}>
              <div className="col-sm-10">
                <div
                  style={{
                    display: 'flex',
                  }}>
                  <button>
                    <SvgSearch width="30px" height="30px" />
                  </button>
                  <Input
                    type="text"
                    style={{
                      width: '100%',
                    }}
                    placeholder="Search for collaborations"
                    allowClear
                    initialValue={props.search}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="search_btn">
                <SvgParams width="18px" height="18px" />
              </div>
            </div>
          </div>
        </section>
        <div className="section_mob_2_page_2">
          <div className="container mangafy_container">
            <div className="row">{<ProfilesCard users={users} client={client} />}</div>
            <div className="row">
              <div className="col-lg-12">
                <div className="pagination_cards">
                  <Pagination
                    showSizeChanger={false}
                    pageSize={9}
                    defaultCurrent={9}
                    total={total}
                    current={current}
                    onChange={(page, pageSize) => {
                      onChange(page, pageSize);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section_mob_6 mandatory-element">
        <div className="section_follow">
          <button id="profilesMobileTwitterBtnId">
            <a href="https://twitter.com/Mangafy1">
              <SvgWhiteTwitter width="70px" height="70px" />
            </a>
          </button>
          <button id="profilesMobileFacebookBtnId">
            <a href="https://www.facebook.com/mangafyy">
              <SvgWhiteFacebook width="70px" height="71px" />
            </a>
          </button>
        </div>
      </div>
      <BackTop>
        <div style={style}>
          <SvgTopArrow width="130px" height="130px" />
        </div>
      </BackTop>
    </div>
  );
};
ProfilesMobile.prototype = {
  user: PropTypes.object,
  users: PropTypes.array,
  total: PropTypes.number,
  current: PropTypes.string,
  onInputChange: PropTypes.func,
  onChange: PropTypes.func,
};
export default ProfilesMobile;
