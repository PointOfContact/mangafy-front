import { Popover, Button, BackTop, Tabs } from 'antd';
import client from 'api/client';
import { Comments } from 'components/comments';
import SvgCat from 'components/icon/Cat';
import SvgCheck from 'components/icon/Check';
import SvgClose from 'components/icon/Close';
import SvgEye from 'components/icon/Eye';
import SvgHeart from 'components/icon/Heart';
import SvgLang from 'components/icon/Lang';
import SvgLink from 'components/icon/Link';
import SvgMone from 'components/icon/Mone';
import SvgMore from 'components/icon/More';
import SvgTie from 'components/icon/Tie';
import SvgWhiteFacebook from 'components/icon/WhiteFacebook';
import SvgWhiteTwitter from 'components/icon/WhiteTwitter';
import MenuLinks from 'components/mobileVersion/menuLinks';
import MobileHeader from 'components/mobileVersion/mobileHeader';
import ModalStart from 'components/modals/Modal';
import { ShareButtons } from 'components/share';
import { userTypesEnums } from 'helpers/constant';
import Link from 'next/link';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
const { TabPane } = Tabs;
const Hover = (
  <div>
    <Popover content="Coming soon!">COMMENTS</Popover>
  </div>
);
// class MenuLinks extends React.Component {
//   constructor(props) {
//     super(props);
//     // Any number of links can be added here
//     this.state = {
//       links: [{
//         text: 'Contact Us',
//         link: 'mailto:withlove@mangafy.club',

//       }, {
//         text: 'Our Rules',
//         link: '#',

//       }, {
//         text: 'Terms and Conditions ',
//         link: 'terms',

//       },
//       {
//         text: 'Privacy Policy',
//         link: 'privacy',

//       }]
//     }
//   }
//   render() {
//     let links = this.state.links.map((link, i) => <li ref={i + 1}>{link.text}</li>);

//     return (
//       <div className={this.props.menuStatus} id='menu'>
//         <div className="mobile_div_part1">
//           <ul>
//             <Link href="/collaborations">
//               <li>
//                 Explore
//                         </li>
//             </Link>
//             <li>
//               <Link href="/create-a-story/start">Create a collab</Link>
//             </li>
//             <Link href="/profiles">
//               <li>
//                 Collabs
//             </li></Link>
//           </ul>
//         </div>
//         <ul className="links">
//           {links}
//         </ul>
//       </div>
//     )
//   }
// }
class PopoverCard extends React.Component {
  state = {
    visible: false,
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    return (
      <Popover
        content={
          <ul className="like_like">
            <li>
              <a href="#">
                View &nbsp;
                <SvgEye width="10px" height="6px" />
              </a>
            </li>
            <li>
              <a href="#">
                Join &nbsp;
                <SvgLink width="8px" height="8px" />
              </a>
            </li>
            <li>
              <a href="#">
                Like &nbsp;
                <SvgHeart width="8px" height="8px" />
              </a>
            </li>
          </ul>
        }
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}>
        <Button className="btn_popup">
          <SvgMore width="3px" height="12px" />
        </Button>
      </Popover>
    );
  }
}

