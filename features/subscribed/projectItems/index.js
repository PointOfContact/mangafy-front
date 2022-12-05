import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import styles from './styles.module.scss';
import Imgix from 'components/imgix';
import client from 'api/client';
import Avatar from 'components/Avatar';
import SvgComment from 'components/icon/Comment';
import Star from 'components/icon/new/Star';
import { Eye, Heart } from 'components/icon';
import Fire from 'components/icon/new/Fire';
import Diamond from 'components/icon/new/Diamond';
import Link from 'next/link';

const ProjectItems = ({ user, items }) => {
  return items?.map((value, index) => {
    const image = value.image
      ? value.image
      : '1668779204772-748186457-Astro-Boy-manga-color-1280x720%201.png';

    return (
      <div key={value._id} className={styles.items}>
        <Link href={`/project/${value._id}`}>
          <a>
            <div className={styles.imageConatiner}>
              <Imgix layout="fill" src={client.UPLOAD_URL + image} alt="Subscribed data image" />
            </div>
            <div className={styles.content}>
              <div className={styles.dataContainer}>
                <h2>{value.title}</h2>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: value.story }}
                />
                <div className={styles.participentsContainer}>
                  {value.participentsInfo.map((val) => {
                    return (
                      <div key={val._id} className={styles.participents}>
                        <Avatar image={val.avatar} className={styles.avatar} text={val.name} />
                        <p>{val.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.footerContainer}>
                <div>
                  <div className={styles.type}>
                    <p>Follow</p>
                    <Heart />
                  </div>
                  <div className={styles.type}>
                    <p>{value.projectType}</p>
                    <Diamond />
                  </div>
                </div>
                <div>
                  <span>
                    {value.comments?.data?.length ? <p>{value.comments.data.length}</p> : ''}
                    <SvgComment width={17.42} height={17.42} />
                  </span>
                  <span>
                    {value.viewManga.view ? <p>{value.viewManga.view}</p> : ''}
                    <Eye width={22} height={22} />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  });
};

ProjectItems.propTypes = {
  user: PropTypes.object,
  items: PropTypes.array,
};

ProjectItems.defaultProps = {
  user: {},
  items: [],
};

export default ProjectItems;
