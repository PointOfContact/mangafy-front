import client from 'api/client';
import Image from 'next/image';
import Imgix, { imgixClient } from 'components/imgix';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Button from 'components/ui-new/Button';
import Share from 'components/icon/new/Share';
import Edit from 'components/icon/new/Edit';
import Close from 'components/icon/new/Close';
import { ShareButtons } from 'components/share';
import cn from 'classnames';
import Link from 'next/link';

function FeedCardImage({ image, isOwned, shareUrl, onEdit, onDelete, mangaId, mangaUrl }) {
  const [json, setJson] = useState({});
  const [areShareButtonsVisible, setAreShareButtonsVisible] = useState(false);

  useEffect(() => {
    fetch(
      imgixClient.buildURL(image, {
        w: 300,
        h: 350,
        q: 0,
        auto: 'format',
        fit: 'min',
        dpr: 0.01,
        fm: 'json',
      })
    )
      .then((response) => response.json())
      .then((data) => setJson(data));
  }, []);

  const imgHeight = (json?.PixelHeight / json?.PixelWidth) * 300 || 350;
  return (
    <div className={styles.feedCardImage}>
      <Imgix
        src={image}
        width={300}
        height={imgHeight > 600 ? 600 : imgHeight}
        quality={0}
        layout="responsive"
        objectFit="cover"
        alt="Project cover"
        placeholder="blur"
        blurDataURL={imgixClient.buildURL(image, {
          w: 300,
          h: 350,
          q: 0,
          auto: 'format',
          fit: 'min',
          dpr: 0.1,
        })}
        loading="lazy"
      />
      <div className={styles.share__hover}>
        {!isOwned ? (
          <div className={styles.share__buttons}>
            <Button
              rounded
              pink
              iconRight
              icon={<Share color="#fff" />}
              onClick={(e) => {
                e.stopPropagation();
                setAreShareButtonsVisible((old) => !old);
              }}>
              Share
            </Button>
            <ShareButtons
              className={cn(
                styles.share__shareButtons,
                areShareButtonsVisible && styles.share__shareButtons_active
              )}
              shareUrl={shareUrl || mangaUrl}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        ) : (
          <div className={styles.share__buttons}>
            {mangaId ? (
              <Link href={'/manga-story/' + mangaId}>
                <a>
                  <Button rounded pink iconRight icon={<Edit color="#fff" />}>
                    Edit
                  </Button>
                </a>
              </Link>
            ) : (
              <>
                <Button
                  rounded
                  pink
                  iconRight
                  icon={<Edit color="#fff" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}>
                  Edit
                </Button>
                <Button
                  outline
                  rounded
                  pink
                  iconRight
                  icon={<Close color="#d11e8e" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}>
                  Delete
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedCardImage;
