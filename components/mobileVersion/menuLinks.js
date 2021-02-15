import React from 'react';

import Link from 'next/link';

class MenuLinks extends React.Component {
  constructor(props) {
    super(props);
    // Any number of links can be added here
    this.state = {
      links: [
        {
          text: 'About us',
          link: '#',
        },
        {
          text: 'Community Guidelines',
          link: '#',
        },
        {
          text: 'Terms',
          link: '/terms',
        },
        {
          text: 'Privacy Policy',
          link: '/privacy-policy',
        },
      ],
    };
  }

  removeAllStorage = () => {};

  render() {
    const links = this.state.links.map((link, i) => <li ref={i + 1}>{link.text}</li>);

    return (
      <div className={this.props.menuStatus} id="menu">
        <div className="mobile_div_part1">
          <ul>
            <li>
              <Link href="/collaborations?compensationModel=paid">Paid Projects</Link>
            </li>
            <li>
              <Link href="/collaborations?compensationModel=collaboration">Collabs</Link>
            </li>
            <li>
              <Link href="/create-a-story/start">Create a collab</Link>
            </li>
            <Link href="/profiles">
              <li>Members</li>
            </Link>
          </ul>
        </div>
        <ul className="links">
          {links}
          <Link href="/">
            <li onClick={this.removeAllStorage}>Sign out</li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default MenuLinks;
