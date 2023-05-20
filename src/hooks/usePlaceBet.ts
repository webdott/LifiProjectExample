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
import { Address, useAccount, useContractRead, useContractWrite } from 'wagmi';
import { erc20ABI } from 'wagmi';
import { formatUnits } from 'ethers/lib/utils.js';
import { useCallback, useState } from 'react';

const SLIPPAGE = 5;

function usePlaceBet(outcome: Outcome | undefined, chainId: number, onBetPlaced: () => void) {
  const { address } = useAccount();
  const [isApproving, setIsApproving] = useState(false);
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const [amount, setAmount] = useState('');

  // Read allowance
  const { data: rawAllowance, refetch: refetchAllowance } = useContractRead({
    address: USDT_ADDRESS,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, LIQUIDITY_POOLS[chainId] as Address],
    enabled: !!address && chainId === polygon.id,
  });
  const allowance = rawAllowance ? formatUnits(rawAllowance, USDT_DECIMALS) : 0;
  const isApproved = chainId === gnosis.id || +allowance >= +amount;

  // Approve allowance
  const { writeAsync: _approve } = useContractWrite({
    address: USDT_ADDRESS,
    abi: erc20ABI,
    functionName: 'approve',
    mode: 'recklesslyUnprepared',
  });

  // Bet native token
  const { writeAsync: _betNative } = useContractWrite({
    address: LIQUIDITY_POOLS[chainId] as Address,
    abi: ABI_PAYLOAD,
    functionName: 'betNative',
    mode: 'recklesslyUnprepared',
  });

  // // Bet non native token
  const { writeAsync: _bet } = useContractWrite({
    address: LIQUIDITY_POOLS[chainId] as Address,
    abi: ABI_PAYLOAD,
    functionName: 'bet',
    mode: 'recklesslyUnprepared',
  });

  const approve = useCallback(async () => {
    setIsApproving(true);
    try {
      const { wait } = await _approve?.({
        recklesslySetUnpreparedArgs: [
          LIQUIDITY_POOLS[chainId] as Address,
          ethers.constants.MaxInt256,
        ],
      });
      await wait();
      await refetchAllowance();
    } catch {}
    setIsApproving(false);
  }, [_approve, setIsApproving, refetchAllowance, chainId]);

  const placeBet = useCallback(async () => {
    if (!outcome) return;

    setIsPlacingBet(true);
    const { conditionId, outcomeId, odds, coreAddress } = outcome || {};
    const minOdds = 1 + ((Number(odds) - 1) * (100 - SLIPPAGE)) / 100;
    const oddsDecimals = 12;
    const rawMinOdds = ethers.utils.parseUnits(minOdds.toFixed(oddsDecimals), oddsDecimals);
    const data = ethers.utils.defaultAbiCoder.encode(
      ['uint256', 'uint64', 'uint64'],
      [conditionId, outcomeId, rawMinOdds]
    );

    try {
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
      }
    } catch {
      setIsPlacingBet(false);
      return;
    }
    setIsPlacingBet(false);
    onBetPlaced();
  }, [outcome, amount, _bet, _betNative, address, onBetPlaced, chainId]);

  return {
    placeBet,
    approve,
    isApproved,
    isApproving,
    isPlacingBet,
    amount,
    setAmount,
  };
}
export default usePlaceBet;
