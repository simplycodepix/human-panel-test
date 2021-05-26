import React from 'react';
import PropTypes from 'prop-types';

import styles from './Card.module.scss';

export const CardContent = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);

export const CardActions = ({
  children,
  placement = 'left',
}) => (
  <div className={`${styles.actions} ${placement === 'right' ? styles.justifyEnd : ''}`}>
    {children}
  </div>
);

export const CardHeader = ({
  title,
  action,
}) => (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      {title && (
        <div className={styles.headerTitle}>{title}</div>
      )}
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  </div>
);

export const Card = ({
  children,
  ...other
}) => {
  return (
    <div className={styles.card} {...other}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
};

CardContent.propTypes = {
  children: PropTypes.node,
};

CardActions.propTypes = {
  children: PropTypes.node,
  placement: PropTypes.oneOf(['left', 'right']),
};

CardHeader.propTypes = {
  title: PropTypes.node,
  action: PropTypes.node,
};
