import React from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import SvgPortfolio from '../icon/Portfolio';
import PopoverCard from '../popoverCard';

const ProfilesCard = ({ users, client }) =>
  users.map((user) => (
    <a className="link_card">
      <Link href={`profile/${user._id}`}>
        <div className="cards_div" style={{ backgroundImage: "url('./img/profile3back.png')" }}>
          <div className="card_autor">
            <img
              className="avatar"
              src={
                user.avatar
                  ? client.UPLOAD_URL + user.avatar
                  : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
              }
              alt=""
            />
            <div className="card_name">
              <h3>{user.name}</h3>
              <p className="special">{user.type}</p>
            </div>
          </div>
          <div className="tags_btn">
            {user.skills && user.skills.length > 0
              ? user.skills.map(({ content }) => <button>{content}</button>)
              : null}
          </div>
          <p className="card-text card_description">{user.content || 'No description'}</p>
          <div className="card_icons">
            <span>
              <SvgPortfolio width="14px" height="14px" />
              <span style={{ marginLeft: '5px', marginTop: '2px' }}>
                {user.collaboration == 'paid' ? 'Paid Collab' : 'Joint Collab'}
              </span>
            </span>
            <span style={{ marginLeft: '5px' }}>
              <PopoverCard id={user._id} />
            </span>
          </div>
        </div>
      </Link>
    </a>
  ));

ProfilesCard.prototype = {
  users: PropTypes.array,
  client: PropTypes.object,
};

export default ProfilesCard;
