import React, { useEffect, useRef, useState } from 'react';

import { Layout, Row, Col } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import MangeStoryCard from 'components/mangeStoryCard';
import ModalCreateProject from 'components/modalCreateProject';
import AddButton from 'components/ui-elements/add-button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Content } = Layout;

const ProfileOpenCollabs = (props) => {
  const {
    total,
    mangaStories,
    setMangaStories,
    mangaStoriesMyProfile,
    profile,
    user,
    ifMyProfile,
  } = props;

  const [createProjectModal, showCreateProjectModal] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    !!router.query.active &&
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  }, []);

  return (
    <section ref={ref}>
      {!!total && (
        <Content
          className={cn(
            styles.my_portfolio,
            styles.portfolio_new,
            'mobile_full_content mobile_top_round mobile_linear'
          )}>
          <h2 className={styles.title}>Projects</h2>
          <Row>
            <Col xs={{ span: 23 }} md={{ span: 22 }} xl={{ span: 22 }} xxl={{ span: 22 }}>
              <div className={ifMyProfile ? styles.card_wrap : styles.card_wrap_def}>
                <MangeStoryCard
                  client={client}
                  mangaStories={ifMyProfile ? mangaStoriesMyProfile : mangaStories}
                  setMangaStories={setMangaStories}
                  user={user}
                />
              </div>
            </Col>
            {ifMyProfile && !profile && (
              <Col
                xs={{ span: 22 }}
                md={{ span: 2 }}
                xl={{ span: 2 }}
                xxl={{ span: 2 }}
                className={styles.add_button}>
                <AddButton onClick={() => showCreateProjectModal(true)} />
              </Col>
            )}
          </Row>
        </Content>
      )}
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
        user={user}
      />
    </section>
  );
};

ProfileOpenCollabs.propTypes = {
  total: PropTypes.array.isRequired,
  mangaStoriesMyProfile: PropTypes.array.isRequired,
  mangaStories: PropTypes.array.isRequired,
  setMangaStories: PropTypes.func,
  profile: PropTypes.object,
  user: PropTypes.object,
  ifMyProfile: PropTypes.bool,
};

ProfileOpenCollabs.defaultProps = {
  profile: null,
  user: null,
  ifMyProfile: false,
  setMangaStories: () => {},
};

export default ProfileOpenCollabs;
