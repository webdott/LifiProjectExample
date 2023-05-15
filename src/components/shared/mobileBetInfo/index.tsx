import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MuiButton from '@mui/material/Button';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';

import { RootState } from '../../../redux';
import { HeaderButtonText } from '../../../constants/navbar';
import { ButtonType } from '../button/type';
import Button from '../button';
import MyBets from '../myBets';
import BetSlip from '../betInfo/betslip';

import styles from './mobilebetinfo.module.scss';
import { Box } from '@mui/material';

const MobileBetInfo = () => {
  const [showBetInfo, setShowBetInfo] = useState<boolean>(false);
  const [betContent, setBetContent] = useState<string>(HeaderButtonText.Bet_Slip);
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);

  const BetInfo = () => (
    <div className={`${styles.container} ${currentBetSlipGame ? styles.expand : ''}`}>
      <div className={styles.betSection}>
        <div className={styles.topSection}>
          <div className={styles.betButton}>
            <Button
              onClick={() => setBetContent(HeaderButtonText.Bet_Slip)}
              btnType={
                betContent === HeaderButtonText.Bet_Slip
                  ? ButtonType.betInfoButtonActive
                  : ButtonType.betInfoButton
              }
              text={HeaderButtonText.Bet_Slip}
            />
            <Button
              onClick={() => setBetContent(HeaderButtonText.My_Bets)}
              btnType={
                betContent === HeaderButtonText.My_Bets
                  ? ButtonType.betInfoButtonActive
                  : ButtonType.betInfoButton
              }
              text={HeaderButtonText.My_Bets}
            />
          </div>
        </div>
        <div className={styles.tabContent}>
          {betContent === HeaderButtonText.My_Bets ? <MyBets /> : <BetSlip />}
        </div>
      </div>
      <div className={styles.playButton}></div>
    </div>
  );

  return (
    <div className={styles.mobileBetInfo}>
      {showBetInfo && <BetInfo />}

      <Drawer
        anchor={'bottom'}
        open={showBetInfo}
        onClose={() => setShowBetInfo(false)}
        sx={{
          '& .MuiPaper-root.MuiDrawer-paper': {
            borderRadius: '15px 15px 0 0',
          },
          '@media (min-width: 620px)': {
            display: 'none',
          },
        }}
      >
        <Box sx={{ width: 'auto' }} className={styles.betInfoDrawerMobile}>
          <BetInfo />
        </Box>
      </Drawer>

      <MuiButton
        className={`${styles.triggerButton} ${showBetInfo ? styles.open : ''}`}
        onClick={() => setShowBetInfo((betInfo) => !betInfo)}
      >
        {currentBetSlipGame && <span className={styles.betSelected}>1</span>}
        {showBetInfo ? (
          <CloseIcon className={styles.closeIcon} />
        ) : (
          <BookOnlineIcon className={styles.ticketIcon} />
        )}
      </MuiButton>
    </div>
  );
};

export default MobileBetInfo;
