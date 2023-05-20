import { BaseSyntheticEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useAccount, useBalance } from 'wagmi';
import { useLocation } from 'react-router';
import { gnosis, polygon } from 'wagmi/chains';

import SelectedBet from './selectedBet';
import Button from '../../../button';
import { ButtonType } from '../../../button/type';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { round } from '../../../../../utils/numbers';
import { removeBetSlip } from '../../../../../redux/action-creators';
import usePlaceBet from '../../../../../hooks/usePlaceBet';
import { getSelectedChainFromBase } from '../../../../../functions';
import { CURRENCY_SYMBOLS, USDT_ADDRESS } from '../../../../../constants/azuro';

import styles from './bestsliptab.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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

  const onPlacingBetSuccess = useCallback(() => {
    toast.success('Bet placed successfully');
    handleBetRemoval();
  }, []);

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

  const { approve, placeBet, amount, isApproved, setAmount, isApproving, isPlacingBet } =
    usePlaceBet(currentBetSlipGame?.outcome, chainId, onPlacingBetSuccess);
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);

  const { children, value, index, ...other } = props;
  const handleAmountChange = useCallback((event: BaseSyntheticEvent) => {
    setAmount((v) => (event.target.validity.valid ? event.target.value : v));
  }, []);

  const hasEnoughBalance = () => {
    if (!+amount) return false;
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
            <div
              className={`${styles.betInput} ${
                +amount && !hasEnoughBalance() && styles.notEnoughFunds
              }`}
            >
              <label>
                <div className={styles.inputContainer}>
                  <input
                    type='text'
                    placeholder='0'
                    pattern='[0-9]+([\.][0-9]*)?'
                    step='any'
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <div className={styles.betAmountPlaceholder}>Bet amount</div>
                </div>
                <div className={styles.currency}>{CURRENCY_SYMBOLS[chainId]}</div>
              </label>

              <div className={styles.getFunds}>
                <div className={styles.getFundsText}>
                  <span>Not enough funds</span>
                  <span>Top up your wallet quickly</span>
                </div>

                <Link
                  to={`/${getSelectedChainFromBase(location.pathname)}/get-funds`}
                  className={styles.getFundsLink}
                >
                  Get {getSelectedChainFromBase(location.pathname) === 'polygon' ? 'USDT' : 'xDAI'}
                </Link>
              </div>
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
              className={`${styles.ctaButton} ${
                (!hasEnoughBalance() || isPlacingBet || isApproving) && styles.disabled
              }`}
              btnType={ButtonType.membershipButton}
              text={
                isApproved
                  ? isPlacingBet
                    ? 'Placing Bet...'
                    : 'Place bet'
                  : isApproving
                  ? 'Approving...'
                  : 'Approve'
              }
              onClick={isApproved ? placeBet : approve}
            />
          </div>
        </>
      )}
    </div>
  );
}
