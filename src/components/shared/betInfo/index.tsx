import { useState } from 'react';
import { useSelector } from 'react-redux';

import { HeaderButtonText } from '../../../constants/navbar';
import Button from '../button';
import { ButtonType } from '../button/type';
import BetSlip from './betslip';
import MyBets from '../myBets';
import { RootState } from '../../../redux';

import styles from './betInfo.module.scss';

export default function BetInfo(): JSX.Element {
  const [betContent, setBetContent] = useState<string>(HeaderButtonText.Bet_Slip);
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);

  return (
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
}
