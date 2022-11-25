import React from 'react';
// import styles from './styles.module.scss';

import { Modal } from 'antd';
import Button from 'components/ui-new/Button';
import Avatar from 'components/Avatar';
import client from 'api/client';
import PlanCard from './PlanCard';
import Fire from 'components/icon/new/Fire';
import { useAppContext } from 'context';

const PledgeModal = ({
  isOpen,
  setIsOpen,
  item,
  user,
  setProject,
  setChapters,
  subscribeProject,
  subscribeChapter,
  chapters,
}) => {
  const { cbInstance, openPlanModal } = useAppContext();

  const plans = [
    {
      id: item?.planId,
      title: 'Test plan: ' + item?.planId,
      features: [
        {
          icon: <Fire />,
          text: 'More arts, concept-arts, comic book pannels, strips',
        },
      ],
    },
  ];

  function openProjectCheckout() {
    const updateItem = () => {
      if ('gallery' in item) {
        item.chargebee.data.push({
          userId: user?._id,
          subscribed: true,
        });
        subscribeProject();
        setProject({ ...item });
      } else {
        const newChapters = chapters.map((val, index) => {
          if (val?._id === item?._id) {
            val.chargebee.data.push({
              userId: user?._id,
              subscribed: true,
            });
          }
          return val;
        });
        subscribeChapter();
        setChapters([...newChapters]);
      }
    };
    openPlanModal(
      cbInstance,
      item?.planId,
      item?._id,
      user?.customerId,
      () => setIsOpen(false),
      updateItem
    );
  }

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
          <Avatar size={60} image={item?.image} text={item?.title && item?.title[0]} />
          <div>{item?.title}</div>
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
