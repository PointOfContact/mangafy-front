import React, { useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';
import Select from 'components/ui-new/Input/Select';
import client from 'api/client';
import { projectRoles } from 'helpers/constant';

const Members = ({ className, members, roleOptions, mangaStoryId, inviterId, participants }) => {
  async function changeRole(memberId, newRole) {
    console.log(memberId, newRole);

    const newParticipants = participants.map((participant) =>
      participant._id === memberId ? { ...participant, role: newRole } : participant
    );

    const data = {
      participents: newParticipants,
    };
    const jwt = client.getCookie('feathers-jwt');

    // const project = await client.service('api/v2/manga-stories').get(mangaStoryId, {
    //   headers: { Authorization: `Bearer ${jwt}` },
    //   mode: 'no-cors',
    // });
    console.log(data);
    client
      .service(`/api/v2/manga-stories`)
      .patch(mangaStoryId, data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const membersList = useMemo(() => {
    return members.map((member) => {
      return (
        <div className={styles.member} key={member._id}>
          <div className={styles.member__info}>
            <Avatar
              className={styles.member__avatar}
              size={50}
              image={member.avatar}
              text={member.name[0]}
            />
            <div className={styles.member__name}>{member.name}</div>
            <div className={styles.member__role}>{member.type || 'Type'}</div>
          </div>
          <div className={styles.member__role}>
            <Select
              sm
              rounded
              options={roleOptions}
              defaultValue={roleOptions.find((role) => role.value === member.role)}
              onChange={(newRole) => changeRole(member._id, projectRoles[newRole])}
            />
          </div>
        </div>
      );
    });
  }, [members]);

  return <div className={cn(className, styles.members)}>{membersList}</div>;
};

export default Members;
