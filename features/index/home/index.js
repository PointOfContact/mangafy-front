import React from 'react';

import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import styles from './styles.module.sass';

const WelcomeSlider = dynamic(() => import('components/welcomeSlider'), {});

export default function Home() {
  return (
    <>
      <div className={styles.main}>
        <div className={cn('container', styles.main__container)}>
          <div className={styles.main__wrap}>
            <div className={styles.main__left}>
              <div className={styles.main__title}>
                <p>
                  The platform to create your <br />
                  own manga or comic story <br />
                  is now in your hands.
                </p>
              </div>
              <div className={styles.main__buttons}>
                <Link href="sign-up">
                  <a className={cn('btn_submit')}>
                    <PrimaryButton text="Sign Up for free" className={styles.signUpFree} />
                  </a>
                </Link>
                <Link href="/create-a-story/start">
                  <a className={styles.header__menu}>
                    <PrimaryButton
                      className={styles.joinBtn}
                      text="Start a Project"></PrimaryButton>
                  </a>
                </Link>
              </div>
              <div className={styles.main__ico}>
                <img src="img/land-new-img1.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.platformDescr}>
        <div className={'container'}>
          <div className={styles.platformDescr__title}>One platform to call home.</div>
          <div className={styles.platformDescr__subtitle}>
            MangaFY was built to help artists focus all their work in one place: collaborate, manage
            your manga or comic workflow, chat, set deadlines and tasks, and turn your story into a
            ready-to-be-published graphic novel.
          </div>
          <div className={styles.platformDescr__wrap}>
            <div className={styles.platformDescr__item}>
              <div className={styles.platformDescr__itemIco}>
                <img src="icons/platform-img1.svg" />
              </div>
              <div className={styles.platformDescr__itemTitle}>Grow as a graphic novelist</div>
              <div className={styles.platformDescr__itemDescr}>
                Join a vivid community of creators (writers, illustrators, editors, translators,{' '}
                <br /> and inkers)
              </div>
            </div>
            <div className={cn(styles.platformDescr__item, styles.platformDescr__itemCenter)}>
              <div className={styles.platformDescr__itemIco}>
                <img src="icons/platform-img2.svg" />
              </div>
              <div className={styles.platformDescr__itemTitle}>Build your team</div>
              <div className={styles.platformDescr__itemDescr}>
                Open a project and collaborate with the community and build your team
              </div>
            </div>
            <div className={styles.platformDescr__item}>
              <div className={styles.platformDescr__itemIco}>
                <img src="icons/platform-img3.svg" />
              </div>
              <div className={styles.platformDescr__itemTitle}>Management Tools</div>
              <div className={styles.platformDescr__itemDescr}>
                Manage the production process of your manga or comics and team workflow via
                dedicated tools
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.goinSection}>
        <div className={'container'}>
          <div className={styles.goinSection__join}>
            <div className={styles.goinSection__joinText}>Ready?</div>
            <Link href="sign-in">
              <a className={cn('btn_submit')}>
                <PrimaryButton text="Login Now" className={styles.goinSection__goinNow} />
              </a>
            </Link>
          </div>
          <div className={styles.goinSection__img}>
            <img src="img/joinSecion-img1.png" />
            <div className={styles.goinSection__imgLeft}>
              <img src="img/joinSecion-img2.png" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.titleBlock}>
        <div className={'container'}>
          <div className={styles.titleBlock__title}>
            The future of graphic novel <br /> self-production.
          </div>
          <div className={styles.titleBlock__subtitle}>
            We believe that in today's digital age, producing your own comic book or manga should
            not be an obstacle. As such, we have designed simple tools for aspiring and freelance
            artists to take their stories forward towards a visualized novel - in easy steps.
          </div>
        </div>
      </div>

      <div className={styles.imgBlock}>
        <div className={cn('container', styles.main__container)}>
          <div className={styles.imgBlock__wrap}>
            <div className={cn(styles.imgBlock__img, styles.imgBlock__imgIco1)}>
              <img src="img/imgBlock-img1.png" />
            </div>
            <div className={cn(styles.imgBlock__img, styles.imgBlock__imgIco2)}>
              <img src="img/imgBlock-img2.png" />
            </div>
            <div className={cn(styles.imgBlock__img, styles.imgBlock__imgIco3)}>
              <img src="img/imgBlock-img3.png" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.privAndSecure}>
        <div className={'container'}>
          <div className={styles.privAndSecure__title}>
            Privately and securely work on <br /> your graphic novel idea.{' '}
          </div>
          <div className={styles.privAndSecure__wrap}>
            <div className={styles.privAndSecure__item}>
              Our tools allow you to <br />{' '}
              <span className={styles.privAndSecure__itemBold}>manage your storyboard</span> and
              page scripts, define your characters.
            </div>
            <div className={styles.privAndSecure__item}>
              <span className={styles.privAndSecure__itemBold}>Grow with new teammates</span>,<br />{' '}
              invite team members to your secure workspace and collaborate together by setting tasks
              and ease of communication.
            </div>
            <div className={styles.privAndSecure__item}>
              <span className={styles.privAndSecure__itemBold}>Seamlessly send files</span> between
              the team and exchange ideas until you have a finalized graphic novel at hand.
            </div>
          </div>
          <div className={styles.privAndSecure__subtitle}>
            Once you are done working on your novel you can{' '}
            <span className={styles.privAndSecure__itemBold}>easily publish</span> it through
            MangaFY on any of the leading <br /> self-publishing platforms and begin getting
            followers and monetize your work.
          </div>
          <div className={styles.privAndSecure__textBold}>Simple and stright-foward.</div>
          <Link href="sign-up">
            <a className={cn('btn_submit')}>
              <PrimaryButton text="Try for free" className={styles.privAndSecure__try} />
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.titleSlider}>
        <div className={'container'}>
          <div className={styles.titleSlider__title}>
            Join our
            <br /> community today
          </div>
          <div className={styles.titleSlider__subtitle}>
            Do you love graphic novels? Want to constantly stay inspired and be
            <br />
            surrounded by like-minded creators? Then sign-up today and get rewarded for your love{' '}
            <br />
            of comics and manga
          </div>
        </div>
      </div>

      <div className={styles.sliderWelcome}>
        <WelcomeSlider />
        <Link href="sign-up">
          <a className={cn('btn_submit')}>
            <PrimaryButton text="Sign Up for free" className={styles.sliderWelcome__signup} />
          </a>
        </Link>
      </div>

      {/* <div className={cn('sliderMobile', styles.sliderInMobile)}>
        <div className={styles.useGoal__title}>
          <p>
            Use <span>MangaFY</span> <br /> Goal-oriented Planner
          </p>
        </div>
        <div className={'container'}>
          <SimpleSlider />
        </div>
      </div> */}
    </>
  );
}
