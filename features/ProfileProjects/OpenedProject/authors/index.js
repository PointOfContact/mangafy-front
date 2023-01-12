import Link from 'next/link';
import Avatar from 'components/Avatar';
import { Popover } from 'antd';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import mangaStoryClient from 'api/mangaStoryClient';
import { item } from 'chargebee/lib/resources/api_endpoints';

const getAuthors = (project) => {
  const authors = [project?.authorInfo];
  if (project?.participentsInfo?.length) {
    project?.participentsInfo.forEach((member) => {
      if (member?._id !== project?.authorInfo?._id) {
        authors.push(member);
      }
    });
  }
  return authors;
};

const Authors = ({ user, project, userTypes, isOwn, setProject }) => {
  const [visibleMemberPopover, setVisibleMemberPopover] = useState(false);
  const authors = getAuthors(project);

  const onMouseOver = (member, isOwn, ifCurrentUser) => {
    const showModalForMember = ifCurrentUser ? member?._id : false;
    const ifOwnDontOpenModal = member?._id !== user?._id && member?._id;
    const memberId = isOwn ? ifOwnDontOpenModal : showModalForMember;
    setVisibleMemberPopover(memberId);
  };

  const leaveFromManga = (memberId) => {
    const deleteMember = project?.participents?.filter((item) => item?._id !== memberId);
    const newProjectData = {
      ...project,
      participents: deleteMember,
    };
    mangaStoryClient.collab.patchCollab(newProjectData, setProject);
  };

  return authors.map((member) => {
    const ifOwn = member?._id === project?.author;
    const ifCurrentUser = member?._id === user?._id;
    return (
      <div
        className={styles.openedProject__member}
        key={member?._id}
        onMouseOver={() => onMouseOver(member, isOwn, ifCurrentUser)}>
        <Link href={'/profile/' + member?._id}>
          <a>
            <Avatar
              className={styles.openedProject__memberAvatar}
              image={member?.avatar}
              text={member?.name[0]}
              size={50}
            />
          </a>
        </Link>
        <Popover
          placement="top"
          visible={visibleMemberPopover === member?._id}
          onVisibleChange={setVisibleMemberPopover}
          content={
            <div className={styles.leaveProject}>
              <p onClick={() => leaveFromManga(member?._id)}>
                {ifCurrentUser ? 'Leave from project' : ' Delete from project'}
              </p>
            </div>
          }>
          <div>
            <div className={styles.openedProject__memberName}>{member?.name}</div>
            <div className={styles.openedProject__memberRole}>
              {userTypes.find((t) => t.key === member?.type)?.value}
            </div>
          </div>
        </Popover>
      </div>
    );
  });
};

Authors.propTypes = {
  user: PropTypes.object,
  project: PropTypes.object.isRequired,
  userTypes: PropTypes.array,
  isOwn: PropTypes.bool.isRequired,
  setProject: PropTypes.func,
};

Authors.defaultProps = {
  user: {},
  userTypes: [],
  setProject: () => {},
};

export default Authors;
