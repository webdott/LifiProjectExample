import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import styles from './bestsliptab.module.scss';

const SelectedBet = () => {
  return (
    <div className={styles.selectedBet}>
      <div className={styles.top}>
        <p className={styles.title}>
          <span>West Ham United - Liverpool</span>
        </p>
        <IconButton sx={{ padding: 0, color: '#fff', opacity: '0.7' }}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </div>
      <p>Full Time Result</p>
      <div className={styles.odds}>
        <span className={styles.who}>2</span>
        <span className={styles.odd}>1.85</span>
      </div>
    </div>
  );
};

export default SelectedBet;
