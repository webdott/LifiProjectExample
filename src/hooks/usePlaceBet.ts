import { gnosis, polygon } from 'wagmi/chains';
import { Outcome } from '../constants/matches';
import {
  ABI_PAYLOAD,
  LIQUIDITY_POOLS,
  USDT_ADDRESS,
  USDT_DECIMALS,
  XDAI_DECIMALS,
} from '../constants/azuro';
import { ethers } from 'ethers';
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { erc20ABI } from 'wagmi';
import { formatUnits } from 'ethers/lib/utils.js';
import { useCallback, useEffect, useState } from 'react';

const SLIPPAGE = 5;

function usePlaceBet(outcome: Outcome | undefined, chainId: number, onBetPlace: () => void) {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');

  // Read allowance
  const { data: rawAllowance, isLoading: isAllowanceFetching } = useContractRead({
    address: USDT_ADDRESS,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, LIQUIDITY_POOLS[chainId] as Address],
    enabled: !!address && chainId === polygon.id,
    watch: true,
  });
  const allowance = rawAllowance ? formatUnits(rawAllowance, USDT_DECIMALS) : 0;
  const isApproved = chainId === gnosis.id || +allowance >= +amount;

  // Approve allowance
  const { config: approveConfig } = usePrepareContractWrite({
    address: USDT_ADDRESS,
    abi: erc20ABI,
    functionName: 'approve',
    args: [LIQUIDITY_POOLS[chainId] as Address, ethers.constants.MaxInt256],
  });
  const { write: _approve, status: approveStatus } = useContractWrite(approveConfig);
  const isApproving = approveStatus === 'loading';

  // Bet native token
  const { writeAsync: _betNative, status: betNativeStatus } = useContractWrite({
    address: LIQUIDITY_POOLS[chainId] as Address,
    abi: ABI_PAYLOAD,
    functionName: 'betNative',
    mode: 'recklesslyUnprepared',
  });

  // // Bet non native token
  const { writeAsync: _bet, status: betStatus } = useContractWrite({
    address: LIQUIDITY_POOLS[chainId] as Address,
    abi: ABI_PAYLOAD,
    functionName: 'bet',
    mode: 'recklesslyUnprepared',
  });

  const isBetInProgress = betStatus === 'loading' || betNativeStatus === 'loading';

  const placeBet = useCallback(async () => {
    if (!outcome) return;
    const { conditionId, outcomeId, odds, coreAddress } = outcome || {};
    const minOdds = 1 + ((Number(odds) - 1) * (100 - SLIPPAGE)) / 100;
    const oddsDecimals = 12;
    const rawMinOdds = ethers.utils.parseUnits(minOdds.toFixed(oddsDecimals), oddsDecimals);
    const data = ethers.utils.defaultAbiCoder.encode(
      ['uint256', 'uint64', 'uint64'],
      [conditionId, outcomeId, rawMinOdds]
    );

    // if chain is Gnosis then place bets in xDAI native token
    if (chainId === gnosis.id) {
      const { wait } = await _betNative?.({
        recklesslySetUnpreparedArgs: [
          coreAddress,
          Math.floor(Date.now() / 1000) + 2000,
          {
            affiliate: address,
            data,
          },
        ],
        recklesslySetUnpreparedOverrides: {
          value: ethers.utils.parseUnits(amount, XDAI_DECIMALS),
        },
      });
      await wait();
      onBetPlace();
    } else {
      const { wait } = await _bet?.({
        recklesslySetUnpreparedArgs: [
          coreAddress,
          ethers.utils.parseUnits(amount, USDT_DECIMALS),
          Math.floor(Date.now() / 1000) + 2000,
          {
            affiliate: address,
            data,
          },
        ],
      });
      await wait();
      onBetPlace();
    }
  }, [outcome, amount, _bet]);

  return {
    placeBet,
    approve: _approve,
    isApproved,
    isApproving,
    isBetInProgress,
    amount,
    setAmount,
    isAllowanceFetching,
  };
}
export default usePlaceBet;
