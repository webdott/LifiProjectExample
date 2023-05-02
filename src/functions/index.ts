import { ethers } from 'ethers';
const EthDater = require('ethereum-block-by-date');
const provider = new ethers.providers.CloudflareProvider();

const dater = new EthDater(provider);

export const getBlockNumber = async () => {
  let block = await dater.getDate(new Date(), true, false);
  return block.block;
};

export const formatDate = (startDate: number) => {
  let date = new Date(startDate),
    dataFormatter =
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') +
      ' ' +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

  return dataFormatter.split(' ')[1];
};

export const pickFeaturedGame = () => {
  return Math.floor(Math.random() * 10);
};

export const getTruncatedAddress = (account: string | undefined) =>
  account
    ? account.length > 8
      ? account.substring(0, 4) + '...' + account.substring(account.length - 4, account.length)
      : account
    : '';

export const getResultingChainUrl = (selectedChain: 'polygon' | 'gnosis', fullPath: string) => {
  const restPath = fullPath.split('/').slice(2);

  const restPathJoined = restPath.join('/');
  const bareRestPathJoined = restPathJoined.replaceAll('/', '');
  if (bareRestPathJoined === 'polygon' || bareRestPathJoined === 'gnosis')
    return `/${selectedChain}`;

  return `/${selectedChain}/${restPath.join('/')}`;
};

export const checkIfBase = (url: string): boolean => {
  return (
    url.endsWith('/gnosis') ||
    url.endsWith('/polygon') ||
    url.endsWith('/gnosis/') ||
    url.endsWith('/polygon/')
  );
};

export const checkIfSPorts = (url: string): boolean => {
  return url.endsWith('sports') || url.endsWith('sports/');
};

export const getSelectedChainFromBase = (url: string) => {
  return url.split('/')?.[1] ?? 'gnosis';
};