class MenuPageFour extends React.Component {
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
    const { mangaStory = {}, user = {}, requests = [], isOwn } = this.props;

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
        <MobileHeader user={user} menuStatus={menuStatus} _menuToggle={this._menuToggle} />
        <MenuLinks menuStatus={menuStatus} />
        {/* <MenuLinks menuStatus={menuStatus} /> */}
        <div className="section_mob_page_3">
          <div className="container mangafy_container">
            <div className="row"></div>
          </div>
        </div>
        <section className="page_four_section_1">
          <div className="container mangafy_container">
            <div className="row">
              <div className="col-md-12">
                <div className="page_four_section_div_1">
                  <h5>{mangaStory.title}</h5>
                  <p>{mangaStory.introduce}</p>
                </div>
                <div className="manga-story-left p-3">
                  <img
                    className="img-max-height"
                    src={
                      !mangaStory.image
                        ? '/img/mangastory.jpg'
                        : client.UPLOAD_URL + mangaStory.image
                    }
                    alt=""
                  />
                  <div className="row ">
                    <div className="col-xs-3">
                      {mangaStory.genres &&
                        mangaStory.genres.slice(0, 1).map((g) => (
                          <>
                            <SvgCat width="18px" height="24px" />
                            <span>{g.name}</span>
                          </>
                        ))}
                    </div>
                    <div className="col-xs-3">
                      <SvgLang width="24px" height="24px" />
                      <span>{mangaStory.preferredLanguage}</span>
                    </div>
                    <div className="col-xs-2">
                      {mangaStory.searchingFor &&
                        mangaStory.searchingFor.slice(0, 1).map((sf) => (
                          <>
                            <SvgTie width="20px" height="20px" />

                            <span>{sf}</span>
                          </>
                        ))}
                    </div>
                    <div className="col-xs-4">
                      <SvgMone width="20px" height="20px" />
                      <span>
                        {mangaStory.compensationModel == 'paid' ? 'Paid Projects' : 'Collab'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="section_mob_2_page_4">
          <div className="container mangafy_container">
            <div className="row">
              <div className="manga-story-right ">
                <div className="avatar_div">
                  <img
                    className="avatar"
                    src={
                      mangaStory.authorInfo && mangaStory.authorInfo.avatar
                        ? client.UPLOAD_URL + mangaStory.authorInfo.avatar
                        : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
                    }
                    alt=""
                  />
                </div>
                <div className="p-3">
                  <p>
                    <p>
                      Hey My Name {mangaStory.authorInfo && mangaStory.authorInfo.name}, and i'm
                      open for collaboration
                    </p>
                    <p>
                      I am a looking to collaborate with{' '}
                      {mangaStory.searchingFor &&
                        mangaStory.searchingFor
                          .filter((item) => userTypesEnums[item])
                          .map((item) => userTypesEnums[item])
                          .join(', ')}
                    </p>
                    <p>
                      Compensation model:{' '}
                      {mangaStory.compensationModel == 'paid' ? 'Paid Collaboration $' : 'Freewill'}
                    </p>
                  </p>
                  <div>
                    <ModalStart pid={this.props.pid} isOwn={isOwn} user={user} />
                  </div>
                  <p>
                    With the help of the creators' patrons (fans/donors), MangaFY is able to
                    financially support manga artists
                  </p>
                  {/* <button id='mangaStoryMobileBackProjectBtnId' className="but-manga-story">Back this project</button> */}
                  <div>
                    <ShareButtons shareUrl={this.props.originUrl} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="section_mob_5_page_4">
          <div className="container mangafy_container">
            <div className="row">
              <div className="col-md-12">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="STORYY" key="1" className="story">
                    <div className="section_mob_tab_content">
                      <h3>Here is a my story!</h3>
                      <p>{mangaStory.story}</p>
                    </div>
                  </TabPane>
                  {/* <TabPane tab="GALLERY" key="2">
                    <div className='content_tab_profile_1'>
                      <Gallery fromPath='manga-stories' {...this.props} />
                    </div>
                  </TabPane> */}
                  <TabPane tab="COMMENTS" key="3">
                    <Comments mangaStory={mangaStory} user={user} />
                  </TabPane>
                  <TabPane tab="COMMUNITY" key="4">
                    <div className="container community">
                      <div className="row">
                        {/* <div className="col-lg-12">
                          <p className="comm_title">You have <span>3 new</span> messages</p>
                        </div> */}
                      </div>
                      <div className="row">
                        {requests.map((r) => (
                          <div className="col-lg-12 ">
                            <div className="row message_community">
                              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                <div className="title_block_community ">
                                  <img
                                    className="avatar"
                                    src={
                                      mangaStory.authorInfo && mangaStory.authorInfo.avatar
                                        ? client.UPLOAD_URL + mangaStory.authorInfo.avatar
                                        : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
                                    }
                                    alt=""
                                  />
                                  <div className="name_special">
                                    <h4>{r.senderInfo && r.senderInfo.name}</h4>
                                    <p>{r.senderInfo && r.senderInfo.type}</p>
                                  </div>
                                </div>
                                <p className="messages">
                                  {r.messages && r.messages[0] && r.messages[0].content}
                                </p>
                              </div>
                              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                {isOwn ? (
                                  <div className="div_buttons">
                                    <button id="mangaStoryMobleAcceptBtnId" className="accepct_btn">
                                      <SvgCheck width="21px" height="19px" />
                                    </button>
                                    <button
                                      id="mangaStoryMobleRejectBtnId"
                                      className="dont_accepct_btn">
                                      <SvgClose width="18px" height="18px" />
                                    </button>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
            <div className="row section_6_mob_9">
              <div className="col-sm-6">
                <ModalStart pid={this.props.pid} isOwn={isOwn} user={user} />
              </div>
              <div className="col-sm-6">
                {/* <button id="mangaStoryMobleBackProject2BtnId" className="but-manga-story">Back this project</button> */}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="story_name">
                  <Link href={`/profile/${mangaStory.authorInfo && mangaStory.authorInfo._id}`}>
                    <div className="firsterDiv">
                      <img
                        className="avatar"
                        src={
                          mangaStory.authorInfo && mangaStory.authorInfo.avatar
                            ? client.UPLOAD_URL + mangaStory.authorInfo.avatar
                            : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
                        }
                        alt=""
                      />
                      <h5>
                        {mangaStory.authorInfo && mangaStory.authorInfo.name}
                        <br />
                        {mangaStory.authorInfo && mangaStory.authorInfo.type}
                      </h5>
                    </div>
                  </Link>
                  <div className="last_div_story">
                    <h4>About me</h4>
                    <p>{mangaStory.authorInfo && mangaStory.authorInfo.content}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-lg-12">
                <div className="join_support">
                  <h3>Just support</h3>
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <p>
                      Back it because you believe in it.
                      Support the project for no reward, just because it speaks to you.
                        </p>
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="item_name" value={`Donate for manga story #${mangaStory._id}`}></input>
                    <input type="hidden" name="item_number" value={mangaStory._id}></input>
                    <input type="hidden" name="cancel_return" value={`${this.props.path}?paypal_cancel=true`}></input>
                    <input type="hidden" name="return" value={`${this.props.path}?paypal_success=true`}></input>
                    <input type="hidden" name="custom" value={user && user._id}></input>
                    <input type="hidden" name="hosted_button_id" value="JURZNUSJ8HLJJ" />
                    <div class="donate">
                      <input class="btn_main" name="submit" type="submit" value="Donate" />
                      <div class="cards">
                        <div class="img visa"></div>
                        <div class="img master"></div>
                        <div class="img ax"></div>
                        <div class="img bank"></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div> */}
          </div>
        </section>
        <div className="section_mob_6">
          <div className="section_follow">
            <button id="mangaStoryMobleTwitterBtnId">
              <a href="https://twitter.com/Mangafy1">
                <SvgWhiteTwitter width="70px" height="70px" />
              </a>
            </button>
            <button id="mangaStoryMobleFacebookBtnId">
              <a href="https://www.facebook.com/mangafyy">
                <SvgWhiteFacebook width="70px" height="71px" />
              </a>
            </button>
          </div>
        </div>
        <BackTop>
          <div style={style}>{/* top-arrow */}</div>
        </BackTop>
      </div>
    );
  }
}
export default MenuPageFour;
