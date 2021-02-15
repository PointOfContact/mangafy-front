import React, {useState, useEffect} from 'react';
import cn from 'classnames';
import { removeAllStorage } from 'helpers/shared';
import Link from 'next/link';
import styles from './styles.module.scss';

const  Header = ({ user, path }) => {
    const [isOpen, handleManuOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('click', _handleDocumentClick, false);
        document.addEventListener('scroll', _handleScroll);

        return () => {
          document.removeEventListener('click', _handleDocumentClick)
          document.removeEventListener('scroll', _handleScroll)
        };
    })
    const openMenu = (e) => {
      e.nativeEvent.stopImmediatePropagation()
      handleManuOpen(!isOpen)
    }
    const _handleScroll = () => {
      const el =  document.querySelector(".menubar")
        if (window.scrollY > 20) {
           el.style.backgroundColor = "white";
           el.classList.add(styles.fixed_menu)
        } else {
            el.classList.remove(styles.fixed_menu)
            el.style.backgroundColor = "none";
        }
    }

    const _handleDocumentClick = () => {
        handleManuOpen(false)
    }

     const _menuToggle = (e) => {
      e.stopPropagation();
      handleManuOpen(!isOpen)
    }

    let menuStatus = isOpen ? 'isopen' : '';
    return (
      <header className={`${styles.header} navbar menubar`}>
        <div className={'container'}>
          <div className={styles.header__top}>
            <div onClick={openMenu} className={styles.header__mnu}>
              <img src="img/mnu.svg" alt="" />
            </div>
            <Link href="/">
              <a className={styles.header__logo}>
                <img src="img/logo-new.png" alt="" />
              </a>
            </Link>
            <div className={styles.header__logIn}>
              <img src="img/header-log-in.svg" alt="" />
            </div>
            <div className={styles.header__leftNav}>
              <Link href="/collaborations?compensationModel=paid">
                <a className={styles.header__menu}>Paid projects</a>
              </Link>
              <Link href="/collaborations?compensationModel=collaboration">
                <a className={styles.header__menu}>Collabas</a>
              </Link>
              <Link href="/profiles">
                <a className={styles.header__menu}>Members</a>
              </Link>
            </div>
            <div className={styles.header__rightNav}>
              <a href="#" className={styles.header__menu}>
                Join
              </a>
              {user ? (
                <>
                  {path !== 'myProfile' && (
                    <Link href="/my-profile">
                      <a className={styles.header__menu}>Profile</a>
                    </Link>
                  )}
                  {path === 'myProfile' && (
                    <Link href="/">
                      <a
                        className={cn(
                          path === 'main' ? 'whiteButton' : 'exploreBtn',
                          styles.header__menu
                        )}
                        onClick={removeAllStorage}>
                        Sign out
                      </a>
                    </Link>
                  )}
                </>
              ) : (
                <a href="/sign-in" className={styles.header__menu}>
                  Log in
                </a>
              )}
            </div>
            <button className={`${'btn_submit' + ' '}${styles.btn_submit}`}>Submit an IDEA</button>
          </div>
        </div>
        {isOpen && <MenuLinks isOpen={isOpen} />}
      </header>
    );
}



const MenuLinks = ({isOpen}) => {
    const initialLinks = [
        {
          text: 'About',
          link: 'about',
        },
        {
          text: 'Community Guidelines',
          link: '#',
        },
        {
          text: 'Terms',
          link: 'terms',
        },
        {
          text: 'Privacy Policy',
          link: 'privacy',
        },
    ]

    const links = initialLinks.map((link, i) => (
      <li className={styles.menu_item} key={i}>
        <Link href={`/${link.link}`}>
          <a>{link.text}</a>
        </Link>
      </li>
    ));

    return (
      <div id="menu" className={`${styles.mobile_menu} ${isOpen && styles.isOpen}`}>
        <div className={styles.mobile_div_part1}>
          <ul className={styles.main_list}>
              <li className={styles.menu_item}>
                <Link href="/collaborations?compensationModel=paid">
                  Paid projects
                </Link>
              </li>
            <li className={styles.menu_item}>
              <Link href="/collaborations">
                Collabs
              </Link>
            </li>
            <li className={styles.menu_item}>
              <Link href="/create-a-story/start">
                Create a collab
              </Link>
            </li>
            <li className={styles.menu_item}>
              <Link href="/profiles">
                Enthusiast
              </Link>
            </li>
            <li className={styles.menu_item}>
              <Link href="/profiles">
                Members
              </Link>
            </li>
          </ul>
        </div>
        <ul className="links">{links}</ul>
      </div>
    );
}

export default Header
