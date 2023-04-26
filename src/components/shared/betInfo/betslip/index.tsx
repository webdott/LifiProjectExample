import { useSelector } from 'react-redux';

import ticket from '../../../../assets/images/betSlipIcon.png';
import { HeaderButtonText } from '../../../../constants/navbar';
import Button from '../../button';
import { ButtonType } from '../../button/type';
import BetSlipTab from './betSlipTab';
import { RootState } from '../../../../redux';

import styles from './betslip.module.scss';

export default function BetSlip() {
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);

  return (
    <div className={styles.container}>
      {currentBetSlipGame ? (
        <BetSlipTab />
      ) : (
        <>
          <div className={styles.contentSection}>
            <img src={ticket} alt='invoice' />
          </div>
          <Button btnType={ButtonType.betInfoLargeButton} text={HeaderButtonText.How_To_Play} />
        </>
      )}
    </div>
  );
}
