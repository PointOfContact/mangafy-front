import React from 'react';

import Modal from 'antd/lib/modal/Modal';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { info } = Modal;


const HeaderCollab = ({ isOwn, baseData, stage }) => {

  return (
    <section className="section_landing_for">
      <div className="mangafy_vontainer  container">
        <div className="row">
          <div className="col-sm-12 manga-story manga-story-m">

            <div className={cn(styles.storyTabContent)}>

              <div className={styles.header}>
                <h2>{baseData.title}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeaderCollab.propTypes = {
  baseData: PropTypes.object.isRequired,
  collabActiveTab: PropTypes.string.isRequired,
  stage: PropTypes.object.isRequired,
};

export default HeaderCollab;
