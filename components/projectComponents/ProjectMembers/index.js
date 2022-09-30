import React from 'react';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';
import cn from 'classnames';
import Link from 'next/link';
import client from 'api/client';

const ProjectMembers = ({ className, project }) => {
  const author = project.authorInfo;
  return (
    <div className={cn(className, styles.members)}>
      <Link key={author._id} href={client.API_ENDPOINT + '/profile/' + author._id}>
        <a className={styles.members__member}>
          <Avatar size={50} image={author.avatar} text={author.name[0]} />
          <div className={styles.members__info}>
            <div className={styles.members__name}>{author.name}</div>
            <div className={styles.members__role}>owner, {author.type}</div>
          </div>
        </a>
      </Link>
      {project?.participentsInfo?.map((member) => (
        <Link key={member._id} href={client.API_ENDPOINT + '/profile/' + member._id}>
          <a className={styles.members__member}>
            <Avatar size={50} image={member.avatar} text={member.name[0]} />
            <div className={styles.members__info}>
              <div className={styles.members__name}>{member.name}</div>
              <div className={styles.members__role}>{member.type}</div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default ProjectMembers;
