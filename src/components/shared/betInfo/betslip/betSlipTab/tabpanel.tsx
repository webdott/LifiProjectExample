import { useLocation, useNavigate } from 'react-router';
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
import { getSelectedChainFromBase } from '../../../../../functions';
import { gnosis, polygon } from 'wagmi/chains';
import { ABI_PAYLOAD, LIQUIDITY_POOLS } from '../../../../../constants/azuro';
import { useContractFunction } from '@usedapp/core';

const lpContract = new ethers.Contract(
  LIQUIDITY_POOLS[gnosis.id],
  ABI_PAYLOAD,
  new ethers.providers.StaticJsonRpcProvider('http://127.0.0.1:8545')
);
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const quickBetValues: string[] = ['10%', '50%', '70%', '100%'];

export default function TabPanel(props: TabPanelProps) {
  const location = useLocation();
  const { currentGame: currentBetSlipGame } = useTypedSelector((state) => state.betSlip);
  const chainId =
    getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
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

  const { send: bet } = useContractFunction(lpContract, 'bet', { transactionName: 'Bet' });
  const { send: betNative } = useContractFunction(lpContract, 'betNative', {
    transactionName: 'BetNative',
  });

  const placeBet = useCallback(async () => {
    const outcome = currentBetSlipGame?.outcome;
    if (!outcome) return;

    const deadline = Math.floor(Date.now() / 1000) + 2000;
    const affiliate = address; // your affiliate wallet address

    const { conditionId, outcomeId, odds, coreAddress } = outcome;
    const slippage = 5;
    const minOdds = 1 + ((Number(odds) - 1) * (100 - slippage)) / 100;
    const oddsDecimals = 12;
    const rawMinOdds = utils.parseUnits(minOdds.toFixed(oddsDecimals), oddsDecimals);

    const data = utils.defaultAbiCoder.encode(
      ['uint256', 'uint64', 'uint64'],
      [conditionId, outcomeId, rawMinOdds]
    );

    // if chain is Gnosis then place bets in xDAI native token
    let a;

    if (chainId === gnosis.id) {
      const tokenDecimals = 18; // xDAI  decimals
      const rawAmount = utils.parseUnits(amount, tokenDecimals);
      // a = await lpContract.betNative(
      a = await betNative(
        coreAddress,
        deadline,
        {
          affiliate,
          data,
        },
        { value: rawAmount }
      );
    } else {
      const tokenDecimals = 6; // USDT  decimals
      const rawAmount = utils.parseUnits(amount, tokenDecimals);
      // a = await lpContract.bet(coreAddress, rawAmount, deadline, {
      a = await bet(coreAddress, rawAmount, deadline, {
        affiliate,
        data,
      });
    }
  }, [currentBetSlipGame, amount, betNative, bet]);

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
              text={'PLACE BET'}
              onClick={placeBet}
            />
          </div>
        </>
      )}
    </div>
  );
}
