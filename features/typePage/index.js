import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import TypePage from 'components/type-content';
import ButtonToTop from 'components/ui-elements/button-toTop';
import PropTypes from 'prop-types';

export default function LandingNew({ user, posts, dailyWarmUps, members, collaborations }) {
  return (
    <>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header user={user} />
          <main>
            <TypePage
              user={user}
              posts={posts}
              dailyWarmUps={dailyWarmUps}
              members={members}
              collaborations={collaborations}
            />
          </main>
        </div>
        <Footer />
        <FooterPolicy />
      </div>
    </>
  );
}

LandingNew.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
  dailyWarmUps: PropTypes.array,
  members: PropTypes.array,
  collaborations: PropTypes.array,
};

LandingNew.defaultProps = {
  user: null,
  posts: [],
  dailyWarmUps: [],
  members: [],
  collaborations: [],
};
