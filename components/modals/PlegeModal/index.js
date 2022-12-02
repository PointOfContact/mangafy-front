import React from 'react';
// import styles from './styles.module.scss';

import { Modal } from 'antd';
import Button from 'components/ui-new/Button';
import Avatar from 'components/Avatar';
import client from 'api/client';
import PlanCard from './PlanCard';
import Fire from 'components/icon/new/Fire';
import { useAppContext } from 'context';

const PledgeModal = ({ isOpen, setIsOpen, object, user, updatePage, type }) => {
  const { cbInstance, openPlanModal } = useAppContext();

  const plans = [
    {
      id: object?.item?.planId,
      title: 'Test plan: ' + object?.item?.planId,
      features: [
        {
          icon: <Fire />,
          text: 'More arts, concept-arts, comic book pannels, strips',
        },
      ],
    },
  ];

  const openProjectCheckout = () => {
    openPlanModal(
      cbInstance,
      object?.item?.planId,
      object?.item._id || object?.item.mangaStoryId,
      user?.customerId,
      () => setIsOpen(false),
      updatePage,
      object?.type
    );
  };

  return (
    <Modal
      width={800}
      // wrapClassName={styles.modal__wrap}
      title={null}
      footer={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}>
      <div>
        <div>
          <Avatar
            size={60}
            image={object?.item?.image}
            text={object?.item?.title && object?.item?.title[0]}
          />
          <div>{object?.item?.title}</div>
        </div>
        <div>
          {plans.map((plan) => (
            <PlanCard key={plan.title} {...plan} openProjectCheckout={openProjectCheckout} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PledgeModal;
