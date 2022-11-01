import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

import Eye from 'components/icon/new/Eye';
import NewFile from 'components/icon/new/NewFile';
import Avatar from 'components/Avatar';
import Button from 'components/ui-new/Button';
import Flash from 'components/icon/new/Flash';
import Share from 'components/icon/new/Share';
import { Delete } from 'components/icon';
import Settings2 from 'components/icon/new/Settings2';
import Trash from 'components/icon/new/Trash';
import File from 'components/icon/new/File';
import Tag from 'components/icon/new/Tag';
import Hierarchy from 'components/icon/new/Hierarchy';
import Close from 'components/icon/new/Close';
import client from 'api/client';
import Imgix from 'components/imgix';
import { formatHtml } from 'helpers/shared';
import { userTypes } from 'helpers/constant';

const OpenedProject = ({ className, isOpened, setIsOpened, project, setProject }) => {
  const authorsElement = (
    <div className={styles.openedProject__member}>
      <Avatar
        className={styles.openedProject__memberAvatar}
        image={project?.authorInfo?.avatar}
        text={project?.authorInfo?.name[0]}
        size={50}
      />
      <div className={styles.openedProject__memberName}>{project?.authorInfo?.name}</div>
      <div className={styles.openedProject__memberRole}>{project?.authorInfo?.type}</div>
    </div>
  );

  const participantsElements = project?.participentsInfo.map((member) => (
    <div className={styles.openedProject__member}>
      <Avatar
        className={styles.openedProject__memberAvatar}
        image={member?.avatar}
        text={member?.name[0]}
        size={50}
      />
      <div className={styles.openedProject__memberName}>{member?.name}</div>
      <div className={styles.openedProject__memberRole}>
        {userTypes.find((t) => t.key === member?.type).value}
      </div>
    </div>
  ));
  console.log(participantsElements);

  const authorAndParticipantsElements = [authorsElement, ...participantsElements];
  console.log(authorAndParticipantsElements);

  return (
    <div className={cn(className, styles.openedProject, isOpened && styles.openedProject_opened)}>
      <div className={styles.openedProject__container}>
        <div className={styles.openedProject__sectionTitle}>
          <File color={'#d11e8e'} className={styles.openedProject__sectionIcon} /> Project preview
        </div>
        <div className={styles.openedProject__cover}>
          {project?.image ? (
            <Imgix src={client.UPLOAD_URL + project?.image} objectFit="cover" layout="fill" />
          ) : (
            <div className={styles.openedProject__noImage}>{project?.title}</div>
          )}
        </div>
        <div className={styles.openedProject__options}>
          {/* <div className={styles.openedProject__option}>
          <Eye />
          Preview
        </div> */}
          <div className={styles.openedProject__option}>
            <Share />
            Share
          </div>
          <div className={styles.openedProject__option}>
            <Settings2 />
            Settings
          </div>
          <div className={styles.openedProject__option}>
            <Trash />
            Delete
          </div>
        </div>
        <div className={styles.openedProject__line}></div>
        <div className={styles.openedProject__projectTitle}>{project?.title}</div>
        <div className={styles.openedProject__projectSubtitle}>Project subtitle</div>
        <div
          className={styles.openedProject__projectDescription}
          dangerouslySetInnerHTML={{ __html: formatHtml(project?.story) }}></div>
        <div className={styles.openedProject__line}></div>
        <div className={styles.openedProject__sectionTitle}>
          <Tag color={'#d11e8e'} className={styles.openedProject__sectionIcon} /> Tags
        </div>
        <div className={styles.openedProject__tags}>
          {project?.genres?.map((tag) => (
            <div className={styles.openedProject__tag}>tag1</div>
          ))}
        </div>
        <div className={styles.openedProject__line}></div>
        <div className={styles.openedProject__sectionTitle}>
          <Hierarchy color={'#d11e8e'} className={styles.openedProject__sectionIcon} />
          Members
        </div>
        <div className={styles.openedProject__members}>{authorAndParticipantsElements}</div>
        <div className={styles.openedProject__needHelp}>
          <div className={styles.openedProject__needHelpText}>
            <div className={styles.openedProject__needHelpTitle}>Need help?</div>
            <div className={styles.openedProject__needHelpSubtitle}>Create a task</div>
          </div>
          <Button sm rounded pink iconRight icon={<Flash color="#fff" bold />}>
            Create
          </Button>
        </div>
        <div className={styles.openedProject__tasks}></div>
      </div>
      <div className={styles.openedProject__close} onClick={() => setIsOpened(false)}>
        <Close color="#7B65F3" />
      </div>
    </div>
  );
};

export default OpenedProject;
