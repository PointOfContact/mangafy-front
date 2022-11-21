import React from 'react';
import styles from './styles.module.scss';

import { Modal } from 'antd';
import Button from 'components/ui-new/Button';
import Avatar from 'components/Avatar';
import client from 'api/client';
import PlanCard from './PlanCard';
import Fire from 'components/icon/new/Fire';
import { useAppContext } from 'context';

const PledgeModal = ({ isOpen, setIsOpen, project, user }) => {
  const plans = [
    {
      id: project?.planId,
      title: 'Test plan: ' + project?.planId,
      features: [
        {
          icon: <Fire />,
          text: 'More arts, concept-arts, comic book pannels, strips',
        },
      ],
    },
  ];

  const { cbInstance, openPlanModal } = useAppContext();

  function openProjectCheckout() {
    openPlanModal(cbInstance, project.planId, project._id, user.customerId);
    console.log(cbInstance);
  }

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
            <PlanCard key={plan.title} {...plan} openProjectCheckout={openProjectCheckout} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PledgeModal;
