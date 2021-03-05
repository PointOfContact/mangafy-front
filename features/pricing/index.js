import React, { useState } from 'react';

import { Switch } from 'antd';
import Footer from 'components/footer';
import Header from 'components/header';
import BlackVector from 'components/icon/BlackVector';
import WhiteVector from 'components/icon/WhiteVector';
import LargeButton from 'components/ui-elements/large-button';
import Head from 'next/head';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Pricing = (props) => {
  const { user } = props;

  const [period, setPeriod] = useState('month');

  const [personal1, setPersonal1] = useState(1);
  const [personal2, setPersonal2] = useState(5);
  const [personal3, setPersonal3] = useState(-1);

  const [plus1, setPlus1] = useState(4);
  const [plus2, setPlus2] = useState(6);
  const [plus3, setPlus3] = useState(-1);

  const paymentSwitch = (checked) => {
    if (checked) {
      setPeriod('year');

      setPersonal1(1);
      setPersonal2(8);
      setPersonal3(0);

      setPlus1(5);
      setPlus2(5);
      setPlus3(2);
    } else {
      setPeriod('month');

      setPersonal1(1);
      setPersonal2(5);
      setPersonal3(-1);

      setPlus1(4);
      setPlus2(6);
      setPlus3(-1);
    }
  };

  return (
    <div className="">
      <Head>
        <title>One tool for your whole team.</title>
        <meta
          name="description"
          content="PRO account removes all restrictions and makes MangaFY an ultimate tool for dailiy conscious planning of your next great IP."
        />
      </Head>
      <main className="main_back_2">
        <Header path="pricing" user={user} />
        <div className={styles.pricing_page}>
          <div className={styles.banner_section}>
            <span
              className={styles.banner_web}
              style={{ backgroundImage: "url('./img/banner.jpg')" }}></span>
            <span
              className={styles.banner_mobile}
              style={{ backgroundImage: "url('./img/banner_mobile.jpg')" }}></span>
          </div>
          <div className={styles.pricing_inner}>
            <div className={styles.info_section}>
              <div className={styles.info_inner}>
                <div className={styles.category_title}>Pricing</div>
                <div className={styles.info_title}>
                  One tool for your whole team. And free for personal use.
                </div>
                <div className={styles.bold_text}>
                  Need someone to help? No Surprises on commision work
                </div>
                <div className={styles.info_description}>
                  Simply pay the amount agreed upon with your freelancer (plus a standard 3%
                  processing fee on payments). Your freelancers pay for our services with a
                  percentage fee. Choose the plan suits your goals{' '}
                </div>
                <div className={styles.repayment_type}>
                  <span>Monthly</span>
                  <div className={styles.payment_switch}>
                    <Switch defaultChecked onChange={paymentSwitch} />
                  </div>
                  <span>Yearly</span>
                </div>
                <div className={styles.save_up}>Save Up TO 58%</div>
              </div>
              <div className={styles.percent_block}>3%</div>
            </div>
            <div className={styles.tool_type}>
              <div className={styles.individual_tools}>
                <div className={styles.section_title}>For Individuals</div>
                <div className={styles.tool_item}>
                  <img src="/img/tools_image1.jpg"></img>
                  <div className={styles.item_category}>Personal</div>
                  <div className={styles.item_price}>$0</div>
                  <LargeButton
                    className={styles.tool_button}
                    text="Select Basic"
                    disabled={false}
                    onClick={() => alert('large_primary_button')}
                  />
                  <div className={styles.item_title}>
                    For organizing every cornerof graphic novel production.{' '}
                    <span>Free for individuals</span>
                  </div>
                  <ul className={styles.tool_list}>
                    <li>
                      <div className={styles.white_vector}>
                        <WhiteVector width="7px" height="7px" />
                      </div>
                      <span>Limited for 2 board</span>
                    </li>
                    <li>
                      <div className={styles.white_vector}>
                        <WhiteVector width="7px" height="7px" />
                      </div>
                      <span>5 pages per board</span>
                    </li>
                    <li>
                      <div className={styles.white_vector}>
                        <WhiteVector width="7px" height="7px" />
                      </div>
                      <span>Free Collaborations only</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.tool_item}>
                  <img src="/img/tools_image2.png"></img>
                  <div className={styles.item_category}>Personal Pro</div>
                  <div className={styles.item_price}>
                    $
                    <div className={styles.container}>
                      <div
                        className={styles.wrap}
                        style={{ transform: `translateY(${-15 + personal1 * -50}px)` }}>
                        <span className={styles.digit}>0</span>
                        <span className={styles.digit}>1</span>
                        <span className={styles.digit}>2</span>
                        <span className={styles.digit}>3</span>
                        <span className={styles.digit}>4</span>
                        <span className={styles.digit}>5</span>
                        <span className={styles.digit}>6</span>
                        <span className={styles.digit}>7</span>
                        <span className={styles.digit}>8</span>
                        <span className={styles.digit}>9</span>
                      </div>
                    </div>
                    <div className={styles.container}>
                      <div
                        className={styles.wrap}
                        style={{ transform: `translateY(${-15 + personal2 * -50}px)` }}>
                        <span className={styles.digit}>0</span>
                        <span className={styles.digit}>1</span>
                        <span className={styles.digit}>2</span>
                        <span className={styles.digit}>3</span>
                        <span className={styles.digit}>4</span>
                        <span className={styles.digit}>5</span>
                        <span className={styles.digit}>6</span>
                        <span className={styles.digit}>7</span>
                        <span className={styles.digit}>8</span>
                        <span className={styles.digit}>9</span>
                      </div>
                    </div>
                    {personal3 > -1 && (
                      <div className={styles.container}>
                        <div
                          className={styles.wrap}
                          style={{ transform: `translateY(${-15 + personal3 * -50}px)` }}>
                          <span className={styles.digit}>0</span>
                          <span className={styles.digit}>1</span>
                          <span className={styles.digit}>2</span>
                          <span className={styles.digit}>3</span>
                          <span className={styles.digit}>4</span>
                          <span className={styles.digit}>5</span>
                          <span className={styles.digit}>6</span>
                          <span className={styles.digit}>7</span>
                          <span className={styles.digit}>8</span>
                          <span className={styles.digit}>9</span>
                        </div>
                      </div>
                    )}
                    <span>per {period}</span>
                  </div>
                  <LargeButton
                    className={styles.tool_button}
                    text="Select Basic"
                    disabled={false}
                    onClick={() => alert('large_primary_button')}
                  />
                  <div className={styles.item_title}>
                    For power users who want to do even more.{' '}
                    <span>Everything in Personal, plus</span>
                  </div>
                  <ul className={styles.tool_list}>
                    <li>
                      <div className={styles.white_vector}>
                        <WhiteVector width="7px" height="7px" />
                      </div>
                      <span>Artists recomendation</span>
                    </li>
                    <li>
                      <div className={styles.white_vector}>
                        <WhiteVector width="7px" height="7px" />
                      </div>
                      <span>Upgraded portfolio</span>
                    </li>
                    <li>
                      <div className={styles.white_vector}>
                        <WhiteVector width="7px" height="7px" />
                      </div>
                      <span>Unlimeted boards</span>
                    </li>
                    <li>
                      <div className={styles.white_vector}>
                        <WhiteVector width="7px" height="7px" />
                      </div>
                      <span>Free Collaborations only</span>
                    </li>
                    <li>
                      <div className={styles.white_vector}>
                        <WhiteVector width="7px" height="7px" />
                      </div>
                      <span>Access to exclusive Project Board</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.team_tools}>
                <div className={styles.section_title}>For Big Teams</div>
                <div className={styles.tool_item}>
                  <img src="/img/tools_image3.jpg"></img>
                  <div className={styles.item_category}>Plus Plus</div>
                  <div className={styles.item_price}>
                    $
                    <div className={styles.container}>
                      <div
                        className={styles.wrap}
                        style={{ transform: `translateY(${-15 + plus1 * -50}px)` }}>
                        <span className={styles.digit}>0</span>
                        <span className={styles.digit}>1</span>
                        <span className={styles.digit}>2</span>
                        <span className={styles.digit}>3</span>
                        <span className={styles.digit}>4</span>
                        <span className={styles.digit}>5</span>
                        <span className={styles.digit}>6</span>
                        <span className={styles.digit}>7</span>
                        <span className={styles.digit}>8</span>
                        <span className={styles.digit}>9</span>
                      </div>
                    </div>
                    <div className={styles.container}>
                      <div
                        className={styles.wrap}
                        style={{ transform: `translateY(${-15 + plus2 * -50}px)` }}>
                        <span className={styles.digit}>0</span>
                        <span className={styles.digit}>1</span>
                        <span className={styles.digit}>2</span>
                        <span className={styles.digit}>3</span>
                        <span className={styles.digit}>4</span>
                        <span className={styles.digit}>5</span>
                        <span className={styles.digit}>6</span>
                        <span className={styles.digit}>7</span>
                        <span className={styles.digit}>8</span>
                        <span className={styles.digit}>9</span>
                      </div>
                    </div>
                    {plus3 > -1 && (
                      <div className={styles.container}>
                        <div
                          className={styles.wrap}
                          style={{ transform: `translateY(${-15 + plus3 * -50}px)` }}>
                          <span className={styles.digit}>0</span>
                          <span className={styles.digit}>1</span>
                          <span className={styles.digit}>2</span>
                          <span className={styles.digit}>3</span>
                          <span className={styles.digit}>4</span>
                          <span className={styles.digit}>5</span>
                          <span className={styles.digit}>6</span>
                          <span className={styles.digit}>7</span>
                          <span className={styles.digit}>8</span>
                          <span className={styles.digit}>9</span>
                        </div>
                      </div>
                    )}
                    <span>per {period}</span>
                  </div>
                  <LargeButton
                    className={styles.tool_button}
                    text="Select Basic"
                    disabled={false}
                    onClick={() => alert('large_primary_button')}
                  />
                  <div className={styles.item_title}>
                    Perfect for freelancers, agencies, and graphic novel teams.
                    <span>Everything in Pro, plus</span>
                  </div>
                  <ul className={styles.tool_list}>
                    <li>
                      <div className={styles.black_vector}>
                        <BlackVector width="7px" height="7px" />
                      </div>
                      <span>Sell goods</span>
                    </li>
                    <li>
                      <div className={styles.black_vector}>
                        <BlackVector width="7px" height="7px" />
                      </div>
                      <span>Unlimeted pages</span>
                    </li>
                    <li>
                      <div className={styles.black_vector}>
                        <BlackVector width="7px" height="7px" />
                      </div>
                      <span>Advanced IP security</span>
                    </li>
                    <li>
                      <div className={styles.black_vector}>
                        <BlackVector width="7px" height="7px" />
                      </div>
                      <span>Access to exclusive Project Board</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ul className={styles.pricing_list}>
              <li>
                <div className={styles.list_title}>Why do I need a MangaFY PRO</div>
                <div className={styles.list_description}>
                  Switching to Pro adds weight to your goal intentions and motivates you to act.
                  <br></br>
                  <br></br>In addition, PRO account removes all restrictions and makes MangaFY an
                  ultimate tool for dailiy conscious planning of your next great IP.
                </div>
              </li>
              <li>
                <div className={styles.list_title}>How will I be billed for my subscription?</div>
                <div className={styles.list_description}>
                  Subscriptions will use a secure payment transaction through payment system.
                  <br></br>
                  <br></br>By default, all plans will be re-billed automatically. If you would like
                  to cancel the re-billing of your account, you can manage this through your
                  Settings page.
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

Pricing.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Pricing;
