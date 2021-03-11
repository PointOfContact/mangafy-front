import React, { useState } from 'react';

import { Row, Col, Popover, Form, notification } from 'antd';
import client from 'api/client';
import Card from 'components/card';
import SvgBlackBehance from 'components/icon/BlackBehance';
import SvgBlackDeviantart from 'components/icon/BlackDeviantart';
import SvgBlackDribbble from 'components/icon/BlackDribbble';
import SvgBlackFacebook from 'components/icon/BlackFacebook';
import SvgBlackInstagram from 'components/icon/BlackInstagram';
import SvgBlackTwitter from 'components/icon/BlackTwitter';
import AddButton from 'components/ui-elements/add-button';
import PrimaryInput from 'components/ui-elements/input';
import SocialButton from 'components/ui-elements/social-button';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

const SocialLinks = (props) => {
  const { user, profile } = props;
  let canEditInit;
  if (!user) {
    canEditInit = false;
  } else if (!profile && user) {
    canEditInit = true;
  } else if (profile._id === user._id) {
    canEditInit = true;
  }

  const [userData, setUserData] = useState(profile || user);
  const [socialLinks, setSocialLinks] = useState(userData.socialLinks || []);
  const [dribbbleStatus, setDribbbleStatus] = useState('');
  const [behanceStatus, setBehanceStatus] = useState('');
  const [deviantartStatus, setDeviantartStatus] = useState('');
  const [facebookStatus, setFacebookStatus] = useState('');
  const [twitterStatus, setTwitterStatus] = useState('');
  const [instagramStatus, setInstagramStatus] = useState('');
  const [visible, setVisible] = useState(false);

  const getSocialLink = (platform) => socialLinks.find((item) => item.platform === platform)?.link;

  const updateSocialLink = (link, platform) => {
    let isFound = false;
    const newLinks = socialLinks.map((item) => {
      if (platform === item.platform) {
        isFound = true;
        return { ...item, link };
      }
      return item;
    });
    if (!isFound) {
      newLinks.push({
        platform,
        link,
      });
    }
    const filteredItems = newLinks.filter((item) => item.link);

    const newUserData = { ...user, socialLinks: filteredItems };

    setUserData(newUserData);
    saveUserDataByKey({ socialLinks: filteredItems });
  };

  const saveUserDataByKey = (data) => {
    const jwt = client.getCookie('feathers-jwt');
    import('../../api/restClient').then((m) => {
      m.default
        .service('/api/v2/users')
        .patch(user._id, data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then((res) => {
          setUserData(res);
          setSocialLinks(res.socialLinks);
        })
        .catch((err) => {
          openNotification('error', err.message);
        });
    });
  };

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const editSocial = (
    <Form
      name="socials"
      initialValues={{
        dribbble: getSocialLink('dribbble'),
        behance: getSocialLink('behance'),
        deviantart: getSocialLink('deviantart'),
        facebook: getSocialLink('facebook'),
        twitter: getSocialLink('twitter'),
        instagram: getSocialLink('instagram'),
      }}>
      <div className={styles.edit_social_content}>
        <div className={styles.social_inp}>
          <SvgBlackDribbble width="21px" height="21px" />
          <Form.Item validateStatus={dribbbleStatus} name="dribbble">
            <PrimaryInput
              isLinear={true}
              isFullWidth={true}
              className={styles.social_inp}
              defaultValue={getSocialLink('dribbble')}
              onBlur={(e) => {
                e.target.value.includes('https://dribbble.com') ||
                e.target.value.includes('https://www.dribbble.com') ||
                e.target.value === ''
                  ? (updateSocialLink(e.target.value, 'dribbble'), setDribbbleStatus('success'))
                  : (openNotification('error', 'invalid link'), setDribbbleStatus('error'));
              }}
            />
            <span>Dribbble</span>
          </Form.Item>
        </div>
        <div className={styles.social_inp}>
          <SvgBlackBehance width="21px" height="21px" />
          <Form.Item validateStatus={behanceStatus} name="behance">
            <PrimaryInput
              isLinear={true}
              isFullWidth={true}
              className={styles.social_inp}
              defaultValue={getSocialLink('behance')}
              onBlur={(e) => {
                e.target.value.includes('https://behance.com') ||
                e.target.value.includes('https://www.behance.com') ||
                e.target.value === ''
                  ? (updateSocialLink(e.target.value, 'behance'), setBehanceStatus('success'))
                  : (openNotification('error', 'invalid link'), setBehanceStatus('error'));
              }}
            />
            <span>Behance</span>
          </Form.Item>
        </div>
        <div className={styles.social_inp}>
          <SvgBlackDeviantart width="21px" height="21px" />
          <Form.Item validateStatus={deviantartStatus} name="deviantart">
            <PrimaryInput
              isLinear={true}
              isFullWidth={true}
              className={styles.social_inp}
              defaultValue={getSocialLink('deviantart')}
              onBlur={(e) => {
                e.target.value.includes('https://deviantart.com') ||
                e.target.value.includes('https://www.deviantart.com') ||
                e.target.value === ''
                  ? (updateSocialLink(e.target.value, 'deviantart'), setDeviantartStatus('success'))
                  : (openNotification('error', 'invalid link'), setDeviantartStatus('error'));
              }}
            />
            <span>Deviantart</span>
          </Form.Item>
        </div>
        <div className={styles.social_inp}>
          <SvgBlackFacebook width="21px" height="21px" />
          <Form.Item validateStatus={facebookStatus} name="facebook">
            <PrimaryInput
              isLinear={true}
              isFullWidth={true}
              className={styles.social_inp}
              defaultValue={getSocialLink('facebook')}
              onBlur={(e) => {
                e.target.value.includes('https://facebook.com') ||
                e.target.value.includes('https://www.facebook.com') ||
                e.target.value === ''
                  ? (updateSocialLink(e.target.value, 'facebook'), setFacebookStatus('success'))
                  : (openNotification('error', 'invalid link'), setFacebookStatus('error'));
              }}
            />
            <span>Facebook</span>
          </Form.Item>
        </div>
        <div className={styles.social_inp}>
          <SvgBlackTwitter width="21px" height="21px" />
          <Form.Item validateStatus={twitterStatus} name="twitter">
            <PrimaryInput
              isLinear={true}
              isFullWidth={true}
              className={styles.social_inp}
              defaultValue={getSocialLink('twitter')}
              onBlur={(e) => {
                e.target.value.includes('https://twitter.com') ||
                e.target.value.includes('https://www.twitter.com') ||
                e.target.value === ''
                  ? (updateSocialLink(e.target.value, 'twitter'), setTwitterStatus('success'))
                  : (openNotification('error', 'invalid link'), setTwitterStatus('error'));
              }}
            />
            <span>Twitter</span>
          </Form.Item>
        </div>
        <div className={styles.social_inp}>
          <SvgBlackInstagram width="21px" height="21px" />
          <Form.Item validateStatus={instagramStatus} name="instagram">
            <PrimaryInput
              isLinear={true}
              isFullWidth={true}
              className={styles.social_inp}
              defaultValue={getSocialLink('instagram')}
              onBlur={(e) => {
                e.target.value.includes('https://instagram.com') ||
                e.target.value.includes('https://www.instagram.com') ||
                e.target.value === ''
                  ? (updateSocialLink(e.target.value, 'instagram'), setInstagramStatus('success'))
                  : (openNotification('error', 'invalid link'), setInstagramStatus('error'));
              }}
            />
            <span>Instagram</span>
          </Form.Item>
        </div>
      </div>
    </Form>
  );

  return (
    <div>
      <h4 className={styles.title}>Social</h4>
      <div className={styles.social}>
        <Row>
          {socialLinks?.length ? (
            <Col span={22}>
              {socialLinks?.map((social) => (
                <span key={social.id} className={styles.social_icons}>
                  <a href={`${social.link}`} rel="noreferrer" target="_blank">
                    <SocialButton name={social.platform} link={social.link} />
                  </a>
                </span>
              ))}
            </Col>
          ) : (
            <Col span={22}>
              {canEditInit ? (
                <div
                  className={styles.noSocial}
                  onClick={() => {
                    setVisible(!visible);
                    console.log(visible);
                  }}>
                  <Card
                    description="Do you not want <br/> to add a social?"
                    btnText=""
                    items={[<img key="1" src="/img/noSocial.png" alt="" />]}
                  />
                </div>
              ) : (
                <div className={styles.noSocial}>
                  <Card
                    description="Sorry, but there is nothing <br/> here (("
                    btnText=""
                    items={[<img key="1" src="/img/noSocial.png" alt="" />]}
                  />
                </div>
              )}
            </Col>
          )}

          <Col
            xs={{ span: 23 }}
            md={{ span: 2 }}
            xl={{ span: 2 }}
            xxl={{ span: 2 }}
            className={styles.add_button}>
            {canEditInit && (
              <Popover
                placement="topRight"
                content={editSocial}
                trigger="click"
                visible={visible}
                onVisibleChange={() => setVisible(!visible)}>
                <AddButton />
              </Popover>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

SocialLinks.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

SocialLinks.defaultProps = {
  profile: null,
};

export default SocialLinks;
