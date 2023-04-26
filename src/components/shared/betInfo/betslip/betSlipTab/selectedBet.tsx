import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { RootState } from '../../../../../redux';
import { removeBetSlip } from '../../../../../redux/action-creators';

import styles from './bestsliptab.module.scss';

const SelectedBet = () => {
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);
  const dispatch = useDispatch();

  return (
    <div className={styles.selectedBet}>
      <div className={styles.top}>
        <p className={styles.title}>
          <p>
            {currentBetSlipGame?.team1} - {currentBetSlipGame?.team2}
          </p>
        </p>
        <IconButton
          sx={{ padding: 0, color: '#fff', opacity: '0.7' }}
          onClick={() => removeBetSlip()(dispatch)}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </div>
      <p>{currentBetSlipGame?.betType ?? ''}</p>
      <div className={styles.odds}>
        <span className={styles.who}>{currentBetSlipGame?.matchOdd.id}</span>
        <span className={styles.odd}>{currentBetSlipGame?.matchOdd.odds}</span>
      </div>
    </div>
  );
};

export default SelectedBet;
