import { gnosis } from 'wagmi/chains';
import { Outcome } from '../constants/matches';
import {
  ABI_PAYLOAD,
  LIQUIDITY_POOLS,
  USDT_ADDRESS,
  USDT_DECIMALS,
  XDAI_DECIMALS,
} from '../constants/azuro';
import { ethers } from 'ethers';
import { useAccount, useContract } from 'wagmi';
import { useContractFunction } from '@usedapp/core';
import { ERC20Interface } from '@usedapp/core';
import { useTokenAllowance } from '@usedapp/core';
import { formatUnits } from 'ethers/lib/utils.js';
import { useCallback, useState } from 'react';

const usdtContract = new ethers.Contract(USDT_ADDRESS, ERC20Interface);
function usePlaceBet(outcome: Outcome | undefined, chainId: number, onBetPlace: () => void) {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');

  // Liquidity pool contract
  const lpContract = useContract({
    address: LIQUIDITY_POOLS[chainId],
    abi: ABI_PAYLOAD,
  });

  // Methods on liquidity pool contract to place a bet
  const { send: _bet } = useContractFunction(lpContract, 'bet', { transactionName: 'Bet' });
  const { send: _betNative } = useContractFunction(lpContract, 'betNative', {
    transactionName: 'BetNative',
  });

  // Method to approve non native token (i.e. USDT)
  const { state: approveState, send: _approve } = useContractFunction(usdtContract, 'approve', {
    transactionName: 'Approve',
  });

  const rawAllowance = useTokenAllowance(USDT_ADDRESS, address, LIQUIDITY_POOLS[chainId], {
    refresh: 'everyBlock',
  });
  const allowanceFetching = rawAllowance === undefined;
  const allowance = rawAllowance && formatUnits(rawAllowance, USDT_DECIMALS);
  const isApproved = chainId === gnosis.id || +allowance >= +amount;
  const isApproving =
    approveState.status === 'PendingSignature' || approveState.status === 'Mining';

  const approve = () => {
    // to prevent the need to ask for approval before each bet, the user will be asked to approve a "maximum" amount
    const amount = ethers.constants.MaxUint256;

    _approve(LIQUIDITY_POOLS[chainId], amount);
  };

  const placeBet = useCallback(async () => {
    console.log('111111111111111111outcome', outcome);
    if (!outcome) return;

    const deadline = Math.floor(Date.now() / 1000) + 2000;
    const affiliate = address; // your affiliate wallet address

    const { conditionId, outcomeId, odds, coreAddress } = outcome;
    const slippage = 5;
    const minOdds = 1 + ((Number(odds) - 1) * (100 - slippage)) / 100;
    const oddsDecimals = 12;
    const rawMinOdds = ethers.utils.parseUnits(minOdds.toFixed(oddsDecimals), oddsDecimals);

    const data = ethers.utils.defaultAbiCoder.encode(
      ['uint256', 'uint64', 'uint64'],
      [conditionId, outcomeId, rawMinOdds]
    );

    // if chain is Gnosis then place bets in xDAI native token
    if (chainId === gnosis.id) {
      const rawAmount = ethers.utils.parseUnits(amount, XDAI_DECIMALS);
      await _betNative(
        coreAddress,
        deadline,
        {
          affiliate,
          data,
        },
        { value: rawAmount }
      );
    } else {
      const rawAmount = ethers.utils.parseUnits(amount, USDT_DECIMALS);
      await _bet(coreAddress, rawAmount, deadline, {
        affiliate,
        data,
      });
    }
    onBetPlace();
  }, [outcome, amount, _betNative, _bet]);

  return {
    placeBet,
    approve,
    isApproved,
    isApproving,
    amount,
    setAmount,
    allowanceFetching,
  };
}
export default usePlaceBet;
