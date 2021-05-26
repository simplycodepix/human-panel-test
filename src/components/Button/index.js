import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

export const Button = ({ children, endIcon, startIcon, ...other }) => (
  <button className={styles.button} {...other}>
    {startIcon && <div className={`${styles.icon} ${styles.startIcon}`}>{startIcon}</div>}

    {children}

    {endIcon && <div className={`${styles.icon} ${styles.endIcon}`}>{endIcon}</div>}
  </button>
);

export const IconButton = ({ children, ...other }) => (
  <button
    className={`${styles.iconButton} ${styles.button}`}
    {...other}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

Button.propTypes = {
  children: PropTypes.node,
};