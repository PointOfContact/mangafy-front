import React, { useState, useMemo } from 'react';
import styles from './styles.module.scss';

import cn from 'classnames';
import client from 'api/client';
import { formatHtml } from 'helpers/shared';
import { userTypes } from 'helpers/constant';
import { countPages, getCreatedDate, getEditedDate } from '../helpers';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';

import Avatar from 'components/Avatar';
import Button from 'components/ui-new/Button';
import Imgix from 'components/imgix';
import Link from 'next/link';
import ShareModal from 'components/modals/shareModal';
import DeleteProjectButton from 'components/mangeStoryCard/deleteProjectButton';
import ConfirmModal from 'components/modals/ConfirmModal';
import { notification } from 'antd';

import Share from 'components/icon/new/Share';
import Eye from 'components/icon/new/Eye';
import Flash from 'components/icon/new/Flash';
import NewFile from 'components/icon/new/NewFile';
import { Delete } from 'components/icon';
import Settings2 from 'components/icon/new/Settings2';
import Trash from 'components/icon/new/Trash';
import File from 'components/icon/new/File';
import Tag from 'components/icon/new/Tag';
import Hierarchy from 'components/icon/new/Hierarchy';
import Close from 'components/icon/new/Close';

const OpenedProject = ({
  user,
  className,
  isOpened,
  setIsOpened,
  project,
  setProject,
  updateProjectsInfo,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const isOwn = user?._id === project?.author;
  const pagesCount = useMemo(() => countPages(project), [project]);
  const editedDate = useMemo(() => getEditedDate(project), [project]);
  const createdDate = useMemo(() => getCreatedDate(project), [project]);

  const authorsElements = useMemo(() => {
    const authors = [project?.authorInfo];
    if (project?.participentsInfo?.length) {
      project?.participentsInfo.forEach((member) => {
        if (member?._id !== project?.authorInfo?._id) {
          authors.push(member);
        }
      });
    }

    const elements = authors.map((member) => (
      <Link href={'/profile/' + member?._id} key={member?._id}>
        <a className={styles.openedProject__member}>
          <Avatar
            className={styles.openedProject__memberAvatar}
            image={member?.avatar}
            text={member?.name[0]}
            size={50}
          />
          <div className={styles.openedProject__memberName}>{member?.name}</div>
          <div className={styles.openedProject__memberRole}>
            {userTypes.find((t) => t.key === member?.type)?.value}
          </div>
        </a>
      </Link>
    ));
    return elements;
  }, [project]);

  function deleteProject(pid) {
    setIsOpened(false);

    const data = {
      event_type: EVENTS.DELETE_PROJECT,
      event_properties: { mangaStoryId: pid },
    };
    myAmplitude(data);

    const jwt = client.getCookie('feathers-jwt');
    client
      .service('/api/v2/manga-stories')
      .remove(pid, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then(() => {
        notification.success({
          message: 'Project successfully deleted',
          placement: 'bottomLeft',
        });
        updateProjectsInfo();
      })
      .catch((err) => {
        if (err.code === 404) {
          notification.success({
            message: 'Project successfully deleted',
            placement: 'bottomLeft',
          });
          updateProjectsInfo();
        } else {
          console.log(err);
          notification.error({
            message: 'Oops! Something went wrong. Please try again later.',
            placement: 'bottomLeft',
          });
        }
      });
  }

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
          <div className={styles.openedProject__option} onClick={() => setIsShareModalOpen(true)}>
            <Share />
            Share
          </div>
          <Link href={'/project/production/' + project?._id}>
            <a className={styles.openedProject__option}>
              <Settings2 />
              Settings
            </a>
          </Link>
          {isOwn && (
            <div
              className={styles.openedProject__option}
              onClick={() => setIsConfirmDeleteOpen(true)}>
              <Trash />
              Delete
            </div>
          )}
        </div>
        <div className={styles.openedProject__line}></div>
        <div className={styles.openedProject__projectTitle}>{project?.title}</div>
        <div className={styles.openedProject__projectSubtitle}>
          Edited {editedDate} | Created {createdDate}
        </div>
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
        <div className={styles.openedProject__members}>{authorsElements}</div>
        <div className={styles.openedProject__needHelp}>
          <div className={styles.openedProject__needHelpText}>
            <div className={styles.openedProject__needHelpTitle}>Need help?</div>
            <div className={styles.openedProject__needHelpSubtitle}>Create a task</div>
          </div>
          <Link href={'/project/production/' + project?._id + '?tab=details&createTask'}>
            <a>
              <Button sm rounded pink iconRight icon={<Flash color="#fff" bold />}>
                Create
              </Button>
            </a>
          </Link>
        </div>
        <div className={styles.openedProject__tasks}></div>
      </div>
      <div className={styles.openedProject__close} onClick={() => setIsOpened(false)}>
        <Close color="#7B65F3" />
      </div>
      <ShareModal
        isShareModalOpened={isShareModalOpen}
        setIsShareModalOpened={setIsShareModalOpen}
        shareUrl={client.API_ENDPOINT + '/project/' + project?._id}
      />
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        setIsOpen={setIsConfirmDeleteOpen}
        question={'Are you sure, you want to delete this project?'}
        description="Be carefull, you won't be able to revert this!"
        okText={'Yes, delete it'}
        onOk={() => deleteProject(project?._id)}
        cancelText={'Cancel'}
        onCancel={() => {}}
      />
    </div>
  );
};

export default OpenedProject;