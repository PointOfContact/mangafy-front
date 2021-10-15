import React from 'react';

import { Modal } from 'antd';
import PrimaryButton from 'components/ui-elements/button';
import LargeButton from 'components/ui-elements/large-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const ExerciseCard = (props) => {
  const { order, categories, title, url, btnText, warmapId, user } = props;

  const { info } = Modal;
  const history = useRouter();
  const routeChange = () => {
    history.push(url);
  };

  const showModal = () => {
    // TODO warmaps event
    const data = {
      event_type: EVENTS.OPENED_POST,
      event_properties: { warmapId },
      user_id: user?._id,
      user_properties: {
        ...user,
      },
    };
    myAmplitude(data);

    info({
      className: 'MangaFY',
      title: <h3 className={styles.modalTitle}>AMAZING!</h3>,
      icon: '',
      width: '100%',
      maskClosable: true,
      okText: <LargeButton onClick={() => routeChange()} text="Go to profile" />,
      style: { top: 120, maxWidth: '1000px' },
      content: (
        <div className={styles.publishedModal}>
          <p>
            Happy you have taken part in our daily fun tasks. We’d love for you to add it to your
            portfolio to share with the MangaFY community
          </p>
        </div>
      ),
      onOk() {},
    });
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardNumberCount}>{order}</div>
          {categories.map((categorie) => (
            <div key={categorie} className={styles.cardTheme}>
              <div className={styles.cardThemeDot}></div>
              {categorie}
            </div>
          ))}
        </div>
        <div className={styles.cardDescr}>{title}</div>
        <a className={styles.cardButton}>
          <PrimaryButton
            className={styles.navBtn}
            onClick={showModal}
            text={btnText}
            suffix={<span style={{ marginLeft: '15px' }}>❯</span>}
          />
        </a>
      </div>
    </>
  );
};

ExerciseCard.propTypes = {
  order: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  user: PropTypes.object,
  warmapId: PropTypes.string.isRequired,
};

ExerciseCard.defaultProps = {
  user: null,
};

export default ExerciseCard;
