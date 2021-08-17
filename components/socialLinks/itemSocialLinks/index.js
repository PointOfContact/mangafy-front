import React, { useState } from 'react';

import { Form, notification } from 'antd';
import client from 'api/client';
import SvgBlackBehance from 'components/icon/BlackBehance';
import SvgBlackDeviantart from 'components/icon/BlackDeviantart';
import SvgBlackDribbble from 'components/icon/BlackDribbble';
import SvgBlackFacebook from 'components/icon/BlackFacebook';
import SvgBlackInstagram from 'components/icon/BlackInstagram';
import SvgBlackPatreon from 'components/icon/BlackPatreon';
import SvgBlackTapas from 'components/icon/BlackTapas';
import SvgBlackTiktok from 'components/icon/BlackTiktok';
import SvgBlackTwitter from 'components/icon/BlackTwitter';
import SvgBlackWebtoon from 'components/icon/BlackWebtoon';
import SvgYoutube from 'components/icon/Youtube';
import PrimaryInput from 'components/ui-elements/input';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ItemSocialLinks = ({
  children,
  status,
  setStatus,
  name,
  urlName,
  getSocialLink,
  updateSocialLink,
}) => (
  <div className={styles.social_inp}>
    {children}
    <Form.Item validateStatus={status} name={name}>
      <PrimaryInput
        isLinear={true}
        isFullWidth={true}
        className={styles.social_inp}
        defaultValue={getSocialLink(name)}
        onBlur={(e) => {
          e.target.value.includes(urlName) || e.target.value === ''
            ? (updateSocialLink(e.target.value, name), setStatus('success'))
            : (notification.error({
                message: 'invalid link',
                placement: 'bottomLeft',
              }),
              setStatus('error'));
        }}
      />
      <p className={styles.nameSocial}>{name}</p>
    </Form.Item>
  </div>
);

ItemSocialLinks.propTypes = {
  children: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  urlName: PropTypes.string.isRequired,
  getSocialLink: PropTypes.func.isRequired,
  updateSocialLink: PropTypes.func.isRequired,
};

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const EditSocial = ({ user, socialLinks, setSocialLinks, setUserData }) => {
  const [dribbbleStatus, setDribbbleStatus] = useState('');
  const [behanceStatus, setBehanceStatus] = useState('');
  const [deviantartStatus, setDeviantartStatus] = useState('');
  const [facebookStatus, setFacebookStatus] = useState('');
  const [twitterStatus, setTwitterStatus] = useState('');
  const [instagramStatus, setInstagramStatus] = useState('');
  const [youtubeStatus, setYoutubeStatus] = useState('');
  const [patreonStatus, setPatreonStatus] = useState('');
  const [tickTokStatus, setTickTokStatus] = useState('');
  const [webtoonsStatus, setWebtoonsStatus] = useState('');
  const [tapasStatus, setTapasStatus] = useState('');

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomLeft',
    });
  };

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
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.SOCIAL_ACCOUNT,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
    setUserData(newUserData);
    saveUserDataByKey({ socialLinks: filteredItems });
  };

  const saveUserDataByKey = (data) => {
    const jwt = client.getCookie('feathers-jwt');
    import('../../../api/restClient').then((m) => {
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

  return (
    <Form
      name="socials"
      initialValues={{
        dribbble: getSocialLink('dribbble'),
        behance: getSocialLink('behance'),
        deviantart: getSocialLink('deviantart'),
        facebook: getSocialLink('facebook'),
        twitter: getSocialLink('twitter'),
        instagram: getSocialLink('instagram'),
        patreon: getSocialLink('patreon'),
        ticktok: getSocialLink('ticktok'),
        webtoons: getSocialLink('webtoons'),
        tapas: getSocialLink('tapas'),
        youtube: getSocialLink('youtube'),
      }}>
      <div className={styles.edit_social_content}>
        <ItemSocialLinks
          status={dribbbleStatus}
          setStatus={setDribbbleStatus}
          name={'dribbble'}
          urlName={'dribbble.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackDribbble width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={behanceStatus}
          setStatus={setBehanceStatus}
          name={'behance'}
          urlName={'behance.net'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackBehance width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={deviantartStatus}
          setStatus={setDeviantartStatus}
          name={'deviantart'}
          urlName={'deviantart.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackDeviantart width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={facebookStatus}
          setStatus={setFacebookStatus}
          name={'facebook'}
          urlName={'facebook.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackFacebook width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={twitterStatus}
          setStatus={setTwitterStatus}
          name={'twitter'}
          urlName={'twitter.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackTwitter width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={instagramStatus}
          setStatus={setInstagramStatus}
          name={'instagram'}
          urlName={'instagram.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackInstagram width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={patreonStatus}
          setStatus={setPatreonStatus}
          name={'patreon'}
          urlName={'patreon.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackPatreon width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={webtoonsStatus}
          setStatus={setWebtoonsStatus}
          name={'webtoons'}
          urlName={'webtoons.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackWebtoon width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={tickTokStatus}
          setStatus={setTickTokStatus}
          name={'tiktok'}
          urlName={'tiktok.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackTiktok width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={tapasStatus}
          setStatus={setTapasStatus}
          name={'tapas'}
          urlName={'tapas.io'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgBlackTapas width="21px" height="21px" />
        </ItemSocialLinks>
        <ItemSocialLinks
          status={youtubeStatus}
          setStatus={setYoutubeStatus}
          name={'youtube'}
          urlName={'youtube.com'}
          getSocialLink={getSocialLink}
          updateSocialLink={updateSocialLink}>
          <SvgYoutube width="21px" height="21px" />
        </ItemSocialLinks>
      </div>
    </Form>
  );
};

EditSocial.propTypes = {
  user: PropTypes.object.isRequired,
  socialLinks: PropTypes.array.isRequired,
  setSocialLinks: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
};

export default EditSocial;
