import React from 'react';

import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Home from 'features/index/home';
import Head from 'next/head';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

const pageStart = ({ user }) => (
  <>
    <div className={'wrapper'}>
      <div className={'content'}>
        <Header path="" user={user} />
        <div className={styles.pageStarted}>
            <div className={styles.itemBg}></div>
            <div className={styles.titleBlock}>
                <div className={cn('container')}>
                    <div className={styles.titleBlock__img}></div>
                    <div className={styles.titleBlock__titleItem}>
                        <div className={styles.titleBlock__title}>
                            Getting Started With MangaFY
                        </div>
                        <div className={styles.titleBlock__subtitle}>
                            All things related to product- processes, best <br /> practices, setup guides, and more!
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.lists}>
                <div className={cn('container')}>
                    <div className={styles.lists__wrap}>
                        <div className={styles.lists__item}>
                            <div className={styles.lists__title}>Processes</div>
                            <ul className={styles.lists__list}>
                                <li className={styles.lists__listItem}>MangaFY 101</li>
                                <li className={styles.lists__listItem}>Collaboration</li>
                                <li className={styles.lists__listItem}>Create a team</li>
                                <li className={styles.lists__listItem}>Team administration</li>
                            </ul>
                        </div>
                        <div className={styles.lists__item}>
                            <div className={styles.lists__title}>Ongoing</div>
                            <ul className={styles.lists__list}>
                                <li className={styles.lists__listItem}>Okrs</li>
                                <li className={styles.lists__listItem}>Product Directory</li>
                                <li className={styles.lists__listItem}>Meta tags and Link names</li>
                                <li className={styles.lists__listItem}>Timeline</li>
                            </ul>
                        </div>
                        <div className={styles.lists__item}>
                            <div className={styles.lists__title}>User Research</div>
                            <ul className={styles.lists__list}>
                                <li className={styles.lists__listItem}>JTBD</li>
                                <li className={styles.lists__listItem}>Customer Journey Map</li>
                                <li className={styles.lists__listItem}>Ideas</li>
                                <li className={styles.lists__listItem}>Get more users</li>
                            </ul>
                        </div>
                        <div className={styles.lists__item}>
                            <div className={styles.lists__title}>Analytics</div>
                            <ul className={styles.lists__list}>
                                <li className={styles.lists__listItem}>Snowflake</li>
                                <li className={styles.lists__listItem}>Prototype</li>
                                <li className={styles.lists__listItem}>Analytics</li>
                                <li className={styles.lists__listItem}>Figma</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <FooterPolicy />
    </div>
  </>
);


export default pageStart;