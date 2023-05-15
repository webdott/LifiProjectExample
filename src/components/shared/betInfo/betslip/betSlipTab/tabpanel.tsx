import { useAccount, useBalance } from 'wagmi';

import SelectedBet from './selectedBet';
import Button from '../../../button';
import { ButtonType } from '../../../button/type';

import styles from './bestsliptab.module.scss';
import { BaseSyntheticEvent, useCallback } from 'react';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { round } from '../../../../../utils/numbers';
import { removeBetSlip } from '../../../../../redux/action-creators';
import usePlaceBet from '../../../../../hooks/usePlaceBet';
import { getSelectedChainFromBase } from '../../../../../functions';
import { gnosis, polygon } from 'wagmi/chains';
import { CURRENCY_SYMBOLS, USDT_ADDRESS } from '../../../../../constants/azuro';
import { useLocation } from 'react-router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const quickBetValues: string[] = ['10%', '50%', '70%', '100%'];

export default function TabPanel(props: TabPanelProps) {
  const location = useLocation();
  const chainId =
    getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;

  const dispatch = useDispatch();
  const handleBetRemoval = useCallback(() => {
    removeBetSlip()(dispatch);
  }, [dispatch]);

  const { address } = useAccount();
  const { data: nativeData, isLoading: isLoadingNativeDataBalance } = useBalance({
    address,
    chainId: getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id,
  });
  const { data: USDTBalanceData, isLoading: isLoadingUSDTBalance } = useBalance({
    address: getSelectedChainFromBase(location.pathname) === 'polygon' ? address : undefined,
    chainId: getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id,
    token: USDT_ADDRESS,
  });

  const { currentGame: currentBetSlipGame } = useTypedSelector((state) => state.betSlip);

  const { approve, placeBet, amount, isApproved, setAmount, isApproving } = usePlaceBet(
    currentBetSlipGame?.outcome,
    chainId,
    handleBetRemoval
  );
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);

  const { children, value, index, ...other } = props;
  const handleAmountChagne = useCallback((event: BaseSyntheticEvent) => {
    setAmount(event.target.value);
  }, []);

  const hasEnoughBalance = () => {
    if (chainId === gnosis.id && nativeData) return +nativeData.formatted >= +amount;
    else if (USDTBalanceData) return +USDTBalanceData.formatted >= +amount;
    return false;
  };

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
                <div className={styles.currency}>{CURRENCY_SYMBOLS[chainId]}</div>
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
                {CURRENCY_SYMBOLS[chainId]}
              </span>
            </div>
            <Button
              className={`${styles.ctaButton} ${!hasEnoughBalance() && styles.disabled}`}
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
