import { BackTop, Card, Tabs } from 'antd';
import Link from 'next/link';

import client from '../../api/client';
import SvgTopArrow from '../icon/TopArrow';
import SvgWhiteFacebook from '../icon/WhiteFacebook';
import SvgWhiteTwitter from '../icon/WhiteTwitter';
import MobileHeader from './mobileHeader';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
const { Meta } = Card;

const listItemsOne = (mangaStories) =>
  mangaStories.map((label) => (
    <Link href={`/manga-story/${label._id}`}>
      <div className=" col-xs-12 card_after_div">
        <Card
          hoverable
          style={{ width: 312, marginLeft: '0 !important' }}
          cover={<img alt="mangafy" src={client.UPLOAD_URL + label.image} />}>
          <h3 className="text-elipsis">{label.title}</h3>
          <Meta title={label.introduce} description={label.description} />
        </Card>
      </div>
    </Link>
  ));
class MenuLinks extends React.Component {
  constructor(props) {
    super(props);
    // Any number of links can be added here
    this.state = {
      links: [
        {
          text: 'About us',
          link: '/about',
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

  render() {
    const links = this.state.links.map((link, i) => <li ref={i + 1}>{link.text}</li>);

    return (
      <div className={this.props.menuStatus} id="menu">
        <div className="mobile_div_part1">
          <ul>
            <Link href="/collaborations">
              <li>Сollab</li>
            </Link>
            <li>
              <Link href="/create-a-story/start">Create a project!</Link>
            </li>
            <Link href="/profiles">
              <li>Create a collab</li>
            </Link>
          </ul>
        </div>
        <ul className="links">{links}</ul>
      </div>
    );
  }
}

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false);
  }

  _handleDocumentClick(e) {
    if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
      this.setState({
        isOpen: false,
      });
    }
  }

  _menuToggle(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const menuStatus = this.state.isOpen ? 'isopen' : '';
    const { user = {}, profile = {}, mangaStories = [], limit, total } = this.props;
    return (
      <div className="mobile_version" ref="root">
        {/* <div className="menubar">
          <div className='hambclicker' onClick={this._menuToggle}>


          </div>
          <div id="hambmenu" className={menuStatus}>
            <span></span><span></span><span></span><span></span>
          </div>
          <div className="title">
            <img src="/img/logoFirst.png" width="84" height="83" alt="" />
          </div>
          <div className="my_profile_svg">
            <Link href="/my-profile">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.1236 28.2952C28.1249 28.2199 28.1253 28.1443 28.1249 28.0686C28.0946 22.5523 23.5943 18.0421 18.0781 18.0003C12.4594 17.9577 7.875 22.516 7.875 28.125C7.875 28.2032 7.87591 28.2812 7.87767 28.359C7.95466 31.7353 10.3264 34.6274 13.6011 35.4533C15.0298 35.8137 16.507 36 18 36C19.4927 36 20.9696 35.8138 22.3981 35.4535C25.6958 34.622 28.0672 31.6958 28.1236 28.2952V28.2952Z" fill="#212121" />
                <path d="M30.7274 5.27147C27.3476 1.8919 22.7796 0 17.9999 0C13.192 0 8.67178 1.87235 5.27203 5.27203C1.87228 8.67178 0 13.192 0 18C0 22.2431 1.50448 26.3632 4.23675 29.6018C4.55513 29.9788 4.88981 30.3436 5.23835 30.6939C5.48184 30.9386 5.89331 30.7177 5.83059 30.3782C5.69559 29.6474 5.625 28.8943 5.625 28.125C5.625 22.9901 8.76874 18.5757 13.2327 16.7053C13.4644 16.6082 13.5241 16.3041 13.3424 16.1307C12.0008 14.85 11.1845 13.0237 11.2541 11.0117C11.3759 7.49707 14.2192 4.64126 17.7334 4.5052C21.5762 4.35635 24.75 7.43955 24.75 11.25C24.75 13.1676 23.946 14.9007 22.6576 16.1307C22.4759 16.3041 22.5357 16.6082 22.7673 16.7053C27.2313 18.5757 30.375 22.9901 30.375 28.125C30.375 28.8943 30.3044 29.6474 30.1693 30.3782C30.1066 30.7176 30.5181 30.9385 30.7616 30.6938C31.1102 30.3434 31.445 29.9786 31.7635 29.6014C34.4955 26.3633 36 22.2432 36 18C36 13.1917 34.1275 8.67122 30.7274 5.27147V5.27147Z" fill="#212121" />
                <path d="M18 15.75C20.4853 15.75 22.5 13.7353 22.5 11.25C22.5 8.76472 20.4853 6.75 18 6.75C15.5147 6.75 13.5 8.76472 13.5 11.25C13.5 13.7353 15.5147 15.75 18 15.75Z" fill="#212121" />
              </svg>
            </Link>
          </div>
        </div> */}
        <MenuLinks menuStatus={menuStatus} />
        <MobileHeader user={user} menuStatus={menuStatus} _menuToggle={this._menuToggle} />
        <div className="section_my_profile">
          <div className="container mangafy_container">
            <div className="row"></div>
          </div>
        </div>
        <section className="my_profile_block_mobile">
          <div className="container mangafy_container">
            <div className="row" style={{ justifyContent: 'center' }}>
              <div className="col-lg-4">
                <div className="my_profile_upload_photo_mobile">
                  <img
                    style={{ width: 200 }}
                    src={
                      profile && profile.avatar
                        ? client.UPLOAD_URL + profile.avatar
                        : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="info_profile">
                  <h2>{profile.name}</h2>
                  <p>{profile.type}</p>
                  {/* <button>Contact</button> */}
                </div>
              </div>
              <div className="col-lg-2">
                {/* <div className="languages_btn">
                  <button>EN</button>
                  <button>JP</button>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        <section className="my_profile_tabs_mobile_9">
          <div className="container mangafy_container my_profile_tabs my_profile_tabs_mobile">
            <div className="row">
              <div className="col-lg-12">
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="STORY" key="1">
                    <div className="content_tab_profile_1">
                      <h3>About Me</h3>
                      <p>{profile.content}</p>
                      <h3>Genres</h3>
                      <div className="skils">
                        {profile.skills && profile.skills.length > 0
                          ? profile.skills.map(({ content }) => (
                              <button className="profileMobileTagClassname">{content}</button>
                            ))
                          : null}
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="PRICE AND PAYMENTS" disabled key="2">
                    Content of Tab Pane 2
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">{listItemsOne(mangaStories)}</div>
          </div>
        </section>

        <div className="section_mob_6">
          <div className="section_follow">
            <button id="profileTwitterBtnId">
              <a href="https://twitter.com/Mangafy1">
                <SvgWhiteTwitter width="70px" height="70px" />
              </a>
            </button>
            <button id="profileFacebookBtnId">
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
  }
}
export default MyProfile;
