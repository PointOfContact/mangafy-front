import Logo from 'components/icon/new/Logo';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const SidebarTab = ({ children, isActive, icon, collapsed, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(styles.tab, isActive && styles.tab_active, collapsed && styles.tab_collapsed)}>
      {icon}
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default SidebarTab;
