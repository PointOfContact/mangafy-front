import React from 'react';

import { Spin } from 'antd';
import cn from 'classnames';
import LargeButton from 'components/ui-elements/large-button';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ButtonToTop from 'components/ui-elements/button-toTop';
import TypePage from 'components/type-content';

import styles from './styles.module.scss';


export default function LandingNew() {
  return (
    <>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header />
          <main>
            <TypePage />
          </main>
        </div>
        <Footer />
        <FooterPolicy />
      </div>

    
    </>
  );
}
