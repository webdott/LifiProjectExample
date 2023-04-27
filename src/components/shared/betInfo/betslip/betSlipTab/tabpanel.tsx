import { useNavigate } from 'react-router';
import { useAccount, useBalance } from 'wagmi';

import SelectedBet from './selectedBet';
import Button from '../../../button';
import { ButtonType } from '../../../button/type';

import styles from './bestsliptab.module.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const quickBetValues: string[] = ['10%', '50%', '70%', '100%'];

export default function TabPanel(props: TabPanelProps) {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={styles.tabPanel}
      {...other}
    >
      {value === index && (
        <>
          <SelectedBet />
          <div className={styles.cta}>
            <div className={styles.betInput}>
              <label>
                <div className={styles.inputContainer}>
                  <input type='text' placeholder='0' value='' />
                  <div className={styles.betAmountPlaceholder}>Bet amount</div>
                </div>
                <div className={styles.currency}>{data?.symbol ?? 'XDAI'}</div>
              </label>
            </div>
            <div className={styles.quickBet}>
              {quickBetValues.map((value) => (
                <Button
                  key={value}
                  className={`${styles.quickBetButton} ${styles.disabled}`}
                  btnType={ButtonType.membershipButton}
                  text={value}
                  onClick={() => null}
                />
              ))}
            </div>
            <div className={styles.possibleWin}>
              <p className={styles.title}>Possible Win</p>
              <span className={styles.value}>0 {data?.symbol ?? 'XDAI'}</span>
            </div>
            <Button
              className={`${styles.ctaButton} ${styles.disabled}`}
              btnType={ButtonType.membershipButton}
              text={'PLACE BET'}
              onClick={() => null}
            />
          </div>
        </>
      )}
    </div>
  );
}
