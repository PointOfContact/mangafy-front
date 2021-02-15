import { MenuOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import Link from 'next/link';

import SvgTopArrow from '../icon/TopArrow';
import SvgUser from '../icon/User';
import SvgWhiteFacebook from '../icon/WhiteFacebook';
import SvgWhiteTwitter from '../icon/WhiteTwitter';
import MenuLinks from './menuLinks';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

class MainMobile extends React.Component {
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
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  }

  _menuToggle(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const menuStatus = this.state.isOpen ? 'isopen' : '';

    return (
      <div ref="root" className="y-mandatory">
        <div className="menubar">
          <div id="hambmenu" className={menuStatus} onClick={this._menuToggle}>
            <MenuOutlined style={{ fill: 'black' }} />
          </div>
          <div className="title">
            <img src="/img/logoFirst.png" width="84" height="83" alt="" />
          </div>
          <div className="my_profile_svg">
            <Link href="/my-profile">
              <SvgUser width="36px" height="36px" />
            </Link>
          </div>
        </div>
        <MenuLinks menuStatus={menuStatus} />
        <div className="section_mob_1 mandatory-element"></div>
        <div className="section_mob_2 mandatory-element">
          <div className="absolute_block">
            <img src="/img/sectionMob_2.svg" alt="" />
            <div>
              <p>
                MangaFY believes that even aspiring artists can make the next big comic or graphic
                novel, and the journey should not be a solo act but a joint journey of
                collaboration. At the heart of our vision – collaborations – allowing visionary of
                various roles to engage in a team effort to bring a story from uncertainty to
                digital life, with you – the artists – taking control of the production.
                <br />
                <span>MangaFY – the new way for artists to interact. </span>
              </p>
            </div>
          </div>

          <Link href="/create-a-story/start">
            <button id="homeMobileStartJourneyBtnId" className="start_your_jorney_mobile">
              Start your journey
            </button>
          </Link>
        </div>
        <div className="section_mob_3 mandatory-element"></div>
        <div className="section_mob_4 mandatory-element"></div>
        <div className="section_mob_5 mandatory-element"></div>
        <div className="section_mob_6 mandatory-element">
          <div className="section_follow">
            <button id="homeMobileTwitterBtnId">
              <a href="https://twitter.com/Mangafy1">
                <SvgWhiteTwitter width="70px" height="70px" />
              </a>
            </button>
            <button id="homeMobileFacebookBtnId">
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
export default MainMobile;
