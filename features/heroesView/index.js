import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Imgix from 'components/imgix';
import client from 'api/client';
import { NextSeo } from 'next-seo';

const HeroesView = ({ user, heroes }) => {
  return (
    <>
      <NextSeo
        title="MangaFY heroe"
        description="MangaFY heroe cards"
        openGraph={{
          url: `${client.API_ENDPOINT}/heroes/${heroes._id}`,
          title: 'MangaFY heroe',
          description: 'MangaFY heroe cards',
          type: 'article',
          images: [
            {
              url: 'https://mangafy.club/img/indexMobSec3.webp',
              width: 800,
              height: 600,
              alt: 'Manga Story Image',
            },
          ],
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />
      <div className={styles.container}>
        <div className={styles.menu}>
          <h1>{heroes?.name}</h1>
          <p>{heroes?.description}</p>
          <div className={styles.imageContainer}>
            {heroes?.imageUrl && (
              <Imgix
                layout="fill"
                objectFit="cover"
                src={client.UPLOAD_URL + heroes?.imageUrl}
                alt="Heroes image"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

HeroesView.propTypes = {
  user: PropTypes.object.isRequired,
  heroes: PropTypes.object.isRequired,
};

export default HeroesView;
