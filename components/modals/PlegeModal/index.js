import React from 'react';
import styles from './styles.module.scss';

import { Modal } from 'antd';
import Button from 'components/ui-new/Button';
import Avatar from 'components/Avatar';
import client from 'api/client';
import PlanCard from './PlanCard';
import Fire from 'components/icon/new/Fire';

const plans = [
  {
    title: 'Pledge - 6$/month',
    features: [
      {
        icon: <Fire />,
        text: 'More arts, concept-arts, comic book pannels, strips',
      },
    ],
  },
  {
    title: 'Subscription - 12$/month ',
    features: [
      {
        icon: <Fire />,
        text: 'More arts, concept-arts, comic book pannels, strips',
      },
      {
        icon: <Fire />,
        text: 'Chapters of comics, synopsis of upcoming comics, full versions of comics and more...',
      },
    ],
    description:
      'Everything from the previous level plus chapters of comics, synopsis of upcoming comics, full versions of comics, private chat with publishers, 20% sale for publisher merch in the future. Donates from this level will be used in working on "Kid of darkness" universe.',
  },
];
const PledgeModal = ({ isOpen, setIsOpen, project }) => {
  return (
    <Modal
      width={800}
      wrapClassName={styles.modal__wrap}
      title={null}
      footer={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <Avatar size={60} image={project?.image} text={project?.title[0]} />
          <div className={styles.modal__title}>{project?.title}</div>
        </div>
        <div className={styles.modal__plans}>
          {plans.map((plan) => (
            <PlanCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PledgeModal;
