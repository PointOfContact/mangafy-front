import React from 'react';

import cn from 'classnames';
import SimpleSlider from 'components/slider';
import LargeButton from 'components/ui-elements/large-button';
import Link from 'next/link';

import styles from './styles.module.sass';

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
                <LargeButton
                  id="SignUpForFreeBtnId"
                  className={styles.btn__signUp}
                  text="SIGN UP for FREE"
                />
              </Link>
            </div>
            <div className={styles.main__right}>
              <div className={styles.main__img}>
                <img src="/img/main-img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.different}>
        <div className={'container'}>
          <div className={styles.it1}>
            <img src="/img/dif-pen.png" alt="" />
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
              <div className={styles.different__itemTitle}>Managment Tools</div>
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
              <img src="/img/main-descr-ico2.png" alt="" />
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
            <LargeButton id="LoginBtnId" className={styles.btn__login} text="LOG-IN Now" />
          </Link>
        </div>
      </div>
      <div className={styles.howWorks}>
        <div className={cn('container', styles.howWorks__container)}>
          <div className={styles.howWorks__title}>
            <div className={styles.it1}>
              <img src="/img/main-descr-ico3.png" alt="" />
            </div>
            <p>How MangaFY works?</p>
          </div>
          <div className={styles.howWorks__img}>
            <img src="/img/how-img.png" alt="" />
          </div>
          <div className={styles.howWorks__descr}>
            <div className={styles.howWorks__item}>Submit your graphinc novel idea</div>
            <div className={styles.howWorks__item}>Manage the production circle</div>
            <div className={`${styles.howWorks__item} ${styles.pr65}`}>
              Collaborate with graphic novel entusiasts
            </div>
          </div>
          <div className={styles.howWorks__mobile}>
            <div className={`${styles.howWorks__mobItem} ${styles.howWorks__mobItem_item1}`}>
              <div className={styles.howWorks__mobText}>
                Submit your graphinc novel
                <br /> idea
              </div>
              <div className={styles.howWorks__mobImg}>
                <img src="/img/g1.png" alt="" />
              </div>
            </div>
            <div className={`${styles.howWorks__mobItem} ${styles.howWorks__mobItem_item2}`}>
              <div className={styles.howWorks__mobText}>
                Manage the production
                <br /> circle
              </div>
              <div className={styles.howWorks__mobImg}>
                <img src="/img/g2.png" alt="" />
              </div>
            </div>
            <div className={`${styles.howWorks__mobItem} ${styles.howWorks__mobItem_item3}`}>
              <div className={`${styles.howWorks__mobText} ${styles.colorBlack}`}>
                Collaborate with graphic
                <br /> novel entusiasts
              </div>
              <div className={styles.howWorks__mobImg}>
                <img src="/img/g3.png" alt="" />
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
            <div className={styles.gotIdea__title}>Got a great graphinc novel idea?</div>
            <div className={styles.gotIdea__descr}>
              Fill out our idea submission form for a chance to turn your idea into
              <br />a published bestseller
            </div>
            <Link href="/create-a-story/start">
              <LargeButton
                id="CreateAStoryBtnId"
                className={styles.btn__submit}
                text="Submit an IDEA"
              />
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
              <img src="/img/goal-ico1.png" alt="" />
            </div>
            <div className={`${styles.useGoal__img} ${styles.useGoal__img_img2}`}>
              <img src="/img/goal-ico2.png" alt="" />
            </div>
            <div className={`${styles.useGoal__img} ${styles.useGoal__img_img3}`}>
              <img src="/img/goal-ico3.png" alt="" />
            </div>
          </div>
          <div className={styles.useGoal__slider}>
            <div className={styles.slider}>
              <div>
                <img src="/img/goal-ico2.png" alt="" />
              </div>
              <div>
                <img src="/img/goal-ico2.png" alt="" />
              </div>
              <div>
                <img src="/img/goal-ico2.png" alt="" />
              </div>
              <div>
                <img src="/img/goal-ico2.png" alt="" />
              </div>
              <div>
                <img src="/img/goal-ico2.png" alt="" />
              </div>
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
            <LargeButton id="TryForFreeBtnId" className={styles.btn__submit} text="Try For Free" />
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
            <img src="/img/join-ico.png" alt="" />
          </div>
          <Link href="/sign-up">
            <LargeButton id="SignUpBtnId" className={styles.btn__submit} text="Sign UP" />
          </Link>
        </div>
      </div>
    </>
  );
}
