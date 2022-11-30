import React, { useState } from 'react';

import { Row, Col, Popover } from 'antd';
import Card from 'components/card';
import Imgix from 'components/imgix';
import AddButton from 'components/ui-elements/add-button';
import SocialButton from 'components/ui-elements/social-button';
import PropTypes from 'prop-types';

import EditSocial from './itemSocialLinks';
import styles from './style.module.scss';

const SocialLinks = (props) => {
  const { user, profile } = props;
  let canEditInit;
  if (!user) {
    canEditInit = false;
  } else if (!profile && user) {
    canEditInit = true;
  } else if (profile._id === user?._id) {
    canEditInit = true;
  }

  const [userData, setUserData] = useState(profile || user);
  const [socialLinks, setSocialLinks] = useState(userData.socialLinks || []);
  const [visible, setVisible] = useState(false);
  const ifNotMyAccount = user?._id === profile?._id;

  return (
    <div>
      <h4 className={styles.title}>
        {ifNotMyAccount ? 'Connections to take it to the next level' : 'Social'}
      </h4>
      <div className={styles.social}>
        <Row>
          {socialLinks?.length ? (
            <Col span={22}>
              {socialLinks?.map((social) => (
                <span key={social.id} className={styles.social_icons}>
                  <a
                    href={social.link.includes('http') ? social.link : `https://${social.link}`}
                    rel="noreferrer"
                    target="_blank">
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
                  }}>
                  <Card
                    description="Do you not want <br/> to add a social?"
                    btnText=""
                    items={[
                      <Imgix
                        key="1"
                        width={164}
                        height={140}
                        layout="fixed"
                        src="https://mangafy.club/img/noSocial.webp"
                        alt="MangaFy no social"
                      />,
                    ]}
                  />
                </div>
              ) : (
                <div className={styles.noSocial}>
                  <Card
                    description="Sorry, but there is nothing <br/> here (("
                    btnText=""
                    items={[
                      <Imgix
                        key="1"
                        width={164}
                        height={140}
                        layout="fixed"
                        src="https://mangafy.club/img/noSocial.webp"
                        alt="MangaFy no social"
                      />,
                    ]}
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
                overlayStyle={{ zIndex: '935' }}
                placement="topRight"
                content={
                  <EditSocial
                    user={user}
                    socialLinks={socialLinks}
                    setSocialLinks={setSocialLinks}
                    setUserData={setUserData}
                  />
                }
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
