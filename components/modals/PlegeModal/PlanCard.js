import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';

const PlanCard = ({ title, features, description, planId, openProjectCheckout }) => {
  return (
    <div className={styles.plan}>
      <div className={styles.plan__title}>{title}</div>
      <div className={styles.plan__features}>
        {features.map((feature) => (
          <div key={feature.text} className={styles.plan__feature}>
            {feature.icon}
            {feature.text}
          </div>
        ))}
      </div>
      {description && <div className={styles.plan__description}>{description}</div>}
      <Button pink rounded className={styles.plan__button} onClick={() => openProjectCheckout()}>
        Pledge your support
      </Button>
    </div>
  );
};

export default PlanCard;
