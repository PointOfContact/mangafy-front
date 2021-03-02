import React from 'react';

import { Layout, Row, Col } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import MangeStoryCard from 'components/mangeStoryCard';
import AddButton from 'components/ui-elements/add-button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Content } = Layout;

const ProfileOpenCollabs = (props) => {
  const { total, mangaStories, profile } = props;
  const history = useRouter();
  const routeChange = () => {
    const path = `/create-a-story/start`;
    history.push(path);
  };

  return (
    <section>
      {!!total && (
        <Content
          className={cn(
            styles.my_portfolio,
            styles.portfolio_new,
            'mobile_full_content mobile_top_round mobile_linear'
          )}>
          <Row>
            <Col
              xs={{ span: 23 }}
              md={{ span: 22 }}
              xl={{ span: 22 }}
              xxl={{ span: 22 }}>
              <div className={styles.card_wrap}>
                <MangeStoryCard client={client} mangaStories={mangaStories} />
              </div>
            </Col>
            {!profile && (
              <Col
                xs={{ span: 22 }}
                md={{ span: 2 }}
                xl={{ span: 2 }}
                xxl={{ span: 2 }}
                className={styles.add_button}>
                <AddButton onClick={() => routeChange()} />
              </Col>
            )}
          </Row>
        </Content>
      )}
    </section>
  );
};

ProfileOpenCollabs.propTypes = {
  total: PropTypes.number.isRequired,
  mangaStories: PropTypes.array.isRequired,
  profile: PropTypes.object,
};

ProfileOpenCollabs.defaultProps = {
  profile: null,
};

export default ProfileOpenCollabs;
