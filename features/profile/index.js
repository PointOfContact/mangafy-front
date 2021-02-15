import React from 'react';

import { Tabs, Card } from 'antd';
import client from 'api/client';
import { CommissionPricing } from 'components/commissionPricing';
import Footer from 'components/footer';
import { Gallery } from 'components/gallery';
import Header from 'components/header';
import MangaStoryCard from 'components/mangeStoryCard';
import MyProfile from 'components/mobileVersion/mobileProfile';
import Head from 'next/head';
import PropTypes from 'prop-types';

const { Meta } = Card;
const { TabPane } = Tabs;
const Profile = ({ user, profile, mangaStories, total, limit }) => (
  <div className="">
    <Head>
      <title>MangaFY present {profile.name}.</title>
      <meta name="description" content={profile.name}></meta>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="main_back_2">
      <Header path="profile" user={user} />
      <section className="section_one_my_profile">
        <div className="container mangafy_container">
          <div className="row">
            <div className="col-lg-6"></div>
          </div>
        </div>
      </section>
      <section className="my_profile_block">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="my_profile_upload_photo">
                <img
                  className="avatar"
                  src={
                    profile.avatar
                      ? client.UPLOAD_URL + profile.avatar
                      : 'https://swanbulk.com/wp-content/uploads/2020/03/user-icon.svg'
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-2">
              <div className="info_profile">
                <h2>{profile.name}</h2>
                <p>{profile.type}</p>
                <button>
                  <a href={`mailto:${profile.email}`}>Contact</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container my_profile_tabs">
          <div className="row">
            <div className="col-lg-12">
              <Tabs defaultActiveKey="1">
                <TabPane tab="STORY" key="1">
                  <div className="content_tab_profile_1">
                    <h3>About Me</h3>
                    <p>{profile.content}</p>
                    <h3>Genres</h3>
                    {profile.skills && profile.skills.length > 0
                      ? profile.skills.map(({ content }) => (
                          <button className="profileTagsClassname">{content}</button>
                        ))
                      : null}
                  </div>
                </TabPane>
                <TabPane tab="GALLERY" key="3">
                  <div className="content_tab_profile_1">
                    <h3>Previous works</h3>
                    <Gallery profile={profile} mangaStories={mangaStories} user={user} />
                  </div>
                </TabPane>
                <TabPane tab="COMMISSION PRICING" key="4">
                  <div className="content_tab_profile_1">
                    <h3>Commision List</h3>
                    <p>
                      We believe your talent is worth money, collaborate for free, or charge money
                      for your service (illustration, editing, etc.). Tell the world and start to
                      build partnerships
                    </p>
                  </div>
                  <CommissionPricing user={user} id={profile._id} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container my_portfolio">
          {total == 0 ? null : (
            <>
              <div className="row">
                <div className="col-lg-12">
                  <h3>Open Collabs</h3>
                </div>
              </div>

              <div className="row">
                <MangaStoryCard client={client} mangaStories={mangaStories} />
              </div>
            </>
          )}
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12">
                <div className="show_all">
                  <button >Show all</button>
                </div>
              </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
    <MyProfile {...{ user, profile, mangaStories, limit, total }} />
    <div className=""></div>
  </div>
);
Profile.prototype = {
  mangaStories: PropTypes.array,
  profile: PropTypes.object,
  user: PropTypes.object,
  total: PropTypes.number,
  limit: PropTypes.number,
};

export default Profile;
