import ticket from '../../../../assets/images/betSlipIcon.png';
import { HeaderButtonText } from '../../../../constants/navbar';
// import SettingsPage from "../../settingsPage";
// import BetSlipInfo from "./betSlipInfo";
import Button from '../../button';
import { ButtonType } from '../../button/type';
import BetSlipTab from './betSlipTab';

import styles from './betslip.module.scss';

export default function BetSlip() {
  return (
    <div className={styles.container}>
      {/* <SettingsPage /> */}
      {/* <div className={styles.contentSection}>
        <img src={ticket} alt='invoice' />
      </div> */}
      {/* <BetSlipInfo /> */}
      {/* <Button btnType={ButtonType.betInfoLargeButton} text={HeaderButtonText.How_To_Play} /> */}
      <BetSlipTab />
    </div>
  );
}
