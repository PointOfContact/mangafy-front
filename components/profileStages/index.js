import React, { useEffect, useState } from 'react';

import { useClickAway } from '@umijs/hooks';
import { notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Quest from './card';
import styles from './styles.module.scss';

const ProfileStages = ({ userData }) => {
  const [visible, setVisible] = useState(true);
  const [quests, setQuests] = useState([]);
  const ref = useClickAway(() => {
    setVisible(false);
  });
  useEffect(() => {
    getAllQuests();
  }, [userData]);

  const getAllQuests = () => {
    const jwt = client.getCookie('feathers-jwt');
    const options = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/quests')
        .find(options)
        .then((res) => {
          setQuests(res.data);
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
        });
    });
  };

  return (
    <div ref={ref} className={cn(styles.profileStages)}>
      <div onClick={() => setVisible(true)} className={cn(styles.bar, visible && styles.visible)}>
        <div className={styles.content}>
          <h2 className={styles.title}>Fill out the form and get points</h2>
          <div className={styles.img}>
            <img src="/img/quests.png" />
          </div>
          <h2 className={styles.filter}>All Quests</h2>
          <div className={styles.quests}>
            {quests.map((quest, index) => (
              <Quest
                key={index}
                point={quest.points}
                status={quest.status}
                title={quest.title}
                description={quest.description}
                navUrl={quest.navUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileStages.propTypes = {
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  total: PropTypes.number,
};

ProfileStages.defaultProps = {
  total: 0,
};

export default ProfileStages;
