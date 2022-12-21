import React, { useState, useRef, useMemo } from 'react';
import styles from './styles.module.scss';

import { Modal } from 'antd';
import Close from 'components/icon/new/Close';
import Button from 'components/ui-new/Button';
import Input from 'components/ui-new/Input';
import { validateEmail } from 'helpers/shared';
import { projectRoles } from 'helpers/constant';
import client from 'api/client';
import Select from 'components/ui-new/Input/Select';
import { notification } from 'antd';
import Members from './Members';

const roleOptions = Object.keys(projectRoles).map((key) => ({ key, value: projectRoles[key] }));

const InviteModal = ({
  projectTitle,
  visible,
  setVisible,
  mangaStoryId,
  participants,
  participantsInfo,
  inviterId,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [role, setRole] = useState(projectRoles?.MEMBER);

  const inputRef = useRef(null);
  const members = useMemo(() => {
    return participants?.map((participant) => {
      const participantInfo = participantsInfo?.find((info) => info?._id === participant?._id);
      return {
        ...participant,
        ...participantInfo,
      };
    });
  }, [participants, participantsInfo]);

  function onInvite() {
    const error = validateEmail(email);
    setError(error);
    if (error) return;

    const data = {
      email,
      role,
      isInvite: true,
      mangaStoryId,
    };

    const jwt = client.getCookie('feathers-jwt');
    client
      .service('api/v2/join-manga-story-requests')
      .create(data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then((res) => {
        notification.success({
          message: 'Invite sent on ' + email + ' successfully!',
          placement: 'bottomLeft',
        });
        setEmail('');
        if (inputRef.current) inputRef.current.value = '';
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Oops! Something went wrong. Please try again later.',
          placement: 'bottomLeft',
        });
      });
  }

  return (
    <Modal
      open={visible}
      wrapClassName={styles.modal}
      closeIcon={<Close bold className={styles.modal__close} />}
      onCancel={() => setVisible(false)}
      title={null}
      footer={null}
      width={775}>
      <div className={styles.modal__title}>Share "{projectTitle}"</div>
      <div className={styles.modal__label}>Email adress or name</div>
      <form
        className={styles.modal__form}
        onSubmit={(e) => {
          e.preventDefault();
          onInvite();
        }}>
        <Input
          className={styles.modal__input}
          err={error}
          rounded
          pink
          md
          placeholder="Adress or name"
          onChange={setEmail}
          inputRef={inputRef}
        />
        <div className={styles.modal__buttonAndSelect}>
          <Select
            className={styles.modal__select}
            sm
            rounded
            options={roleOptions}
            defaultValue={roleOptions[1]}
            onChange={(option) => setRole(projectRoles[option])}
          />
          <Button className={styles.modal__button} md bold rounded pink>
            Invite
          </Button>
        </div>
      </form>
      <div className={styles.line}></div>
      <Members
        mangaStoryId={mangaStoryId}
        members={members}
        className={styles.modal__members}
        roleOptions={roleOptions}
        inviterId={inviterId}
        participants={participants}
      />
    </Modal>
  );
};

export default InviteModal;
