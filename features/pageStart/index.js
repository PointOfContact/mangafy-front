import React from 'react';

import cn from 'classnames';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Link from 'next/link';

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
                <div className={styles.titleBlock__title}>Getting Started With MangaFY</div>
                <div className={styles.titleBlock__subtitle}>
                  All things related to product- processes, best <br /> practices, setup guides, and
                  more!
                </div>
              </div>
            </div>
          </div>
          <div className={styles.lists}>
            <div className={cn('container')}>
              <div className={styles.lists__wrap}>
                <div className={styles.lists__item}>
                  <div className={styles.lists__title}>Getting started</div>
                  <ul className={styles.lists__list}>
                    <li className={styles.lists__listItem}>
                      <Link href={'/resources/manga-speech-basic'}>
                        <a>Manga speech baisc</a>
                      </Link>
                    </li>
                    <li className={styles.lists__listItem}>
                      <Link href={'/resources/manga-paneling-basics'}>
                        <a>Manga paneling baiscs</a>
                      </Link>
                    </li>
                    <li className={styles.lists__listItem}>
                      <Link href={`/resources/include-your-portfolio`}>
                        <a>Include your portfolio</a>
                      </Link>
                    </li>
                    <li className={styles.lists__listItem}>
                      <Link href={'/resources/creating-project-and-collaborating'}>
                        <a>Creating project and collaboration</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={styles.lists__item}>
                  <div className={styles.lists__title}>{'Guides & Processes'}</div>
                  <ul className={styles.lists__list}>
                    <li className={styles.lists__listItem}>
                      <Link href={'/resources/popular-platforms'}>
                        <a>Popular platforms</a>
                      </Link>
                    </li>
                    <li className={styles.lists__listItem}>
                      <Link href={'/resources/showcase-your-work'}>
                        <a>Showcase yoru works</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={styles.lists__item}>
                  <div className={styles.lists__title}>Experts</div>
                  <ul className={styles.lists__list}>
                    <li className={styles.lists__listItem}>
                      <Link href={'/resources/production-management-tool'}>
                        <a>Production management tool</a>
                      </Link>
                    </li>
                    <li className={styles.lists__listItem}>
                      <Link href={`/resources/how-to-get-started-with-MangaFY`}>
                        <a>How to get started with MangaFY</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* <div className={styles.lists__item}>
                  <div className={styles.lists__title}>Platform Updates</div>
                  <ul className={styles.lists__list}>
                    <li className={styles.lists__listItem}>
                      <Link href={`/resources/`}>
                        <a></a>
                      </Link>
                    </li>
                  </ul>
                </div> */}
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
