import { useAccount, useBalance } from 'wagmi';
import { ethers, utils } from 'ethers';

import SelectedBet from './selectedBet';
import Button from '../../../button';
import { ButtonType } from '../../../button/type';

import styles from './bestsliptab.module.scss';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { round } from '../../../../../utils/numbers';
import { removeBetSlip } from '../../../../../redux/action-creators';
import usePlaceBet from '../../../../../hooks/usePlaceBet';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const quickBetValues: string[] = ['10%', '50%', '70%', '100%'];

export default function TabPanel(props: TabPanelProps) {
  const { currentGame: currentBetSlipGame } = useTypedSelector((state) => state.betSlip);

  const { approve, placeBet, amount, isApproved, setAmount, isApproving } = usePlaceBet(
    currentBetSlipGame?.outcome,
    () => null
  );
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);

  const dispatch = useDispatch();
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });

  const { children, value, index, ...other } = props;
  const handleAmountChagne = useCallback((event: BaseSyntheticEvent) => {
    setAmount(event.target.value);
  }, []);

  const handleBetRemoval = useCallback(() => {
    removeBetSlip()(dispatch);
  }, [dispatch]);

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
          <SelectedBet
            oddsFormat={oddsFormat}
            onRemoveBet={handleBetRemoval}
            currentSlipBet={currentBetSlipGame}
          />
          <div className={styles.cta}>
            <div className={styles.betInput}>
              <label>
                <div className={styles.inputContainer}>
                  <input type='text' placeholder='0' value={amount} onChange={handleAmountChagne} />
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
              <span className={styles.value}>
                {amount
                  ? round(Number(amount) * (Number(currentBetSlipGame?.outcome.odds) || 0), 2)
                  : 0}{' '}
                {data?.symbol ?? 'XDAI'}
              </span>
            </div>
            <Button
              className={`${styles.ctaButton} `}
              btnType={ButtonType.membershipButton}
              text={isApproved ? 'Place bet' : isApproving ? 'Approving...' : 'Approve'}
              onClick={isApproved ? placeBet : approve}
            />
          </div>
        </>
      )}
    </div>
  );
}
