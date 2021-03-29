import React from 'react';

import { Spin } from 'antd';
import cn from 'classnames';
import Imgix from 'components/imgix';
import LargeButton from 'components/ui-elements/large-button';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import styles from './styles.module.sass';

const SimpleSlider = dynamic(() => import('components/slider'), { loading: () => <Spin /> });

export default function Home() {
  return (
    <>
      <div className={styles.main}>
        <div className={cn('container', styles.main__container)}>
          <div className={styles.main__wrap}>
            <div className={styles.main__left}>
              <div className={styles.main__title}>
                <p>WELCOME TO</p>
                <span>MangaFY</span>
              </div>
              <div className={styles.main__descr}>
                The digital hub designed to help you produce your very owm comic or manga. From
                story buidling to a full digital release.
              </div>
              <Link href="/sign-up">
                <a>
                  <LargeButton
                    id="SignUpForFreeBtnId"
                    className={styles.btn__signUp}
                    text="SIGN UP for FREE"
                  />
                </a>
              </Link>
            </div>
            <div className={styles.main__right}>
              <div className={styles.main__img}>
                <Imgix
                  priority
                  layout="intrinsic"
                  width={774}
                  height={863}
                  quality={50}
                  src="https://mangafy.club/img/main-img.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.different}>
        <div className={'container'}>
          <div className={styles.it1}>
            {/* <Imgix
              priority
              layout="intrinsic"
              width={300}
              height={232}
              quality={50}
              src="https://mangafy.club/img/dif-pen.webp"
              alt=""
            /> */}
            <img src="/img/dif-pen.webp" alt="" />
          </div>
          <div className={styles.different__title}>What makes us different</div>
          <div className={styles.different__wrap}>
            <div className={styles.different__item}>
              <div className={styles.different__itemTitle}>Grow as a graphic novelist</div>
              <div className={styles.different__descr}>
                Ensuring your graphic novels are seen by the community so you receive valuable
                feedback on day one.
              </div>
            </div>

            <div className={styles.different__item}>
              <div className={styles.different__itemTitle}>Build your team</div>
              <div className={styles.different__descr}>
                Access and collaborate. Build your mini-production team (editors, illustrators,
                translators) and easily work together in real-time across shared documents,
                calendars, and files.
              </div>
            </div>

            <div className={styles.different__item}>
              <div className={styles.different__itemTitle}>Management Tools</div>
              <div className={styles.different__descr}>
                Big goals require a good plan, consisting of small, measurable and clear objectives.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainDescriprion}>
        <div className={'container'}>
          <div className={styles.mainDescriprion__wrap}>
            <div className={styles.it1}></div>
            <div className={styles.it2}>
              <img src="/img/main-descr-ico2.webp" alt="" />
            </div>
            <div className={styles.mainDescriprion__text}>
              <p>
                <span>MangaFY</span> offers a unique social platform for aspiring and
                <br /> freelance artists that feature collaboration hub to build your
                <br /> mini-production team (illustrators, editors, translators) and
                <br /> utilize management tools such as book-bible and script editing,
                <br /> illustration, and editorial management to efficient the time and
                <br /> work follow of the production process.
                <br /> Once done, we help you take it forward and self-publish it.
              </p>
              <p>Ready?</p>
            </div>
          </div>
          <Link href="/sign-in">
            <a>
              <LargeButton id="LoginBtnId" className={styles.btn__login} text="LOG-IN Now" />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.howWorks}>
        <div className={cn('container', styles.howWorks__container)}>
          <div className={styles.howWorks__title}>
            <div className={styles.it1}>
              <img src="/img/main-descr-ico3.webp" alt="" />
            </div>
            <p>How MangaFY works?</p>
          </div>
          <div className={styles.howWorks__img}>
            <Imgix
              layout="intrinsic"
              width={1100}
              height={554}
              quality={50}
              src="https://mangafy.club/img/how-img.webp"
              alt=""
            />
          </div>
          <div className={styles.howWorks__descr}>
            <div className={styles.howWorks__item}>Submit your graphic novel idea</div>
            <div className={styles.howWorks__item}>Manage the production circle</div>
            <div className={`${styles.howWorks__item} ${styles.pr65}`}>
              Collaborate with graphic novel enthusiasts
            </div>
          </div>
          <div className={styles.howWorks__mobile}>
            <div className={`${styles.howWorks__mobItem} ${styles.howWorks__mobItem_item1}`}>
              <div className={styles.howWorks__mobText}>
                Submit your graphic novel
                <br /> idea
              </div>
              <div className={styles.howWorks__mobImg}>
                <Imgix
                  layout="responsive"
                  width={720}
                  height={600}
                  quality={50}
                  src="https://mangafy.club/img/g1.webp"
                  alt=""
                />
              </div>
            </div>
            <div className={`${styles.howWorks__mobItem} ${styles.howWorks__mobItem_item2}`}>
              <div className={styles.howWorks__mobText}>
                Manage the production
                <br /> circle
              </div>
              <div className={styles.howWorks__mobImg}>
                <Imgix
                  layout="responsive"
                  width={720}
                  height={600}
                  quality={50}
                  src="https://mangafy.club/img/g2.webp"
                  alt=""
                />
              </div>
            </div>
            <div className={`${styles.howWorks__mobItem} ${styles.howWorks__mobItem_item3}`}>
              <div className={`${styles.howWorks__mobText} ${styles.colorBlack}`}>
                Collaborate with graphic
                <br /> novel enthusiasts
              </div>
              <div className={styles.howWorks__mobImg}>
                <Imgix
                  layout="responsive"
                  width={720}
                  height={600}
                  quality={50}
                  src="https://mangafy.club/img/g3.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gotIdea}>
        <div className={'container'}>
          <div className={styles.gotIdea__wrap}>
            <div className={styles.it1}>
              <img src="/img/idea-ico.svg" alt="" />
            </div>
            <div className={styles.gotIdea__title}>Got a great graphic novel idea?</div>
            <div className={styles.gotIdea__descr}>
              Fill out our idea submission form for a chance to turn your idea into
              <br />a published bestseller
            </div>
            <Link href="/create-a-story/start">
              <a>
                <LargeButton
                  id="CreateAStoryBtnId"
                  className={styles.btn__submit}
                  text="Submit an IDEA"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className={cn('sliderMobile', styles.sliderInMobile)}>
        <div className={styles.useGoal__title}>
          <p>
            Use <span>MangaFY</span> <br /> Goal-oriented Planner
          </p>
        </div>
        <div className={'container'}>
          <SimpleSlider />
        </div>
      </div>

      <div className={styles.useGoal}>
        <div className={'container'}>
          <div className={styles.useGoal__title}>
            <p>
              Use <span>MangaFY</span> Goal-oriented Planner
            </p>
          </div>
          <div className={styles.useGoal__images}>
            <div className={styles.useGoal__img}>
              <Imgix
                layout="intrinsic"
                width={373}
                height={470}
                quality={10}
                src="https://mangafy.club/img/goal-ico1.webp"
                alt=""
              />
            </div>
            <div className={`${styles.useGoal__img} ${styles.useGoal__img_img2}`}>
              <Imgix
                layout="intrinsic"
                width={373}
                height={470}
                quality={90}
                src="https://mangafy.club/img/goal-ico2.webp"
                alt=""
              />
            </div>
            <div className={`${styles.useGoal__img} ${styles.useGoal__img_img3}`}>
              <Imgix
                layout="intrinsic"
                width={373}
                height={470}
                quality={90}
                src="https://mangafy.club/img/goal-ico3.webp"
                alt=""
              />
            </div>
          </div>
          <div className={styles.useGoal__descr}>
            <p>
              Big goals require a good plan, consisting of small, measurable, and clear
              <br /> objectives. Now MangaFY helps you attain your aspirations! And remain
              <br /> concentrated while seeing the big picture 
            </p>
          </div>
          <Link href="/sign-up">
            <a>
              <LargeButton
                id="TryForFreeBtnId"
                className={styles.btn__submit}
                text="Try For Free"
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.join}>
        <div className={'container'}>
          <div className={styles.join__title}>Join our community today</div>
          <div className={styles.join__descr}>
            <p>
              Do you love graphic novels? Want to constantly stay inspired and be
              <br /> surrounded by like-minded creators? Then sign-up today and get rewarded for
              <br /> your love of comics and manga
            </p>
          </div>
          <div className={styles.join__img}>
            <Imgix
              layout="intrinsic"
              width={720}
              height={606}
              src="https://mangafy.club/img/join-ico.webp"
              alt=""
            />
          </div>
          <Link href="/sign-up">
            <a>
              <LargeButton id="SignUpBtnId" className={styles.btn__submit} text="Sign UP" />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
