import React from 'react';

import { Spin } from 'antd';
import cn from 'classnames';
import LargeButton from 'components/ui-elements/large-button';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import styles from './styles.module.scss';


export default function TypePage() {
  return (
    <>


      <div className={styles.type_main}>
        <div className={cn('container', styles.main__container)}>
          <div className={styles.type_main__wrap}>
            <div className={styles.projectsForYou}>
              <div className={styles.projectsForYou__MainTitle}>
                <h2 className={styles.projectsForYou__MainTitle_Title}>For you</h2>
              </div>
              <div className={styles.projectsForYou_Card}>
                <div className={styles.projectsForYou_Top}>
                  <div className={styles.projectsForYou_Logo}></div>
                  <div className={styles.projectsForYou_Descr}>
                    <div className={styles.projectsForYou_Name}>Street Art for Desire</div>
                    <div className={styles.projectsForYou_Category}>
                      <div className={styles.projectsForYou_Category_Name}> Short Story </div>
                      <ul className={styles.projectsForYou_Category_List}>
                        <li className={styles.projectsForYou_Category_List_Item}>
                          <div className={styles.projectsForYou_Category_List_Circle}></div>
                          <div className={styles.projectsForYou_Category_List_Text}>Photography</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.projectsForYou_MainImg}></div>
                <div className={styles.projectsForYou_BotDescr}>Take photos of the street art in your city, or contribute that picture of the mural you saw when you were traveling</div>
              </div>
              <div className={styles.projectsForYou_Card}></div>
              <div className={styles.projectsForYou_Card}></div>
              <div className={styles.projectsForYou_Card}></div>
              <div className={styles.projectsForYou_Card}></div>
              <div className={styles.projectsForYou_Card}></div>
              <div className={styles.projectsForYou_Card}></div>
              <button className={styles.projectsForYou_ShowMore}> Show More </button>
            </div>

            <div className={styles.type_main__dailyWarmUps}>
              <div className={styles.type_main__dailyWarmUps_Top}>
                <div className={styles.date}>Tue, Mar 23</div>
                <div className={styles.type_main__dialyTitle}>
                  <h4>Daily Warm-Ups</h4>
                  <p>3 quick & easy creative exercises</p>
                </div>
              </div>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardNumberCount}>1</div>
                    <div className={styles.cardTheme}>
                      <div className={styles.cardThemeDot}></div>
                      Photography
                    </div>
                  </div>
                  <div className={styles.cardDescr}>Snap a photo of a National Park</div>
                  <a className={styles.cardButton}>Snap a Photo</a>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardNumberCount}>1</div>
                    <div className={styles.cardTheme}>
                      <div className={styles.cardThemeDot}></div>
                      Photography
                    </div>
                  </div>
                  <div className={styles.cardDescr}>Snap a photo of a National Park</div>
                  <a className={styles.cardButton}>Snap a Photo</a>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardNumberCount}>1</div>
                    <div className={styles.cardTheme}>
                      <div className={styles.cardThemeDot}></div>
                      Photography
                    </div>
                  </div>
                  <div className={styles.cardDescr}>Snap a photo of a National Park</div>
                  <a className={styles.cardButton}>Snap a Photo</a>
                </div>
              </div>
              <p className={styles.warmsText}>New warm-ups every morning</p>
            </div>
            
            <div>
              <div className={styles.type_main__rightCol}>
                <div className={styles.tags}>
                  <div className={styles.tagsTop}>
                    <h4>What's Happening </h4>
                  </div>
                  <ul className={styles.tagsList}>
                    <li className={styles.tagsListItem}>
                      <div className={styles.tagsDescr}>
                        <div className={styles.tagsImages}></div>
                        <div className={styles.tagsDescrText}>Create Together Season 2</div>
                      </div>
                      <div className={styles.tagsCount}>33.5k</div>
                    </li>
                    <li className={styles.tagsListItem}>
                      <div className={styles.tagsDescr}>
                        <div className={styles.tagsImages}></div>
                        <div className={styles.tagsDescrText}>Create Together Season 2</div>
                      </div>
                      <div className={styles.tagsCount}>33.5k</div>
                    </li>
                    <li className={styles.tagsListItem}>
                      <div className={styles.tagsDescr}>
                        <div className={styles.tagsImages}></div>
                        <div className={styles.tagsDescrText}>Create Together Season 2</div>
                      </div>
                      <div className={styles.tagsCount}>33.5k</div>
                    </li>
                  </ul>
                  <div className={styles.tagsButtons}>
                    <button className={styles.tagsPrev}>
                      <span className={styles.tagsPrevArr}></span>
                      Prev
                    </button>
                    <button className={styles.tagsNext}>
                      Next
                      <span className={styles.tagsPrevArr}></span>
                    </button>
                  </div>
                </div>
                
                <div className={styles.spotlight}>
                  <div className={styles.spotlightTitle}>Community Spotlight </div>
                  <ul className={styles.spotlightList}>
                    <li className={styles.spotlightListItem}>
                      <div className={styles.spotlightLeft}>
                        <div className={styles.spotlightLeftImages}></div>
                        <div className={styles.spotlightLeftDescr}>
                          <div className={styles.spotlightLeftDescrName}>1sttovah</div>
                          <div className={styles.spotlightLeftDescrRecords}>234 Records</div>
                        </div>
                      </div>
                      <div className={styles.spotlightFollow}>Follow</div>
                    </li>
                    <li className={styles.spotlightListItem}>
                      <div className={styles.spotlightLeft}>
                        <div className={styles.spotlightLeftImages}></div>
                        <div className={styles.spotlightLeftDescr}>
                          <div className={styles.spotlightLeftDescrName}>1sttovah</div>
                          <div className={styles.spotlightLeftDescrRecords}>234 Records</div>
                        </div>
                      </div>
                      <div className={styles.spotlightFollow}>Follow</div>
                    </li>
                    <li className={styles.spotlightListItem}>
                      <div className={styles.spotlightLeft}>
                        <div className={styles.spotlightLeftImages}></div>
                        <div className={styles.spotlightLeftDescr}>
                          <div className={styles.spotlightLeftDescrName}>1sttovah</div>
                          <div className={styles.spotlightLeftDescrRecords}>234 Records</div>
                        </div>
                      </div>
                      <div className={styles.spotlightFollow}>Follow</div>
                    </li>
                    <li className={styles.spotlightListItem}>
                      <div className={styles.spotlightLeft}>
                        <div className={styles.spotlightLeftImages}></div>
                        <div className={styles.spotlightLeftDescr}>
                          <div className={styles.spotlightLeftDescrName}>1sttovah</div>
                          <div className={styles.spotlightLeftDescrRecords}>234 Records</div>
                        </div>
                      </div>
                      <div className={styles.spotlightFollow}>Follow</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
